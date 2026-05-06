import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import {
  CheckCircle, Users, Clock, Award, TrendingUp, Globe, ShieldCheck, Zap,
} from 'lucide-react'

const REASONS = [
  {
    icon: <ShieldCheck size={24} />,
    title: 'Complete EPC Capability',
    description: 'Mechanical, structural, electrical, and automation engineering under one roof — from detailed design and equipment procurement through to site erection and commissioning.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: '94% On-Time Delivery',
    description: 'Rigorous project scheduling and proactive site management ensure that client plants start up on time — critical in industries where delays cost millions per day.',
  },
  {
    icon: <Award size={24} />,
    title: 'IS, CEMA & DIN Standards',
    description: 'In-depth knowledge of IS, CEMA, and DIN design standards for bulk material handling, plus CEA and MOEF/CPCB environmental compliance requirements.',
  },
  {
    icon: <Users size={24} />,
    title: '50+ Engineering Specialists',
    description: 'A focused team of mechanical, structural, electrical, and automation engineers with deep experience in bulk material handling system design and EPC execution.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Pan-India Project Presence',
    description: 'Headquartered in Ghaziabad with active project execution across cement, steel, power, port, and mining sites throughout India.',
  },
  {
    icon: <Zap size={24} />,
    title: 'PLC/SCADA Automation',
    description: 'In-house capability for PLC-based conveyor control, SCADA integration, and stockyard automation — delivering fully automated, remote-monitored systems.',
  },
  {
    icon: <CheckCircle size={24} />,
    title: 'ISO 9001:2015 Certified',
    description: 'Our quality management system ensures consistent engineering quality, traceable document control, and systematic project review at every stage.',
  },
  {
    icon: <Clock size={24} />,
    title: 'Fast Shutdown Execution',
    description: 'Experienced in completing brownfield installation and replacement projects within tight plant shutdown windows — minimising production disruption for our clients.',
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
              <div className="bg-ghost-white rounded-card p-7 border border-alabaster shadow-humble">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: '92%',  label: 'Client Retention Rate' },
                    { value: '125+', label: 'Orders Executed' },
                    { value: '4.9★', label: 'Average Client Rating' },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <p className="text-2xl font-display font-semibold text-ink mb-1">
                        {item.value}
                      </p>
                      <p className="text-xs text-granite leading-snug">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-alabaster">
                  <p className="text-sm text-granite italic">
                    "We don't just supply equipment — we engineer complete systems that our
                    clients can rely on to run at rated capacity, year after year."
                  </p>
                  <p className="text-sm font-semibold text-ink mt-2">— Kamal Kumar Kandpal, Director</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: Grid of reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {REASONS.map((reason, i) => (
              <AnimateOnScroll key={reason.title} animation="fade-up" delay={i * 60}>
                <div className="group p-6 rounded-card border border-ghost-white hover:border-alabaster
                                hover:bg-ghost-white transition-all duration-300">
                  <div className="w-11 h-11 rounded-[6px] bg-ghost-white group-hover:bg-ink
                                  flex items-center justify-center mb-4
                                  text-ink group-hover:text-white transition-colors duration-300">
                    {reason.icon}
                  </div>
                  <h3 className="font-display font-semibold text-base text-ink mb-2">
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
