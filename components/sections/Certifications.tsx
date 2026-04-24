import { ShieldCheck, Award, CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CERTIFICATIONS, CLIENTS } from '@/lib/data/company'

export function Certifications() {
  return (
    <section className="section-py bg-slate-50">
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
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 text-center
                                  shadow-card hover:shadow-card-hover hover:-translate-y-0.5
                                  transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-navy-50 group-hover:bg-navy-900
                                    flex items-center justify-center mx-auto mb-3
                                    transition-colors duration-300">
                      <ShieldCheck size={22} className="text-navy-600 group-hover:text-orange-400
                                                         transition-colors duration-300" />
                    </div>
                    <p className="font-display font-bold text-sm text-navy-900">{cert.name}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{cert.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Additional trust signals */}
            <AnimateOnScroll animation="fade-up" delay={300} className="mt-8">
              <div className="bg-navy-900 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Award size={20} className="text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">
                    MSME & NSIC Registered Enterprise
                  </p>
                  <p className="text-sm text-slate-400">
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
                    className="bg-white rounded-xl border border-slate-100 px-4 py-5
                               flex items-center justify-center text-center
                               hover:border-orange-200 hover:shadow-md
                               transition-all duration-200"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <span className="text-sm font-semibold text-navy-700">{client}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={250} className="mt-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle size={20} className="text-emerald-500" />
                  <span className="font-semibold text-navy-900">Client Confidence Metrics</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '92%', label: 'Client Retention' },
                    { value: '4.9/5', label: 'Avg. Rating' },
                    { value: '15+', label: 'PSU Clients' },
                  ].map(m => (
                    <div key={m.label} className="text-center">
                      <p className="text-2xl font-display font-extrabold text-navy-900">
                        {m.value}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{m.label}</p>
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
