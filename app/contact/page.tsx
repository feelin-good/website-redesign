import type { Metadata } from 'next'
import { COMPANY, OFFICES, WORKS } from '@/lib/lepton'
import { Zone } from '@/components/sheet'
import { Transmittal } from './transmittal'

export const metadata: Metadata = { title: 'Contact', description: 'Send Lepton Projects your GA, tender or problem machine.' }

export default function Contact() {
  return (
    <>
      <section style={{ padding: 'clamp(28px, 4vw, 56px) var(--gutter)', borderBottom: 'var(--rule)' }} aria-labelledby="h">
        <p className="ref">DWG LP-005 · Transmittal · Sheet 05 of 05</p>
        <h1 className="display" id="h" style={{ margin: '14px 0 18px' }}>Send us <em>the drawing.</em></h1>
        <p className="lede">A GA, a flow diagram, a tender, or a machine that won&apos;t reach its rating. Tell us the material and the tonnage and we&apos;ll take it from there.</p>
      </section>

      <Zone zref="A" title="Document transmittal" id="form" flush>
        <Transmittal email={COMPANY.email} />
      </Zone>

      <Zone zref="B" title="Offices & works" id="where" flush>
        <div className="fields c3">
          {OFFICES.map((o) => (
            <div key={o.name}><span className="ref">Office</span><strong>{o.name}</strong>{o.lines.map((l) => <p key={l}>{l}</p>)}</div>
          ))}
          {WORKS.map((w) => (
            <div key={w.name}><span className="ref">Works</span><strong>{w.name.split(' · ')[1]}</strong><p>{w.place}</p><p>{w.area}</p></div>
          ))}
        </div>
      </Zone>
    </>
  )
}
