import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight, Users, TrendingUp, Award, Globe } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CTABanner } from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Lepton Projects — build your engineering career with India\'s leading multi-discipline consultancy. Open roles in MEP, structural, civil, process, and project management.',
}

const OPEN_ROLES = [
  {
    title: 'Senior MEP Engineer',
    location: 'Pune',
    type: 'Full-time',
    department: 'MEP',
    experience: '6–10 years',
    description: 'Lead MEP design for large-scale pharmaceutical and data center projects. HVAC, electrical, and plumbing coordination in BIM.',
  },
  {
    title: 'Structural Engineer — Industrial',
    location: 'Mumbai',
    type: 'Full-time',
    department: 'Structural',
    experience: '4–8 years',
    description: 'Design of steel and RCC industrial structures using STAAD.Pro and ETABS. Experience with pre-engineered buildings preferred.',
  },
  {
    title: 'Project Manager (EPC)',
    location: 'Pune / Bangalore',
    type: 'Full-time',
    department: 'Project Management',
    experience: '10–15 years',
    description: 'End-to-end EPC project management for industrial and pharma clients. PMP or RICS qualification required.',
  },
  {
    title: 'Process Engineer — Pharma',
    location: 'Hyderabad',
    type: 'Full-time',
    department: 'Process',
    experience: '5–9 years',
    description: 'P&ID development, HAZOP facilitation, and GMP process design for API and formulation facilities.',
  },
  {
    title: 'BIM Coordinator',
    location: 'Pune',
    type: 'Full-time',
    department: 'Design Technology',
    experience: '3–6 years',
    description: 'Multi-discipline BIM coordination using Revit and Navisworks. Clash detection, model management, and BIM execution plan delivery.',
  },
  {
    title: 'Business Development Manager',
    location: 'Mumbai',
    type: 'Full-time',
    department: 'Business Development',
    experience: '7–12 years',
    description: 'Strategic BD for engineering services across pharma, data centers, and manufacturing. Client relationship and proposal management.',
  },
]

const BENEFITS = [
  { icon: <TrendingUp size={20} />, title: 'Career Growth',     desc: 'Clear progression paths and annual promotion reviews' },
  { icon: <Users size={20} />,      title: 'Expert Mentorship',  desc: 'Work alongside IIT / NIT-trained senior engineers' },
  { icon: <Award size={20} />,      title: 'Learning Budget',    desc: '₹50,000/year for certifications and training' },
  { icon: <Globe size={20} />,      title: 'Pan-India Exposure', desc: 'Projects across 18 states and diverse industries' },
]

export default function CareersPage() {
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
              Careers
            </span>
            <h1 className="font-display font-extrabold text-white mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              Build Your Engineering Career at Lepton
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
              Join 200+ engineers and professionals working on India's most complex and
              impactful engineering projects — in a culture that values technical rigour,
              growth, and collaboration.
            </p>
            <a href="#open-roles"
               className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600
                          text-white font-semibold px-7 py-3.5 rounded-xl transition-all">
              View Open Roles <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py bg-white">
        <div className="container-main">
          <SectionHeader
            tag="Why Join Us"
            title="A Place Where Engineers Grow"
            description="We invest in our people as much as our projects — because great engineering starts with a great team."
            align="center"
            className="mb-14 mx-auto"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {BENEFITS.map((b, i) => (
              <AnimateOnScroll key={b.title} animation="fade-up" delay={i * 80}>
                <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100
                                hover:border-orange-100 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center
                                  text-orange-500 mx-auto mb-4">
                    {b.icon}
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500">{b.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Culture statement */}
          <AnimateOnScroll animation="fade-up">
            <div className="bg-navy-900 rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto">
              <p className="text-xl text-white font-medium leading-relaxed mb-4">
                "At Lepton, you don't just work on engineering drawings — you solve real problems
                for India's most important industries. We give our engineers the autonomy, tools,
                and support to do their best work."
              </p>
              <p className="text-orange-400 font-semibold">— Kavita Iyer, Director — Projects</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="section-py bg-slate-50">
        <div className="container-main">
          <SectionHeader
            tag="Open Positions"
            title="Current Opportunities"
            description="We are actively hiring experienced engineers across multiple disciplines and locations."
            className="mb-10"
          />
          <div className="space-y-4">
            {OPEN_ROLES.map((role, i) => (
              <AnimateOnScroll key={role.title} animation="fade-up" delay={i * 60}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-card
                                hover:shadow-card-hover hover:border-orange-100
                                transition-all duration-300 overflow-hidden">
                  <div className="p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-widest
                                         text-orange-500 bg-orange-50 border border-orange-100
                                         px-2.5 py-0.5 rounded-full">
                          {role.department}
                        </span>
                        <span className="text-xs text-slate-400">{role.experience} experience</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-navy-900 mb-1">
                        {role.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3 line-clamp-2">{role.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={11} className="text-orange-400" /> {role.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} className="text-orange-400" /> {role.type}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/contact?role=${encodeURIComponent(role.title)}`}
                      className="shrink-0 inline-flex items-center gap-2 bg-navy-900 hover:bg-orange-500
                                 text-white font-semibold px-5 py-2.5 rounded-xl text-sm
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
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-7 text-center">
              <h3 className="font-semibold text-navy-900 mb-2">
                Don't See the Right Role?
              </h3>
              <p className="text-slate-500 text-sm mb-4 max-w-md mx-auto">
                We're always interested in exceptional engineering talent. Send us your CV
                and a cover note — we'll keep it on file and reach out when the right opportunity opens.
              </p>
              <a
                href="mailto:careers@lepton.co.in"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500
                           hover:text-orange-600 transition-colors"
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
        description="Join Lepton and work on projects that shape India's industrial and infrastructure landscape."
        primaryLabel="View Open Roles"
        primaryHref="#open-roles"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
        showPhone={false}
      />
    </>
  )
}
