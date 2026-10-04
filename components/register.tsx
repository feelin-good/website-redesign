'use client'

import { useState } from 'react'
import Image from 'next/image'
import { KINDS, type Kind, type Project } from '@/lib/lepton'

export function Register({ projects, filters = true }: { projects: Project[]; filters?: boolean }) {
  const [kind, setKind] = useState<Kind | 'all'>('all')
  const [open, setOpen] = useState<string | null>(null)
  const rows = projects.filter((p) => kind === 'all' || p.kind === kind)
  return (
    <div>
      {filters && (
        <div className="filters" role="group" aria-label="Filter the register">
          {(['all', ...KINDS] as const).map((k) => (
            <button key={k} className="key" aria-pressed={kind === k} onClick={() => { setKind(k); setOpen(null) }}>
              {k.toLowerCase()} {k === 'all' ? projects.length : projects.filter((p) => p.kind === k).length}
              <span className="led" />
            </button>
          ))}
        </div>
      )}
      <ul className="reg">
        {rows.map((p) => {
          const id = p.ref!
          const isOpen = open === id
          return (
            <li key={id}>
              <button className="row" aria-expanded={isOpen} aria-controls={`r-${id}`} onClick={() => setOpen(isOpen ? null : id)}>
                <span className="no mono">{id.toLowerCase()}</span>
                <span><span className="t">{p.title}</span><br /><span className="mute" style={{ fontSize: 14 }}>{p.client}</span></span>
                <span className="site mute">{p.site}{p.abroad ? ' · abroad' : ''}</span>
                <span className="rate">{p.rating?.replace(' TPH', '') ?? '—'}{p.rating?.includes('TPH') && <span className="mono"> tph</span>}</span>
                <span className="plus" aria-hidden>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="open" id={`r-${id}`}>
                  <div>
                    <p>{p.scope}</p>
                    {p.specs.length > 0 && <ol className="legend mono" style={{ marginTop: 12, fontSize: 12 }}>{p.specs.map((s) => <li key={s}>{s.toLowerCase()}</li>)}</ol>}
                    <p className="mono mute" style={{ marginTop: 10 }}>{p.kind.toLowerCase()} · {p.date.toLowerCase()}</p>
                  </div>
                  {p.photo && (
                    <div className="shot">
                      <Image src={p.photo} alt={`${p.title}, ${p.client}`} fill sizes="320px" />
                    </div>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
