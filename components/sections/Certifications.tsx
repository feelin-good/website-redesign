import { ShieldCheck, Award, CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CERTIFICATIONS, CLIENTS } from '@/lib/data/company'

export function Certifications() {
  return (
    <section className="section-py bg-ghost-white">
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
                  <div className="bg-canvas rounded-card border border-alabaster p-5 text-center
                                  shadow-humble hover:shadow-[0_40px_40px_-5px_rgba(0,0,0,0.05)]
                                  hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-[6px] bg-ghost-white group-hover:bg-ink
                                    flex items-center justify-center mx-auto mb-3
                                    transition-colors duration-300">
                      <ShieldCheck size={22} className="text-granite group-hover:text-white
                                                         transition-colors duration-300" />
                    </div>
                    <p className="font-display font-semibold text-sm text-ink">{cert.name}</p>
                    <p className="text-xs text-granite mt-1 leading-snug">{cert.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Additional trust signals */}
            <AnimateOnScroll animation="fade-up" delay={300} className="mt-8">
              <div className="bg-obsidian rounded-[30px] p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-white/8 rounded-[6px] flex items-center justify-center shrink-0">
                  <Award size={20} className="text-white/70" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">
                    MSME & NSIC Registered Enterprise
                  </p>
                  <p className="text-sm text-white/70">
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
                    className="bg-canvas rounded-[6px] border border-alabaster px-4 py-5
                               flex items-center justify-center text-center
                               hover:border-granite/30 hover:shadow-humble
                               transition-all duration-200"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <span className="text-sm font-semibold text-ink">{client}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={250} className="mt-6">
              <div className="bg-canvas rounded-[30px] border border-alabaster p-6 shadow-humble">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle size={20} className="text-ink" />
                  <span className="font-semibold text-ink">Client Confidence Metrics</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '92%', label: 'Client Retention' },
                    { value: '4.9/5', label: 'Avg. Rating' },
                    { value: '15+', label: 'PSU Clients' },
                  ].map(m => (
                    <div key={m.label} className="text-center">
                      <p className="text-2xl font-display font-semibold text-ink">
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
