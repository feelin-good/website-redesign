'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { MACHINES, type MachineId } from './registry'

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
  /** 'card' drops shadows and contact shadows so a grid of viewers stays cheap */
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
  const [mounted, setMounted] = useState(false)   // in viewport → build the scene
  const [visible, setVisible] = useState(false)   // in viewport → run the clock
  const [speed, setSpeed] = useState(1)
  const [supported, setSupported] = useState(true)

  // Respect prefers-reduced-motion: keep the model, drop the motion.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setSpeed(mq.matches ? 0 : 1)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    setSupported(hasWebGL())
  }, [])

  // Only build the WebGL context once the card is actually near the viewport,
  // and pause rendering entirely when it scrolls away.
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setMounted(true)
        setVisible(e.isIntersecting)
      },
      { rootMargin: '250px 0px', threshold: 0.01 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={hostRef} className={`machine-viewer ${className}`}>
      {/* Blueprint backdrop — also the graceful fallback when WebGL is absent */}
      <div className="machine-viewer__backdrop" aria-hidden="true" />

      {supported && mounted && (
        <div className="machine-viewer__canvas">
          <MachineScene
            spec={spec}
            speed={visible ? speed : 0}
            showAnnotations={annotations}
            interactive={interactive}
            quality={quality}
            active={visible}
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
        Interactive three-dimensional model of a {spec.name} ({spec.specs.join(', ')}).
      </span>
    </div>
  )
}
