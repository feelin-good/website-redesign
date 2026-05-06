import type { Metadata } from 'next'
import { CheckCircle, Target, Eye, Heart } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { CTABanner } from '@/components/sections/CTABanner'
import { COMPANY } from '@/lib/data/company'
import { getLeadership } from '@/lib/data/team'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Lepton Projects Pvt. Ltd. — EPC specialists in bulk material handling systems for cement, steel, ports, power, and mining industries since 2008.',
}

const MILESTONES = [
  { year: '2008', event: 'Lepton Projects Pvt. Ltd. incorporated in Ghaziabad, Uttar Pradesh — focused on bulk material handling engineering' },
  { year: '2010', event: 'First major conveyor system project for a cement plant; established design engineering team' },
  { year: '2013', event: 'ISO 9001 quality management certification; expanded to stacker/reclaimer systems' },
  { year: '2015', event: 'MSME and NSIC registration; first coal handling plant EPC project for captive power sector' },
  { year: '2018', event: '50th order milestone; team expanded with dedicated electrical and automation engineers' },
  { year: '2020', event: 'First NTPC and central PSU project; strengthened public sector client base' },
  { year: '2022', event: 'Port sector expansion — first major port conveyor project with Adani Ports' },
  { year: '2023', event: '125+ orders executed milestone; presence across cement, steel, ports, power, and mining sectors' },
]

const VALUES = [
  {
    icon: <Target size={22} />,
    title: 'Engineering Integrity',
    description: 'Every conveyor system, stacker, and coal handling plant we design is backed by sound engineering judgement, peer review, and compliance with IS, CEMA, and DIN standards.',
  },
  {
    icon: <CheckCircle size={22} />,
    title: 'Delivery Accountability',
    description: 'We treat every project commitment as a non-negotiable obligation — owning challenges, resolving them quickly, and keeping clients informed throughout execution.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Client Partnership',
    description: 'We build long-term relationships with our clients. Many of our best clients have engaged us across multiple projects and plant expansions over the years.',
  },
  {
    icon: <Eye size={22} />,
    title: 'Operational Reliability',
    description: 'We design for the real world — harsh outdoor environments, high duty cycles, and demanding throughput targets. Reliability is not optional; it is built in from the start.',
  },
]

