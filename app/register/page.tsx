import type { Metadata } from 'next'
import { PROJECTS } from '@/lib/lepton'
import { Register } from '@/components/register'

export const metadata: Metadata = { title: 'Register', description: 'Stockyard machines, feeders, conveyors, EPCM, revamps and HiTechAudits® delivered by Lepton Projects.' }

export default function RegisterPage() {
  return (
    <div className="wrap">
      <section className="chapter" aria-labelledby="h">
        <div className="num" aria-hidden>0<span>2</span></div>
        <div className="txt">
          <p className="mono mute">chapter 02 · register</p>
          <h1 className="h1" id="h">{PROJECTS.length} entries. <em>450+ projects.</em></h1>
          <p className="lede">A selection from everything delivered since 2008. Press a key to filter, open a row for the scope and the numbers.</p>
        </div>
      </section>
      <Register projects={PROJECTS} />
    </div>
  )
}
