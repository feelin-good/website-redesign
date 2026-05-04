import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { SERVICES } from '@/lib/data/services'

export function ServicesOverview() {
  return (
    <section className="section-py bg-canvas">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            tag="What We Do"
            title="End-to-End Engineering Services"
            description="From concept and detailed design through to EPC execution and commissioning — one team, one standard of excellence."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-granite
                       hover:text-ink shrink-0 transition-colors"
          >
            All Services <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <AnimateOnScroll key={service.id} animation="fade-up" delay={i * 80}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col h-full bg-white rounded-card border border-ghost-white
                           shadow-humble hover:shadow-[0_40px_40px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-0.5
                           transition-all duration-300 overflow-hidden"
              >
                <div className="p-7 flex flex-col flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-[6px] bg-ghost-white group-hover:bg-ink
                                  flex items-center justify-center mb-5
                                  transition-colors duration-300">
                    <span className="text-ink group-hover:text-white transition-colors duration-300">
                      <Icon name={service.icon} size={22} />
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-base text-ink mb-2.5
                                 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-granite text-sm leading-relaxed mb-5 flex-1">
                    {service.shortDescription}
                  </p>

                  {/* Feature bullets */}
                  <ul className="space-y-1.5 mb-6">
                    {service.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-granite">
                        <span className="w-1 h-1 rounded-full bg-granite/50 mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Read more */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-ink
                                  transition-all duration-200">
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
