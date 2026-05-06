import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight, Users, TrendingUp, Award, Globe } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CTABanner } from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Lepton Projects — build your engineering career with India\'s specialist in bulk material handling EPC. Open roles in mechanical, electrical, structural, and project management.',
}

const OPEN_ROLES = [
  {
    title: 'Senior Mechanical Engineer — Bulk Material Handling',
    location: 'Ghaziabad (NCR)',
    type: 'Full-time',
    department: 'Engineering',
    experience: '6–10 years',
    description: 'Lead mechanical design of belt conveyor systems, stacker/reclaimers, and transfer chutes. Proficiency in CEMA/IS standards, AutoCAD, and equipment selection required.',
  },
  {
    title: 'Electrical & Automation Engineer',
    location: 'Ghaziabad (NCR)',
    type: 'Full-time',
    department: 'Electrical',
    experience: '4–8 years',
    description: 'Design of MCC panels, PLC/SCADA systems, and motor control for bulk material handling plants. Experience with Siemens or Allen-Bradley PLCs preferred.',
  },
  {
    title: 'Project Engineer (Site)',
    location: 'Pan-India (site postings)',
    type: 'Full-time',
    department: 'Project Management',
    experience: '4–8 years',
    description: 'Site engineering and supervision for conveyor system and coal handling plant EPC projects. Coordinate civil, mechanical, and electrical contractors and manage material deliveries.',
  },
  {
    title: 'Structural Design Engineer',
    location: 'Ghaziabad (NCR)',
    type: 'Full-time',
    department: 'Structural',
    experience: '3–7 years',
    description: 'Structural design of conveyor galleries, transfer towers, crusher buildings, and supporting structures using STAAD.Pro. Proficiency in IS structural design codes required.',
  },
  {
    title: 'Design Engineer — Conveyor Systems',
    location: 'Ghaziabad (NCR)',
    type: 'Full-time',
    department: 'Engineering',
    experience: '2–5 years',
    description: 'Detailed design and drafting of conveyor system components — idler frames, pulleys, chutes, and walkways using AutoCAD. Freshers with strong mechanical engineering fundamentals also considered.',
  },
  {
    title: 'Business Development Manager',
    location: 'Delhi NCR / Mumbai',
    type: 'Full-time',
    department: 'Business Development',
    experience: '7–12 years',
    description: 'Strategic BD for bulk material handling EPC projects across cement, steel, power, and port sectors. Client relationship management, proposal coordination, and tender submissions.',
  },
]

const BENEFITS = [
  { icon: <TrendingUp size={20} />, title: 'Career Growth',      desc: 'Work on projects across all major bulk material handling sectors in India' },
  { icon: <Users size={20} />,      title: 'Expert Team',        desc: 'Learn alongside experienced engineers with 15+ years of industry knowledge' },
  { icon: <Award size={20} />,      title: 'Technical Exposure', desc: 'Hands-on experience with conveyors, stackers, coal handling plants, and more' },
  { icon: <Globe size={20} />,      title: 'Pan-India Projects', desc: 'Work on projects at cement plants, steel mills, ports, and power stations across India' },
]

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ghost-white pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-granite
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-granite rounded-full" />
              Careers
            </span>
            <h1 className="font-display font-semibold text-ink mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              Build Your Engineering Career at Lepton Projects
            </h1>
            <p className="text-xl text-granite leading-relaxed max-w-2xl mb-8">
              Join a specialist bulk material handling EPC company where your engineering work
              directly moves India's core industries forward — in a team that values technical
              rigour, hands-on experience, and professional growth.
            </p>
            <a href="#open-roles"
               className="inline-flex items-center gap-2 bg-ink hover:bg-obsidian
                          text-white font-semibold px-7 py-3.5 rounded-full transition-all">
              View Open Roles <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-canvas">
        <div className="container-main">
          <SectionHeader
            tag="Why Join Us"
            title="A Place Where Engineers Do Real Work"
            description="We invest in our people as much as our projects — because great engineering starts with a great team."
            align="center"
            className="mb-14 mx-auto"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {BENEFITS.map((b, i) => (
              <AnimateOnScroll key={b.title} animation="fade-up" delay={i * 80}>
                <div className="text-center p-6 rounded-card bg-ghost-white border border-alabaster
                                hover:border-granite/30 hover:shadow-humble transition-all duration-300">
                  <div className="w-12 h-12 bg-ghost-white rounded-[6px] flex items-center justify-center
                                  text-ink mx-auto mb-4">
                    {b.icon}
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{b.title}</h3>
                  <p className="text-sm text-granite">{b.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Culture statement */}
          <AnimateOnScroll animation="fade-up">
            <div className="bg-obsidian rounded-[30px] p-8 lg:p-12 text-center max-w-3xl mx-auto">
              <p className="text-xl text-white font-medium leading-relaxed mb-4">
                "At Lepton, you don't just work on engineering drawings — you see your designs
                installed and running at cement plants, power stations, and ports across India.
                That direct connection between design and real-world impact is what drives our team."
              </p>
              <p className="text-electric-orange font-semibold">— Kamal Kumar Kandpal, Director</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="section-py bg-ghost-white">
        <div className="container-main">
          <SectionHeader
            tag="Open Positions"
            title="Current Opportunities"
            description="We are actively hiring experienced engineers across mechanical, electrical, structural, and project management disciplines."
            className="mb-10"
          />
          <div className="space-y-4">
            {OPEN_ROLES.map((role, i) => (
              <AnimateOnScroll key={role.title} animation="fade-up" delay={i * 60}>
                <div className="bg-canvas rounded-card border border-alabaster shadow-humble
                                hover:border-granite/30
                                transition-all duration-300 overflow-hidden">
                  <div className="p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-widest
                                         text-ink bg-ghost-white border border-alabaster
                                         px-2.5 py-0.5 rounded-[6px]">
                          {role.department}
                        </span>
                        <span className="text-xs text-granite">{role.experience} experience</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-ink mb-1">
                        {role.title}
                      </h3>
                      <p className="text-sm text-granite mb-3 line-clamp-2">{role.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-granite">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={11} /> {role.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} /> {role.type}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/contact?role=${encodeURIComponent(role.title)}`}
                      className="shrink-0 inline-flex items-center gap-2 bg-ink hover:bg-obsidian
                                 text-white font-semibold px-5 py-2.5 rounded-full text-sm
                                 transition-all duration-200"
                    >
                      Apply Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Speculative application */}
          <AnimateOnScroll animation="fade-up" delay={200} className="mt-8">
            <div className="bg-canvas rounded-card border border-dashed border-alabaster p-7 text-center">
              <h3 className="font-semibold text-ink mb-2">
                Don't See the Right Role?
              </h3>
              <p className="text-granite text-sm mb-4 max-w-md mx-auto">
                We're always interested in exceptional engineering talent in bulk material handling.
                Send us your CV and a brief note — we'll keep it on file and reach out when the right
                opportunity opens.
              </p>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'info@lepton.co.in'}?subject=Speculative Application`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink
                           hover:text-electric-orange transition-colors"
              >
                Send Speculative Application <ArrowRight size={14} />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <CTABanner
        variant="orange"
        title="Ready to Engineer Something Great?"
        description="Join Lepton Projects and work on bulk material handling systems that keep India's core industries running."
        primaryLabel="View Open Roles"
        primaryHref="#open-roles"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
        showPhone={false}
      />
    </>
  )
}
