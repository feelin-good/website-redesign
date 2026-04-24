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
    'Learn about Lepton Projects Pvt. Ltd. — founded in 2003, we are India\'s trusted engineering consultancy with 200+ professionals and 500+ projects delivered across 18 states.',
}

const MILESTONES = [
  { year: '2003', event: 'Founded in Pune by Arvind Joshi with a vision for multi-discipline engineering excellence' },
  { year: '2007', event: 'First large-scale pharma facility project; established process engineering practice' },
  { year: '2010', event: 'ISO 9001 certification; expanded to Mumbai and Bangalore' },
  { year: '2014', event: '100th project milestone; data center practice established' },
  { year: '2017', event: 'ISO 14001 and OHSAS 18001 certification; team crosses 100 engineers' },
  { year: '2019', event: 'Launched BIM Centre of Excellence; Hyderabad and Delhi offices opened' },
  { year: '2021', event: 'ISO 45001 upgrade; EPC capability formally established' },
  { year: '2023', event: '500th project milestone; team of 200+ professionals across India' },
]

const VALUES = [
  {
    icon: <Target size={22} />,
    title: 'Engineering Integrity',
    description: 'We do not compromise on technical quality. Every calculation, drawing, and decision is backed by sound engineering judgement and peer review.',
  },
  {
    icon: <CheckCircle size={22} />,
    title: 'Delivery Accountability',
    description: 'We treat our project commitments as non-negotiable obligations — owning problems, resolving them fast, and keeping clients informed at every step.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Client Partnership',
    description: 'We build long-term relationships, not transactional engagements. Our clients return because we genuinely invest in their success.',
  },
  {
    icon: <Eye size={22} />,
    title: 'Continuous Innovation',
    description: 'From BIM adoption to digital project management, we continuously invest in tools and methods that improve quality and delivery speed for our clients.',
  },
]

export default function AboutPage() {
  const leadership = getLeadership()

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-950/80" />
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-orange-400 rounded-full" />
              About Lepton Projects
            </span>
            <h1 className="font-display font-extrabold text-white mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              Two Decades of Engineering Excellence in India
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Founded in {COMPANY.founded}, Lepton Projects has grown from a small civil engineering
              consultancy into one of India's most respected multi-discipline engineering firms —
              trusted by leading corporations, healthcare groups, and government agencies.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {COMPANY.stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-display font-extrabold text-3xl text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-py bg-white">
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
                    Lepton Projects was founded in 2003 in Pune, Maharashtra, with a simple but
                    ambitious mission: to deliver engineering services that combine global standards
                    with deep understanding of India's construction and regulatory environment.
                  </p>
                  <p>
                    Starting with civil and structural design for industrial clients, we rapidly
                    expanded into MEP, process engineering, and project management as our clients
                    demanded a single, trusted partner across disciplines.
                  </p>
                  <p>
                    Over twenty years, we have delivered 500+ projects ranging from API
                    manufacturing plants and Tier III data centers to 500-bed hospitals and
                    state highway packages — building a track record that speaks for itself.
                  </p>
                  <p>
                    Today, Lepton employs 200+ engineers, designers, and project professionals
                    across five offices, serving clients in pharma, manufacturing, healthcare,
                    data centers, infrastructure, and commercial real estate across 18 Indian states.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Timeline */}
            <AnimateOnScroll animation="slide-left">
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b
                                from-orange-500 via-orange-200 to-transparent" />
                <div className="space-y-7">
                  {MILESTONES.map((m) => (
                    <div key={m.year} className="relative">
                      <div className="absolute -left-6 top-1 w-3 h-3 rounded-full
                                      bg-orange-500 border-2 border-white shadow-md" />
                      <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                        {m.year}
                      </span>
                      <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-py bg-slate-50">
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
                text: 'To deliver engineering services of the highest technical standard, enabling our clients to build safer, smarter, and more efficient facilities — on time and within budget.',
                color: 'border-t-orange-500',
              },
              {
                label: 'Vision',
                text: 'To be India\'s most trusted multi-discipline engineering partner — recognised for technical excellence, delivery integrity, and long-term client relationships.',
                color: 'border-t-navy-500',
              },
              {
                label: 'Purpose',
                text: 'To contribute to India\'s infrastructure and manufacturing growth story by raising the bar for engineering quality, sustainability, and professional practice.',
                color: 'border-t-gold-500',
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.label} animation="fade-up" delay={i * 100}>
                <div className={`bg-white rounded-2xl border border-slate-100 border-t-2 ${item.color}
                                 p-8 shadow-card h-full`}>
                  <h3 className="font-display font-bold text-xl text-navy-900 mb-4">
                    {item.label}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((value, i) => (
              <AnimateOnScroll key={value.title} animation="fade-up" delay={i * 80}>
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center
                                  text-orange-500 mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-py bg-white">
        <div className="container-main">
          <SectionHeader
            tag="Our People"
            title="Leadership Team"
            description="Experienced professionals who bring technical depth, commercial discipline, and a genuine passion for engineering excellence."
            align="center"
            className="mb-14 mx-auto"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member, i) => (
              <AnimateOnScroll key={member.id} animation="fade-up" delay={i * 80}>
                <div className="group">
                  {/* Avatar */}
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900
                                  flex items-center justify-center mb-5
                                  group-hover:from-navy-700 group-hover:to-navy-800
                                  transition-all duration-300 overflow-hidden">
                    <div className="text-5xl font-display font-extrabold text-white/20
                                    group-hover:text-white/30 transition-colors">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-navy-900">{member.name}</h3>
                  <p className="text-orange-500 text-sm font-medium mb-1">{member.title}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.qualifications.slice(0, 2).map(q => (
                      <span key={q}
                            className="text-2xs text-slate-400 bg-slate-50 border border-slate-100
                                       px-2 py-0.5 rounded-md">
                        {q.split(',')[0].split('(')[0].trim()}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
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
        title="Ready to Work With India's Best Engineering Team?"
        description="Whether you're planning a greenfield facility or expanding an existing plant, our team is ready to deliver engineered solutions that exceed expectations."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
        secondaryLabel="View Our Projects"
        secondaryHref="/projects"
      />
    </>
  )
}
