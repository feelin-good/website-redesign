import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ACHIEVEMENTS, ROUTE, SERVICES } from '@/lib/lepton'
import { Pix } from '@/components/unit'

export const metadata: Metadata = { title: 'Solutions', description: 'Turnkey bulk material handling, products, engineering, EPCM, pre-bid engineering and upgradation.' }

const KINDS_PIX = ['receive', 'crush', 'convey', 'store', 'ship'] as const

export default function Solutions() {
  return (
    <div className="wrap">
      <section className="chapter" aria-labelledby="h">
        <div className="num" aria-hidden>0<span>1</span></div>
        <div className="txt">
          <p className="mono mute">chapter 01 · solutions</p>
          <h1 className="h1" id="h">Machines, systems, <em>and the drawings behind them.</em></h1>
          <p className="lede">Three ways to work with us: as a turnkey EPC supplier, as your engineer under EPCM, or as the team that brings a tired machine back to its rated capacity.</p>
        </div>
      </section>

      <figure className="shot" style={{ aspectRatio: '21 / 9' }}>
        <Image src="/photos/himachal-circular-stockyard.jpg" alt="Circular stockyard dome and conveyor galleries in the hills at Jaypee Himachal Cement" fill priority sizes="100vw" />
        <figcaption className="tag mono">coal & limestone circular stockyard · jaypee himachal · 2010</figcaption>
      </figure>

      <section className="section" style={{ marginTop: 48 }} aria-labelledby="line">
        <div className="head"><p className="mono mute">01.1 · products along the line</p><h2 className="h2" id="line">Everything between the wagon and the ship.</h2></div>
        <div className="cols c5">
          {ROUTE.map((s, k) => (
            <div key={s.id}>
              <Pix kind={KINDS_PIX[k]} />
              <p className="mono" style={{ margin: '14px 0 6px' }}><span style={{ color: 'var(--red-ink)' }}>{s.tt.toLowerCase()}</span> · {s.name.toLowerCase()}</p>
              <ol className="legend" style={{ fontSize: 14 }}>{s.items.map((it) => <li key={it}>{it}</li>)}</ol>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="spec">
        <div className="head"><p className="mono mute">01.2 · specifications delivered</p><h2 className="h2" id="spec">The numbers so far.</h2></div>
        <div className="cols c4">
          {ACHIEVEMENTS.map((a) => (
            <div className="read" key={a.unit}><b>{a.value}</b><p className="mono" style={{ color: 'var(--ink)' }}>{a.unit}</p><p>{a.note}</p></div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="svc">
        <div className="head"><p className="mono mute">01.3 · services</p><h2 className="h2" id="svc">Five ways in.</h2></div>
        <div className="cols c2" style={{ gap: '36px 48px' }}>
          {SERVICES.map((s) => (
            <section key={s.code} aria-labelledby={`s-${s.code}`}>
              <p className="mono"><span className="key black" style={{ minHeight: 0, minWidth: 0, padding: '4px 8px', marginRight: 10 }}>{s.code.toLowerCase()}</span></p>
              <h3 id={`s-${s.code}`} style={{ font: '700 22px/1.2 var(--f-word)', letterSpacing: '-0.02em', margin: '14px 0 8px' }}>{s.name}</h3>
              <ol className="legend" style={{ fontSize: 15 }}>{s.lines.map((l) => <li key={l}>{l}</li>)}</ol>
            </section>
          ))}
          <section aria-label="Start a project" className="grille" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', justifyContent: 'flex-end', minHeight: 240 }}>
            <p style={{ background: 'var(--white)', padding: '10px 14px', borderRadius: 10, maxWidth: '32ch' }}>Tender on your desk? Send the GA, the flow diagram, or just the material and the tonnage.</p>
            <Link className="key red" href="/contact">send ga<span className="led" /></Link>
          </section>
        </div>
      </section>
    </div>
  )
}
