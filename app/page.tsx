import Link from 'next/link'
import { PROJECTS, REPEAT_ORDERS, RULES, TITLE_BLOCK, WORKS, QCC_REVISIONS } from '@/lib/lepton'
import { Plate, RouteSchematic, Cloud } from '@/components/drawing'
import { PlateCarousel, type Slide } from '@/components/carousel'
import { Zone } from '@/components/sheet'
import { Register } from '@/components/register'
import Image from 'next/image'

const HERO_PLATES: Slide[] = [
  { src: '/photos/bwr-sail-meghahatuburu.jpg', alt: "Lepton's yellow bucket wheel reclaimer working an iron ore stockpile at SAIL Meghahatuburu",
    title: 'Bucket wheel reclaimer', where: 'SAIL Meghahatuburu · design, manufacture, E&C', date: 'Nov 2019',
    dim: { label: 'BOOM 41.25 M', left: '8%', right: '24%', top: '13%' }, callout: ['Bucket wheel reclaimer', '3000 TPH iron ore'] },
  { src: '/photos/adani-mundra-bwsr.jpg', alt: 'Blue bucket wheel stacker-reclaimers on the coal yard at Adani West Port, Mundra',
    title: 'BWSRs & yard conveyors', where: 'L&T · Adani West Port, Mundra · E&C', date: 'Oct 2016',
    callout: ['4 BWSR + 2 BWR', 'Stacking 6800 TPH', 'Reclaiming 3500 TPH'] },
  { src: '/photos/jaypee-super-dome.jpg', alt: 'Circular stacker-reclaimer under the ribbed roof of an 82 metre dome, Jaypee Super Cement',
    title: 'Circular dome & stacker-reclaimer', where: 'Jaypee Super Cement, Sonebhadra · E&C', date: 'Oct 2012',
    dim: { label: 'DOME Ø 82 M', left: '4%', right: '4%', top: '8%' }, callout: ['Circular stacker/reclaimer', 'Coal feed conveyor'] },
  { src: '/photos/qcc-stacker-restored.jpg', alt: "Qassim Cement's limestone stacker back at work in its shed after restoration",
    title: 'Limestone stacker restoration', where: 'Qassim Cement Co., Saudi Arabia', date: 'Oct 2015',
    callout: ['Collapsed Sep 2015', 'Restored in 24 days', '2200 TPH'] },
  { src: '/photos/ultratech-manikgarh.jpg', alt: 'Stacker under erection with orange handrails at UltraTech Manikgarh',
    title: 'Stacker & side scraper reclaimer', where: 'UltraTech Cement, Manikgarh', date: 'May 2023',
    callout: ['Stacker 275 TPH · boom 16.1 m', 'Followed by an order for 12 more'] },
  { src: '/photos/acc-jamul-bridge-reclaimer.jpg', alt: 'Limestone bridge reclaimer spanning the stockpile in the shed at ACC Jamul',
    title: 'Bridge reclaimer rake car & harrow', where: 'ACC Jamul · after HiTechAudit®', date: 'Sep 2017',
    callout: ['Design 850 TPH', 'Was running at 500', 'Now 850 TPH'] },
  { src: '/photos/nalco-apron-feeder.jpg', alt: 'Orange apron feeder with Lepton nameplate at the NALCO receiving hopper',
    title: 'Apron feeders, ROM receiving hopper', where: 'NALCO · design, manufacture, E&C', date: 'Jun 2023',
    callout: ['1250 TPH bauxite', 'Pan width 1600 mm', '75 kW VFD drive'] },
  { src: '/photos/himachal-circular-stockyard.jpg', alt: 'Aerial view of the circular stockyard dome and conveyor galleries at Jaypee Himachal Cement, in the hills',
    title: 'Coal & limestone circular stockyard', where: 'Jaypee Himachal Cement · E&C supervision for PHB', date: 'Apr 2010',
    callout: ['Limestone stacker 1200 TPH', 'Reclaimer 1000 TPH'] },
]

const FEATURED = [0, 1, 14, 2, 37, 23].map((i) => PROJECTS[i])

