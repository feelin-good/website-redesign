'use client'

import { useEffect, useRef, useId } from 'react'
import { useInView } from 'react-intersection-observer'

export type ServiceAnimationType = 
  | 'belt-conveyor-systems'
  | 'stacker-reclaimer-systems'
  | 'coal-fuel-handling-plants'
  | 'wagon-tipplers-material-handling'
  | 'aggregate-crushing-screening'
  | 'dust-management-systems'

interface Card3DAnimationProps {
  type: ServiceAnimationType
  className?: string
}

const animationStyles = `
  @keyframes rotate-x {
    from { transform: rotateX(0deg); }
    to { transform: rotateX(360deg); }
  }
  @keyframes rotate-y {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
  }
  @keyframes rotate-z {
    from { transform: rotateZ(0deg); }
    to { transform: rotateZ(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse-scale {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.15); opacity: 1; }
  }
  @keyframes swirl {
    from { transform: rotate(0deg) translateX(32px); }
    to { transform: rotate(360deg) translateX(32px); }
  }
`

export function Card3DAnimation({ type, className = '' }: Card3DAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const uid = useId().replace(/:/g, '')
  const { ref: inViewRef, inView } = useInView({ triggerOnce: false, threshold: 0.1 })

  useEffect(() => {
    const container = containerRef.current
    if (!container || !inView) return

    // Add animation styles to head if not already present
    if (!document.getElementById(`anim-${uid}`)) {
      const style = document.createElement('style')
      style.id = `anim-${uid}`
      style.textContent = animationStyles
      document.head.appendChild(style)
    }
  }, [inView, uid])

  const baseStyle = `relative w-full h-full [perspective:1000px]`

  if (type === 'belt-conveyor-systems') {
    return (
      <div ref={inViewRef} className={`${baseStyle} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {/* Track 1 - Rotate X */}
          <div 
            className="absolute w-[120%] h-20 opacity-80"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-x 3s linear infinite' : 'none',
            }}
          >
            <div className="w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full blur-sm"></div>
            <div className="flex justify-between px-6 mt-4 gap-2">
              {[0, 1, 2].map(i => (
                <div 
                  key={i} 
                  className="w-8 h-6 bg-blue-300/70 rounded-sm"
                  style={{
                    animation: inView ? `float 2s ease-in-out ${i * 0.2}s infinite` : 'none',
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Track 2 - Rotate Y */}
          <div 
            className="absolute w-[100%] h-20 opacity-70 translate-y-12"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-y 3.5s linear infinite' : 'none',
            }}
          >
            <div className="w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-sm"></div>
            <div className="flex justify-between px-6 mt-4 gap-2">
              {[0, 1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className="w-6 h-5 bg-cyan-300/70 rounded-sm"
                  style={{
                    animation: inView ? `float 2s ease-in-out ${i * 0.15}s infinite` : 'none',
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Pulley */}
          <div 
            className="absolute w-16 h-16 rounded-full border-2 border-blue-400/80 -translate-y-8"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-z 3s linear infinite' : 'none',
            }}
          >
            <div className="absolute inset-2 rounded-full border border-blue-300/60"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'stacker-reclaimer-systems') {
    return (
      <div ref={inViewRef} className={`${baseStyle} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {/* Main rotating arm */}
          <div 
            className="absolute w-32 h-2 origin-left"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-z 4s ease-in-out infinite' : 'none',
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
          </div>

          {/* Circular stockpile sections */}
          {[0, 1, 2].map(i => (
            <div 
              key={i} 
              className="absolute w-16 h-16 rounded-full border-2 border-purple-400/70"
              style={{
                transform: `rotate(${i * 120}deg) translateX(40px)`,
                transformStyle: 'preserve-3d',
                animation: inView ? `pulse-scale 2.4s ease-in-out ${i * 0.2}s infinite` : 'none',
              }}
            >
              <div className="absolute inset-1 rounded-full bg-purple-300/30"></div>
            </div>
          ))}

          {/* Center pivot */}
          <div 
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-900"
            style={{
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
            }}
          ></div>
        </div>
      </div>
    )
  }

  if (type === 'coal-fuel-handling-plants') {
    return (
      <div ref={inViewRef} className={`${baseStyle} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {/* Input hopper */}
          <div 
            className="w-20 h-16 bg-gradient-to-b from-gray-600 to-gray-800"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)',
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-y 3.5s linear infinite' : 'none',
            }}
          ></div>

          {/* Falling particles */}
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="w-3 h-3 rounded-full bg-gray-700 opacity-70"
              style={{
                animation: inView ? `float 2s ease-in-out ${i * 0.2}s infinite` : 'none',
              }}
            ></div>
          ))}

          {/* Storage bunker */}
          <div 
            className="w-24 h-20 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg opacity-80 border-2 border-gray-400/50"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-z 4s ease-in-out infinite' : 'none',
            }}
          >
            <div className="absolute bottom-0 w-full h-1 bg-gray-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'wagon-tipplers-material-handling') {
    return (
      <div ref={inViewRef} className={`${baseStyle} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {/* Wagon body */}
          <div 
            className="w-20 h-12 bg-gradient-to-br from-amber-600 to-amber-900 rounded-lg relative"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-x 4s ease-in-out infinite' : 'none',
            }}
          >
            <div className="absolute -bottom-2 left-2 w-4 h-4 rounded-full bg-gray-800"></div>
            <div className="absolute -bottom-2 right-2 w-4 h-4 rounded-full bg-gray-800"></div>
            <div className="absolute inset-2 bg-gray-700/70 rounded-sm opacity-60"></div>
          </div>

          {/* Tippler crane arm */}
          <div 
            className="absolute w-32 h-2 origin-left -translate-x-16"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-z 4.5s ease-in-out infinite' : 'none',
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
          </div>

          {/* Rotating frame indicator */}
          <div 
            className="absolute w-24 h-2 border-t-2 border-orange-400 opacity-70"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-z 4s linear infinite' : 'none',
            }}
          ></div>
        </div>
      </div>
    )
  }

  if (type === 'aggregate-crushing-screening') {
    return (
      <div ref={inViewRef} className={`${baseStyle} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          {/* Primary crusher - rotating */}
          <div 
            className="w-20 h-20 border-4 border-red-500/80 rounded-lg relative"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-z 3.5s linear infinite' : 'none',
            }}
          >
            <div className="absolute inset-2 bg-red-500/20 rounded-md"></div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-red-600 rounded-sm -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Material particles */}
          {[0, 1, 2, 3].map(i => (
            <div 
              key={i} 
              className="w-2.5 h-2.5 bg-yellow-600 rounded-full opacity-70"
              style={{
                animation: inView ? `float 2s ease-in-out ${i * 0.15}s infinite` : 'none',
              }}
            ></div>
          ))}

          {/* Vibrating screen */}
          <div 
            className="w-24 h-4 border-2 border-amber-500 rounded-sm"
            style={{
              transformStyle: 'preserve-3d',
              animation: inView ? 'rotate-z 4s ease-in-out infinite' : 'none',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-transparent"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'dust-management-systems') {
    return (
      <div ref={inViewRef} className={`${baseStyle} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {/* Central collector chamber */}
          <div className="absolute w-16 h-24 bg-gradient-to-b from-teal-500/40 to-teal-600/60 rounded-lg border border-teal-400"
               style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-2 flex flex-col gap-1">
              {[0, 1, 2].map(i => (
                <div 
                  key={i} 
                  className="flex-1 bg-teal-400/50 rounded-sm"
                  style={{
                    animation: inView ? `pulse-scale 1.8s ease-in-out ${i * 0.2}s infinite` : 'none',
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Dust particles swirling - multiple layers */}
          {[0, 1, 2].map(layer => (
            <div 
              key={layer} 
              className="absolute w-28 h-28 rounded-full opacity-40"
              style={{
                border: `2px dashed rgba(34, 197, 194, ${0.3 + layer * 0.2})`,
                transformStyle: 'preserve-3d',
                animation: inView ? `rotate-${layer === 0 ? 'z' : layer === 1 ? 'x' : 'y'} ${3 + layer}s linear infinite` : 'none',
              }}
            ></div>
          ))}

          {/* Particle dots */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div 
              key={i} 
              className="absolute w-1.5 h-1.5 bg-teal-300 rounded-full opacity-60"
              style={{
                transform: `rotate(${i * 60}deg) translateX(32px)`,
                animation: inView ? `swirl ${3.5 + i * 0.1}s linear infinite` : 'none',
              }}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
