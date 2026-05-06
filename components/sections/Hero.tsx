'use client'

import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { COMPANY } from '@/lib/data/company'

const TRUST_BADGES = [
  'ISO 9001:2015 Certified',
  '20+ Years Experience',
  '500+ Projects Delivered',
  'Pan-India Presence',
]

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-canvas"
      aria-label="Hero"
    >
      {/* Right half alabaster panel */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-alabaster hidden lg:block" />

      <div className="container-main relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Content */}
          <div>
            {/* Tag line */}
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                              border border-ghost-white bg-ghost-white mb-7">
                <span className="w-2 h-2 rounded-full bg-electric-orange" />
                <span className="text-sm font-medium text-granite uppercase tracking-[0.15em]">
                  Engineering Excellence Since {COMPANY.founded}
                </span>
              </div>
            </AnimateOnScroll>

            {/* Headline */}
            <AnimateOnScroll animation="fade-up" delay={100}>
              <h1 className="font-display font-semibold text-ink mb-6"
                  style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                Built on{' '}
                <span className="text-electric-orange">Engineering</span>
                <br />
                Precision &amp; Trust.
              </h1>
            </AnimateOnScroll>

            {/* Sub-headline */}
            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="text-lg text-granite leading-relaxed mb-8 max-w-xl">
                {COMPANY.subTagline}
              </p>
            </AnimateOnScroll>

            {/* Trust badges */}
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="flex flex-wrap gap-2 mb-10">
                {TRUST_BADGES.map(badge => (
                  <span key={badge}
                        className="flex items-center gap-1.5 text-xs font-medium text-granite
                                   bg-white border border-ghost-white px-3 py-1.5 rounded-full">
                    <CheckCircle size={12} className="text-obsidian shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>

            {/* CTAs */}
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  href="/request-quote"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                >
                  Request a Proposal
                </Button>
                <Button
                  href="/projects"
                  variant="secondary"
                  size="lg"
                >
                  View Our Work
                </Button>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: Feature cards */}
          <AnimateOnScroll animation="fade-up" delay={200} className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-[30px] border border-ghost-white shadow-humble p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-ink rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                      <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">Lepton Projects</p>
                    <p className="text-xs text-granite">Project Dashboard</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-ink font-medium">
                    <span className="w-1.5 h-1.5 bg-obsidian rounded-full" />
                    Live
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Active Projects',   value: '28', trend: '+3 this month' },
                    { label: 'On-time Delivery',  value: '94%', trend: 'vs 80% industry avg' },
                    { label: 'Team Members',       value: '213', trend: 'Across India' },
                    { label: 'Client Rating',      value: '4.9★', trend: 'From 120+ reviews' },
                  ].map(stat => (
                    <div key={stat.label}
                         className="bg-ghost-white rounded-[6px] p-4 border border-alabaster">
                      <p className="text-2xl font-display font-semibold text-ink mb-0.5">
                        {stat.value}
                      </p>
                      <p className="text-xs font-medium text-granite">{stat.label}</p>
                      <p className="text-2xs text-granite/60 mt-1">{stat.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {[
                    { label: 'Pharma',          pct: 82 },
                    { label: 'Data Centers',    pct: 67 },
                    { label: 'Manufacturing',   pct: 91 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-granite">{label}</span>
                        <span className="text-granite/60">{pct}% utilisation</span>
                      </div>
                      <div className="h-1.5 bg-ghost-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-ink rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge - certification */}
              <div className="absolute -top-5 -right-5 bg-canvas rounded-[30px] shadow-humble px-4 py-3
                              border border-ghost-white flex items-center gap-3">
                <div className="w-8 h-8 bg-ghost-white rounded-lg flex items-center justify-center">
                  <CheckCircle size={18} className="text-obsidian" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink">ISO Certified</p>
                  <p className="text-2xs text-granite">9001 · 14001 · 45001</p>
                </div>
              </div>

              {/* Floating badge - years */}
              <div className="absolute -bottom-5 -left-5 bg-ink rounded-[30px] shadow-humble
                              px-4 py-3 flex items-center gap-3">
                <p className="text-3xl font-display font-semibold text-white leading-none">
                  20+
                </p>
                <div>
                  <p className="text-xs font-medium text-white/90">Years of</p>
                  <p className="text-xs font-medium text-white/90">Engineering</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center
                        gap-2 text-granite">
          <span className="text-xs uppercase tracking-[0.15em] font-medium">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  )
}
