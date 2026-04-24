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
      <section className="bg-navy-950 pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-main relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-slate-400
                       hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} /> All Services
          </Link>
          <div className="max-w-3xl">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white">
                <Icon name={service.icon} size={26} />
              </span>
            </div>
            <h1 className="font-display font-extrabold text-white mb-5"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1 }}>
              {service.title}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Features + benefits */}
            <div className="lg:col-span-2 space-y-12">
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">
                    What We Deliver
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map(f => (
                      <div key={f}
                           className="flex items-start gap-3 p-4 rounded-xl bg-slate-50
                                      border border-slate-100">
                        <CheckCircle size={16} className="text-orange-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600 leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">
                    Client Benefits
                  </h2>
                  <div className="space-y-4">
                    {service.benefits.map((b, i) => (
                      <div key={b}
                           className="flex items-start gap-4 p-5 rounded-xl border border-slate-100
                                      hover:border-orange-100 hover:bg-orange-50/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center
                                        justify-center shrink-0 text-sm font-bold text-orange-500">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <p className="text-slate-600 leading-relaxed">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Related Industries */}
              {relatedIndustries.length > 0 && (
                <AnimateOnScroll animation="fade-up">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">
                      Industry Applications
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {relatedIndustries.map(ind => (
                        <Link
                          key={ind.id}
                          href={`/industries#${ind.slug}`}
                          className="flex items-center gap-3 p-4 rounded-xl bg-white border
                                     border-slate-100 hover:border-orange-200 hover:shadow-md
                                     transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center
                                          justify-center group-hover:bg-orange-500 transition-colors">
                            <span className="text-orange-500 group-hover:text-white transition-colors">
                              <Icon name={ind.icon} size={18} />
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-navy-900 text-sm">{ind.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
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
                <div className="bg-navy-900 rounded-2xl p-7 border border-navy-800">
                  <h3 className="font-display font-bold text-lg text-white mb-3">
                    Need {service.title}?
                  </h3>
                  <p className="text-sm text-slate-300 mb-5">
                    Get a detailed proposal from our engineering team within 48 hours.
                  </p>
                  <Link
                    href="/request-quote"
                    className="w-full flex items-center justify-center gap-2
                               bg-orange-500 hover:bg-orange-600 text-white font-semibold
                               py-3.5 rounded-xl transition-colors duration-200"
                  >
                    Request Proposal <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2
                               border border-white/20 text-white/80 hover:text-white font-medium
                               py-3 rounded-xl transition-colors mt-2.5 text-sm"
                  >
                    Talk to an Engineer
                  </Link>
                </div>
              </AnimateOnScroll>

              {/* Other services */}
              <AnimateOnScroll animation="slide-left" delay={100}>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-navy-900 mb-4 text-sm uppercase tracking-wider">
                    Other Services
                  </h3>
                  <div className="space-y-3">
                    {otherServices.map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100
                                        flex items-center justify-center text-slate-400
                                        group-hover:border-orange-200 group-hover:text-orange-500
                                        transition-all shrink-0">
                          <Icon name={s.icon} size={15} />
                        </div>
                        <span className="text-sm text-slate-600 group-hover:text-navy-900
                                         transition-colors">
                          {s.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    className="flex items-center gap-1.5 text-sm font-semibold text-orange-500
                               hover:text-orange-600 transition-colors mt-4"
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
