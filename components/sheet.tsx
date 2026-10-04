'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { COMPANY, OFFICES } from '@/lib/lepton'

export const SHEETS = [
  { href: '/', n: '00', label: 'General arrangement' },
  { href: '/solutions', n: '01', label: 'Solutions' },
  { href: '/register', n: '02', label: 'Register' },
  { href: '/hitechaudit', n: '03', label: 'HiTechAudit®' },
  { href: '/company', n: '04', label: 'Company' },
  { href: '/contact', n: '05', label: 'Contact' },
]

function useSheet() {
  const path = usePathname()
  return SHEETS.find((s) => (s.href === '/' ? path === '/' : path.startsWith(s.href))) ?? SHEETS[0]
}

export function GridRefs() {
  return (
    <>
      <div className="grid-refs top" aria-hidden>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <span key={n}>{n}</span>)}
      </div>
      <div className="grid-refs left" aria-hidden>
        {['A', 'B', 'C', 'D', 'E', 'F'].map((n) => <span key={n}>{n}</span>)}
      </div>
    </>
  )
}

export function Header() {
  const sheet = useSheet()
  const links = SHEETS.slice(1)
  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="Lepton Projects, home">
        <Image src="/lepton-logo.png" alt="Lepton, since 2008" width={289} height={152} priority />
      </Link>
      <nav aria-label="Sheet index" style={{ marginLeft: 'auto' }}>
        <ul className="index">
          {links.map((s) => (
            <li key={s.href}>
              <Link href={s.href} aria-current={sheet.href === s.href ? 'page' : undefined}>
                <b>{s.n}</b>{s.label}
              </Link>
            </li>
          ))}
        </ul>
        <details className="menu">
          <summary>Sheet index</summary>
          <ul>
            {SHEETS.map((s) => (
              <li key={s.href}><Link href={s.href}><b>{s.n}</b>{s.label}</Link></li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  )
}

export function Footer() {
  const sheet = useSheet()
  return (
    <footer className="site-footer">
      <div>
        <span className="ref">Drawn by</span>
        <p className="legal">{COMPANY.legalName}</p>
        <p>{COMPANY.certification} certified · since {COMPANY.since}</p>
        <p style={{ marginTop: 10 }}><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
      </div>
      <div>
        <span className="ref">Offices</span>
        <ul style={{ marginTop: 8 }}>
          {OFFICES.map((o) => <li key={o.name}><b>{o.name}</b>, {o.lines[0]}</li>)}
        </ul>
      </div>
      <div>
        <span className="ref">Works</span>
        <ul style={{ marginTop: 8 }}>
          <li><b>Chopanki</b>, Alwar · 22,000 sq ft</li>
          <li><b>Kherani</b>, Alwar · 35,000 sq ft</li>
          <li><b>MET Jhajjar</b>, under construction</li>
        </ul>
      </div>
      <div>
        <span className="ref">Sheet</span>
        <p className="sheetno">{sheet.n} / 05</p>
        <p className="ref">{sheet.label}</p>
      </div>
    </footer>
  )
}

export function Zone({ zref, title, children, flush, id }: { zref: string; title: string; children: React.ReactNode; flush?: boolean; id?: string }) {
  return (
    <section className={`zone${flush ? ' flush' : ''}`} id={id} aria-labelledby={id ? `${id}-t` : undefined}>
      <div className="zlabel">
        <span className="zref" aria-hidden>{zref}</span>
        <span className="ref" id={id ? `${id}-t` : undefined}>{title}</span>
      </div>
      <div className="zbody">{children}</div>
    </section>
  )
}
