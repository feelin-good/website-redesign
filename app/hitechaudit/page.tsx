import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { AUDIT_BENEFITS, PROJECTS, QCC_REVISIONS } from '@/lib/lepton'
import { Register } from '@/components/register'

export const metadata: Metadata = { title: 'HiTechAudit®', description: 'Technical audits of stockyard, port and conveyor equipment: why it fails, and what brings it back to rated capacity.' }

const SLEW_CAUSES = ['Improper slew bearing selection', 'Wrong installation', 'Balancing of the machine', 'Failure of the centralised lubrication system', 'Damaged seals']

export default function Audit() {
  const audits = PROJECTS.filter((p) => p.kind === 'HiTechAudit®' || p.kind === 'Revamp')
  return (
    <div className="wrap">
      <section className="chapter" aria-labelledby="h">
        <div className="num" aria-hidden>0<span>3</span></div>
        <div className="txt">
          <p className="mono mute">chapter 03 · hitechaudit®</p>
          <h1 className="h1" id="h">Rated 850 TPH. <em>Running at 500.</em></h1>
          <p className="lede">That was ACC Jamul&apos;s bridge reclaimer in 2016. A HiTechAudit® found why; phase one made it safe at 600 TPH and phase two took it to 850. We have done more than 46 of them, mostly on machines other companies built.</p>
          <p className="mono mute">hitechaudit® is a registered trademark of lepton projects pvt. ltd.</p>
        </div>
      </section>

      <section className="cols c2" style={{ alignItems: 'stretch' }} aria-label="ACC Jamul before and after">
        <figure className="shot" style={{ aspectRatio: '4 / 3' }}>
          <Image src="/photos/acc-jamul-bridge-reclaimer.jpg" alt="Limestone bridge reclaimer at ACC Jamul" fill priority sizes="(max-width: 700px) 100vw, 50vw" />
          <figcaption className="tag mono">acc jamul · bridge reclaimer · 2017</figcaption>
        </figure>
        <div className="screen" style={{ aspectRatio: 'auto', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#f1f1ee' }}>
          <p className="mono">reclaiming capacity · tph</p>
          <div>
            <div className="readout" style={{ color: '#8c8c86', textShadow: 'none', fontSize: 'clamp(40px,5vw,64px)' }}>500<small>2016 · before</small></div>
            <div className="readout" style={{ fontSize: 'clamp(40px,5vw,64px)', marginTop: 10 }}>600<small>phase 1</small></div>
            <div className="readout" style={{ marginTop: 10 }}>850<small>phase 2 · design rating</small></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ marginTop: 48 }} aria-labelledby="ben">
        <div className="head"><p className="mono mute">03.1 · what the audit delivers</p><h2 className="h2" id="ben">Eight outcomes.</h2></div>
        <ol className="legend cols c2" style={{ gap: '0 48px', fontSize: 17 }}>{AUDIT_BENEFITS.map((b) => <li key={b}>{b}</li>)}</ol>
      </section>

      <section className="section cols c2" aria-labelledby="slew" style={{ alignItems: 'start' }}>
        <div>
          <p className="mono mute">03.2 · slew bearings · with galperti tech, italy</p>
          <h2 className="h2" id="slew" style={{ margin: '14px 0 16px' }}>Designed for 20 years. <em>Failing in 5.</em></h2>
          <p>The slew bearing is the heart of a bucket wheel stacker-reclaimer: its most expensive part, with a 6–7 month import lead time. In several Indian power plants it is failing in under five years. Replacing it without finding the cause just repeats the failure.</p>
          <ol className="legend" style={{ marginTop: 16 }}>{SLEW_CAUSES.map((c) => <li key={c}>{c}</li>)}</ol>
        </div>
        <figure className="shot" style={{ aspectRatio: '4 / 3' }}>
          <Image src="/photos/korba-slew-bearing.jpg" alt="Slew bearing replacement at CSPGCL Korba East" fill sizes="(max-width: 700px) 100vw, 50vw" />
          <figcaption className="tag mono">korba east · replaced in a 14-day shutdown · 2018</figcaption>
        </figure>
      </section>

      <section className="section cols c2" aria-labelledby="qcc" style={{ alignItems: 'start' }}>
        <div>
          <p className="mono mute">03.3 · event log · qcc</p>
          <h2 className="h2" id="qcc" style={{ marginTop: 14 }}>Collapsed. Restored in 24 days.</h2>
        </div>
        <ol className="log" aria-label="QCC stacker event log">
          {QCC_REVISIONS.map((r) => <li key={r.rev}><time>{r.date.toLowerCase()}</time><span className={r.mark ? 'hot' : undefined}>{r.text.toLowerCase()}</span></li>)}
        </ol>
      </section>

      <section className="section" aria-labelledby="ext">
        <div className="head"><p className="mono mute">03.4 · register extract</p><h2 className="h2" id="ext">Audits & revamps.</h2></div>
        <Register projects={audits} filters={false} />
        <p style={{ marginTop: 26 }}><Link className="key red" href="/contact">book an audit<span className="led" /></Link></p>
      </section>
    </div>
  )
}
