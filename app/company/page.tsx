import type { Metadata } from 'next'
import Image from 'next/image'
import { COMPANY, PARTNERS, PAST_PARTNERS, TEAM, TIMELINE, WORKS } from '@/lib/lepton'

export const metadata: Metadata = { title: 'Company', description: 'Lepton Projects since 2008: our works at Chopanki and Kherani, our people, our partners.' }

export default function Company() {
  return (
    <div className="wrap">
      <section className="chapter" aria-labelledby="h">
        <div className="num" aria-hidden>0<span>4</span></div>
        <div className="txt">
          <p className="mono mute">chapter 04 · company</p>
          <h1 className="h1" id="h">Engineers who <em>own a factory.</em></h1>
          <p className="lede">{COMPANY.summary} Offices in Gurugram, Ghaziabad and Kolkata; two factories of our own at Alwar, with a third under construction.</p>
        </div>
      </section>

      <figure className="shot" style={{ aspectRatio: '21 / 9' }}>
        <Image src="/photos/paradeep-apron-feeder.jpg" alt="An apron feeder with Lepton's logo on its frame, test-assembled in the Chopanki works" fill priority sizes="100vw" />
        <figcaption className="tag mono">apron feeder for paradeep port · test assembly at chopanki · 2017</figcaption>
      </figure>

      <section className="section cols c2" style={{ marginTop: 48, alignItems: 'start' }} aria-labelledby="tl">
        <div><p className="mono mute">04.1 · log</p><h2 className="h2" id="tl" style={{ marginTop: 14 }}>2008 → 2026.</h2></div>
        <ol className="log">
          {TIMELINE.map((t, i) => <li key={t.year}><time>{t.year}</time><span className={i === TIMELINE.length - 1 ? 'hot' : undefined}>{t.text.toLowerCase()}</span></li>)}
        </ol>
      </section>

      <section className="section" aria-labelledby="wk">
        <div className="head"><p className="mono mute">04.2 · works</p><h2 className="h2" id="wk">Three factories.</h2></div>
        <div className="cols c3">
          {WORKS.map((w) => (
            <figure key={w.name}>
              <div className={w.photo ? 'shot' : 'grille'} style={{ aspectRatio: '4 / 3', position: 'relative' }}>
                {w.photo && <Image src={w.photo} alt={`${w.name}: inside the factory`} fill sizes="(max-width: 700px) 100vw, 33vw" />}
                <span className="tag mono" style={{ position: 'absolute', left: 12, bottom: 12, background: 'var(--white)', borderRadius: 8, padding: '6px 10px' }}>{w.name.toLowerCase()}</span>
              </div>
              <figcaption className="read" style={{ marginTop: 14 }}>
                <b>{w.area.endsWith('sq ft') ? <>{w.area.replace(' sq ft', '')}<span className="mono"> sq ft</span></> : <span style={{ fontSize: '0.5em' }}>{w.area.toLowerCase()}</span>}</b>
                {w.makes && <p>{w.makes}</p>}
                <p className="mono">{w.place.toLowerCase()}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="tm">
        <div className="head"><p className="mono mute">04.3 · strength by department</p><h2 className="h2" id="tm">The people.</h2></div>
        <div className="cols c4">{TEAM.map((t) => <div className="read" key={t.dept}><b>{t.n}</b><p className="mono">{t.dept.toLowerCase()}</p></div>)}</div>
      </section>

      <section className="section" aria-labelledby="pt">
        <div className="head"><p className="mono mute">04.4 · collaborations</p><h2 className="h2" id="pt">Built with.</h2></div>
        <ol className="legend" style={{ fontSize: 17 }}>
          {PARTNERS.map((p) => <li key={p.name}><span><b>{p.name}</b>{p.where ? `, ${p.where}` : ''} <span className="mute">· {p.what}</span></span></li>)}
        </ol>
        <p className="mono mute" style={{ marginTop: 14 }}>earlier work alongside {PAST_PARTNERS.toLowerCase()}</p>
      </section>
    </div>
  )
}
