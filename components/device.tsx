'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PLATES, TITLE_BLOCK } from '@/lib/lepton'

const HOLD = 6500
const STEP = 360 / PLATES.length // knob detent per plate

/** Count up the LCD readout like a meter settling. */
function useRoll(target: string, run: boolean) {
  const [shown, setShown] = useState(target)
  useEffect(() => {
    const end = parseFloat(target)
    if (!run || Number.isNaN(end)) { setShown(target); return }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 700)
      const e = 1 - Math.pow(1 - k, 3)
      setShown(String(Math.round(end * e)))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run])
  return shown
}

/**
 * The home page instrument. The knob is a real control: drag it, scroll on it, or use the arrow
 * keys, and it clicks through the project plates on the screen. Auto-advances unless the visitor
 * is interacting or prefers reduced motion.
 */
export function Device() {
  const [i, setI] = useState(0)
  const [turns, setTurns] = useState(0) // cumulative detents, so the knob never spins backwards
  const [hold, setHold] = useState(false)
  const [reduced, setReduced] = useState(false)
  const drag = useRef<{ a: number; acc: number } | null>(null)
  const knob = useRef<HTMLButtonElement>(null)
  const n = PLATES.length

  const step = useCallback((d: number) => {
    setTurns((t) => t + d)
    setI((v) => (((v + d) % n) + n) % n)
  }, [n])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  useEffect(() => {
    if (hold || reduced) return
    const t = setTimeout(() => step(1), HOLD)
    return () => clearTimeout(t)
  }, [i, hold, reduced, step])

  const angle = (e: PointerEvent | React.PointerEvent) => {
    const r = knob.current!.getBoundingClientRect()
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI
  }

  // Only mount plates that are showing or next up; keep them once loaded so revisits are instant.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1]))
  useEffect(() => {
    setSeen((s) => (s.has(i) && s.has((i + 1) % n) ? s : new Set(Array.from(s).concat([i, (i + 1) % n]))))
  }, [i, n])

  const p = PLATES[i]
  const rolled = useRoll(p.value, !reduced)

  return (
    <section className="device" aria-label="Lepton field unit" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="screen">
        <div className="ph">
          {PLATES.map((pl, k) => (
            <div key={pl.src} className={k === i ? 'on' : undefined} aria-hidden={k !== i}>
              {seen.has(k) && <Image src={pl.src} alt={pl.alt} fill sizes="(max-width: 1000px) 100vw, 64vw" priority={k === 0} />}
            </div>
          ))}
        </div>
        <div className="hud mono" aria-live={hold ? 'polite' : 'off'}>
          <div className="row"><span>plate {String(i + 1).padStart(2, '0')}/{String(n).padStart(2, '0')} · {p.where}</span><span className="rec">{p.date}</span></div>
          <div>
            <div className="readout" aria-label={`${p.value} ${p.unit}`}>{rolled}<small>{p.unit}</small></div>
            <div className="notes" style={{ marginTop: 8 }}>{p.title} · {p.notes.join(' · ')}</div>
          </div>
        </div>
      </div>

      <div className="side">
        <p className="mono mute">lepton projects · field unit lp-08 · since 2008</p>
        <h1 className="h1">Built to move <em>bulk.</em></h1>
        <p>Stackers, reclaimers, feeders and conveyors for cement, power, steel, ports and mines. Engineered, made in our own works, and kept running.</p>
        <div className="dial">
          <button
            ref={knob}
            className="knob"
            role="slider"
            aria-label="Project plate"
            aria-valuemin={1}
            aria-valuemax={n}
            aria-valuenow={i + 1}
            aria-valuetext={`${i + 1} of ${n}: ${p.title}`}
            style={{ transform: `rotate(${turns * STEP}deg)` }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); step(1) }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); step(-1) }
            }}
            onFocus={() => setHold(true)}
            onBlur={() => setHold(false)}
            onWheel={(e) => step(e.deltaY > 0 ? 1 : -1)}
            onPointerDown={(e) => { knob.current!.setPointerCapture(e.pointerId); drag.current = { a: angle(e), acc: 0 }; setHold(true) }}
            onPointerMove={(e) => {
              if (!drag.current) return
              const a = angle(e)
              let d = a - drag.current.a
              if (d > 180) d -= 360
              if (d < -180) d += 360
              drag.current.a = a
              drag.current.acc += d
              if (Math.abs(drag.current.acc) >= STEP) { step(Math.sign(drag.current.acc)); drag.current.acc = 0 }
            }}
            onPointerUp={() => { drag.current = null }}
          />
          <div>
            <p className="mono mute" style={{ marginBottom: 8 }}>turn to browse projects</p>
            <ol className="ticks" aria-hidden>{PLATES.map((pl, k) => <li key={pl.src} className={k === i ? 'on' : undefined} />)}</ol>
          </div>
        </div>
        <div className="keys">
          <Link className="key red" href="/contact">send ga<span className="led" /></Link>
          <Link className="key navy" href="/register">register<span className="led" /></Link>
          <Link className="key" href="/hitechaudit">audit<span className="led" /></Link>
          <Link className="key black" href="/company">works<span className="led" /></Link>
        </div>
      </div>

      <div className="strip mono">
        {TITLE_BLOCK.map((t) => <div key={t.label}><b>{t.value}</b>{t.label.toLowerCase()}</div>)}
      </div>
    </section>
  )
}
