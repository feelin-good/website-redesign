import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { CTABanner } from '@/components/sections/CTABanner'
import { INDUSTRIES } from '@/lib/data/industries'
import { SERVICES } from '@/lib/data/services'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Lepton Projects delivers engineering excellence across pharma, manufacturing, data centers, healthcare, power & energy, and commercial real estate sectors in India.',
}

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-lab-grid opacity-70" />
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-electric
                             uppercase tracking-[0.22em] mb-4 font-label">
              <span className="w-6 h-0.5 bg-electric rounded-full" />
              Industries
            </span>
            <h1 className="font-display font-semibold text-obsidian mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              Deep Domain Expertise Across Critical Sectors
            </h1>
            <p className="text-xl text-granite leading-relaxed max-w-2xl">
              Every industry has its own standards, regulations, and engineering challenges.
              Lepton brings specialised expertise and a proven delivery track record to each.
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-py bg-alabaster">
        <div className="container-main">
          <div className="space-y-24">
            {INDUSTRIES.map((industry, i) => {
              const relatedServices = SERVICES.filter(s =>
                industry.services.includes(s.slug)
              )
              const isEven = i % 2 === 0

              return (
                <div key={industry.id} id={industry.slug}>
                  <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start
                                   ${!isEven ? 'lg:[&>*:first-child]:order-last' : ''}`}>

                    {/* Content */}
                    <AnimateOnScroll animation={isEven ? 'slide-right' : 'slide-left'}>
                      <div>
                        {/* Icon + badge */}
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-13 h-13 bg-ink rounded-control
                                          flex items-center justify-center p-3.5">
                            <span className="text-canvas">
                              <Icon name={industry.icon} size={22} />
                            </span>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest
                                           text-electric bg-ghost border border-alabaster font-label
                                           px-3 py-1 rounded-full">
                            Industry {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h2 className="font-display font-semibold text-obsidian mb-3"
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                          {industry.title}
                        </h2>
                        <p className="text-granite leading-relaxed mb-6">
                          {industry.description}
                        </p>

                        {/* Key highlights */}
                        <div className="space-y-3 mb-8">
                          {industry.highlights.map(h => (
                            <div key={h} className="flex items-start gap-2.5">
                              <CheckCircle size={16} className="text-electric mt-0.5 shrink-0" />
                              <span className="text-sm text-granite">{h}</span>
                            </div>
                          ))}
                        </div>

                        {/* Related services */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest
                                         text-granite mb-3 font-label">
                            Engineering Services for This Sector
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {relatedServices.map(s => (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                className="flex items-center gap-1.5 text-sm font-medium
                                           text-obsidian bg-ghost border border-alabaster
                                           px-3.5 py-1.5 rounded-full
                                           hover:border-obsidian/20 hover:text-obsidian
                                           transition-all duration-200"
                              >
                                <Icon name={s.icon} size={13} />
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AnimateOnScroll>

                    {/* Visual panel */}
                    <AnimateOnScroll animation={isEven ? 'slide-left' : 'slide-right'}>
                      <div className="bg-ghost rounded-image p-8 min-h-[400px] flex flex-col justify-between
                                      shadow-lab relative overflow-hidden">
                        <div className="absolute inset-0 bg-lab-dots opacity-60" />

                        {/* Large icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <span style={{ fontSize: '12rem', color: '#1c1c1c' }}>
                            <Icon name={industry.icon} size={192} />
                          </span>
                        </div>

                        <div className="relative z-10">
                          <span className="text-xs font-semibold uppercase tracking-[0.22em]
                                           text-granite font-label">
                            {industry.title}
                          </span>
                        </div>

                        <div className="relative z-10 space-y-3">
                          <p className="text-2xl font-display font-semibold text-obsidian">
                            {industry.shortDescription}
                          </p>

                          <Link
                            href="/request-quote"
                            className="inline-flex items-center gap-2 bg-ink hover:bg-obsidian
                                       text-canvas font-semibold px-5 py-2.5 rounded-pill
                                       transition-colors text-sm shadow-lab"
                          >
                            Discuss a Project <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  </div>

                  {/* Divider */}
                  {i < INDUSTRIES.length - 1 && (
                    <div className="mt-24 border-t border-alabaster" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CTABanner
        variant="gradient"
        title="Engineering Solutions for Your Industry"
        description="Whatever your sector, Lepton brings the right expertise, the right standards, and the right team to deliver your engineering project."
      />
    </>
  )
}
