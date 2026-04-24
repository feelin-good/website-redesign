import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { INDUSTRIES } from '@/lib/data/industries'

const INDUSTRY_BG_CLASSES = [
  'hover:border-purple-200 hover:bg-purple-50/50',
  'hover:border-blue-200 hover:bg-blue-50/50',
  'hover:border-cyan-200 hover:bg-cyan-50/50',
  'hover:border-emerald-200 hover:bg-emerald-50/50',
  'hover:border-amber-200 hover:bg-amber-50/50',
  'hover:border-slate-200 hover:bg-slate-50/80',
]

const ICON_COLORS = [
  'text-purple-500 bg-purple-50 group-hover:bg-purple-500',
  'text-blue-500 bg-blue-50 group-hover:bg-blue-500',
  'text-cyan-500 bg-cyan-50 group-hover:bg-cyan-500',
  'text-emerald-500 bg-emerald-50 group-hover:bg-emerald-500',
  'text-amber-500 bg-amber-50 group-hover:bg-amber-500',
  'text-slate-500 bg-slate-100 group-hover:bg-slate-500',
]

export function IndustriesSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            tag="Industries We Serve"
            title="Engineering Solutions Across Critical Sectors"
            description="Deep domain expertise across six high-impact industries, each with its own regulatory landscape, technical challenges, and quality standards."
          />
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500
                       hover:text-orange-600 shrink-0 transition-colors"
          >
            Explore all industries <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry, i) => (
            <AnimateOnScroll key={industry.id} animation="fade-up" delay={i * 70}>
              <Link
                href={`/industries#${industry.slug}`}
                className={`group flex flex-col h-full p-7 rounded-2xl border border-slate-100
                            transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                            ${INDUSTRY_BG_CLASSES[i % INDUSTRY_BG_CLASSES.length]}`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5
                                  transition-all duration-300 group-hover:text-white
                                  ${ICON_COLORS[i % ICON_COLORS.length]}`}>
                  <Icon name={industry.icon} size={22} />
                </div>

                <h3 className="font-display font-bold text-lg text-navy-900 mb-2.5">
                  {industry.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                  {industry.shortDescription}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {industry.highlights.slice(0, 2).map(h => (
                    <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 mt-5 text-sm font-semibold text-navy-600
                                group-hover:text-orange-500 transition-colors">
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
