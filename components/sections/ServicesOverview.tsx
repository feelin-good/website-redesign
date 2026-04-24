import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { SERVICES } from '@/lib/data/services'

export function ServicesOverview() {
  return (
    <section className="section-py bg-slate-50">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            tag="What We Do"
            title="End-to-End Engineering Services"
            description="From concept and detailed design through to EPC execution and commissioning — one team, one standard of excellence."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500
                       hover:text-orange-600 shrink-0 transition-colors"
          >
            All Services <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <AnimateOnScroll key={service.id} animation="fade-up" delay={i * 80}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100
                           shadow-card hover:shadow-card-hover hover:-translate-y-1
                           transition-all duration-300 overflow-hidden"
              >
                {/* Accent bar */}
                <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-400
                                transform origin-left scale-x-0 group-hover:scale-x-100
                                transition-transform duration-300" />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-orange-500
                                  flex items-center justify-center mb-5
                                  transition-colors duration-300">
                    <span className="text-orange-500 group-hover:text-white transition-colors duration-300">
                      <Icon name={service.icon} size={22} />
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-lg text-navy-900 mb-2.5
                                 group-hover:text-navy-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                    {service.shortDescription}
                  </p>

                  {/* Feature bullets */}
                  <ul className="space-y-1.5 mb-6">
                    {service.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Read more */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-500
                                  group-hover:gap-3 transition-all duration-200">
                    Learn more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
