'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CTABanner } from '@/components/sections/CTABanner'
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/data/projects'
import { cn } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  Pharmaceuticals: 'bg-ghost text-obsidian border-alabaster',
  Manufacturing:   'bg-ghost text-obsidian border-alabaster',
  'Data Centers':  'bg-ghost text-obsidian border-alabaster',
  Healthcare:      'bg-ghost text-obsidian border-alabaster',
  Infrastructure:  'bg-ghost text-obsidian border-alabaster',
  Commercial:      'bg-ghost text-obsidian border-alabaster',
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

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
              Project Portfolio
            </span>
            <h1 className="font-display font-semibold text-obsidian mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              500+ Projects. Every One Delivered.
            </h1>
            <p className="text-xl text-granite leading-relaxed max-w-2xl">
              A portfolio built on technical precision, schedule discipline, and an unwavering
              commitment to client satisfaction across six major industry verticals.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-py bg-alabaster">
        <div className="container-main">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-ink text-canvas shadow-lab'
                    : 'bg-canvas text-granite border border-alabaster hover:border-obsidian/20 hover:text-obsidian'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <AnimateOnScroll key={project.id} animation="fade-up" delay={i * 60}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full bg-canvas rounded-card shadow-lab
                             hover:-translate-y-1
                             overflow-hidden transition-all duration-300"
                >
                  {/* Gradient image placeholder */}
                  <div className="h-44 bg-ghost relative overflow-hidden">
                    <div className="absolute inset-0 bg-lab-dots opacity-70" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        'text-xs font-semibold px-2.5 py-1 rounded-full border',
                        CATEGORY_COLORS[project.category]
                      )}>
                        {project.category}
                      </span>
                    </div>
                    {/* Link icon */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-control
                                    bg-canvas/80 border border-alabaster flex items-center justify-center
                                    group-hover:bg-ink group-hover:border-ink transition-all">
                      <ArrowUpRight size={15} className="text-obsidian group-hover:text-canvas" />
                    </div>
                    {/* Value */}
                    {project.value && (
                      <div className="absolute bottom-4 right-4 text-sm font-bold text-obsidian/80">
                        {project.value}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="font-display font-semibold text-base text-obsidian mb-2 leading-snug
                                   group-hover:text-electric transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-obsidian font-medium mb-3">{project.client}</p>
                    <p className="text-sm text-granite leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-granite pt-4
                                    border-t border-alabaster">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-electric" />
                        {project.location.split(',')[0]}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-electric" />
                        {project.year}
                      </span>
                      {project.area && (
                        <span className="ml-auto font-medium text-obsidian">{project.area}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        variant="navy"
        title="Want to See Your Project in This Portfolio?"
        description="Let's discuss how Lepton's engineering capabilities can bring your project to life — on time, on budget, and to the highest technical standards."
      />
    </>
  )
}
