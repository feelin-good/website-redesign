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
      <section className="bg-canvas pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-lab-grid opacity-70" />
        <div className="container-main relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-granite
                       hover:text-obsidian transition-colors mb-8"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {/* Category badge */}
              <span className="inline-block text-xs font-semibold uppercase tracking-widest
                               text-electric bg-ghost border border-electric/20 font-label
                               px-3 py-1 rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="font-display font-semibold text-obsidian mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1 }}>
                {project.title}
              </h1>
              <p className="text-lg text-granite leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-granite">
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-electric" />
                  <strong className="text-obsidian">{project.client}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-electric" /> {project.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-electric" /> {project.year}
                </span>
              </div>
            </div>

            {/* Right: Project stats */}
            <div className="lg:col-span-4">
              <div className="bg-ghost rounded-card p-6 space-y-4 shadow-lab">
                {project.value && (
                  <div>
                    <p className="text-xs text-granite uppercase tracking-[0.22em] mb-1 font-label">Project Value</p>
                    <p className="text-2xl font-display font-semibold text-obsidian">{project.value}</p>
                  </div>
                )}
                {project.area && (
                  <div>
                    <p className="text-xs text-granite uppercase tracking-[0.22em] mb-1 font-label">Project Area</p>
                    <p className="text-xl font-semibold text-obsidian">{project.area}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-granite uppercase tracking-[0.22em] mb-1 font-label">Delivered</p>
                  <p className="text-xl font-semibold text-obsidian">{project.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-canvas">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Highlights */}
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-semibold text-2xl text-obsidian mb-6">
                    Project Highlights
                  </h2>
                  <div className="space-y-3">
                    {project.highlights.map(h => (
                      <div key={h}
                           className="flex items-start gap-3 p-4 bg-ghost rounded-card shadow-lab">
                        <CheckCircle size={16} className="text-electric mt-0.5 shrink-0" />
                        <span className="text-granite leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Services used */}
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-display font-semibold text-2xl text-obsidian mb-6">
                    Services Deployed
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedServices.map(s => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-start gap-3 p-4 rounded-card border border-alabaster
                                   hover:bg-ghost transition-all group shadow-lab"
                      >
                        <div className="w-9 h-9 bg-ghost rounded-control flex items-center justify-center
                                        group-hover:bg-ink transition-colors shrink-0">
                          <span className="text-electric group-hover:text-canvas transition-colors">
                            <Icon name={s.icon} size={16} />
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-obsidian text-sm">{s.title}</p>
                          <p className="text-xs text-granite mt-0.5 line-clamp-1">
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
                <div className="bg-ink rounded-card p-7 shadow-lab">
                  <h3 className="font-bold text-canvas mb-4">Similar Project Requirement?</h3>
                  <p className="text-sm text-canvas/70 mb-5">
                    Get a proposal tailored to your project scope within 48 hours.
                  </p>
                  <Link
                    href="/request-quote"
                    className="w-full flex items-center justify-center gap-2
                               bg-canvas hover:bg-ghost text-ink font-semibold
                               py-3.5 rounded-pill transition-colors shadow-lab"
                  >
                    Request Proposal <ArrowRight size={15} />
                  </Link>
                </div>
              </AnimateOnScroll>

              {relatedProjects.length > 0 && (
                <AnimateOnScroll animation="slide-left" delay={100}>
                  <div className="bg-ghost rounded-card p-6 shadow-lab">
                    <h3 className="font-semibold text-obsidian mb-4 text-sm uppercase tracking-[0.22em] font-label">
                      Related Projects
                    </h3>
                    <div className="space-y-4">
                      {relatedProjects.map(p => (
                        <Link key={p.slug} href={`/projects/${p.slug}`}
                              className="block group">
                          <p className="text-sm font-semibold text-obsidian
                                        group-hover:text-electric transition-colors">
                            {p.title}
                          </p>
                          <p className="text-xs text-granite mt-0.5">
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
