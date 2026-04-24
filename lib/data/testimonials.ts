export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  quote: string
  rating: number
  industry: string
  avatar?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Mehta',
    title: 'VP Engineering & Projects',
    company: 'Cipla Ltd.',
    quote: 'Lepton delivered our API facility within a tight 18-month window without compromising on GMP quality. Their MEP team has exceptional regulatory knowledge and kept us ahead of every USFDA inspection readiness checkpoint.',
    rating: 5,
    industry: 'Pharmaceuticals',
  },
  {
    id: 't2',
    name: 'Ananya Krishnaswamy',
    title: 'Head — Infrastructure',
    company: 'Tata Motors Ltd.',
    quote: 'We\'ve partnered with Lepton across three plant expansions over a decade. Their project management discipline, transparent reporting, and technical capability make them the benchmark for engineering consultancy in our supplier ecosystem.',
    rating: 5,
    industry: 'Manufacturing',
  },
  {
    id: 't3',
    name: 'Suresh Nair',
    title: 'CTO',
    company: 'Leading Hyperscaler (NDA)',
    quote: 'The data center they designed for us achieves a PUE of 1.28 — significantly below our 1.4 target. The attention to detail in the power architecture and aisle containment strategy was outstanding. We\'ve already commissioned them for Phase 2.',
    rating: 5,
    industry: 'Data Centers',
  },
  {
    id: 't4',
    name: 'Dr. Priya Srinivasan',
    title: 'Director — Projects',
    company: 'Apollo Hospitals',
    quote: 'NABH compliance in hospital MEP is non-negotiable and Lepton understands this deeply. They brought both the technical expertise and the documentation discipline we needed to clear our audit without a single major non-conformance.',
    rating: 5,
    industry: 'Healthcare',
  },
  {
    id: 't5',
    name: 'Vikram Patil',
    title: 'General Manager — Facilities',
    company: 'Godrej Properties Ltd.',
    quote: 'For our 150-acre industrial park, Lepton\'s integrated civil and MEP approach saved us 6 months of coordination across separate consultants. Their master planning expertise is truly multi-disciplinary.',
    rating: 5,
    industry: 'Commercial',
  },
  {
    id: 't6',
    name: 'Arun Desai',
    title: 'Project Director',
    company: 'Maharashtra PWD',
    quote: 'The DPR and detailed design delivered for Pune Ring Road Package 4 was of very high quality. Lepton\'s civil team is thorough, responsive, and understands the public infrastructure context well.',
    rating: 5,
    industry: 'Infrastructure',
  },
]
