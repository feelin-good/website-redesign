import type { Metadata, Viewport } from 'next'
import { Archivo, Martian_Mono } from 'next/font/google'
import './globals.css'
import { Top, Back } from '@/components/unit'

const word = Archivo({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'], variable: '--font-word', display: 'swap' })
const mono = Martian_Mono({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://lepton.co.in'),
  title: { default: 'Lepton Projects: built to move bulk', template: '%s · Lepton Projects' },
  description:
    'Stackers, reclaimers, apron feeders, overland and pipe conveyors, EPCM and HiTechAudit® for cement, power, steel, ports and mines. 450+ projects in India and abroad since 2008.',
}

export const viewport: Viewport = { themeColor: '#fbfbf9', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${word.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Top />
        <main id="main">{children}</main>
        <Back />
      </body>
    </html>
  )
}