export default function AboutPage() {
  const leadership = getLeadership()

  return (
    <>
      {/* Hero */}
      <section className="bg-ghost-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-granite
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-granite rounded-full" />
              About Lepton Projects
            </span>
            <h1 className="font-display font-semibold text-ink mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              India's Bulk Material Handling EPC Specialists
            </h1>
            <p className="text-xl text-granite leading-relaxed mb-8 max-w-2xl">
              Founded in {COMPANY.founded} and headquartered in Ghaziabad, Lepton Projects is a
              multi-disciplinary EPC company specialising in bulk material handling systems for
              India's cement, steel, ports, power, and mining industries.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {COMPANY.stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-display font-semibold text-3xl text-ink">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-granite mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-py bg-canvas">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimateOnScroll animation="slide-right">
              <div>
                <SectionHeader
                  tag="Our Story"
                  title="Built on a Commitment to Engineering That Performs"
                />
                <div className="prose-lepton mt-6">
                  <p>
                    Lepton Projects was founded in 2008 in Ghaziabad, Uttar Pradesh, with a clear
                    focus: to deliver bulk material handling systems that keep India's core industries
                    running reliably and efficiently.
                  </p>
                  <p>
                    Starting with belt conveyor system projects for cement plants, we steadily
                    expanded our capabilities into stacker/reclaimer systems, coal handling plants,
                    wagon tipplers, aggregate crushing plants, and dust management systems —
                    building a multi-disciplinary EPC capability that covers mechanical, structural,
                    electrical, and automation engineering under one roof.
                  </p>
                  <p>
                    Over 15 years, we have executed 125+ orders spanning greenfield projects,
                    brownfield expansions, and system upgrades for cement plants, steel mills,
                    port terminals, thermal power stations, and mining operations across India.
                  </p>
                  <p>
                    Today, Lepton Projects is ISO 9001:2015 certified, MSME and NSIC registered,
                    and trusted by leading organisations including J.K. Lakshmi Cement, NTPC,
                    Adani Ports, Vedanta Aluminium, ACC, and Steel Authority of India.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Timeline */}
            <AnimateOnScroll animation="slide-left">
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b
                                from-ink via-granite/30 to-transparent" />
                <div className="space-y-7">
                  {MILESTONES.map((m) => (
                    <div key={m.year} className="relative">
                      <div className="absolute -left-6 top-1 w-3 h-3 rounded-full
                                      bg-ink border-2 border-canvas shadow-md" />
                      <span className="text-xs font-bold text-ink uppercase tracking-widest">
                        {m.year}
                      </span>
                      <p className="text-sm text-granite mt-0.5 leading-relaxed">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-py bg-ghost-white">
        <div className="container-main">
          <SectionHeader
            tag="Our Purpose"
            title="Mission, Vision & Values"
            align="center"
            className="mb-14 mx-auto"
          />
          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            {[
              {
                label: 'Mission',
                text: 'To deliver bulk material handling systems of the highest engineering standard — reliable, low-maintenance, and fit for the demanding environments of India\'s core industries.',
              },
              {
                label: 'Vision',
                text: 'To be India\'s most trusted EPC partner for bulk material handling — recognised for engineering depth, delivery integrity, and long-term client relationships.',
              },
              {
                label: 'Purpose',
                text: 'To keep India\'s cement, steel, ports, power, and mining industries moving by engineering systems that perform reliably, year after year, in the harshest conditions.',
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.label} animation="fade-up" delay={i * 100}>
                <div className="bg-canvas rounded-card border border-alabaster border-t-2 border-t-ink
                                p-8 shadow-humble h-full">
                  <h3 className="font-display font-semibold text-xl text-ink mb-4">
                    {item.label}
                  </h3>
                  <p className="text-granite leading-relaxed">{item.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((value, i) => (
              <AnimateOnScroll key={value.title} animation="fade-up" delay={i * 80}>
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-[6px] bg-ghost-white flex items-center justify-center
                                  text-ink mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{value.title}</h3>
                  <p className="text-sm text-granite leading-relaxed">{value.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-py bg-canvas">
        <div className="container-main">
          <SectionHeader
            tag="Our People"
            title="Leadership Team"
            description="Experienced professionals who bring technical depth, delivery discipline, and a genuine passion for engineering."
            align="center"
            className="mb-14 mx-auto"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((member, i) => (
              <AnimateOnScroll key={member.id} animation="fade-up" delay={i * 80}>
                <div className="group">
                  {/* Avatar */}
                  <div className="aspect-square rounded-card bg-ghost-white border border-alabaster
                                  flex items-center justify-center mb-5
                                  group-hover:bg-ink transition-all duration-300 overflow-hidden">
                    <div className="text-6xl font-display font-semibold text-ink/15
                                    group-hover:text-white/20 transition-colors">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-ink">{member.name}</h3>
                  <p className="text-electric-orange text-sm font-medium mb-2">{member.title}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.qualifications.slice(0, 2).map(q => (
                      <span key={q}
                            className="text-xs text-granite bg-ghost-white border border-alabaster
                                       px-2 py-0.5 rounded-[6px]">
                        {q}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-granite leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        variant="navy"
        title="Ready to Partner with a Bulk Material Handling Specialist?"
        description="Whether you're planning a new conveyor system, stacker/reclaimer, or complete coal handling plant, our team is ready to deliver engineered solutions that perform."
        primaryLabel="Request a Proposal"
        primaryHref="/request-quote"
        secondaryLabel="View Our Projects"
        secondaryHref="/projects"
      />
    </>
  )
}
