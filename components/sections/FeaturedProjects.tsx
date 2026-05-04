import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { getFeaturedProjects } from '@/lib/data/projects'
import { cn } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  Pharmaceuticals: 'bg-canvas/10 text-canvas border-canvas/20',
  Manufacturing:   'bg-canvas/10 text-canvas border-canvas/20',
  'Data Centers':  'bg-canvas/10 text-canvas border-canvas/20',
  Healthcare:      'bg-canvas/10 text-canvas border-canvas/20',
  Infrastructure:  'bg-canvas/10 text-canvas border-canvas/20',
  Commercial:      'bg-canvas/10 text-canvas border-canvas/20',
}

export function FeaturedProjects() {
  const projects = getFeaturedProjects()

  return (
    <section className="section-py bg-ink">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            tag="Featured Work"
            title="Projects That Define Our Capability"
            description="A selection of landmark projects that demonstrate our engineering depth, delivery track record, and cross-sector expertise."
            theme="dark"
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-canvas
                       hover:text-electric shrink-0 transition-colors"
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
                className="group block h-full relative overflow-hidden rounded-image
                           min-h-[420px] bg-gradient-to-br from-ink to-obsidian
                           border border-canvas/10 hover:border-electric/30
                           transition-all duration-400"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20 bg-lab-grid" />

                {/* Geometric accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border border-electric/10
                                rounded-full" />
                <div className="absolute -top-20 -right-20 w-60 h-60 border border-electric/5
                                rounded-full" />

                <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[420px]">
                  {/* Top badges */}
                  <div className="absolute top-8 left-8 flex items-center gap-2">
                    <span className={cn(
                      'badge border text-xs font-semibold',
                      CATEGORY_COLORS[project.category] || 'bg-canvas/10 text-canvas border-canvas/20'
                    )}>
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="badge bg-canvas/10 text-canvas border border-canvas/20 text-xs">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Top-right icon */}
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-control bg-canvas/10
                                  border border-canvas/20 flex items-center justify-center
                                  group-hover:bg-electric group-hover:border-electric
                                  transition-all duration-300">
                    <ArrowUpRight size={16} className="text-canvas" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display font-semibold text-canvas text-2xl mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-canvas/70 text-sm leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-canvas/60">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-electric" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-electric" />
                        {project.year}
                      </span>
                      {project.value && (
                        <span className="font-semibold text-canvas">{project.value}</span>
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
                             bg-canvas/5 border border-canvas/10
                             hover:bg-canvas/10 hover:border-electric/30
                             transition-all duration-300"
                >
                  {/* Number */}
                  <div className="w-10 h-10 rounded-control bg-electric/15 border border-electric/20
                                  flex items-center justify-center shrink-0
                                  group-hover:bg-electric group-hover:border-electric
                                  transition-all duration-300">
                    <span className="text-sm font-bold text-canvas/80 group-hover:text-canvas
                                     transition-colors">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className={cn(
                        'text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-control border',
                        CATEGORY_COLORS[project.category] || 'bg-canvas/10 text-canvas'
                      )}>
                        {project.category}
                      </span>
                      <ArrowUpRight size={14}
                        className="text-canvas/60 group-hover:text-electric shrink-0
                                   transition-colors mt-0.5" />
                    </div>
                    <h3 className="font-semibold text-canvas text-sm leading-snug mb-1 line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-2xs text-canvas/60">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {project.location.split(',')[0]}
                      </span>
                      <span>· {project.year}</span>
                      {project.value && <span className="font-semibold text-canvas/80">{project.value}</span>}
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
