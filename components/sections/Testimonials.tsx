'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TESTIMONIALS } from '@/lib/data/testimonials'
import { cn } from '@/lib/utils'
import { loadAnime } from '@/lib/hooks/useAnime'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-orange-400 fill-orange-400' : 'text-slate-200'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const pendingIn = useRef(false)
  const didMount = useRef(false)

  // Phase 2: animate in after React re-renders with new content
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    if (!pendingIn.current) return
    pendingIn.current = false

    const el = contentRef.current
    if (!el) { isAnimating.current = false; return }

    loadAnime().then(({ animate }) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 280,
        ease: 'outCubic',
        onComplete: () => { isAnimating.current = false },
      })
    })
  }, [active])

  // Phase 1: animate out, then swap state
  const navigateTo = useCallback(async (newIndex: number) => {
    if (isAnimating.current || newIndex === active) return
    isAnimating.current = true

    const el = contentRef.current
    if (!el) {
      setActive(newIndex)
      isAnimating.current = false
      return
    }

    const { animate } = await loadAnime()

    await new Promise<void>(resolve => {
      animate(el, {
        opacity: 0,
        translateY: -14,
        duration: 190,
        ease: 'inCubic',
        onComplete: () => resolve(),
      })
    })

    pendingIn.current = true
    setActive(newIndex)
    // useEffect watching [active] will fire after commit and run animate-in
  }, [active])

  const prev = useCallback(
    () => navigateTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    [active, navigateTo]
  )
  const next = useCallback(
    () => navigateTo((active + 1) % TESTIMONIALS.length),
    [active, navigateTo]
  )

  const current = TESTIMONIALS[active]

  return (
    <section className="section-py bg-navy-950">
      <div className="container-main">
        <SectionHeader
          tag="Client Testimonials"
          title="What Our Clients Say"
          description="Building long-term partnerships through consistent delivery and technical excellence."
          theme="dark"
          align="center"
          className="mb-14 mx-auto"
        />

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <AnimateOnScroll animation="fade-in">
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 mb-8">
              {/* Quote icon */}
              <div className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-orange-500/10
                              border border-orange-500/20 flex items-center justify-center">
                <Quote size={24} className="text-orange-400" />
              </div>

              {/* Animated content wrapper */}
              <div ref={contentRef}>
                <StarRating rating={current.rating} />

                <blockquote className="text-xl lg:text-2xl font-medium text-white
                                       leading-relaxed mt-5 mb-8 pr-16">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600
                                  flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{current.name}</p>
                    <p className="text-sm text-slate-400">{current.title}</p>
                    <p className="text-sm font-medium text-orange-400">{current.company}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs font-semibold uppercase tracking-widest
                                     text-slate-400 bg-white/5 border border-white/10
                                     px-3 py-1 rounded-full">
                      {current.industry}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Navigation + dots */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(i)}
                  className={cn(
                    'transition-all duration-200 rounded-full',
                    i === active
                      ? 'w-8 h-2 bg-orange-500'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-orange-500
                           flex items-center justify-center text-white/60 hover:text-orange-400
                           transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-orange-500
                           flex items-center justify-center text-white/60 hover:text-orange-400
                           transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mini cards */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <button
                key={t.id}
                onClick={() => navigateTo(i)}
                className={cn(
                  'text-left p-4 rounded-2xl border transition-all duration-200',
                  i === active
                    ? 'border-orange-500/40 bg-orange-500/10'
                    : 'border-white/8 bg-white/3 hover:border-white/20'
                )}
              >
                <StarRating rating={t.rating} />
                <p className="text-xs text-slate-300 mt-2 line-clamp-2">"{t.quote}"</p>
                <p className="text-xs font-semibold text-white mt-2">{t.name}</p>
                <p className="text-xs text-slate-500">{t.company}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
