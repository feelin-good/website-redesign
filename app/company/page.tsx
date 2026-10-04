import type { Metadata } from 'next'
import Image from 'next/image'
import { COMPANY, PARTNERS, PAST_PARTNERS, TEAM, TIMELINE, WORKS } from '@/lib/lepton'
import { Plate } from '@/components/drawing'
import { Zone } from '@/components/sheet'

export const metadata: Metadata = { title: 'Company', description: 'Lepton Projects since 2008: our works at Chopanki and Kherani, our people, our partners.' }

export default function Company() {
  return (
    <>
      <section className="hero" aria-labelledby="h">
        <div className="copy">
          <p className="ref">DWG LP-004 · Company · Sheet 04 of 05</p>
          <h1 className="display sm" id="h">Engineers who <em>own a factory.</em></h1>
          <p className="lede">{COMPANY.summary} Offices in Gurugram, Ghaziabad and Kolkata; two factories of our own at Alwar, with a third under construction.</p>
        </div>
        <div className="plate-wrap">
          <Plate priority src="/photos/paradeep-apron-feeder.jpg" alt="An apron feeder with Lepton's logo on its frame, test-assembled in the Chopanki works" plate="Plate 06" caption="Apron feeder for Paradeep Port · test assembly at Chopanki" date="2017" ratio="16 / 10" />
        </div>
      </section>

      <Zone zref="A" title="Revisions · 2008 → 2026" id="timeline">
        <table className="revs">
          <thead><tr><th>Rev</th><th>Year</th><th>Description</th></tr></thead>
          <tbody>
            {TIMELINE.map((t, i) => (
              <tr key={t.year} className={i === TIMELINE.length - 1 ? 'mark' : undefined}>
                <td><span className="tri">{String.fromCharCode(65 + i)}</span></td><td>{t.year}</td><td>{t.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Zone>

      <section className="works" aria-label="Our works">
        {WORKS.filter((w) => w.photo).map((w) => (
          <figure key={w.name}>
            <Image src={w.photo} alt={`${w.name}: inside the factory`} width={1024} height={768} sizes="(max-width: 900px) 100vw, 50vw" />
            <figcaption>
              <span className="ref"><b>{w.name}</b></span>
              <p className="area">{w.area}</p>
              <p>{w.makes}</p>
              <p className="ref" style={{ marginTop: 8 }}>{w.place}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <Zone zref="B" title="Strength · by department" id="team" flush>
        <div className="fields c5">
          {TEAM.map((t) => <div key={t.dept}><span className="ref">{t.dept}</span><strong>{t.n}</strong></div>)}
          <div><span className="ref">Factory 3</span><strong>2026</strong><p>MET Jhajjar, Haryana, under construction</p></div>
        </div>
      </Zone>

      <Zone zref="C" title="Collaborations" id="partners">
        <table className="register">
          <thead><tr><th>Partner</th><th>Scope</th></tr></thead>
          <tbody>
            {PARTNERS.map((p) => (
              <tr key={p.name}><td className="rating" style={{ width: 220 }}>{p.name}<div className="client" style={{ fontFamily: 'var(--f-sans)' }}>{p.where}</div></td><td>{p.what}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="ref" style={{ marginTop: 14 }}>Earlier work alongside {PAST_PARTNERS}</p>
      </Zone>
    </>
  )
}
