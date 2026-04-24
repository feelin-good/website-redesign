import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Certifications } from '@/components/sections/Certifications'
import { CTABanner } from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Lepton Projects — Engineering Excellence. Delivered.',
  description:
    'India\'s trusted multi-discipline engineering consultancy. MEP, structural, civil, process engineering and EPC delivery for pharma, manufacturing, data centers, and infrastructure.',
  alternates: {
    canonical: 'https://lepton.co.in',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedProjects />
      <IndustriesSection />
      <Process />
      <Testimonials />
      <Certifications />
      <CTABanner variant="gradient" />
    </>
  )
}
