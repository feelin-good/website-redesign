'use client'

import { useEffect, useRef, useId, useState } from 'react'
import { useNetworkSpeed } from '@/hooks/useNetworkSpeed'

export type ProjectAnimationType = 
  | 'conveyor'
  | 'stacker'
  | 'crusher'
  | 'crane'

interface ProjectCardAnimationProps {
  type: ProjectAnimationType
  className?: string
}

const animationStyles = `
  @keyframes rotate-slow-x {
    from { transform: rotateX(0deg); }
    to { transform: rotateX(360deg); }
  }
  @keyframes rotate-slow-y {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
  }
  @keyframes rotate-slow-z {
    from { transform: rotateZ(0deg); }
    to { transform: rotateZ(360deg); }
  }
  @keyframes pulse-theme {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  @keyframes float-subtle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
`

export function ProjectCardAnimation({ type, className = '' }: ProjectCardAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const uid = useId().replace(/:/g, '')
  const speed = useNetworkSpeed()
  const shouldUseAnime = speed === 'fast'
  const [stylesAdded, setStylesAdded] = useState(false)

  // Add CSS animations immediately
  useEffect(() => {
    if (shouldUseAnime || stylesAdded) return

    if (!document.getElementById(`anim-${uid}`)) {
      const style = document.createElement('style')
      style.id = `anim-${uid}`
      style.textContent = animationStyles
      document.head.appendChild(style)
      setStylesAdded(true)
    }
  }, [uid, shouldUseAnime, stylesAdded])

  // Initialize anime.js animations immediately for fast connections
  useEffect(() => {
    if (!shouldUseAnime || !containerRef.current) return

    let anims: any[] = []
    let mounted = true

    import('animejs').then(async ({ animate }) => {
      if (!mounted || !containerRef.current) return

      const container = containerRef.current
      const rotators = container.querySelectorAll<HTMLElement>('[data-rotate]')
      const pulses = container.querySelectorAll<HTMLElement>('[data-pulse]')
      const floaters = container.querySelectorAll<HTMLElement>('[data-float]')

      rotators.forEach((el, i) => {
        const axis = el.dataset.rotate
        const duration = 5000 + i * 1000
        
        const animTarget = axis === 'x' ? { rotateX: 360 } : 
                          axis === 'y' ? { rotateY: 360 } : 
                          { rotateZ: 360 }

        anims.push(animate(el, {
          ...animTarget,
          duration,
          easing: 'linear',
          loop: true,
        }))
      })

      pulses.forEach((el, i) => {
        anims.push(animate(el, {
          opacity: [0.4, 0.8, 0.4],
          duration: 3500 + i * 500,
          easing: 'easeInOutSine',
          loop: true,
        }))
      })

      floaters.forEach((el, i) => {
        anims.push(animate(el, {
          translateY: [0, -10, 0],
          duration: 2500 + i * 400,
          easing: 'easeInOutSine',
          loop: true,
        }))
      })
    }).catch(err => console.error('Failed to load anime.js:', err))

    return () => {
      mounted = false
      anims.forEach(a => { try { a.pause() } catch { } })
    }
  }, [shouldUseAnime])

  const baseClass = `relative w-full h-full [perspective:1000px]`

  if (type === 'conveyor') {
    return (
      <div className={`${baseClass} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {shouldUseAnime ? (
            // Anime.js version - complex multi-element
            <>
              <div data-rotate="y" className="absolute w-full h-16" style={{ transformStyle: 'preserve-3d' }}>
                <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-granite to-transparent"></div>
                <div className="flex justify-between px-8 mt-6 gap-2">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} data-float className="w-4 h-3 bg-granite/60 rounded-sm"></div>
                  ))}
                </div>
              </div>
              <div data-rotate="x" className="absolute w-full h-20 opacity-60" style={{ transformStyle: 'preserve-3d' }}>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-electric-orange/40 to-transparent"></div>
              </div>
              <div data-pulse className="absolute w-12 h-12 rounded-full border-2 border-granite/50" style={{ transformStyle: 'preserve-3d' }}></div>
            </>
          ) : (
            // CSS version - simple
            <>
              <div className="absolute w-full h-16" style={{ animation: 'rotate-slow-y 5s linear infinite', transformStyle: 'preserve-3d' }}>
                <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-granite to-transparent"></div>
              </div>
              <div className="absolute w-12 h-12 rounded-full border-2 border-granite/50" style={{ animation: 'rotate-slow-z 4s linear infinite', transformStyle: 'preserve-3d' }}></div>
            </>
          )}
        </div>
      </div>
    )
  }

  if (type === 'stacker') {
    return (
      <div className={`${baseClass} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {shouldUseAnime ? (
            <>
              <div data-rotate="z" className="absolute w-28 h-2 origin-left" style={{ transformStyle: 'preserve-3d' }}>
                <div className="w-full h-full bg-gradient-to-r from-granite via-granite/70 to-transparent"></div>
              </div>
              {[0, 1, 2].map(i => (
                <div key={i} data-pulse className="absolute w-12 h-12 rounded-full border border-granite/40" style={{ transform: `rotate(${i * 120}deg) translateX(35px)`, transformStyle: 'preserve-3d' }}></div>
              ))}
            </>
          ) : (
            <>
              <div className="absolute w-28 h-2" style={{ animation: 'rotate-slow-z 5s ease-in-out infinite', transformStyle: 'preserve-3d', transformOrigin: 'left' }}>
                <div className="w-full h-full bg-gradient-to-r from-granite to-transparent"></div>
              </div>
              <div className="absolute w-10 h-10 rounded-full border border-granite/40" style={{ animation: 'pulse-theme 3s ease-in-out infinite' }}></div>
            </>
          )}
        </div>
      </div>
    )
  }

  if (type === 'crusher') {
    return (
      <div className={`${baseClass} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {shouldUseAnime ? (
            <>
              <div data-rotate="z" className="w-16 h-16 border-2 border-electric-orange/60 rounded-lg relative" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-electric-orange/40 rounded -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              {[0, 1, 2].map(i => (
                <div key={i} data-float className="w-2 h-2 bg-granite/70 rounded-full"></div>
              ))}
            </>
          ) : (
            <>
              <div className="w-16 h-16 border-2 border-electric-orange/60 rounded-lg" style={{ animation: 'rotate-slow-z 3.5s linear infinite', transformStyle: 'preserve-3d' }}>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-electric-orange/40 rounded -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  if (type === 'crane') {
    return (
      <div className={`${baseClass} ${className}`}>
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
          {shouldUseAnime ? (
            <>
              <div data-rotate="z" className="absolute w-32 h-2 origin-left" style={{ transformStyle: 'preserve-3d' }}>
                <div className="w-full h-full bg-gradient-to-r from-granite to-transparent"></div>
              </div>
              <div data-rotate="x" className="absolute w-10 h-10 rounded border border-granite/50" style={{ transformStyle: 'preserve-3d' }}></div>
            </>
          ) : (
            <>
              <div className="absolute w-32 h-2" style={{ animation: 'rotate-slow-z 5s ease-in-out infinite', transformStyle: 'preserve-3d', transformOrigin: 'left' }}>
                <div className="w-full h-full bg-gradient-to-r from-granite to-transparent"></div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return null
}
