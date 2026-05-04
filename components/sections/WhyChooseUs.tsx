import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import {
  CheckCircle, Users, Clock, Award, TrendingUp, Globe, ShieldCheck, Zap,
} from 'lucide-react'

const REASONS = [
  {
    icon: <ShieldCheck size={24} />,
    title: 'Multi-Discipline Under One Roof',
    description: 'Civil, structural, MEP, process, and project management in a single integrated team — eliminating cross-consultant friction and coordination delays.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: '94% On-Time Delivery',
    description: 'Rigorous schedule management using Primavera P6 and an early-warning risk framework ensures milestones are met, every time.',
  },
  {
    icon: <Award size={24} />,
    title: 'Deep Regulatory Expertise',
    description: 'In-depth knowledge of IS, NBC, USFDA, EU-GMP, NABH, Uptime Institute, and NFPA standards — critical for pharma, healthcare, and data center clients.',
  },
  {
    icon: <Users size={24} />,
    title: '200+ Engineering Professionals',
    description: 'A seasoned bench of IIT/NIT-trained engineers, PMPs, LEED APs, and RICS-qualified QS professionals covering every engineering domain.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Pan-India Reach',
    description: 'Offices in Pune, Mumbai, Bengaluru, Hyderabad, and Delhi — with active project presence across 18 states.',
  },
  {
    icon: <Zap size={24} />,
    title: 'BIM & Digital Engineering',
    description: 'Full BIM Level 2 capability across all disciplines using Revit, STAAD.Pro, E3D, and ETABS for clash-free, coordinated delivery.',
  },
  {
    icon: <CheckCircle size={24} />,
    title: 'Triple ISO Certification',
    description: 'ISO 9001, 14001, and 45001 certification ensures consistent quality, environmental responsibility, and safety across all projects.',
  },
  {
    icon: <Clock size={24} />,
    title: 'Fast-Track Capability',
    description: 'Proven fast-track methodology with parallel engineering workstreams to compress schedules without compromising technical rigour.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="section-py bg-canvas">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: Text */}
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              tag="Why Lepton"
              title="The Engineering Partner That Delivers More Than Drawings"
              description="We combine deep technical expertise with commercial discipline — delivering projects that perform, comply, and endure. Here's what sets us apart."
            />

            {/* Visual accent block */}
            <AnimateOnScroll animation="fade-up" delay={200} className="mt-10">
              <div className="bg-ink rounded-card p-8 shadow-lab">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: '92%', label: 'Client Retention Rate' },
                    { value: '₹50B+', label: 'Project Value Managed' },
                    { value: '4.9★', label: 'Average Client Rating' },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <p className="text-2xl font-display font-semibold text-electric mb-1">
                        {item.value}
                      </p>
                      <p className="text-xs text-canvas/70 leading-snug">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-canvas/10">
                  <p className="text-sm text-canvas/70 italic">
                    "We don't just complete projects — we build long-term partnerships built on
                    transparency, technical rigour, and shared success."
                  </p>
                  <p className="text-sm font-semibold text-canvas mt-2">— Arvind Joshi, MD &amp; Founder</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: Grid of reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {REASONS.map((reason, i) => (
              <AnimateOnScroll key={reason.title} animation="fade-up" delay={i * 60}>
                <div className="group p-6 rounded-card bg-ghost shadow-lab
                                hover:bg-alabaster transition-all duration-300">
                  <div className="w-11 h-11 rounded-control bg-canvas group-hover:bg-ink
                                  flex items-center justify-center mb-4
                                  text-electric group-hover:text-canvas transition-colors duration-300">
                    {reason.icon}
                  </div>
                  <h3 className="font-display font-semibold text-base text-obsidian mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-granite leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
