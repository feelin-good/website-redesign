import type { Metadata } from 'next'
import Link from 'next/link'
import { ACHIEVEMENTS, SERVICES } from '@/lib/lepton'
import { RouteSchematic, Plate } from '@/components/drawing'
import { Zone } from '@/components/sheet'

export const metadata: Metadata = { title: 'Solutions', description: 'Turnkey bulk material handling, products, engineering, EPCM, pre-bid engineering and upgradation.' }

export default function Solutions() {
  return (
    <>
      <section className="hero" aria-labelledby="h">
        <div className="copy">
          <p className="ref">DWG LP-001 · Solutions · Sheet 01 of 05</p>
          <h1 className="display sm" id="h">Machines, systems, <em>and the drawings behind them.</em></h1>
          <p className="lede">Three ways to work with us: as a turnkey EPC supplier, as your engineer under EPCM, or as the team that brings a tired machine back to its rated capacity.</p>
        </div>
        <div className="plate-wrap">
          <Plate priority src="/photos/himachal-circular-stockyard.jpg" alt="Circular stacker and reclaimer under a dome at Jaypee Himachal Cement" plate="Plate 03" caption="Circular stockyard · Jaypee Himachal Cement · erection & commissioning" date="Apr 2010" ratio="16 / 11" />
        </div>
      </section>

      <Zone zref="A–A" title="Products along the route" id="route">
        <h2 className="h2" style={{ marginBottom: 24 }}>Everything between the wagon and the ship.</h2>
        <RouteSchematic />
      </Zone>

      <Zone zref="B" title="Rating · what we have delivered" id="record" flush>
        <div className="fields c4">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.unit}><span className="ref">{a.unit}</span><strong>{a.value}</strong><p>{a.note}</p></div>
          ))}
        </div>
      </Zone>

      <Zone zref="C" title="Services · five sheets" id="services" flush>
        <div className="sheets">
          {SERVICES.map((s) => (
            <section key={s.code} aria-labelledby={`s-${s.code}`}>
              <span className="code">{s.code}</span>
              <h3 className="h3" id={`s-${s.code}`} style={{ marginTop: 12 }}>{s.name}</h3>
              <ol>{s.lines.map((l) => <li key={l}>{l}</li>)}</ol>
            </section>
          ))}
          <section aria-label="Start a project">
            <span className="code">→</span>
            <h3 className="h3" style={{ marginTop: 12 }}>Tender on your desk?</h3>
            <p className="prose" style={{ margin: '14px 0 20px' }}>Send the GA, the flow diagram or just the material and the tonnage. We will tell you what it needs.</p>
            <Link className="stamp" href="/contact">Send us your GA →</Link>
          </section>
        </div>
      </Zone>
    </>
  )
}
