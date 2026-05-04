import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { COMPANY } from '@/lib/data/company'

interface CTABannerProps {
  variant?: 'orange' | 'navy' | 'gradient'
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  showPhone?: boolean
}

export function CTABanner({
  variant = 'orange',
  title = 'Ready to Discuss Your Project?',
  description = 'Talk to our engineering team and receive a detailed proposal tailored to your project requirements — within 48 hours.',
  primaryLabel = 'Request a Proposal',
  primaryHref = '/request-quote',
  secondaryLabel = 'View Our Services',
  secondaryHref = '/services',
  showPhone = true,
}: CTABannerProps) {
  const isDark = variant !== 'gradient'
  const bgClass = {
    orange:   'bg-ink',
    navy:     'bg-ink',
    gradient: 'bg-alabaster',
  }[variant]

  return (
    <section className={`${bgClass} py-16 lg:py-20 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-lab-dots opacity-70" />

      <div className="container-main relative z-10">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`font-display font-semibold mb-4 text-balance ${isDark ? 'text-canvas' : 'text-obsidian'}`}
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              {title}
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-canvas/70' : 'text-granite'}`}>
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href={primaryHref}
                className={`inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-pill
                           transition-all duration-200 shadow-lab
                           ${isDark ? 'bg-canvas text-ink hover:bg-ghost' : 'bg-ink text-canvas hover:bg-obsidian'}`}
              >
                {primaryLabel}
                <ArrowRight size={16} />
              </Link>

              <Link
                href={secondaryHref}
                className={`inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-pill
                           transition-all duration-200
                           ${isDark
                             ? 'border border-canvas/30 text-canvas hover:bg-canvas/10'
                             : 'border border-alabaster text-obsidian hover:bg-ghost'}`}
              >
                {secondaryLabel}
              </Link>
            </div>

            {showPhone && (
              <div className={`mt-6 flex items-center justify-center gap-2 text-sm ${isDark ? 'text-canvas/60' : 'text-granite'}`}>
                <Phone size={14} />
                Or call us directly:
                <a href={`tel:${COMPANY.phone}`}
                   className={`font-semibold transition-colors ${isDark ? 'text-canvas hover:text-electric' : 'text-obsidian hover:text-electric'}`}>
                  {COMPANY.phone}
                </a>
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
