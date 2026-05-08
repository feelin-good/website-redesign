'use client'

import { useState, useEffect, useRef, ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import {
  Menu, X, ChevronDown, Phone, ArrowRight,
  Layers, Building2, Factory, Settings, Map, Zap,
  FlaskConical, Server, Cross, Bolt, Building,
} from 'lucide-react'
import { SERVICES } from '@/lib/data/services'
import { INDUSTRIES } from '@/lib/data/industries'

// Keys must match actual service slugs in lib/data/services.ts
const SERVICE_ICONS: Record<string, ReactElement> = {
  'belt-conveyor-systems':          <Layers size={16} />,
  'stacker-reclaimer-systems':      <Building2 size={16} />,
  'coal-fuel-handling-plants':      <Factory size={16} />,
  'wagon-tipplers-material-handling': <Settings size={16} />,
  'aggregate-crushing-screening':   <Map size={16} />,
  'dust-management-systems':        <Zap size={16} />,
}

const INDUSTRY_ICONS: Record<string, ReactElement> = {
  'pharma':                <FlaskConical size={16} />,
  'manufacturing':         <Factory size={16} />,
  'data-centers':          <Server size={16} />,
  'healthcare':            <Cross size={16} />,
  'power-energy':          <Bolt size={16} />,
  'commercial-real-estate':<Building size={16} />,
}

const NAV_ITEMS = [
  { label: 'About',      href: '/about' },
  { label: 'Services',   href: '/services',    hasDropdown: true, type: 'services' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Industries', href: '/industries',  hasDropdown: true, type: 'industries' },
  { label: 'Careers',    href: '/careers' },
  { label: 'Contact',    href: '/contact' },
]

export function Header() {
  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSection,  setMobileSection]  = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileSection(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const openDropdown = (type: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setActiveDropdown(type)
  }

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ── Header bar ── */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-white/95 border-b border-ghost-white',
        scrolled && 'shadow-humble'
      )}>
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-ink rounded-lg flex items-center justify-center shrink-0
                              group-hover:bg-obsidian transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                  <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block font-display font-semibold text-base sm:text-lg leading-tight text-ink">
                  Lepton Projects
                </span>
                <span className="hidden sm:block text-2xs font-medium uppercase tracking-widest leading-tight text-granite">
                  Pvt. Ltd.
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && openDropdown(item.type!)}
                  onMouseLeave={() => item.hasDropdown && closeDropdown()}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive(item.href)
                        ? 'text-ink bg-ghost-white'
                        : 'text-granite hover:text-ink hover:bg-ghost-white'
                    )}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown size={14} className={cn(
                        'transition-transform duration-200',
                        activeDropdown === item.type && 'rotate-180'
                      )} />
                    )}
                  </Link>

                  {item.hasDropdown && activeDropdown === item.type && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                      onMouseEnter={() => openDropdown(item.type!)}
                      onMouseLeave={() => closeDropdown()}
                    >
                      <div className="bg-white rounded-[30px] shadow-humble border border-ghost-white p-5 min-w-[340px]">
                        {item.type === 'services' && (
                          <>
                            <p className="text-2xs text-granite uppercase tracking-[0.15em] font-medium mb-3 px-2">
                              Our Services
                            </p>
                            <div className="grid grid-cols-1 gap-1">
                              {SERVICES.map(service => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="flex items-start gap-3 px-3 py-2.5 rounded-[6px]
                                             hover:bg-ghost-white group/item transition-colors"
                                >
                                  <span className="mt-0.5 text-ink group-hover/item:text-obsidian">
                                    {SERVICE_ICONS[service.slug]}
                                  </span>
                                  <div>
                                    <p className="text-sm font-semibold text-ink">{service.title}</p>
                                    <p className="text-xs text-granite leading-snug mt-0.5 line-clamp-1">
                                      {service.shortDescription}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-ghost-white">
                              <Link
                                href="/services"
                                className="flex items-center justify-center gap-2 text-sm font-semibold
                                           text-ink hover:text-granite transition-colors py-1"
                              >
                                View all services <ArrowRight size={14} />
                              </Link>
                            </div>
                          </>
                        )}
                        {item.type === 'industries' && (
                          <>
                            <p className="text-2xs text-granite uppercase tracking-[0.15em] font-medium mb-3 px-2">
                              Industries We Serve
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                              {INDUSTRIES.map(ind => (
                                <Link
                                  key={ind.slug}
                                  href={`/industries#${ind.slug}`}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-[6px]
                                             hover:bg-ghost-white group/item transition-colors"
                                >
                                  <span className="text-ink group-hover/item:text-obsidian">
                                    {INDUSTRY_ICONS[ind.slug]}
                                  </span>
                                  <p className="text-sm font-medium text-ink">
                                    {ind.title.split(' &')[0]}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button
                href="/request-quote"
                variant="primary"
                size="sm"
                icon={<ArrowRight size={14} />}
                className="hidden md:inline-flex"
              >
                Request a Quote
              </Button>
              <button
                className="lg:hidden p-2 rounded-lg text-ink hover:bg-ghost-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer — rendered OUTSIDE <header> to avoid backdrop-filter containing-block bug ── */}
      <div className={cn(
        'fixed inset-0 z-[60] lg:hidden transition-all duration-300',
        mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}>
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-ink/40 transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div className={cn(
          'absolute top-0 right-0 h-full w-[85vw] max-w-[360px] bg-canvas shadow-2xl',
          'flex flex-col transition-transform duration-300 ease-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-ghost-white shrink-0">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                  <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="font-display font-semibold text-ink">Lepton Projects</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-granite hover:text-ink hover:bg-ghost-white transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links — scrollable */}
          <nav className="flex-1 overflow-y-auto px-4 py-3">
            {NAV_ITEMS.map(item => {
              const isExpanded = mobileSection === item.type
              return (
                <div key={item.href} className="mb-0.5">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileSection(isExpanded ? null : item.type!)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-3 rounded-[6px]',
                          'text-sm font-medium transition-colors',
                          isActive(item.href) || isExpanded
                            ? 'bg-ghost-white text-ink'
                            : 'text-granite hover:bg-ghost-white hover:text-ink'
                        )}
                      >
                        {item.label}
                        <ChevronDown size={16} className={cn(
                          'transition-transform duration-200',
                          isExpanded && 'rotate-180'
                        )} />
                      </button>
                      {isExpanded && (
                        <div className="mt-0.5 mb-1 ml-3 space-y-0.5">
                          {item.type === 'services' && SERVICES.map(s => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[6px]
                                         text-sm text-granite hover:text-ink hover:bg-ghost-white transition-colors"
                            >
                              <span className="text-ink shrink-0">{SERVICE_ICONS[s.slug]}</span>
                              <span className="truncate">{s.title}</span>
                            </Link>
                          ))}
                          {item.type === 'industries' && INDUSTRIES.map(ind => (
                            <Link
                              key={ind.slug}
                              href={`/industries#${ind.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-[6px]
                                         text-sm text-granite hover:text-ink hover:bg-ghost-white transition-colors"
                            >
                              <span className="text-ink shrink-0">{INDUSTRY_ICONS[ind.slug]}</span>
                              <span className="truncate">{ind.title.split(' &')[0]}</span>
                            </Link>
                          ))}
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold
                                       text-ink hover:bg-ghost-white rounded-[6px] transition-colors"
                          >
                            View all <ArrowRight size={12} />
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center px-3 py-3 rounded-[6px] text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-ghost-white text-ink'
                          : 'text-granite hover:bg-ghost-white hover:text-ink'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          {/* CTA footer */}
          <div className="px-4 pt-4 pb-8 border-t border-ghost-white shrink-0">
            <Button href="/request-quote" variant="primary" className="w-full justify-center">
              Request a Quote
            </Button>
            <a
              href="tel:+912026120000"
              className="flex items-center justify-center gap-2 mt-3 text-sm text-granite hover:text-ink transition-colors"
            >
              <Phone size={14} />
              +91-20-2612-0000
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
