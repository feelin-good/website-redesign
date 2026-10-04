import type { Metadata } from 'next'
import { COMPANY, OFFICES, WORKS } from '@/lib/lepton'
import { Transmittal } from './transmittal'

export const metadata: Metadata = { title: 'Contact', description: 'Send Lepton Projects your GA, tender or problem machine.' }

export default function Contact() {
  return (
    <div className="wrap">
      <section className="chapter" aria-labelledby="h">
        <div className="num" aria-hidden>0<span>5</span></div>
        <div className="txt">
          <p className="mono mute">chapter 05 · contact</p>
          <h1 className="h1" id="h">Send us <em>the drawing.</em></h1>
          <p className="lede">A GA, a flow diagram, a tender, or a machine that won&apos;t reach its rating. Tell us the material and the tonnage and we&apos;ll take it from there.</p>
        </div>
      </section>

      <section className="cols c2" style={{ gap: 48, alignItems: 'start' }} aria-label="Enquiry and addresses">
        <Transmittal email={COMPANY.email} />
        <div>
          <p className="mono mute" style={{ marginBottom: 8 }}>offices</p>
          <ol className="legend">{OFFICES.map((o) => <li key={o.name}><span><b>{o.name}</b><br /><span className="mute">{o.lines.join(', ')}</span></span></li>)}</ol>
          <p className="mono mute" style={{ margin: '26px 0 8px' }}>works</p>
          <ol className="legend">{WORKS.map((w) => <li key={w.name}><span><b>{w.name.split(' · ')[1]}</b> · {w.area.toLowerCase()}<br /><span className="mute">{w.place}</span></span></li>)}</ol>
        </div>
      </section>
    </div>
  )
}
