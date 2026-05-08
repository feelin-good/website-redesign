'use client'

import { useEffect, useId, useRef, useState } from 'react'

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
  const [animeLoaded, setAnimeLoaded] = useState(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const anims: any[] = []
    let mounted = true

    import('animejs').then(({ animate, stagger }) => {
      if (!mounted || !svg) return
      setAnimeLoaded(true)

      if (variant === 'conveyor') {
        TRACKS.forEach((track, i) => {
          const belt = svg.querySelector<SVGLineElement>(`.belt-${i}`)
          if (belt) {
            anims.push(animate(belt, {
              strokeDashoffset: [0, -48],
              duration: 1000 + i * 300,
              easing: 'linear',
              loop: true,
            }))
          }

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
        // Scan variant - improved animations
        const scanLine = svg.querySelector<SVGGElement>('.scan-group')
        if (scanLine) {
          anims.push(animate(scanLine, {
            translateX: [-20, 420],
            duration: 2800,
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'alternate',
          }))
        }

        const nodes = svg.querySelectorAll<SVGCircleElement>('.pulse-node')
        if (nodes.length) {
          anims.push(animate(nodes, {
            r: [2, 5, 2],
            opacity: [0.3, 0.9, 0.3],
            duration: 1800,
            easing: 'easeInOutSine',
            loop: true,
            delay: stagger(380),
          }))
        }

        const cells = svg.querySelectorAll<SVGRectElement>('.grid-cell')
        if (cells.length) {
          anims.push(animate(cells, {
            opacity: [0.06, 0.25, 0.06],
            duration: 1400,
            easing: 'easeInOutSine',
            loop: true,
            delay: stagger(70, { grid: [6, 4], from: 'center' }),
          }))
        }

        // Animate connection lines
        const connections = svg.querySelectorAll<SVGLineElement>('.connection')
        if (connections.length) {
          anims.push(animate(connections, {
            opacity: [0.1, 0.4, 0.1],
            duration: 2400,
            easing: 'easeInOutSine',
            loop: true,
            delay: stagger(200),
          }))
        }
      }
    }).catch(() => {
      // Fallback handled by CSS animations below
    })

    return () => {
      mounted = false
      anims.forEach(a => { try { a.pause() } catch { } })
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
            <line x1="65" y1={track.y + 9} x2="735" y2={track.y + 9}
                  stroke="rgba(255,255,255,0.07)" strokeWidth="4" strokeLinecap="round"/>
            <line className={`belt-${i}`}
                  x1="65" y1={track.y} x2="735" y2={track.y}
                  stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"
                  strokeDasharray="14 8"/>
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
            <circle cx="65" cy={track.y} r="13"
                    fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5"/>
            <circle className="pulley-inner" cx="65" cy={track.y} r="5"
                    fill="rgba(255,255,255,0.12)"
                    style={{ transformOrigin: `65px ${track.y}px` }}/>
            <circle cx="735" cy={track.y} r="13"
                    fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5"/>
            <circle className="pulley-inner" cx="735" cy={track.y} r="5"
                    fill="rgba(255,255,255,0.12)"
                    style={{ transformOrigin: `735px ${track.y}px` }}/>
          </g>
        ))}

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
    <>
      <style>{`
        @keyframes scan-fallback-${uid} {
          0%, 100% { transform: translateX(-20px); }
          50% { transform: translateX(420px); }
        }
        @keyframes pulse-fallback-${uid} {
          0%, 100% { opacity: 0.3; r: 2; }
          50% { opacity: 0.9; r: 5; }
        }
        @keyframes cell-fallback-${uid} {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.25; }
        }
      `}</style>
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
            <rect 
              key={k} 
              className="grid-cell"
              x={col * CW} y={row * RH} width={CW} height={RH}
              fill="rgba(255,255,255,0.03)" 
              stroke="rgba(255,255,255,0.09)" 
              strokeWidth="0.5"
              style={!animeLoaded ? {
                animation: `cell-fallback-${uid} 1.4s ease-in-out infinite`,
                animationDelay: `${(col + row) * 80}ms`
              } : undefined}
            />
          )
        })}

        {/* Connection lines */}
        {nodePositions.slice(0, -1).map(([x1, y1], i) => {
          const [x2, y2] = nodePositions[i + 1]
          return (
            <line
              key={`conn-${i}`}
              className="connection"
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
              strokeDasharray="3 4"
            />
          )
        })}

        {/* Intersection pulse nodes */}
        {nodePositions.map(([x, y], i) => (
          <circle 
            key={i} 
            className="pulse-node"
            cx={x} cy={y} r="3"
            fill="rgba(255,255,255,0.55)"
            style={!animeLoaded ? {
              animation: `pulse-fallback-${uid} 1.8s ease-in-out infinite`,
              animationDelay: `${i * 380}ms`
            } : undefined}
          />
        ))}

        {/* Scan line - using a group for translateX animation */}
        <g 
          className="scan-group"
          style={!animeLoaded ? {
            animation: `scan-fallback-${uid} 2.8s ease-in-out infinite alternate`
          } : undefined}
        >
          <line
            x1="0" y1="0" x2="0" y2="176"
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="2"
          />
          <line
            x1="0" y1="0" x2="0" y2="176"
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="6"
          />
        </g>

        {/* Corner marks */}
        {([[8,8],[392,8],[8,168],[392,168]] as [number,number][]).map(([cx,cy],i) => {
          const L = 14, sx = cx < 200 ? 1 : -1, sy = cy < 100 ? 1 : -1
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={cx + sx*L} y2={cy}
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round"/>
              <line x1={cx} y1={cy} x2={cx} y2={cy + sy*L}
                    stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round"/>
            </g>
          )
        })}
      </svg>
    </>
  )
}
