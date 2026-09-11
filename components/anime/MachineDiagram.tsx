'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DIAGRAMS, type DiagramId } from './registry'
import { IsoGround } from './diagrams'

interface Props {
  machine: DiagramId
  /** Technical callouts pointing at named components */
  annotations?: boolean
  /** Corner HUD with designation + spec chips */
  hud?: boolean
  className?: string
}

/**
 * Animated technical elevation of a machine.
 *
 * One timeline drives every diagram off the data attributes in diagrams.tsx —
 * strokes draw themselves on, parts slide in from exploded positions, then the
 * running loops (wheels, material flow, pulse-jet valves) start. Nothing here
 * knows which machine it is drawing.
 */
export function MachineDiagram({
  machine,
  annotations = true,
  hud = true,
  className = '',
}: Props) {
  const spec = DIAGRAMS[machine]
  const hostRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const contentRef = useRef<SVGGElement>(null)
  const [reduced, setReduced] = useState(false)
  const [viewBox, setViewBox] = useState('-500 -430 1000 620')

  /**
   * Frame the assembly to its own extents. Machines differ hugely in footprint
   * — a 2 km conveyor against a baghouse — so a single authored viewBox either
   * crops one or strands another in the middle of the panel. Measured before
   * the reveal offsets are applied, so exploded parts don't inflate the box.
   */
  useLayoutEffect(() => {
    const g = contentRef.current
    if (!g) return
    let box: DOMRect
    try {
      box = g.getBBox()
    } catch {
      return // not rendered yet (jsdom, display:none)
    }
    if (!box.width || !box.height) return
    const pad = Math.max(box.width, box.height) * 0.06
    setViewBox(
      `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`
    )
  }, [machine, annotations])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    const host = hostRef.current
    if (!svg || !host) return

    let cancelled = false
    const running: { pause: () => void }[] = []

    import('animejs').then(({ animate, createTimeline, stagger, svg: animeSvg, onScroll, utils }) => {
      if (cancelled) return

      const q = <T extends SVGElement>(sel: string) =>
        Array.from(svg.querySelectorAll<T>(sel))

      const drawables = q<SVGPathElement>('[data-draw]')
      const parts = q<SVGGElement>('[data-part]')

      // Reduced motion: show the finished drawing, skip the choreography.
      if (reduced) {
        utils.set(drawables, { opacity: 1 })
        utils.set(parts, { opacity: 1, translateX: 0, translateY: 0 })
        return
      }

      // --- Reveal timeline, triggered when the panel scrolls into view ---
      const tl = createTimeline({
        defaults: { ease: 'outExpo' },
        autoplay: onScroll({ target: host, enter: 'bottom-=80 top', repeat: false }),
      })

      // 1. Parts arrive from their exploded offsets.
      parts.forEach(part => {
        const [dx, dy] = (part.dataset.part || '0,0').split(',').map(Number)
        utils.set(part, { translateX: dx, translateY: dy, opacity: 0 })
      })
      tl.add(parts, {
        translateX: 0,
        translateY: 0,
        opacity: 1,
        duration: 1100,
        delay: stagger(85),
      }, 0)

      // 2. Strokes draw themselves on, in authored order.
      const ordered = [...drawables].sort(
        (a, b) => Number(a.dataset.draw) - Number(b.dataset.draw)
      )
      const shapes = animeSvg.createDrawable(ordered)
      utils.set(shapes, { draw: '0 0' })
      tl.add(shapes, {
        draw: '0 1',
        duration: 900,
        delay: stagger(28),
        ease: 'inOutQuad',
      }, 180)

      // 3. Callout labels, after the machine has assembled.
      const callouts = q('.callout')
      if (callouts.length) {
        utils.set(callouts, { opacity: 0, translateX: -8 })
        tl.add(callouts, {
          opacity: 1,
          translateX: 0,
          duration: 620,
          delay: stagger(90),
        }, '-=500')
      }

      // 4. Running machinery — started once the reveal has played.
      tl.then(() => {
        if (cancelled) return

        q('[data-spin]').forEach(el => {
          const secs = Number(el.dataset.spin) || 6
          running.push(animate(el, {
            rotate: 360,
            duration: secs * 1000,
            ease: 'linear',
            loop: true,
          }))
        })

        // Material travelling the length of a belt, each lump offset in the cycle.
        document.querySelectorAll('.flow-track').forEach(track => {
          const lumps = Array.from(track.querySelectorAll<SVGElement>('[data-flow]'))
          lumps.forEach((el, i) => {
            const secs = Number(el.dataset.flow) || 3
            // Travel exactly one lump-spacing along the run so the stream is
            // seamless, following the belt's slope rather than sliding off it.
            const fx = Number(el.dataset.fx || 60)
            const fy = Number(el.dataset.fy || 0)
            running.push(animate(el, {
              translateX: [0, fx],
              translateY: [0, fy],
              duration: secs * 1000,
              ease: 'linear',
              loop: true,
              delay: (secs * 1000 * i) / Math.max(lumps.length, 1),
            }))
          })
        })

        q('[data-pulse]').forEach((el, i) => {
          running.push(animate(el, {
            opacity: [0.35, 1, 0.35],
            duration: 2200,
            ease: 'inOutSine',
            loop: true,
            delay: i * 320,
          }))
        })
      })
    })

    return () => {
      cancelled = true
      running.forEach(a => { try { a.pause() } catch { /* already gone */ } })
    }
  }, [machine, reduced])

  const Diagram = spec.Diagram

  return (
    <div ref={hostRef} className={`machine-diagram ${className}`}>
      <div className="machine-diagram__backdrop" aria-hidden="true" />

      <svg
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="machine-diagram__svg"
        aria-hidden="true"
      >
        {/* Ground sits outside the measured group so it never drives framing. */}
        <IsoGround />

        <g ref={contentRef}>
        <Diagram />

        {annotations &&
          spec.annotations.map(a => (
            <g className="callout" key={a.label}>
              <circle className="callout__dot" cx={a.at[0]} cy={a.at[1]} r="4" />
              <path
                className="callout__leader"
                d={`M${a.at[0]} ${a.at[1]}L${a.to[0]} ${a.to[1]}`}
              />
              <text
                className="callout__label"
                x={a.to[0] + (a.side === 'left' ? -8 : 8)}
                y={a.to[1] + 4}
                textAnchor={a.side === 'left' ? 'end' : 'start'}
              >
                {a.label}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {hud && (
        <div className="machine-diagram__hud" aria-hidden="true">
          <div className="machine-diagram__hud-top">
            <span className="machine-diagram__code">{spec.code}</span>
            <span className="machine-diagram__name">{spec.name}</span>
          </div>
          <div className="machine-diagram__specs">
            {spec.specs.map(s => (
              <span key={s} className="machine-diagram__chip">{s}</span>
            ))}
          </div>
        </div>
      )}

      <span className="sr-only">
        Technical elevation of a {spec.name} ({spec.specs.join(', ')}).
      </span>
    </div>
  )
}
