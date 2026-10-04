'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { COMPANY, OFFICES } from '@/lib/lepton'

export const PAGES = [
  { href: '/solutions', label: 'solutions' },
  { href: '/register', label: 'register' },
  { href: '/hitechaudit', label: 'hitechaudit®' },
  { href: '/company', label: 'company' },
  { href: '/contact', label: 'contact' },
]

export function Top() {
  const path = usePathname()
  const links = PAGES.map((p) => (
    <li key={p.href}>
      <Link href={p.href} aria-current={path.startsWith(p.href) ? 'page' : undefined}>{p.label}</Link>
    </li>
  ))
  return (
    <header className="top mono">
      <Link href="/" className="logo" aria-label="Lepton Projects, home">
        <Image src="/lepton-logo.png" alt="Lepton, since 2008" width={289} height={152} priority />
      </Link>
      <nav aria-label="Main">
        <ul>{links}</ul>
        <details className="menu">
          <summary className="key" style={{ minHeight: 44, minWidth: 72, alignItems: 'center' }}>menu<span className="led" /></summary>
          <ul>{links}</ul>
        </details>
      </nav>
    </header>
  )
}

export function Back() {
  return (
    <footer className="back">
      <div className="wrap">
        <div>
          <b>{COMPANY.legalName}</b>
          <p className="mute">{COMPANY.certification} · since {COMPANY.since.toLowerCase()}</p>
          <p style={{ marginTop: 10 }}><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
        </div>
        {OFFICES.map((o) => (
          <div key={o.name}>
            <b className="mono">{o.name.toLowerCase()}</b>
            <ul className="mute">{o.lines.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        ))}
        <div className="serial mono mute">
          <span>s/n lp-2008 · made in india · works: chopanki, kherani, jhajjar</span>
          <span>designed to be useful, honest and long-lasting</span>
        </div>
      </div>
    </footer>
  )
}

/** Segmented level meter, 24 segments; the top three glow red. */
export function Meter({ label, value, max }: { label: string; value: number; max: number }) {
  const n = 24
  const lit = Math.round((value / max) * n)
  return (
    <div className="meter" role="img" aria-label={`${label}: ${value}`}>
      <span style={{ fontSize: 14 }}>{label}</span>
      <span className="seg" aria-hidden>
        {Array.from({ length: n }, (_, i) => <i key={i} className={i < lit ? (i >= n - 3 ? 'hot' : 'on') : ''} />)}
      </span>
      <b>{value}</b>
    </div>
  )
}

/* Pixel machines, 24×12, one per stage of the material route. Black body, one brand colour. */
const PIX: Record<string, { k: string; c: string; col: string }> = {
  receive: { // wagon tippler: wagon in a ring over a hopper
    k: 'M2 9h20v1H2zM4 2h1v7H4zM19 2h1v7h-1zM5 1h14v1H5zM6 4h12v4H6zM7 10h2v1H7zM15 10h2v1h-2zM10 10h4v2h-4z',
    c: 'M7 5h10v2H7z', col: 'var(--red)' },
  crush: { // crusher house
    k: 'M6 11h12v1H6zM6 4h1v7H6zM17 4h1v7h-1zM7 3h10v1H7zM9 2h6v1H9zM10 6h4v1h-4zM11 7h2v2h-2z',
    c: 'M8 9h8v2H8z', col: 'var(--navy)' },
  convey: { // inclined conveyor on trestles
    k: 'M1 11h22v1H1zM3 10h1v1H3zM6 8h1v3H6zM9 6h1v5H9zM12 4h1v7h-1zM14 2h8v1h-8zM15 3h1v8h-1zM20 3h1v8h-1z',
    c: 'M4 9h2v1H4zM7 7h2v1H7zM10 5h2v1h-2zM13 3h1v1h-1z', col: 'var(--red)' },
  store: { // stacker over a pile
    k: 'M1 11h22v1H1zM5 9h4v2H5zM6 3h1v6H6zM7 3h1v1H7zM8 4h2v1H8zM10 5h2v1h-2zM12 6h2v1h-2zM14 7h1v1h-1z',
    c: 'M10 9h11v2H10zM12 8h7v1h-7zM14 7h3v1h-3z', col: 'var(--navy)' },
  ship: { // ship loader and hull
    k: 'M2 5h1v6H2zM6 5h1v6H6zM2 4h5v1H2zM7 4h6v1H7zM12 5h1v1h-1zM9 9h13v1H9zM10 10h11v1H10zM11 11h9v1h-9z',
    c: 'M13 7h5v2h-5z', col: 'var(--red)' },
}

export function Pix({ kind, label }: { kind: keyof typeof PIX; label?: string }) {
  const p = PIX[kind]
  return (
    <svg className="pix" viewBox="0 0 24 12" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <path d={p.k} fill="var(--ink)" />
      <path d={p.c} fill={p.col} />
    </svg>
  )
}
