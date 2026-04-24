'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react'
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
  Commercial:      'bg-slate-50 text-slate-700 border-slate-200',
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-orange-400 rounded-full" />
              Project Portfolio
            </span>
            <h1 className="font-display font-extrabold text-white mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              500+ Projects. Every One Delivered.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
              A portfolio built on technical precision, schedule discipline, and an unwavering
              commitment to client satisfaction across six major industry verticals.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-py bg-slate-50">
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
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-200 hover:text-orange-500'
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
                  className="group block h-full bg-white rounded-2xl border border-slate-100
                             shadow-card hover:shadow-card-hover hover:-translate-y-1
                             overflow-hidden transition-all duration-300"
                >
                  {/* Gradient image placeholder */}
                  <div className="h-44 bg-gradient-to-br from-navy-800 to-navy-900 relative overflow-hidden">
                    <div className="absolute inset-0"
                         style={{
                           backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(240,90,40,0.25) 0%, transparent 60%)',
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
                                    group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
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
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
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
