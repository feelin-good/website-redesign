'use client'

import { useState } from 'react'

const PURPOSE = ['New system or machine', 'Upgradation / revamp', 'HiTechAudit®', 'EPCM', 'Pre-bid engineering', 'Spares']

/** No backend yet: the form composes an email to the enquiries address. */
export function Transmittal({ email }: { email: string }) {
  const [sent, setSent] = useState(false)
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '')
    const subject = `Transmittal: ${get('purpose')} · ${get('company')}`
    const body = [
      `Purpose: ${get('purpose')}`,
      `Plant / site: ${get('site')}`,
      `Material & capacity: ${get('material')}`,
      '',
      get('message'),
      '',
      `${get('name')} · ${get('company')}`,
      `${get('reply')} · ${get('phone')}`,
    ].join('\n')
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <form className="transmittal" onSubmit={submit}>
      <label><span>From · name</span><input name="name" required autoComplete="name" /></label>
      <label><span>Company</span><input name="company" required autoComplete="organization" /></label>
      <label><span>Email</span><input name="reply" type="email" required autoComplete="email" /></label>
      <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label><span>Purpose of issue</span>
        <select name="purpose" defaultValue={PURPOSE[0]}>{PURPOSE.map((p) => <option key={p}>{p}</option>)}</select>
      </label>
      <label><span>Plant / site</span><input name="site" placeholder="e.g. Cement plant, Rajasthan" /></label>
      <label className="wide"><span>Material & capacity</span><input name="material" placeholder="e.g. Limestone, 1200 TPH stacking / 800 TPH reclaiming" /></label>
      <label className="wide"><span>Remarks</span><textarea name="message" placeholder="What you need, what's going wrong, and when." /></label>
      <div style={{ gridColumn: '1 / -1', padding: '18px 14px', borderRight: '1px solid var(--navy)', borderBottom: '1px solid var(--navy)', display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="stamp" type="submit">Issue transmittal →</button>
        <span className="ref" role="status">{sent ? 'Your email app should open with the transmittal filled in.' : `Opens your email app, addressed to ${email}. Attach drawings there.`}</span>
      </div>
    </form>
  )
}
