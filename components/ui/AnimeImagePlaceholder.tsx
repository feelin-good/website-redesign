'use client'

import { useEffect, useId, useRef } from 'react'

export type AnimeVariant = 'conveyor' | 'scan'

interface Props {
  variant?: AnimeVariant
  className?: string
}

const TRACKS = [
  { y: 100, particleCount: 3, speed: 2200, w: 20, h: 10, opacity: 0.28 },
  { y: 175, particleCount: 4, speed: 3000, w: 28, h: 13, opacity: 0.22 },
  { y: 250, particleCount: 3, speed: 3900, w: 22, h: 11, opacity: 0.18 },
]

export function AnimeImagePlaceholder({ variant = 'conveyor', className = '' }: Props) {
  const uid = useId().replace(/:/g, '')
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const anims: ReturnType<typeof import('animejs')['animate']>[] = []
    let mounted = true

    import('animejs').then(({ animate, stagger }) => {
      if (!mounted || !svg) return

      if (variant === 'conveyor') {
        TRACKS.forEach((track, i) => {
          // Scroll the dashed belt line
          const belt = svg.querySelector<SVGLineElement>(`.belt-${i}`)
          if (belt) {
            anims.push(animate(belt, {
              strokeDashoffset: [0, -48],
              duration: 1000 + i * 300,
              easing: 'linear',
              loop: true,
            }))
          }

          // Move material particles along track
          const particles = svg.querySelectorAll<SVGRectElement>(`.par-${i}`)
          particles.forEach((p, j) => {
            anims.push(animate(p, {
              translateX: [{ to: 900 }],
              duration: track.speed,
              easing: 'linear',
              loop: true,
              delay: (track.speed / track.particleCount) * j,
            }))
          })
        })

        // Pulse corner brackets
        const brackets = svg.querySelectorAll<SVGGElement>('.bracket')
        if (brackets.length) {
          anims.push(animate(brackets, {
            opacity: [0.15, 0.5, 0.15],
            duration: 2800,
            easing: 'easeInOutSine',
            loop: true,
            delay: stagger(700),
          }))
        }

        // Rotate pulleys
        const pulleys = svg.querySelectorAll<SVGCircleElement>('.pulley-inner')
        if (pulleys.length) {
          anims.push(animate(pulleys, {
            rotate: [0, 360],
            duration: 3000,
            easing: 'linear',
            loop: true,
            delay: stagger(400),
          }))
        }

      } else {
        // Scan line sweeping left→right
        const scanLine = svg.querySelector<SVGLineElement>('.scan-line')
        if (scanLine) {
          anims.push(animate(scanLine, {
            x1: [-10, 410],
            x2: [-10, 410],
            duration: 2600,
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'alternate',
          }))
        }

        // Pulsing intersection nodes
        const nodes = svg.querySelectorAll<SVGCircleElement>('.pulse-node')
        if (nodes.length) {
          anims.push(animate(nodes, {
            scale: [1, 1.8, 1],
            opacity: [0.25, 0.75, 0.25],
            duration: 1800,
            easing: 'easeInOutSine',
            loop: true,
            delay: stagger(380),
          }))
        }

        // Grid cell shimmer from center out
        const cells = svg.querySelectorAll<SVGRectElement>('.grid-cell')
        if (cells.length) {
          anims.push(animate(cells, {
            opacity: [0.06, 0.18, 0.06],
            duration: 1400,
            easing: 'easeInOutSine',
            loop: true,
            delay: stagger(70, { grid: [6, 4], from: 'center' }),
          }))
        }
      }
    })

    return () => {
      mounted = false
      anims.forEach(a => { try { a.pause() } catch { /* ignore */ } })
    }
  }, [variant, uid])

  if (variant === 'conveyor') {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 800 360"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${className}`}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${uid}`} width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0L0 0 0 50" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="800" height="360" fill={`url(#grid-${uid})`} />

        {TRACKS.map((track, i) => (
          <g key={i}>
            {/* Support bed */}
            <line x1="65" y1={track.y + 9} x2="735" y2={track.y + 9}
                  stroke="rgba(255,255,255,0.07)" strokeWidth="4" strokeLinecap="round"/>
            {/* Dashed belt */}
            <line className={`belt-${i}`}
                  x1="65" y1={track.y} x2="735" y2={track.y}
                  stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"
                  strokeDasharray="14 8"/>
            {/* Material particles */}
            {Array.from({ length: track.particleCount }, (_, j) => (
              <rect
                key={j}
                className={`par-${i}`}
                x={-100 + (800 / track.particleCount) * j}
                y={track.y - track.h / 2}
                width={track.w}
                height={track.h}
                rx="2.5"
                fill={`rgba(255,255,255,${track.opacity})`}
              />
            ))}
            {/* Tail pulley */}
            <circle cx="65" cy={track.y} r="13"
                    fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5"/>
            <circle className="pulley-inner" cx="65" cy={track.y} r="5"
                    fill="rgba(255,255,255,0.12)"
                    style={{ transformOrigin: `65px ${track.y}px` }}/>
            {/* Head pulley */}
            <circle cx="735" cy={track.y} r="13"
                    fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5"/>
            <circle className="pulley-inner" cx="735" cy={track.y} r="5"
                    fill="rgba(255,255,255,0.12)"
                    style={{ transformOrigin: `735px ${track.y}px` }}/>
          </g>
        ))}

        {/* Corner brackets */}
        {([[24,20],[776,20],[24,340],[776,340]] as [number,number][]).map(([cx,cy],i) => {
          const L = 22, sx = cx < 400 ? 1 : -1, sy = cy < 200 ? 1 : -1
          return (
            <g key={i} className="bracket">
              <line x1={cx} y1={cy} x2={cx + sx*L} y2={cy}
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1={cx} y1={cy} x2={cx} y2={cy + sy*L}
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
          )
        })}

        {/* Label */}
        <text x="400" y="338" textAnchor="middle"
              fill="rgba(255,255,255,0.1)" fontSize="9"
              fontFamily="monospace" letterSpacing="4">
          BELT CONVEYOR SYSTEM — LEPTON PROJECTS
        </text>
      </svg>
    )
  }

  // Scan/grid variant — used in project card image areas
  const COLS = 6, ROWS = 4, CW = 400 / COLS, RH = 176 / ROWS
  const nodePositions: [number,number][] = [
    [CW, RH], [CW*3, RH*2], [CW*5, RH], [CW*2, RH*3], [CW*4, RH*3], [CW*2, RH],
  ]

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 176"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* Grid cells */}
      {Array.from({ length: COLS * ROWS }, (_, k) => {
        const col = k % COLS, row = Math.floor(k / COLS)
        return (
          <rect key={k} className="grid-cell"
                x={col * CW} y={row * RH} width={CW} height={RH}
                fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5"/>
        )
      })}

      {/* Intersection pulse nodes */}
      {nodePositions.map(([x, y], i) => (
        <circle key={i} className="pulse-node"
                cx={x} cy={y} r="3"
                fill="rgba(255,255,255,0.55)"
                style={{ transformOrigin: `${x}px ${y}px` }}/>
      ))}

      {/* Scan line */}
      <line className="scan-line"
            x1="-10" y1="0" x2="-10" y2="176"
            stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>

      {/* Corner marks */}
      {([[8,8],[392,8],[8,168],[392,168]] as [number,number][]).map(([cx,cy],i) => {
        const L = 14, sx = cx < 200 ? 1 : -1, sy = cy < 100 ? 1 : -1
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={cx + sx*L} y2={cy}
                  stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeLinecap="round"/>
            <line x1={cx} y1={cy} x2={cx} y2={cy + sy*L}
                  stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeLinecap="round"/>
          </g>
        )
      })}
    </svg>
  )
}
