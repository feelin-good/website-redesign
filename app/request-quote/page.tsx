import type { Metadata } from 'next'
import { CheckCircle, Clock, Phone, Shield } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { QuoteForm } from '@/components/sections/QuoteForm'

export const metadata: Metadata = {
  title: 'Request a Proposal',
  description:
    'Request a detailed engineering proposal from Lepton Projects. Responses within 48 business hours. MEP, structural, civil, process engineering, and EPC projects.',
}

const PROCESS_STEPS = [
  { step: '01', title: 'Submit Your Brief', desc: 'Fill in the form with your project details, scope, and timeline.' },
  { step: '02', title: 'Expert Review',     desc: 'A senior engineer reviews your brief and prepares clarification questions.' },
  { step: '03', title: 'Discovery Call',    desc: 'We schedule a 30-minute call to understand your requirements in detail.' },
  { step: '04', title: 'Tailored Proposal', desc: 'Receive a detailed, itemised proposal within 5 working days of the call.' },
]

const TRUST_POINTS = [
  { icon: <Clock size={16} />,    text: '48-hour initial response guarantee' },
  { icon: <Shield size={16} />,   text: 'NDA available on request' },
  { icon: <CheckCircle size={16} />, text: 'No commitment required at proposal stage' },
  { icon: <Phone size={16} />,    text: 'Direct access to senior engineering team' },
]

export default function RequestQuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ghost-white pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-granite
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-granite rounded-full" />
              Request a Proposal
            </span>
            <h1 className="font-display font-semibold text-ink mb-4"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1 }}>
              Get a Tailored Engineering Proposal in 5 Days
            </h1>
            <p className="text-lg text-granite leading-relaxed">
              Tell us about your project and we'll return a detailed, scope-specific proposal
              — no generic templates, no vague estimates.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py bg-ghost-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Form */}
            <div className="lg:col-span-8">
              <AnimateOnScroll animation="fade-up">
                <div className="bg-white rounded-card border border-ghost-white shadow-humble p-8 lg:p-10">
                  <SectionHeader
                    tag="Project Brief"
                    title="Tell Us About Your Project"
                    className="mb-8"
                  />
                  <QuoteForm />
                </div>
              </AnimateOnScroll>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Process */}
              <AnimateOnScroll animation="slide-left">
                <div className="bg-obsidian rounded-[30px] p-7 border border-white/8">
                  <h3 className="font-display font-semibold text-white mb-5">What Happens Next?</h3>
                  <div className="space-y-5">
                    {PROCESS_STEPS.map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10
                                        flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-white/70">{s.step}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{s.title}</p>
                          <p className="text-xs text-white/70 mt-0.5 leading-snug">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Trust points */}
              <AnimateOnScroll animation="slide-left" delay={100}>
                <div className="bg-canvas rounded-[30px] p-6 border border-ghost-white shadow-humble">
                  <h3 className="font-semibold text-ink mb-4 text-sm">Our Commitment to You</h3>
                  <div className="space-y-3">
                    {TRUST_POINTS.map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm text-granite">
                        <span className="text-ink shrink-0">{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Direct contact */}
              <AnimateOnScroll animation="slide-left" delay={150}>
                <div className="bg-ghost-white rounded-[30px] p-6 border border-alabaster">
                  <p className="font-semibold text-ink mb-1 text-sm">Prefer a Direct Call?</p>
                  <p className="text-xs text-granite mb-3">
                    Speak to our business development team directly.
                  </p>
                  <a href="tel:+912026120000"
                     className="flex items-center gap-2 text-ink font-semibold hover:text-granite
                                transition-colors">
                    <Phone size={15} />
                    +91-20-2612-0000
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