export default function Home() {
  const max = REPEAT_ORDERS[0][1]
  return (
    <>
      <section className="hero" aria-labelledby="h">
        <div className="copy">
          <p className="ref">DWG LP-000 · General arrangement · Sheet 00 of 05</p>
          <h1 className="display" id="h">Concept to commissioning <em>&amp; beyond.</em></h1>
          <p className="lede">
            Stackers, reclaimers, feeders and kilometres of conveyor for cement, power, steel, ports and
            mines. We engineer them, build them in our own works at Alwar, erect them, and keep them running.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 'auto' }}>
            <Link className="stamp" href="/contact">Send us your GA →</Link>
            <Link className="stamp ink" href="/register">Open the register</Link>
          </div>
        </div>
        <div className="plate-wrap">
          <PlateCarousel slides={HERO_PLATES} />
        </div>
      </section>

      <div className="titleblock" role="list" aria-label="Title block">
        {TITLE_BLOCK.map((t) => (
          <div key={t.label} role="listitem"><span className="ref">{t.label}</span><strong>{t.value}</strong></div>
        ))}
      </div>

      <Zone zref="A–A" title="Section · the material route" id="route">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          <h2 className="h2">From the wagon<br />to the ship.</h2>
          <p className="prose" style={{ maxWidth: '46ch' }}>
            We design and supply at every transfer point between where bulk material arrives and where it
            leaves: as single machines, as complete systems, or as the engineer behind someone else&apos;s.
          </p>
        </div>
        <RouteSchematic />
        <p style={{ marginTop: 20 }}><Link className="stamp ink" href="/solutions">Solutions, sheet 01 →</Link></p>
      </Zone>

      <Zone zref="B" title="Register · selected" id="register">
        <h2 className="h2" style={{ marginBottom: 8 }}>450 projects. Six of them.</h2>
        <Register projects={FEATURED} filters={false} />
        <p style={{ marginTop: 20 }}><Link className="stamp ink" href="/register">Full register, sheet 02 →</Link></p>
      </Zone>

      <section className="rules" aria-labelledby="rules-t">
        <div className="big">
          <h2 className="sr-only" id="rules-t">Our two rules</h2>
          <p><span className="n">Rule #1</span>{RULES[0]}</p>
          <p><span className="n">Rule #2</span><Cloud>{RULES[1]}</Cloud></p>
        </div>
        <div className="bars">
          <p className="ref" style={{ marginBottom: 14 }}>Repeat orders · number of orders per client</p>
          {REPEAT_ORDERS.slice(0, 12).map(([name, n]) => (
            <div className="bar" key={name}>
              <span>{name}</span>
              <span className="track"><i style={{ ['--w' as string]: `${(n / max) * 100}%` }} /></span>
              <b>{n}</b>
            </div>
          ))}
        </div>
      </section>

      <Zone zref="C" title="Revision history · QCC, Saudi Arabia" id="qcc">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'start' }}>
          <div>
            <h2 className="h2">It fell in September. It ran again in 24 days.</h2>
            <table className="revs" style={{ marginTop: 22 }}>
              <thead><tr><th>Rev</th><th>Date</th><th>Description</th></tr></thead>
              <tbody>
                {QCC_REVISIONS.map((r) => (
                  <tr key={r.rev} className={r.mark ? 'mark' : undefined}>
                    <td><span className="tri">{r.rev}</span></td><td>{r.date}</td><td>{r.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: 20 }}><Link className="stamp" href="/hitechaudit">What a HiTechAudit® finds →</Link></p>
          </div>
          <Plate src="/photos/qcc-stacker-collapsed.jpg" alt="QCC's limestone stacker lying collapsed across the stockpile in its shed, with Lepton's crew beside it" plate="Plate 02" caption="Limestone stacker after the collapse · Qassim Cement" date="Sep 2015" ratio="16 / 9" />
        </div>
      </Zone>

      <section className="works" aria-label="Our works">
        {WORKS.filter((w) => w.photo).map((w) => (
          <figure key={w.name}>
            <div style={{ position: 'relative' }}>
              <Image src={w.photo} alt={`${w.name}: inside the factory`} width={1024} height={768} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <figcaption>
              <span className="ref"><b>{w.name}</b></span>
              <p className="area">{w.area}</p>
              <p>{w.makes}</p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  )
}
