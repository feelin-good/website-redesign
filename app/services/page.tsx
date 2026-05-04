import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { CTABanner } from '@/components/sections/CTABanner'
import { SERVICES } from '@/lib/data/services'

export const metadata: Metadata = {
  title: 'Engineering Services',
  description:
    'Comprehensive engineering services: MEP, structural, civil, process engineering, project management, and EPC turnkey — delivered by Lepton Projects.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ghost-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-granite
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-granite rounded-full" />
              Our Services
            </span>
            <h1 className="font-display font-semibold text-ink mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              End-to-End Engineering, <br />One Trusted Team
            </h1>
            <p className="text-xl text-granite leading-relaxed max-w-2xl">
              From concept and detailed design to EPC execution and commissioning — Lepton
              delivers seamlessly integrated engineering services across six core disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="section-py bg-ghost-white">
        <div className="container-main">
          <div className="space-y-8">
            {SERVICES.map((service, i) => (
              <AnimateOnScroll key={service.id} animation="fade-up" delay={i * 60}>
                <div className="bg-white rounded-[30px] border border-alabaster shadow-humble
                                overflow-hidden hover:shadow-[0_40px_40px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
                  <div className="grid lg:grid-cols-12 gap-0">
                    {/* Left accent + icon */}
                    <div className="lg:col-span-1 bg-ink flex items-center justify-center
                                    py-6 lg:py-0 px-5">
                      <div className="text-white">
                        <Icon name={service.icon} size={28} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-11 p-7 lg:p-9 grid md:grid-cols-3 gap-8">
                      {/* Title + description */}
                      <div className="md:col-span-1">
                        <span className="text-2xs font-semibold uppercase tracking-widest
                                         text-ink mb-2 block">
                          Service {String(i + 1).padStart(2, '0')}
                        </span>
                        <h2 className="font-display font-semibold text-xl text-ink mb-3">
                          {service.title}
                        </h2>
                        <p className="text-granite text-sm leading-relaxed mb-5">
                          {service.shortDescription}
                        </p>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold
                                     text-ink hover:text-granite transition-colors
                                     hover:gap-3 duration-200"
                        >
                          Full details <ArrowRight size={14} />
                        </Link>
                      </div>

                      {/* Features */}
                      <div className="md:col-span-1">
                        <p className="text-xs font-semibold uppercase tracking-widest
                                       text-granite mb-3">
                          Key Capabilities
                        </p>
                        <ul className="space-y-2">
                          {service.features.slice(0, 5).map(f => (
                            <li key={f} className="flex items-start gap-2 text-sm text-granite">
                              <CheckCircle size={14} className="text-ink mt-0.5 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits + industries */}
                      <div className="md:col-span-1">
                        <p className="text-xs font-semibold uppercase tracking-widest
                                       text-slate-400 mb-3">
                          Client Benefits
                        </p>
                        <ul className="space-y-2 mb-5">
                          {service.benefits.map(b => (
                            <li key={b} className="flex items-start gap-2 text-sm text-granite">
                              <span className="w-1.5 h-1.5 rounded-full bg-granite mt-1.5 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs font-semibold uppercase tracking-widest
                                       text-slate-400 mb-2">
                          Key Sectors
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.relatedIndustries.map(ind => (
                            <span key={ind}
                                  className="text-2xs font-semibold px-2.5 py-1 rounded-full
                                             bg-ghost-white text-navy-600 border border-alabaster
                                             capitalize">
                              {ind.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        variant="orange"
        title="Which Service Do You Need?"
        description="Our team will help you identify the right engineering scope for your project and provide a detailed, no-obligation proposal."
        primaryLabel="Request a Proposal"
        primaryHref="/request-quote"
        secondaryLabel="Contact Our Team"
        secondaryHref="/contact"
      />
    </>
  )
}
