'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CTABanner } from '@/components/sections/CTABanner'
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/data/projects'
import { cn } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  Pharmaceuticals: 'bg-purple-50 text-purple-700 border-purple-100',
  Manufacturing:   'bg-blue-50 text-blue-700 border-blue-100',
  'Data Centers':  'bg-cyan-50 text-cyan-700 border-cyan-100',
  Healthcare:      'bg-emerald-50 text-emerald-700 border-emerald-100',
  Infrastructure:  'bg-amber-50 text-amber-700 border-amber-100',
  Commercial:      'bg-ghost-white text-ink border-alabaster',
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="bg-ghost-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-granite
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-granite rounded-full" />
              Project Portfolio
            </span>
            <h1 className="font-display font-semibold text-ink mb-5"
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
      <section className="section-py bg-ghost-white">
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
                    ? 'bg-ink text-white shadow-humble'
                    : 'bg-white text-granite border border-alabaster hover:border-granite/30 hover:text-ink'
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
                  className="group block h-full bg-white rounded-card border border-alabaster
                             shadow-humble hover:shadow-[0_40px_40px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1
                             overflow-hidden transition-all duration-300"
                >
                  {/* Gradient image placeholder */}
                  <div className="h-44 bg-gradient-to-br from-obsidian to-obsidian relative overflow-hidden">
                    <div className="absolute inset-0"
                         style={{
                           backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,64,0,0.15) 0%, transparent 60%)',
                         }} />
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
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-xl
                                    bg-white/10 border border-white/20 flex items-center justify-center
                                    group-hover:bg-ink group-hover:border-orange-500 transition-all">
                      <ArrowUpRight size={15} className="text-white" />
                    </div>
                    {/* Value */}
                    {project.value && (
                      <div className="absolute bottom-4 right-4 text-sm font-bold text-white/80">
                        {project.value}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="font-display font-bold text-base text-navy-900 mb-2 leading-snug
                                   group-hover:text-orange-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-navy-600 font-medium mb-3">{project.client}</p>
                    <p className="text-sm text-granite leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-4
                                    border-t border-slate-50">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-orange-400" />
                        {project.location.split(',')[0]}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-orange-400" />
                        {project.year}
                      </span>
                      {project.area && (
                        <span className="ml-auto font-medium text-navy-600">{project.area}</span>
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
