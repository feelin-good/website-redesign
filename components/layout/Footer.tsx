import Link from 'next/link'
import {
  Phone, Mail, MapPin, Linkedin, Youtube,
  Twitter, ArrowRight, ChevronRight,
} from 'lucide-react'
import { COMPANY } from '@/lib/data/company'
import { SERVICES } from '@/lib/data/services'
import { INDUSTRIES } from '@/lib/data/industries'

const QUICK_LINKS = [
  { label: 'About Us',         href: '/about' },
  { label: 'Our Projects',     href: '/projects' },
  { label: 'Careers',          href: '/careers' },
  { label: 'Request a Quote',  href: '/request-quote' },
  { label: 'Contact Us',       href: '/contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-alabaster text-ink">
      {/* CTA strip */}
      <div className="border-b border-ghost-white bg-canvas">
        <div className="container-main py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold text-xl text-ink mb-1">
              Ready to start your next project?
            </h3>
            <p className="text-granite text-sm">
              Talk to our engineering team and get a tailored proposal within 48 hours.
            </p>
          </div>
          <Link
            href="/request-quote"
            className="inline-flex items-center gap-2 bg-ink hover:bg-obsidian
                       text-white font-semibold px-7 py-3.5 rounded-full
                       transition-all duration-200 shrink-0"
          >
            Request a Proposal
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-14">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 bg-ink rounded-lg flex items-center justify-center
                              group-hover:bg-obsidian transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                  <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <div>
                <span className="block font-display font-semibold text-lg text-ink leading-tight">
                  Lepton Projects
                </span>
                <span className="block text-2xs text-granite uppercase tracking-widest">Pvt. Ltd.</span>
              </div>
            </Link>

            <p className="text-granite text-sm leading-relaxed mb-6">
              Engineering excellence since {COMPANY.founded}. Delivering complex industrial and
              infrastructure projects across India with precision and accountability.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              <a href={`tel:${COMPANY.phone}`}
                 className="flex items-center gap-2.5 text-sm text-granite hover:text-ink transition-colors">
                <Phone size={14} className="text-granite shrink-0" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`}
                 className="flex items-center gap-2.5 text-sm text-granite hover:text-ink transition-colors">
                <Mail size={14} className="text-granite shrink-0" />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-granite">
                <MapPin size={14} className="text-granite shrink-0 mt-0.5" />
                <span>
                  {COMPANY.address.street},{' '}
                  {COMPANY.address.city} — {COMPANY.address.pin}
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: COMPANY.social.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn' },
                { href: COMPANY.social.twitter,  icon: <Twitter size={16} />,  label: 'Twitter' },
                { href: COMPANY.social.youtube,  icon: <Youtube size={16} />,  label: 'YouTube' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-[6px] bg-ghost-white hover:bg-ink
                             flex items-center justify-center
                             text-granite hover:text-white
                             transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-xs font-medium text-granite uppercase tracking-[0.15em] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map(s => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-1.5 text-sm text-granite
                               hover:text-ink transition-all duration-200"
                  >
                    <ChevronRight size={13} className="text-ink shrink-0" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries column */}
          <div>
            <h4 className="text-xs font-medium text-granite uppercase tracking-[0.15em] mb-4">
              Industries
            </h4>
            <ul className="space-y-2.5">
              {INDUSTRIES.map(i => (
                <li key={i.slug}>
                  <Link
                    href={`/industries#${i.slug}`}
                    className="flex items-center gap-1.5 text-sm text-granite
                               hover:text-ink transition-all duration-200"
                  >
                    <ChevronRight size={13} className="text-ink shrink-0" />
                    {i.title.split(' &')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links + certifications */}
          <div>
            <h4 className="text-xs font-medium text-granite uppercase tracking-[0.15em] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 mb-8">
              {QUICK_LINKS.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-1.5 text-sm text-granite
                               hover:text-ink transition-all duration-200"
                  >
                    <ChevronRight size={13} className="text-ink shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-medium text-granite uppercase tracking-[0.15em] mb-3">
              Certifications
            </h4>
            <div className="flex flex-wrap gap-2">
              {['ISO 9001', 'ISO 14001', 'ISO 45001', 'MSME', 'NSIC'].map(cert => (
                <span
                  key={cert}
                  className="px-2.5 py-1 text-2xs font-medium uppercase tracking-wider
                             bg-ghost-white text-granite rounded-[6px] border border-alabaster"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ghost-white">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-granite">
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Privacy Policy',    href: '/privacy' },
              { label: 'Terms of Service',  href: '/terms' },
              { label: 'Sitemap',           href: '/sitemap.xml' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                    className="text-xs text-granite hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
