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
    const subject = `Enquiry: ${get('purpose')} · ${get('company')}`
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
    <form className="form" onSubmit={submit}>
      <label><span className="mono mute">name</span><input name="name" required autoComplete="name" /></label>
      <label><span className="mono mute">company</span><input name="company" required autoComplete="organization" /></label>
      <label><span className="mono mute">email</span><input name="reply" type="email" required autoComplete="email" /></label>
      <label><span className="mono mute">phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label><span className="mono mute">purpose</span>
        <select name="purpose" defaultValue={PURPOSE[0]}>{PURPOSE.map((p) => <option key={p}>{p}</option>)}</select>
      </label>
      <label><span className="mono mute">plant / site</span><input name="site" placeholder="Cement plant, Rajasthan" /></label>
      <label className="wide"><span className="mono mute">material & capacity</span><input name="material" placeholder="Limestone, 1200 TPH stacking / 800 TPH reclaiming" /></label>
      <label className="wide"><span className="mono mute">remarks</span><textarea name="message" placeholder="What you need, what's going wrong, and when." /></label>
      <div className="wide" style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
        <button className="key red" type="submit">send<span className="led" /></button>
        <span className="mono mute" role="status">{sent ? 'your email app should open with this filled in.' : `opens your email app, addressed to ${email}. attach drawings there.`}</span>
      </div>
    </form>
  )
}
