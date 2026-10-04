import Link from 'next/link'
import Image from 'next/image'
import { PROJECTS, QCC_REVISIONS, REPEAT_ORDERS, ROUTE, RULES, WORKS } from '@/lib/lepton'
import { Device } from '@/components/device'
import { Meter, Pix } from '@/components/unit'
import { Register } from '@/components/register'

const FEATURED = [0, 1, 14, 2, 37, 23].map((i) => PROJECTS[i])
const KINDS_PIX = ['receive', 'crush', 'convey', 'store', 'ship'] as const

export default function Home() {
  const max = REPEAT_ORDERS[0][1]
  return (
    <>
      <Device />

      <div className="wrap">
        <section className="section" style={{ marginTop: 56 }} aria-labelledby="line">
          <div className="head">
            <p className="mono mute">01 · the line</p>
            <h2 className="h2" id="line">From the wagon to the ship. <em>Every station.</em></h2>
          </div>
          <div className="cols c5">
            {ROUTE.map((s, k) => (
              <div key={s.id}>
                <Pix kind={KINDS_PIX[k]} />
                <p className="mono" style={{ margin: '14px 0 6px' }}><span style={{ color: 'var(--red-ink)' }}>{s.tt.toLowerCase()}</span> · {s.name.toLowerCase()}</p>
                <ol className="legend" style={{ fontSize: 14 }}>{s.items.map((it) => <li key={it}>{it}</li>)}</ol>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 26 }}><Link className="key navy" href="/solutions">solutions<span className="led" /></Link></p>
        </section>

        <section className="section" aria-labelledby="reg">
          <div className="head">
            <p className="mono mute">02 · register</p>
            <h2 className="h2" id="reg">450 projects. Six on this page.</h2>
          </div>
          <Register projects={FEATURED} filters={false} />
          <p style={{ marginTop: 26 }}><Link className="key navy" href="/register">full register<span className="led" /></Link></p>
        </section>

        <section className="section cols c2" aria-labelledby="rules" style={{ alignItems: 'start' }}>
          <div>
            <p className="mono mute">03 · operating rules</p>
            <h2 className="sr-only" id="rules">Our two rules</h2>
            <p className="h1" style={{ marginTop: 18 }}><span className="mono" style={{ display: 'block', color: 'var(--red-ink)', marginBottom: 6 }}>rule #1</span>{RULES[0]}</p>
            <p className="h1" style={{ marginTop: 26 }}><span className="mono" style={{ display: 'block', color: 'var(--red-ink)', marginBottom: 6 }}>rule #2</span>{RULES[1]}</p>
          </div>
          <div>
            <p className="mono mute" style={{ marginBottom: 12 }}>repeat orders · per client</p>
            {REPEAT_ORDERS.slice(0, 12).map(([name, v]) => <Meter key={name} label={name} value={v} max={max} />)}
          </div>
        </section>

        <section className="section cols c2" aria-labelledby="qcc" style={{ alignItems: 'start' }}>
          <div>
            <p className="mono mute">04 · event log · qassim cement, saudi arabia</p>
            <h2 className="h2" id="qcc" style={{ margin: '14px 0 22px' }}>It fell in September. <em>It ran again in 24 days.</em></h2>
            <Link className="key" href="/hitechaudit">hitechaudit®<span className="led" /></Link>
          </div>
          <ol className="log" aria-label="QCC stacker event log">
            {QCC_REVISIONS.map((r) => (
              <li key={r.rev}><time>{r.date.toLowerCase()}</time><span className={r.mark ? 'hot' : undefined}>{r.text.toLowerCase()}</span></li>
            ))}
            <li><time>now</time><span className="cursor">running at 2200 tph </span></li>
          </ol>
        </section>

        <section className="section" aria-labelledby="works">
          <div className="head">
            <p className="mono mute">05 · works</p>
            <h2 className="h2" id="works">Made in our own factories at Alwar.</h2>
          </div>
          <div className="cols c2">
            {WORKS.filter((w) => w.photo).map((w) => (
              <figure key={w.name}>
                <div className="shot" style={{ aspectRatio: '4 / 3' }}>
                  <Image src={w.photo} alt={`${w.name}: inside the factory`} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  <span className="tag mono">{w.name.toLowerCase()}</span>
                </div>
                <figcaption className="read" style={{ marginTop: 14 }}>
                  <b>{w.area.replace(' sq ft', '')}<span className="mono"> sq ft</span></b>
                  <p>{w.makes}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
