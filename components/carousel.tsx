'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export interface Slide {
  src: string
  alt: string
  title: string
  where: string
  date: string
  dim?: { label: string; left: string; right: string; top: string }
  callout: string[]
}

const HOLD = 6500 // ms per plate

/**
 * The hero's plate file: project photographs shown one plate at a time. Each plate pushes in
 * slowly, re-plots its dimension line and callout, and a scale bar fills toward the next one.
 * Pauses on hover/focus; never auto-advances under prefers-reduced-motion.
 */
export function PlateCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const n = slides.length
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const vis = () => setPaused((p) => (document.hidden ? true : p))
    document.addEventListener('visibilitychange', vis)
    return () => document.removeEventListener('visibilitychange', vis)
  }, [])

  const auto = !paused && !reduced
  useEffect(() => {
    if (!auto) return
    timer.current = setTimeout(() => go(i + 1), HOLD)
    return () => clearTimeout(timer.current)
  }, [i, auto, go])

  const s = slides[i]
  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label="Project plates"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false) }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(i + 1)
        if (e.key === 'ArrowLeft') go(i - 1)
      }}
      style={{ ['--hold' as string]: `${HOLD}ms` }}
    >
      <div className="frame" aria-live={auto ? 'off' : 'polite'}>
        {slides.map((sl, k) => (
          <div
            key={sl.src}
            className={`slide${k === i ? ' on' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${n}: ${sl.title}`}
            aria-hidden={k !== i}
          >
            <Image src={sl.src} alt={sl.alt} fill sizes="(max-width: 900px) 100vw, 60vw" priority={k === 0} loading={k === 0 ? undefined : 'eager'} />
          </div>
        ))}
        {/* keyed by index so the plotter animations replay on every plate */}
        <div key={i} className="overlay" aria-hidden>
          {s.dim && <div className="dim" style={{ left: s.dim.left, right: s.dim.right, top: s.dim.top }}><span>{s.dim.label}</span></div>}
          <div className="callout" style={{ right: '5%', bottom: '9%' }}>{s.callout.map((l) => <div key={l}>{l}</div>)}</div>
        </div>
      </div>

      <div className="plate-bar">
        <p className="ref cap">
          <b>Plate {String(i + 1).padStart(2, '0')}</b> · {s.title} · {s.where}
        </p>
        <span className="ref">{s.date}</span>
      </div>
      <div className="scale">
        <button type="button" onClick={() => go(i - 1)} aria-label="Previous plate">←</button>
        <ol>
          {slides.map((sl, k) => (
            <li key={sl.src}>
              <button
                type="button"
                aria-label={`Plate ${k + 1}: ${sl.title}`}
                aria-current={k === i ? 'true' : undefined}
                onClick={() => go(k)}
              >
                <i className={k < i ? 'done' : k === i ? (auto ? 'run' : 'done') : ''} key={k === i ? `r${i}` : k} />
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => go(i + 1)} aria-label="Next plate">→</button>
        <span className="ref count">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
