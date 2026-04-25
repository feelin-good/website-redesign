'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { COMPANY } from '@/lib/data/company'
import { loadAnime } from '@/lib/hooks/useAnime'

const BAR_DATA = [
  { label: 'Pharma',        pct: 82 },
  { label: 'Data Centers',  pct: 67 },
  { label: 'Manufacturing', pct: 91 },
]

const TRUST_BADGES = [
  'ISO 9001:2015 Certified',
  '20+ Years Experience',
  '500+ Projects Delivered',
  'Pan-India Presence',
]

export function Hero() {
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const bars = barRefs.current.filter((el): el is HTMLDivElement => el !== null)
    if (!bars.length) return
    loadAnime().then(({ animate }) => {
      bars.forEach((bar, i) => {
        animate(bar, {
          width: `${BAR_DATA[i].pct}%`,
          duration: 1100,
          ease: 'outQuart',
          delay: 500 + i * 180,
        })
      })
    })
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-950"
      aria-label="Hero"
    >
      {/* Background geometric pattern */}
      <div className="absolute inset-0 hero-pattern opacity-100" />

      {/* Gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full
                        bg-orange-500/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full
                        bg-navy-700/40 blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full
                        bg-gold-500/5 blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0"
           style={{
             backgroundImage: `
               linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
             `,
             backgroundSize: '60px 60px',
           }}
      />

      {/* Orange accent line left */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-40" />

      <div className="container-main relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Content */}
          <div>
            {/* Tag line */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                            border border-orange-500/30 bg-orange-500/10 mb-7
                            animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
                Engineering Excellence Since {COMPANY.founded}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-white mb-6 animate-fade-up"
                style={{ animationDelay: '100ms', fontSize: 'clamp(2.5rem, 5.5vw, 4rem)', lineHeight: 1.08 }}>
              Built on{' '}
              <span className="relative">
                <span className="relative z-10 gradient-text">Engineering</span>
              </span>
              <br />
              Precision &amp;{' '}
              <span className="text-orange-400">Trust.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-xl animate-fade-up"
               style={{ animationDelay: '200ms' }}>
              {COMPANY.subTagline}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-10 animate-fade-up"
                 style={{ animationDelay: '300ms' }}>
              {TRUST_BADGES.map(badge => (
                <span key={badge}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-300
                                 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  <CheckCircle size={12} className="text-orange-400 shrink-0" />
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up"
                 style={{ animationDelay: '400ms' }}>
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
                variant="ghost-white"
                size="lg"
              >
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right: Feature cards */}
          <div className="hidden lg:block animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8
                              shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 15L10 3L17 15H3Z" fill="white" fillOpacity="0.9" />
                      <path d="M7 15L10 9L13 15H7Z" fill="white" fillOpacity="0.4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Lepton Projects</p>
                    <p className="text-xs text-slate-400">Project Dashboard</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
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
                         className="bg-white/5 rounded-2xl p-4 border border-white/8">
                      <p className="text-2xl font-display font-extrabold text-white mb-0.5">
                        {stat.value}
                      </p>
                      <p className="text-xs font-medium text-slate-300">{stat.label}</p>
                      <p className="text-2xs text-slate-500 mt-1">{stat.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {BAR_DATA.map(({ label, pct }, index) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-slate-400">{pct}% utilisation</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          ref={el => { barRefs.current[index] = el }}
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge - certification */}
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3
                              border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <CheckCircle size={18} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy-900">ISO Certified</p>
                  <p className="text-2xs text-slate-400">9001 · 14001 · 45001</p>
                </div>
              </div>

              {/* Floating badge - years */}
              <div className="absolute -bottom-5 -left-5 bg-orange-500 rounded-2xl shadow-xl
                              px-4 py-3 flex items-center gap-3">
                <p className="text-3xl font-display font-extrabold text-white leading-none">
                  20+
                </p>
                <div>
                  <p className="text-xs font-semibold text-white/90">Years of</p>
                  <p className="text-xs font-semibold text-white/90">Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center
                        gap-2 text-slate-500 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  )
}
