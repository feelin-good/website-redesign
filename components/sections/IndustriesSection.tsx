import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { INDUSTRIES } from '@/lib/data/industries'

export function IndustriesSection() {
  return (
    <section className="section-py bg-ghost-white">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            tag="Industries We Serve"
            title="Material Handling Solutions for India's Core Industries"
            description="From limestone quarries and steel mills to port terminals and thermal power stations — Lepton delivers bulk material handling systems built for each sector's specific demands."
          />
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-medium text-granite
                       hover:text-ink shrink-0 transition-colors"
          >
            Explore all industries <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry, i) => (
            <AnimateOnScroll key={industry.id} animation="fade-up" delay={i * 70}>
              <Link
                href={`/industries#${industry.slug}`}
                className="group flex flex-col h-full p-8 rounded-card border border-alabaster
                           bg-canvas hover:bg-white hover:shadow-humble
                           transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-[6px] bg-ghost-white group-hover:bg-ink
                               flex items-center justify-center mb-5
                               text-ink group-hover:text-white
                               transition-all duration-300">
                  <Icon name={industry.icon} size={22} />
                </div>

                <h3 className="font-display font-semibold text-lg text-ink mb-2.5">
                  {industry.title}
                </h3>
                <p className="text-granite text-sm leading-relaxed mb-5 flex-1">
                  {industry.shortDescription}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {industry.highlights.slice(0, 2).map(h => (
                    <li key={h} className="flex items-start gap-2 text-xs text-granite">
                      <span className="w-1 h-1 rounded-full bg-granite/40 mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 text-sm font-medium text-electric-orange
                                transition-colors">
                  Learn more <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
