import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { INDUSTRIES } from '@/lib/data/industries'

const INDUSTRY_BG_CLASSES = [
  'hover:bg-ghost',
  'hover:bg-alabaster',
  'hover:bg-ghost',
  'hover:bg-alabaster',
  'hover:bg-ghost',
  'hover:bg-alabaster',
]

const ICON_COLORS = [
  'text-electric bg-canvas group-hover:bg-ink group-hover:text-canvas',
  'text-electric bg-canvas group-hover:bg-ink group-hover:text-canvas',
  'text-electric bg-canvas group-hover:bg-ink group-hover:text-canvas',
  'text-electric bg-canvas group-hover:bg-ink group-hover:text-canvas',
  'text-electric bg-canvas group-hover:bg-ink group-hover:text-canvas',
  'text-electric bg-canvas group-hover:bg-ink group-hover:text-canvas',
]

export function IndustriesSection() {
  return (
    <section className="section-py bg-canvas">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            tag="Industries We Serve"
            title="Engineering Solutions Across Critical Sectors"
            description="Deep domain expertise across six high-impact industries, each with its own regulatory landscape, technical challenges, and quality standards."
          />
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-electric
                       hover:text-obsidian shrink-0 transition-colors"
          >
            Explore all industries <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry, i) => (
            <AnimateOnScroll key={industry.id} animation="fade-up" delay={i * 70}>
              <Link
                href={`/industries#${industry.slug}`}
                className={`group flex flex-col h-full p-7 rounded-card bg-ghost shadow-lab
                            transition-all duration-300 hover:-translate-y-1
                            ${INDUSTRY_BG_CLASSES[i % INDUSTRY_BG_CLASSES.length]}`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-control flex items-center justify-center mb-5
                                  transition-all duration-300 group-hover:text-canvas
                                  ${ICON_COLORS[i % ICON_COLORS.length]}`}>
                  <Icon name={industry.icon} size={22} />
                </div>

                <h3 className="font-display font-semibold text-lg text-obsidian mb-2.5">
                  {industry.title}
                </h3>
                <p className="text-granite text-sm leading-relaxed mb-5 flex-1">
                  {industry.shortDescription}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {industry.highlights.slice(0, 2).map(h => (
                    <li key={h} className="flex items-start gap-2 text-xs text-granite">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric mt-1 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 mt-5 text-sm font-semibold text-obsidian
                                group-hover:text-electric transition-colors">
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
