'use client'

import dynamic from 'next/dynamic'
import { DIAGRAMS, type DiagramId } from '@/components/anime/registry'

const MachineDiagram = dynamic(
  () => import('@/components/anime/MachineDiagram').then(m => m.MachineDiagram),
  { ssr: false }
)

interface Props {
  machine: DiagramId
  tag?: string
  title?: string
  description?: string
}

/**
 * Full-width animated technical elevation, used on project and service detail
 * pages. The drawing animates itself on when it scrolls into view.
 */
export function MachineShowcase({
  machine,
  tag = 'Equipment',
  title,
  description,
}: Props) {
  const spec = DIAGRAMS[machine]

  return (
    <section className="section-py bg-canvas">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-granite
                             uppercase tracking-widest mb-4">
              <span className="w-6 h-0.5 bg-granite rounded-full" />
              {tag}
            </span>
            <h2 className="font-display font-semibold text-ink mb-4"
                style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', lineHeight: 1.15 }}>
              {title ?? spec.name}
            </h2>
            <p className="text-granite leading-relaxed">
              {description ??
                `An engineering elevation of the ${spec.name.toLowerCase()} configuration
                 Lepton designs, supplies and commissions.`}
            </p>
          </div>

          {/* Spec table, drawing-title-block style */}
          <dl className="shrink-0 grid grid-cols-2 gap-x-8 gap-y-3 lg:text-right">
            <dt className="text-xs text-granite uppercase tracking-widest">Designation</dt>
            <dd className="text-sm font-semibold text-ink">{spec.code}</dd>
            {spec.specs.slice(0, 3).map((v, i) => (
              <div key={v} className="contents">
                <dt className="text-xs text-granite uppercase tracking-widest">
                  {['Capacity', 'Key dimension', 'Configuration'][i] ?? 'Spec'}
                </dt>
                <dd className="text-sm font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-image overflow-hidden border border-alabaster shadow-humble
                        h-[380px] sm:h-[480px] lg:h-[580px]">
          <MachineDiagram machine={machine} />
        </div>
      </div>
    </section>
  )
}
