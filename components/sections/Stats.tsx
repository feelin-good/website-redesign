import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { COMPANY } from '@/lib/data/company'

export function Stats() {
  return (
    <section className="bg-alabaster py-16 lg:py-20">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {COMPANY.stats.map((stat, i) => (
            <AnimateOnScroll key={stat.label} animation="fade-up" delay={i * 100}>
              <div className="text-center">
                <div className="font-display font-semibold text-ink mb-2 tabular-nums"
                     style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2200}
                  />
                </div>
                <div className="w-8 h-px bg-granite/30 mx-auto mb-2 rounded-full" />
                <p className="text-granite text-sm font-medium">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
