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
  const bgClass = {
    orange:   'bg-electric-orange',
    navy:     'bg-obsidian',
    gradient: 'bg-ink',
  }[variant]

  return (
    <section className={`${bgClass} py-16 lg:py-20 relative overflow-hidden`}>
      <div className="container-main relative z-10">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-semibold text-white mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              {title}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 bg-white text-ink
                           font-semibold px-8 py-4 rounded-full
                           hover:bg-white/90 transition-all duration-200"
              >
                {primaryLabel}
                <ArrowRight size={16} />
              </Link>

              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 border border-white/20 text-white
                           font-semibold px-8 py-4 rounded-full
                           hover:bg-white/10 transition-all duration-200"
              >
                {secondaryLabel}
              </Link>
            </div>

            {showPhone && (
              <div className="mt-6 flex items-center justify-center gap-2 text-white/60 text-sm">
                <Phone size={14} />
                Or call us directly:
                <a href={`tel:${COMPANY.phone}`}
                   className="text-white font-semibold hover:text-white/80 transition-colors">
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
