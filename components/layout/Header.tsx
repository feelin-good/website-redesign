'use client'

import { useState, useEffect, useRef, ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import {
  Menu, X, ChevronDown, Phone, ArrowRight,
  Zap, Building2, ClipboardList, Map, Settings, Layers,
  FlaskConical, Factory, Server, Cross, Bolt, Building,
} from 'lucide-react'
import { SERVICES } from '@/lib/data/services'
import { INDUSTRIES } from '@/lib/data/industries'

const SERVICE_ICONS: Record<string, ReactElement> = {
  'mep-engineering':       <Zap size={16} />,
  'structural-engineering':<Building2 size={16} />,
  'project-management':    <ClipboardList size={16} />,
  'civil-infrastructure':  <Map size={16} />,
  'process-engineering':   <Settings size={16} />,
  'epc-turnkey':           <Layers size={16} />,
}

const INDUSTRY_ICONS: Record<string, ReactElement> = {
  'pharma':               <FlaskConical size={16} />,
  'manufacturing':        <Factory size={16} />,
  'data-centers':         <Server size={16} />,
  'healthcare':           <Cross size={16} />,
  'power-energy':         <Bolt size={16} />,
  'commercial-real-estate':<Building size={16} />,
}

const NAV_ITEMS = [
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services',  hasDropdown: true, type: 'services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Industries', href: '/industries', hasDropdown: true, type: 'industries' },
  { label: 'Careers',  href: '/careers' },
  { label: 'Contact',  href: '/contact' },
]

export function Header() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
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
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-canvas/95 backdrop-blur-md shadow-lab border-b border-alabaster'
        : 'bg-canvas/70 backdrop-blur-sm'
    )}>
      {/* Top bar */}
      <div className={cn(
        'hidden lg:block border-b transition-all duration-300',
        scrolled ? 'border-alabaster bg-canvas' : 'border-alabaster bg-canvas/80'
      )}>
        <div className="container-main flex items-center justify-between py-1.5">
          <div className="flex items-center gap-6 text-xs text-granite">
            <a href="tel:+912026120000" className="flex items-center gap-1.5 hover:text-obsidian transition-colors">
              <Phone size={11} />
              +91-20-2612-0000
            </a>
            <a href="mailto:info@lepton.co.in" className="hover:text-obsidian transition-colors">
              info@lepton.co.in
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-granite">
            <span>ISO 9001:2015 | ISO 14001:2015 | ISO 45001:2018 Certified</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-main">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              {/* Geometric logo mark */}
              <div className="w-9 h-9 bg-ink rounded-control flex items-center justify-center
                              group-hover:bg-obsidian transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                  <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
            </div>
            <div>
              <span className={cn(
                'block font-display font-bold text-lg leading-tight transition-colors',
                scrolled ? 'text-obsidian' : 'text-obsidian'
              )}>
                Lepton Projects
              </span>
              <span className={cn(
                'block text-2xs font-medium uppercase tracking-widest leading-tight transition-colors',
                scrolled ? 'text-granite' : 'text-granite'
              )}>
                Pvt. Ltd.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
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
                    'flex items-center gap-1 px-3 py-2 rounded-control text-sm font-medium transition-all duration-200',
                    isActive(item.href)
                      ? 'text-obsidian bg-ghost'
                      : 'text-granite hover:text-obsidian hover:bg-ghost'
                  )}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform duration-200',
                        activeDropdown === item.type && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.hasDropdown && activeDropdown === item.type && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                    onMouseEnter={() => openDropdown(item.type!)}
                    onMouseLeave={() => closeDropdown()}
                  >
                    <div className="bg-canvas rounded-card shadow-lab border border-alabaster p-4 min-w-[340px]">
                      {item.type === 'services' && (
                        <>
                          <p className="text-2xs text-granite uppercase tracking-[0.22em] font-semibold mb-3 px-2 font-label">
                            Our Services
                          </p>
                          <div className="grid grid-cols-1 gap-1">
                            {SERVICES.map(service => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-control
                                           hover:bg-ghost group/item transition-colors"
                              >
                                <span className="mt-0.5 text-electric group-hover/item:text-obsidian">
                                  {SERVICE_ICONS[service.slug]}
                                </span>
                                <div>
                                  <p className="text-sm font-semibold text-obsidian">
                                    {service.title}
                                  </p>
                                  <p className="text-xs text-granite leading-snug mt-0.5 line-clamp-1">
                                    {service.shortDescription}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-alabaster">
                            <Link
                              href="/services"
                              className="flex items-center justify-center gap-2 text-sm font-semibold
                                         text-electric hover:text-obsidian transition-colors py-1"
                            >
                              View all services <ArrowRight size={14} />
                            </Link>
                          </div>
                        </>
                      )}
                      {item.type === 'industries' && (
                        <>
                          <p className="text-2xs text-granite uppercase tracking-[0.22em] font-semibold mb-3 px-2 font-label">
                            Industries We Serve
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {INDUSTRIES.map(ind => (
                              <Link
                                key={ind.slug}
                                href={`/industries#${ind.slug}`}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-control
                                           hover:bg-ghost group/item transition-colors"
                              >
                                <span className="text-electric group-hover/item:text-obsidian">
                                  {INDUSTRY_ICONS[ind.slug]}
                                </span>
                                <p className="text-sm font-medium text-obsidian">
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

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Button
              href="/request-quote"
              variant="primary"
              size="sm"
              icon={<ArrowRight size={14} />}
              className="hidden sm:inline-flex"
            >
              Request a Quote
            </Button>

            <button
              className={cn(
                'lg:hidden p-2 rounded-control transition-colors',
                'text-obsidian hover:bg-ghost'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cn(
        'fixed inset-0 z-40 lg:hidden transition-all duration-300',
        mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}>
        {/* Backdrop */}
          <div
            className={cn(
              'absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300',
              mobileOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => setMobileOpen(false)}
          />

        {/* Drawer */}
        <div className={cn(
          'absolute top-0 right-0 h-full w-[320px] max-w-full bg-canvas shadow-lab',
          'flex flex-col transition-transform duration-300 ease-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-alabaster">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-ink rounded-control flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                  <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="font-display font-bold text-obsidian">Lepton Projects</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-control text-granite hover:text-obsidian hover:bg-ghost"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {NAV_ITEMS.map(item => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-3 rounded-control text-sm font-medium',
                    'transition-colors mb-1',
                    isActive(item.href)
                      ? 'bg-ghost text-obsidian'
                      : 'text-granite hover:bg-ghost hover:text-obsidian'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            {/* Mobile sub-items: services */}
            <div className="mt-4 pt-4 border-t border-alabaster">
              <p className="px-3 mb-2 text-2xs text-granite uppercase tracking-[0.22em] font-semibold font-label">
                Services
              </p>
              {SERVICES.map(s => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-control text-sm text-granite
                             hover:text-obsidian hover:bg-ghost transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-electric">{SERVICE_ICONS[s.slug]}</span>
                  {s.title}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA */}
          <div className="px-4 pb-6 pt-4 border-t border-alabaster">
            <Button href="/request-quote" variant="primary" className="w-full justify-center">
              Request a Quote
            </Button>
            <a
              href="tel:+912026120000"
              className="flex items-center justify-center gap-2 mt-3 text-sm text-granite
                         hover:text-obsidian transition-colors"
            >
              <Phone size={14} />
              +91-20-2612-0000
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
