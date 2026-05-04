import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { CTABanner } from '@/components/sections/CTABanner'
import { SERVICES, getServiceBySlug } from '@/lib/data/services'
import { INDUSTRIES } from '@/lib/data/industries'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Lepton Projects`,
      description: service.shortDescription,
    },
  }
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const relatedIndustries = INDUSTRIES.filter(ind =>
    service.relatedIndustries.includes(ind.id)
  )

  const otherServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-lab-grid opacity-70" />
        <div className="container-main relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-granite
                       hover:text-obsidian transition-colors mb-6"
          >
            <ArrowLeft size={14} /> All Services
          </Link>
          <div className="max-w-3xl">
            <div className="w-14 h-14 bg-ink rounded-card flex items-center justify-center mb-6">
              <span className="text-canvas">
                <Icon name={service.icon} size={26} />
              </span>
            </div>
            <h1 className="font-display font-semibold text-obsidian mb-5"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1 }}>
              {service.title}
            </h1>
            <p className="text-xl text-granite leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py bg-canvas">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Features + benefits */}
            <div className="lg:col-span-2 space-y-12">
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-semibold text-2xl text-obsidian mb-6">
                    What We Deliver
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map(f => (
                      <div key={f}
                           className="flex items-start gap-3 p-4 rounded-card bg-ghost shadow-lab">
                        <CheckCircle size={16} className="text-electric mt-0.5 shrink-0" />
                        <span className="text-sm text-granite leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-semibold text-2xl text-obsidian mb-6">
                    Client Benefits
                  </h2>
                  <div className="space-y-4">
                    {service.benefits.map((b, i) => (
                      <div key={b}
                           className="flex items-start gap-4 p-5 rounded-card bg-ghost shadow-lab transition-colors">
                        <div className="w-8 h-8 rounded-control bg-canvas flex items-center
                                        justify-center shrink-0 text-sm font-bold text-electric">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <p className="text-granite leading-relaxed">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Related Industries */}
              {relatedIndustries.length > 0 && (
                <AnimateOnScroll animation="fade-up">
                  <div>
                    <h2 className="font-display font-semibold text-2xl text-obsidian mb-6">
                      Industry Applications
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {relatedIndustries.map(ind => (
                        <Link
                          key={ind.id}
                          href={`/industries#${ind.slug}`}
                          className="flex items-center gap-3 p-4 rounded-card bg-canvas border
                                     border-alabaster shadow-lab transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-ghost rounded-control flex items-center
                                          justify-center group-hover:bg-ink transition-colors">
                            <span className="text-electric group-hover:text-canvas transition-colors">
                              <Icon name={ind.icon} size={18} />
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-obsidian text-sm">{ind.title}</p>
                            <p className="text-xs text-granite mt-0.5 line-clamp-1">
                              {ind.shortDescription}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              {/* Quick CTA */}
              <AnimateOnScroll animation="slide-left">
                <div className="bg-ink rounded-card p-7 shadow-lab">
                  <h3 className="font-display font-semibold text-lg text-canvas mb-3">
                    Need {service.title}?
                  </h3>
                  <p className="text-sm text-canvas/70 mb-5">
                    Get a detailed proposal from our engineering team within 48 hours.
                  </p>
                  <Link
                    href="/request-quote"
                    className="w-full flex items-center justify-center gap-2
                               bg-canvas hover:bg-ghost text-ink font-semibold
                               py-3.5 rounded-pill transition-colors duration-200 shadow-lab"
                  >
                    Request Proposal <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2
                               border border-canvas/20 text-canvas/70 hover:text-canvas font-medium
                               py-3 rounded-pill transition-colors mt-2.5 text-sm"
                  >
                    Talk to an Engineer
                  </Link>
                </div>
              </AnimateOnScroll>

              {/* Other services */}
              <AnimateOnScroll animation="slide-left" delay={100}>
                <div className="bg-ghost rounded-card p-6 shadow-lab">
                  <h3 className="font-semibold text-obsidian mb-4 text-sm uppercase tracking-[0.22em] font-label">
                    Other Services
                  </h3>
                  <div className="space-y-3">
                    {otherServices.map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-control bg-canvas border border-alabaster
                                        flex items-center justify-center text-granite
                                        group-hover:border-obsidian/20 group-hover:text-electric
                                        transition-all shrink-0">
                          <Icon name={s.icon} size={15} />
                        </div>
                        <span className="text-sm text-granite group-hover:text-obsidian
                                         transition-colors">
                          {s.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    className="flex items-center gap-1.5 text-sm font-semibold text-electric
                               hover:text-obsidian transition-colors mt-4"
                  >
                    All services <ArrowRight size={13} />
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        variant="gradient"
        title={`Ready to Start Your ${service.title} Project?`}
        description="Our specialists are ready to scope your requirements and deliver a proposal tailored to your project."
      />
    </>
  )
}
