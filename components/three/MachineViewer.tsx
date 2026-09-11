'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { MACHINES, type MachineId } from './registry'
import { requestSlot, type SlotMode } from './contextBudget'

const MachineScene = dynamic(
  () => import('./MachineScene').then(m => m.MachineScene),
  { ssr: false }
)

/** WebGL availability probe — cheap, runs once, cached for the session. */
let webglOk: boolean | null = null
function hasWebGL(): boolean {
  if (webglOk !== null) return webglOk
  try {
    const c = document.createElement('canvas')
    webglOk = !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl'))
    )
  } catch {
    webglOk = false
  }
  return webglOk
}

interface Props {
  machine: MachineId
  /** Show the technical callout labels pointing at key components */
  annotations?: boolean
  /** Show the corner HUD with designation + spec chips */
  hud?: boolean
  /** Allow drag-to-orbit and zoom (off for small cards) */
  interactive?: boolean
  /** 'card' drops shadows so a grid of viewers stays cheap */
  quality?: 'full' | 'card'
  className?: string
}

export function MachineViewer({
  machine,
  annotations = true,
  hud = true,
  interactive = true,
  quality = 'full',
  className = '',
}: Props) {
  const spec = MACHINES[machine]
  const hostRef = useRef<HTMLDivElement>(null)
  const releaseRef = useRef<(() => void) | null>(null)

  const [live, setLive] = useState(false)        // holds a WebGL context now
  const [nearby, setNearby] = useState(false)    // in/near the viewport
  const [snapshot, setSnapshot] = useState<string | null>(null)
  const [speed, setSpeed] = useState(1)
  const [supported, setSupported] = useState(true)

  // Big interactive viewers keep their context; cards take a turn and yield.
  const mode: SlotMode = quality === 'full' ? 'hold' : 'cycle'

  // Respect prefers-reduced-motion: keep the model, drop the motion.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setSpeed(mq.matches ? 0 : 1)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => { setSupported(hasWebGL()) }, [])

  // Track whether the viewer is worth spending a context on.
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setNearby(e.isIntersecting),
      { rootMargin: '300px 0px', threshold: 0.01 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const releaseSlot = useCallback(() => {
    releaseRef.current?.()
    releaseRef.current = null
    setLive(false)
  }, [])

  // Queue for a context whenever we are on screen and don't already have one.
  // Cards that have already captured a still don't queue again unless hovered.
  useEffect(() => {
    if (!supported || !nearby || releaseRef.current) return
    if (mode === 'cycle' && snapshot) return

    releaseRef.current = requestSlot(mode, () => setLive(true))
    return () => {
      releaseRef.current?.()
      releaseRef.current = null
    }
  }, [supported, nearby, mode, snapshot])

  // Give the slot back when we scroll away.
  useEffect(() => {
    if (!nearby && releaseRef.current) releaseSlot()
  }, [nearby, releaseSlot])

  /**
   * The scene has settled. Keep a still of it so the card still shows its
   * machine after the context goes to the next viewer in the queue.
   */
  const handleReady = useCallback(() => {
    if (mode !== 'cycle') return
    const canvas = hostRef.current?.querySelector('canvas') as HTMLCanvasElement | null
    if (canvas) {
      try {
        setSnapshot(canvas.toDataURL('image/png'))
      } catch {
        /* Reading back can fail; the live canvas simply stays until revoked. */
      }
    }
    releaseSlot()
  }, [mode, releaseSlot])

  /** A lost context (tab backgrounded, GPU reset) must not leave a blank hole. */
  const handleContextLost = useCallback(() => {
    releaseSlot()
  }, [releaseSlot])

  // Cards re-acquire a context on hover so they animate under the pointer.
  const handleEnter = useCallback(() => {
    if (mode !== 'cycle' || !supported || releaseRef.current) return
    releaseRef.current = requestSlot(mode, () => setLive(true))
  }, [mode, supported])

  return (
    <div
      ref={hostRef}
      className={`machine-viewer ${className}`}
      onPointerEnter={handleEnter}
    >
      {/* Blueprint backdrop — also the fallback when WebGL is unavailable */}
      <div className="machine-viewer__backdrop" aria-hidden="true" />

      {/* Still from the last render, shown while another viewer has the context */}
      {snapshot && !live && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="machine-viewer__still" src={snapshot} alt="" aria-hidden="true" />
      )}

      {supported && live && (
        <div className="machine-viewer__canvas">
          <MachineScene
            spec={spec}
            speed={speed}
            showAnnotations={annotations}
            interactive={interactive}
            quality={quality}
            onReady={handleReady}
            onContextLost={handleContextLost}
          />
        </div>
      )}

      {hud && (
        <div className="machine-viewer__hud" aria-hidden="true">
          <div className="machine-viewer__hud-top">
            <span className="machine-viewer__code">{spec.code}</span>
            <span className="machine-viewer__name">{spec.name}</span>
          </div>
          <div className="machine-viewer__specs">
            {spec.specs.map(s => (
              <span key={s} className="machine-viewer__chip">{s}</span>
            ))}
          </div>
          {interactive && supported && (
            <span className="machine-viewer__hint">Drag to orbit</span>
          )}
        </div>
      )}

      {/* Screen-reader description — the canvas itself is decorative. */}
      <span className="sr-only">
        Three-dimensional model of a {spec.name} ({spec.specs.join(', ')}).
      </span>
    </div>
  )
}
