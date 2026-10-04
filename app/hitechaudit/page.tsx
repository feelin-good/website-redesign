import type { Metadata } from 'next'
import Link from 'next/link'
import { AUDIT_BENEFITS, PROJECTS, QCC_REVISIONS } from '@/lib/lepton'
import { Plate } from '@/components/drawing'
import { Zone } from '@/components/sheet'
import { Register } from '@/components/register'

export const metadata: Metadata = { title: 'HiTechAudit®', description: 'Technical audits of stockyard, port and conveyor equipment: why it fails, and what brings it back to rated capacity.' }

const SLEW_CAUSES = ['Improper slew bearing selection', 'Wrong installation', 'Balancing of the machine', 'Failure of the centralised lubrication system', 'Damaged seals']

export default function Audit() {
  const audits = PROJECTS.filter((p) => p.kind === 'HiTechAudit®' || p.kind === 'Revamp')
  return (
    <>
      <section className="hero" aria-labelledby="h">
        <div className="copy">
          <p className="ref">DWG LP-003 · HiTechAudit® · Sheet 03 of 05</p>
          <h1 className="display sm" id="h">Rated 850 TPH. <em>Running at 500.</em></h1>
          <p className="lede">
            That was ACC Jamul&apos;s bridge reclaimer in 2016. A HiTechAudit® found why; phase one made it safe at 600 TPH and phase two took it to 850.
            We have done more than 46 of them, mostly on machines other companies built.
          </p>
          <p className="ref">HiTechAudit® is a registered trademark of Lepton Projects Pvt. Ltd.</p>
        </div>
        <div className="plate-wrap">
          <Plate priority src="/photos/acc-jamul-bridge-reclaimer.jpg" alt="Limestone bridge reclaimer inside the shed at ACC Jamul" plate="Plate 04" caption="Limestone bridge reclaimer · ACC Jamul · new rake car & harrow" date="Sep 2017" ratio="16 / 10"
            dim={{ label: '500 → 850 TPH', left: '18%', right: '18%', top: '12%' }} />
        </div>
      </section>

      <Zone zref="A" title="What the audit delivers" id="benefits" flush>
        <div className="fields c4">
          {AUDIT_BENEFITS.map((b, i) => (
            <div key={b}><span className="ref"><b>{String(i + 1).padStart(2, '0')}</b></span><p style={{ color: 'var(--ink)', fontSize: 17, marginTop: 6 }}>{b}</p></div>
          ))}
        </div>
      </Zone>

      <Zone zref="B" title="Slew bearings · with Galperti Tech, Italy" id="slew">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          <div className="prose">
            <h2 className="h2" style={{ marginBottom: 16 }}>Designed for 20 years. Failing in 5.</h2>
            <p>The slew bearing is the heart of a bucket wheel stacker-reclaimer: its most expensive component, with a 6–7 month import lead time. In several Indian power plants it is failing in under five years.</p>
            <p>Replacing it without finding the cause just repeats the failure. Usually the cause is one of these:</p>
            <ol style={{ margin: '12px 0 0 20px' }}>{SLEW_CAUSES.map((c) => <li key={c}>{c}</li>)}</ol>
          </div>
          <Plate src="/photos/korba-slew-bearing.jpg" alt="Slew bearing replacement at CSPGCL Korba East" plate="Plate 05" caption="Slew bearing replacement · CSPGCL Korba East · 14-day shutdown" date="Apr 2018" ratio="4 / 3" />
        </div>
      </Zone>

      <Zone zref="C" title="Revision history · QCC" id="qcc">
        <table className="revs">
          <thead><tr><th>Rev</th><th>Date</th><th>Description</th></tr></thead>
          <tbody>
            {QCC_REVISIONS.map((r) => (
              <tr key={r.rev} className={r.mark ? 'mark' : undefined}><td><span className="tri">{r.rev}</span></td><td>{r.date}</td><td>{r.text}</td></tr>
            ))}
          </tbody>
        </table>
      </Zone>

      <Zone zref="D" title="Audits & revamps · register extract" id="audits">
        <Register projects={audits} filters={false} />
        <p style={{ marginTop: 22 }}><Link className="stamp" href="/contact">Book a HiTechAudit® →</Link></p>
      </Zone>
    </>
  )
}
