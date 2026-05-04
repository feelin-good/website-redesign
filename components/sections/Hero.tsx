'use client'

import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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
      className="relative min-h-screen flex items-center overflow-hidden bg-canvas"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-canvas via-ghost to-alabaster" />
      <div className="absolute inset-0 bg-lab-grid opacity-70" />
      <div className="absolute inset-0 bg-lab-dots opacity-50" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-electric to-transparent opacity-30" />

      <div className="container-main relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Content */}
          <div>
            {/* Tag line */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                            border border-electric/20 bg-ghost mb-7
                            animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              <span className="text-xs font-semibold text-obsidian uppercase tracking-[0.22em]">
                Engineering Excellence Since {COMPANY.founded}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-semibold text-obsidian mb-6 animate-fade-up leading-[1.08]"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.625rem)' }}>
              Built on{' '}
              <span className="relative z-10 gradient-text">Engineering</span>
              <br />
              Precision &amp;{' '}
              <span className="text-electric">Trust.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-granite leading-relaxed mb-8 max-w-xl animate-fade-up">
              {COMPANY.subTagline}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-10 animate-fade-up">
              {TRUST_BADGES.map(badge => (
                <span key={badge}
                      className="flex items-center gap-1.5 text-xs font-medium text-granite
                                 bg-ghost px-3 py-1.5 rounded-full">
                  <CheckCircle size={12} className="text-electric shrink-0" />
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up">
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
                variant="ghost-navy"
                size="lg"
              >
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right: Feature cards */}
          <div className="hidden lg:block animate-fade-up">
            <div className="relative">
              {/* Main card */}
              <div className="bg-ghost rounded-image p-8 shadow-lab">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-ink rounded-control flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                      <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-obsidian text-sm">Lepton Projects</p>
                    <p className="text-xs text-granite">Project Dashboard</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-electric font-medium">
                    <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
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
                         className="bg-canvas rounded-card p-4 shadow-lab">
                      <p className="text-2xl font-display font-semibold text-obsidian mb-0.5">
                        {stat.value}
                      </p>
                      <p className="text-xs font-medium text-granite">{stat.label}</p>
                      <p className="text-2xs text-granite mt-1">{stat.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {[
                    { label: 'Pharma',        pct: 82, widthClass: 'w-[82%]' },
                    { label: 'Data Centers',  pct: 67, widthClass: 'w-[67%]' },
                    { label: 'Manufacturing', pct: 91, widthClass: 'w-[91%]' },
                  ].map(({ label, pct, widthClass }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-granite">{label}</span>
                        <span className="text-granite">{pct}% utilisation</span>
                      </div>
                      <div className="h-1.5 bg-alabaster rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-ink rounded-full ${widthClass}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge - certification */}
              <div className="absolute -top-5 -right-5 bg-canvas rounded-card shadow-lab px-4 py-3
                              flex items-center gap-3">
                <div className="w-8 h-8 bg-ghost rounded-control flex items-center justify-center">
                  <CheckCircle size={18} className="text-electric" />
                </div>
                <div>
                  <p className="text-xs font-bold text-obsidian">ISO Certified</p>
                  <p className="text-2xs text-granite">9001 · 14001 · 45001</p>
                </div>
              </div>

              {/* Floating badge - years */}
              <div className="absolute -bottom-5 -left-5 bg-ink rounded-card shadow-lab
                              px-4 py-3 flex items-center gap-3">
                <p className="text-3xl font-display font-semibold text-canvas leading-none">
                  20+
                </p>
                <div>
                  <p className="text-xs font-semibold text-canvas/80">Years of</p>
                  <p className="text-xs font-semibold text-canvas/80">Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center
                        gap-2 text-granite animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  )
}
