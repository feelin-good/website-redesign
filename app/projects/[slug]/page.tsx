import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Calendar, Building2, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { Icon } from '@/components/ui/Icon'
import { CTABanner } from '@/components/sections/CTABanner'
import { PROJECTS, getProjectBySlug } from '@/lib/data/projects'
import { SERVICES } from '@/lib/data/services'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const relatedServices = SERVICES.filter(s => project.services.includes(s.slug))
  const relatedProjects = PROJECTS.filter(p =>
    p.slug !== project.slug && p.category === project.category
  ).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(circle at 60% 40%, rgba(240,90,40,0.12) 0%, transparent 60%)' }} />
        <div className="container-main relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400
                       hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {/* Category badge */}
              <span className="inline-block text-xs font-semibold uppercase tracking-widest
                               text-orange-400 bg-orange-400/10 border border-orange-400/20
                               px-3 py-1 rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="font-display font-extrabold text-white mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1 }}>
                {project.title}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-orange-400" />
                  <strong className="text-white">{project.client}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-orange-400" /> {project.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-orange-400" /> {project.year}
                </span>
              </div>
            </div>

            {/* Right: Project stats */}
            <div className="lg:col-span-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                {project.value && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Project Value</p>
                    <p className="text-2xl font-display font-bold text-orange-400">{project.value}</p>
                  </div>
                )}
                {project.area && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Project Area</p>
                    <p className="text-xl font-semibold text-white">{project.area}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Delivered</p>
                  <p className="text-xl font-semibold text-white">{project.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Highlights */}
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">
                    Project Highlights
                  </h2>
                  <div className="space-y-3">
                    {project.highlights.map(h => (
                      <div key={h}
                           className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl
                                      border border-slate-100">
                        <CheckCircle size={16} className="text-orange-500 mt-0.5 shrink-0" />
                        <span className="text-slate-600 leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Services used */}
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">
                    Services Deployed
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedServices.map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-start gap-3 p-4 rounded-xl border border-slate-100
                                   hover:border-orange-200 hover:bg-orange-50/30 transition-all group"
                      >
                        <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center
                                        group-hover:bg-orange-500 transition-colors shrink-0">
                          <span className="text-orange-500 group-hover:text-white transition-colors">
                            <Icon name={s.icon} size={16} />
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-navy-900 text-sm">{s.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {s.shortDescription}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimateOnScroll animation="slide-left">
                <div className="bg-navy-900 rounded-2xl p-7">
                  <h3 className="font-bold text-white mb-4">Similar Project Requirement?</h3>
                  <p className="text-sm text-slate-300 mb-5">
                    Get a proposal tailored to your project scope within 48 hours.
                  </p>
                  <Link
                    href="/request-quote"
                    className="w-full flex items-center justify-center gap-2
                               bg-orange-500 hover:bg-orange-600 text-white font-semibold
                               py-3.5 rounded-xl transition-colors"
                  >
                    Request Proposal <ArrowRight size={15} />
                  </Link>
                </div>
              </AnimateOnScroll>

              {relatedProjects.length > 0 && (
                <AnimateOnScroll animation="slide-left" delay={100}>
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-navy-900 mb-4 text-sm uppercase tracking-wider">
                      Related Projects
                    </h3>
                    <div className="space-y-4">
                      {relatedProjects.map(p => (
                        <Link key={p.slug} href={`/projects/${p.slug}`}
                              className="block group">
                          <p className="text-sm font-semibold text-navy-800
                                        group-hover:text-orange-500 transition-colors">
                            {p.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {p.location} · {p.year}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABanner variant="orange" />
    </>
  )
}
