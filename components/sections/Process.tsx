import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const STEPS = [
  {
    number: '01',
    title: 'Discovery & Scoping',
    description: 'We begin with a deep-dive workshop to understand your project goals, regulatory constraints, schedule, and budget. A detailed scope of work and project brief is then agreed.',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Concept & Basis of Design',
    description: 'Our engineers develop the concept design and Basis of Design document — defining standards, design parameters, and key engineering decisions for client approval.',
    duration: '2–4 weeks',
  },
  {
    number: '03',
    title: 'Detailed Engineering',
    description: 'Full detailed design across all relevant disciplines, developed in BIM and coordinated across MEP, structural, civil, and process — with progress reviews at 30%, 60%, and 90%.',
    duration: '4–16 weeks',
  },
  {
    number: '04',
    title: 'Procurement & Construction',
    description: 'Tender documentation, vendor evaluation, and (for EPC projects) procurement and construction management with site supervision, ITP compliance, and progress reporting.',
    duration: 'Project-specific',
  },
  {
    number: '05',
    title: 'Commissioning & Handover',
    description: 'Systematic pre-commissioning, commissioning, and performance testing against design criteria. Final documentation, as-built drawings, O&M manuals, and training delivered.',
    duration: '2–8 weeks',
  },
  {
    number: '06',
    title: 'Post-Project Support',
    description: 'Defects liability period support, post-commissioning troubleshooting, and optional long-term engineering support retainer — ensuring the facility performs as designed.',
    duration: 'Ongoing',
  },
]

export function Process() {
  return (
    <section className="section-py bg-canvas">
      <div className="container-main">
        <SectionHeader
          tag="How We Work"
          title="A Proven Engineering Delivery Process"
          description="Our six-stage methodology ensures technical quality, schedule certainty, and complete stakeholder alignment — from first brief to final handover."
          align="center"
          className="mb-14 mx-auto"
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-alabaster" />

          <div className="grid gap-6 lg:gap-0">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <AnimateOnScroll
                  key={step.number}
                  animation={isEven ? 'slide-right' : 'slide-left'}
                  delay={i * 80}
                >
                  <div className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center
                                   ${!isEven ? 'lg:[&>*:first-child]:order-last' : ''}`}>

                    {/* Content side */}
                    <div className={`p-7 ${isEven ? 'lg:text-right lg:pr-16' : 'lg:pl-16'}`}>
                      <span className="inline-block text-5xl font-display font-semibold
                                       text-alabaster leading-none mb-2">
                        {step.number}
                      </span>
                      <h3 className="font-display font-semibold text-xl text-ink mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-granite text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium
                                       text-granite bg-ghost-white border border-alabaster
                                       px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-granite/60 rounded-full" />
                        Typical duration: {step.duration}
                      </span>
                    </div>

                    {/* Timeline node */}
                    <div className={`hidden lg:flex items-center
                                     ${isEven ? 'justify-start' : 'justify-end'}`}>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-alabaster
                                        bg-canvas flex items-center justify-center shadow-humble">
                          <span className="text-sm font-semibold text-granite">{step.number}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
