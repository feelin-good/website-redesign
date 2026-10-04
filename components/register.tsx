'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { KINDS, type Kind, type Project } from '@/lib/lepton'

export function Register({ projects, filters = true }: { projects: Project[]; filters?: boolean }) {
  const [kind, setKind] = useState<Kind | 'All'>('All')
  const [open, setOpen] = useState<number | null>(null)
  const rows = projects.map((p, i) => ({ p, i })).filter(({ p }) => kind === 'All' || p.kind === kind)

  return (
    <div>
      {filters && (
        <div className="filters" role="group" aria-label="Filter the register">
          {(['All', ...KINDS] as const).map((k) => (
            <button key={k} aria-pressed={kind === k} onClick={() => { setKind(k); setOpen(null) }}>
              {k} {k === 'All' ? projects.length : projects.filter((p) => p.kind === k).length}
            </button>
          ))}
        </div>
      )}
      <table className="register">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Equipment · client</th>
            <th scope="col" className="hide-sm">Site</th>
            <th scope="col">Rating</th>
            <th scope="col" className="hide-sm">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ p, i }) => {
            const isOpen = open === i
            return (
              <Fragment key={i}>
                <tr className={isOpen ? 'open' : undefined}>
                  <td className="no">{p.ref}</td>
                  <td>
                    <button className="expand" aria-expanded={isOpen} aria-controls={`row-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                      <span className="title">{p.title}</span>
                    </button>
                    <div className="client">{p.client}{p.abroad ? ' · abroad' : ''}</div>
                    <span className="kind">{p.kind}</span>
                  </td>
                  <td className="hide-sm">{p.site}</td>
                  <td className="rating">{p.rating ?? '—'}</td>
                  <td className="date hide-sm">{p.date}</td>
                </tr>
                {isOpen && (
                  <tr className="row-detail" id={`row-${i}`}>
                    <td />
                    <td colSpan={4}>
                      <div className="inner">
                        <div>
                          <p>{p.scope}</p>
                          {p.specs.length > 0 && <ul>{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>}
                          <p className="ref" style={{ marginTop: 12 }}>{p.site} · {p.date}</p>
                        </div>
                        {p.photo && (
                          <div style={{ position: 'relative', height: 190 }}>
                            <Image src={p.photo} alt={`${p.title}, ${p.client}`} fill sizes="300px" style={{ objectFit: 'cover' }} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
      <p className="ref" style={{ marginTop: 14 }}>
        LP-nnn = register index on this sheet. Project numbers shown where the works number is published.
      </p>
    </div>
  )
}
