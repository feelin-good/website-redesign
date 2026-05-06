import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { getFeaturedProjects } from '@/lib/data/projects'
import { cn } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  Pharmaceuticals: 'bg-purple-50 text-purple-700 border-purple-100',
  Manufacturing:   'bg-blue-50 text-blue-700 border-blue-100',
  'Data Centers':  'bg-cyan-50 text-cyan-700 border-cyan-100',
  Healthcare:      'bg-emerald-50 text-emerald-700 border-emerald-100',
  Infrastructure:  'bg-amber-50 text-amber-700 border-amber-100',
  Commercial:      'bg-slate-50 text-slate-700 border-slate-200',
}

export function FeaturedProjects() {
  const projects = getFeaturedProjects()

  return (
    <section className="section-py bg-canvas">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            tag="Featured Work"
            title="Projects That Define Our Capability"
            description="A selection of landmark projects that demonstrate our engineering depth, delivery track record, and cross-sector expertise."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-granite
                       hover:text-ink shrink-0 transition-colors"
          >
            View all projects <ArrowRight size={15} />
          </Link>
        </div>

        {/* Project grid — first is featured large */}
        <div className="grid lg:grid-cols-12 gap-5">
          {projects.slice(0, 1).map((project) => (
            <AnimateOnScroll key={project.id} animation="fade-up" className="lg:col-span-7">
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full relative overflow-hidden rounded-[40px]
                           min-h-[420px] bg-obsidian
                           border border-white/5 hover:border-white/20
                           transition-all duration-400 shadow-humble"
              >
                <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[420px]">
                  {/* Top badges */}
                  <div className="absolute top-8 left-8 flex items-center gap-2">
                    <span className={cn(
                      'badge border text-xs font-semibold',
                      CATEGORY_COLORS[project.category] || 'bg-ghost-white text-granite border-alabaster'
                    )}>
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="badge bg-white/10 text-white border border-white/20 text-xs">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Top-right icon */}
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-lg bg-white
                                  border border-white flex items-center justify-center
                                  group-hover:bg-ink group-hover:border-ink
                                  transition-all duration-300">
                    <ArrowUpRight size={16} className="text-obsidian group-hover:text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display font-semibold text-white text-2xl mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-white/70" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-white/70" />
                        {project.year}
                      </span>
                      {project.value && (
                        <span className="font-semibold text-white">{project.value}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}

          {/* Right column: 3 smaller cards */}
          <div className="lg:col-span-5 grid gap-5">
            {projects.slice(1, 4).map((project, i) => (
              <AnimateOnScroll key={project.id} animation="slide-left" delay={i * 100}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex gap-4 items-start p-5 rounded-card
                             bg-ghost-white border border-alabaster
                             hover:bg-white hover:shadow-humble
                             transition-all duration-300"
                >
                  {/* Number */}
                  <div className="w-10 h-10 rounded-[6px] bg-ghost-white border border-alabaster
                                  flex items-center justify-center shrink-0
                                  group-hover:bg-ink group-hover:border-ink
                                  transition-all duration-300">
                    <span className="text-sm font-semibold text-granite group-hover:text-white
                                     transition-colors">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className={cn(
                        'text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border',
                        CATEGORY_COLORS[project.category] || 'bg-ghost-white text-granite border-alabaster'
                      )}>
                        {project.category}
                      </span>
                      <ArrowUpRight size={14}
                        className="text-granite group-hover:text-ink shrink-0
                                   transition-colors mt-0.5" />
                    </div>
                    <h3 className="font-semibold text-ink text-sm leading-snug mb-1 line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-2xs text-granite">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {project.location.split(',')[0]}
                      </span>
                      <span>· {project.year}</span>
                      {project.value && <span className="font-semibold text-ink">{project.value}</span>}
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
