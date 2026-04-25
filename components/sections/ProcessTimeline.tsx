'use client'

import { useEffect, useRef } from 'react'
import { loadAnime } from '@/lib/hooks/useAnime'

export function ProcessTimeline() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        loadAnime().then(({ animate }) => {
          animate(line, {
            height: ['0%', '100%'],
            duration: 1800,
            ease: 'inOutSine',
          })
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(line)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={lineRef}
      className="hidden lg:block absolute left-1/2 top-0 w-px
                 bg-gradient-to-b from-transparent via-orange-200 to-transparent"
      style={{ height: '0%' }}
    />
  )
}
