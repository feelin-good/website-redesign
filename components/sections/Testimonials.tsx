'use client'

import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TESTIMONIALS } from '@/lib/data/testimonials'
import { cn } from '@/lib/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-electric fill-electric' : 'text-canvas/20'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length)

  const current = TESTIMONIALS[active]

  return (
    <section className="section-py bg-ink">
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
            <div className="relative bg-canvas/5 border border-canvas/10 rounded-image p-8 lg:p-12 mb-8">
              {/* Quote icon */}
              <div className="absolute top-8 right-8 w-14 h-14 rounded-control bg-canvas/10
                              border border-canvas/20 flex items-center justify-center">
                <Quote size={24} className="text-electric" />
              </div>

              <StarRating rating={current.rating} />

              <blockquote className="text-xl lg:text-2xl font-medium text-canvas
                                     leading-relaxed mt-5 mb-8 pr-16">
                "{current.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                {/* Avatar initial */}
                <div className="w-12 h-12 rounded-full bg-canvas/10
                                flex items-center justify-center text-canvas font-bold text-lg shrink-0">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-canvas">{current.name}</p>
                  <p className="text-sm text-canvas/60">{current.title}</p>
                  <p className="text-sm font-medium text-electric">{current.company}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs font-semibold uppercase tracking-widest
                                   text-canvas/60 bg-canvas/10 border border-canvas/20
                                   px-3 py-1 rounded-full">
                    {current.industry}
                  </span>
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
                    onClick={() => setActive(i)}
                    className={cn(
                      'transition-all duration-200 rounded-full',
                      i === active
                        ? 'w-8 h-2 bg-electric'
                        : 'w-2 h-2 bg-canvas/20 hover:bg-canvas/40'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-canvas/20 hover:border-electric
                           flex items-center justify-center text-canvas/60 hover:text-electric
                           transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-canvas/20 hover:border-electric
                           flex items-center justify-center text-canvas/60 hover:text-electric
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
                onClick={() => setActive(i)}
                className={cn(
                  'text-left p-4 rounded-card border transition-all duration-200',
                  i === active
                    ? 'border-electric/40 bg-canvas/10'
                    : 'border-canvas/10 bg-canvas/5 hover:border-canvas/20'
                )}
              >
                <StarRating rating={t.rating} />
                <p className="text-xs text-canvas/70 mt-2 line-clamp-2">"{t.quote}"</p>
                <p className="text-xs font-semibold text-canvas mt-2">{t.name}</p>
                <p className="text-xs text-canvas/50">{t.company}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
