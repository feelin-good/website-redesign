import { ShieldCheck, Award, CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CERTIFICATIONS, CLIENTS } from '@/lib/data/company'

export function Certifications() {
  return (
    <section className="section-py bg-alabaster">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Certifications */}
          <div>
            <SectionHeader
              tag="Trust & Compliance"
              title="Certified to the Highest Standards"
              description="Our certifications are not just badges — they reflect deeply embedded quality, safety, and environmental management systems that govern every project we deliver."
            />

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <AnimateOnScroll key={cert.name} animation="fade-up" delay={i * 60}>
                  <div className="bg-canvas rounded-card p-5 text-center
                                  shadow-lab hover:-translate-y-0.5
                                  transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-control bg-ghost group-hover:bg-ink
                                    flex items-center justify-center mx-auto mb-3
                                    transition-colors duration-300">
                      <ShieldCheck size={22} className="text-electric group-hover:text-canvas
                                                         transition-colors duration-300" />
                    </div>
                    <p className="font-display font-semibold text-sm text-obsidian">{cert.name}</p>
                    <p className="text-xs text-granite mt-1 leading-snug">{cert.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Additional trust signals */}
            <AnimateOnScroll animation="fade-up" delay={300} className="mt-8">
              <div className="bg-ink rounded-card p-6 flex items-start gap-4 shadow-lab">
                <div className="w-10 h-10 bg-canvas/10 rounded-control flex items-center justify-center shrink-0">
                  <Award size={20} className="text-electric" />
                </div>
                <div>
                  <p className="font-semibold text-canvas mb-1">
                    MSME & NSIC Registered Enterprise
                  </p>
                  <p className="text-sm text-canvas/70">
                    Government of India recognised engineering enterprise, eligible for public sector
                    and PSU contracts under preferential procurement policies.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Clients */}
          <div>
            <SectionHeader
              tag="Trusted By"
              title="Clients Who Rely on Our Engineering"
              description="From Fortune 500 corporations to government agencies — organisations that can't afford engineering failure trust Lepton to deliver."
            />

            <AnimateOnScroll animation="fade-up" delay={150} className="mt-10">
              <div className="grid grid-cols-3 gap-3">
                {CLIENTS.map((client, i) => (
                  <div
                    key={client}
                    className="bg-canvas rounded-card px-4 py-5
                               flex items-center justify-center text-center shadow-lab
                               hover:-translate-y-0.5
                               transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-obsidian">{client}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={250} className="mt-6">
              <div className="bg-canvas rounded-card p-6 shadow-lab">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle size={20} className="text-electric" />
                  <span className="font-semibold text-obsidian">Client Confidence Metrics</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '92%', label: 'Client Retention' },
                    { value: '4.9/5', label: 'Avg. Rating' },
                    { value: '15+', label: 'PSU Clients' },
                  ].map(m => (
                    <div key={m.label} className="text-center">
                      <p className="text-2xl font-display font-semibold text-obsidian">
                        {m.value}
                      </p>
                      <p className="text-xs text-granite mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
