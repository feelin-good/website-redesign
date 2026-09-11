'use client'

import dynamic from 'next/dynamic'
import { MACHINES, type MachineId } from '@/components/three/registry'

const MachineViewer = dynamic(
  () => import('@/components/three/MachineViewer').then(m => m.MachineViewer),
  { ssr: false }
)

interface Props {
  machine: MachineId
  tag?: string
  title?: string
  description?: string
}

/**
 * Full-width interactive 3D model of a piece of equipment, used on project and
 * service detail pages. The model is only built once it scrolls into view.
 */
export function MachineShowcase({
  machine,
  tag = 'Equipment',
  title,
  description,
}: Props) {
  const spec = MACHINES[machine]

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
                `An engineering model of the ${spec.name.toLowerCase()} configuration Lepton
                 designs, supplies and commissions. Drag to orbit the assembly.`}
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
                        h-[420px] sm:h-[520px] lg:h-[620px]">
          <MachineViewer machine={machine} />
        </div>
      </div>
    </section>
  )
}
