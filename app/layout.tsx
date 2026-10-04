import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { GridRefs, Header, Footer } from '@/components/sheet'

const cond = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-cond', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-mono', display: 'swap' })
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://lepton.co.in'),
  title: { default: 'Lepton Projects: bulk material handling, concept to commissioning', template: '%s · Lepton Projects' },
  description:
    'Stackers, reclaimers, apron feeders, overland and pipe conveyors, EPCM and HiTechAudit® for cement, power, steel, ports and mines. 450+ projects in India and abroad since 2008.',
}

export const viewport: Viewport = { themeColor: '#f3f1ea', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cond.variable} ${mono.variable} ${sans.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <div className="sheet">
          <GridRefs />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
