import type { Metadata } from 'next'
import { PROJECTS } from '@/lib/lepton'
import { Register } from '@/components/register'

export const metadata: Metadata = { title: 'Register', description: 'Stockyard machines, feeders, conveyors, EPCM, revamps and HiTechAudits® delivered by Lepton Projects.' }

export default function RegisterPage() {
  return (
    <section style={{ padding: 'clamp(28px, 4vw, 56px) var(--gutter)' }} aria-labelledby="h">
      <p className="ref">DWG LP-002 · Drawing register · Sheet 02 of 05</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 20, margin: '14px 0 6px' }}>
        <h1 className="display" id="h">The register.</h1>
        <p className="prose" style={{ maxWidth: '44ch' }}>
          {PROJECTS.length} entries from more than 450 projects since 2008. Open a row for the scope and the numbers.
        </p>
      </div>
      <Register projects={PROJECTS} />
    </section>
  )
}
