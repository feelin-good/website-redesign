import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { COMPANY } from '@/lib/data/company'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

const geistVariable = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-variable',
  weight: ['400', '500', '600'],
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  weight: ['400', '500', '600'],
  preload: true,
})

const BASE_URL = 'https://lepton.co.in'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${COMPANY.name} — Engineering Excellence. Delivered.`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'Lepton Projects Pvt. Ltd. — India\'s trusted multi-discipline engineering consultancy. MEP, structural, civil, process engineering and EPC delivery for pharma, manufacturing, data centers, healthcare, and infrastructure projects.',
  keywords: [
    'engineering consultancy India',
    'MEP engineering',
    'structural engineering',
    'project management',
    'EPC contractor India',
    'pharma facility design',
    'data center design',
    'civil infrastructure',
    'Lepton Projects',
    'engineering Pune',
  ],
  authors: [{ name: COMPANY.legalName, url: BASE_URL }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: COMPANY.name,
    title: `${COMPANY.name} — Engineering Excellence. Delivered.`,
    description:
      'End-to-end engineering, design, and project management for complex industrial and infrastructure projects across India.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lepton Projects — Engineering Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} — Engineering Excellence`,
    description: 'Multi-discipline engineering consultancy delivering complex projects across India.',
    images: ['/og-image.png'],
    creator: '@leptonprojects',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)',  color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${bricolage.variable} ${geist.variable} ${geistVariable.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preconnect to font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: COMPANY.legalName,
              url: BASE_URL,
              logo: `${BASE_URL}/logo.png`,
              description: 'Multi-discipline engineering consultancy for industrial and infrastructure projects.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: COMPANY.address.street,
                addressLocality: COMPANY.address.city,
                addressRegion: COMPANY.address.state,
                postalCode: COMPANY.address.pin,
                addressCountry: 'IN',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: COMPANY.phone,
                  contactType: 'customer service',
                  availableLanguage: ['English', 'Hindi', 'Marathi'],
                },
              ],
              sameAs: [
                COMPANY.social.linkedin,
                COMPANY.social.twitter,
              ],
              foundingDate: COMPANY.founded.toString(),
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 200 },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100]
                     bg-ink text-canvas px-4 py-2 rounded-pill font-semibold text-sm"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
