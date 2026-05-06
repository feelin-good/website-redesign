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
    name: 'A.K. Sharma',
    title: 'VP — Projects & Engineering',
    company: 'J.K. Lakshmi Cement Ltd.',
    quote: 'Lepton delivered our circular stacker/reclaimer on schedule and within budget — no small feat given the site constraints at Sirohi. Their design team understood our operational requirements deeply and the PLC automation has worked flawlessly since commissioning. We have already engaged them for our next plant expansion.',
    rating: 5,
    industry: 'Cement',
  },
  {
    id: 't2',
    name: 'R.S. Pandey',
    title: 'General Manager — Plant Engineering',
    company: 'NTPC Limited',
    quote: 'For a 2×500 MW coal handling plant, the level of engineering discipline Lepton brought was exactly what we needed. Their familiarity with CEA guidelines and NTPC specifications reduced our review cycles significantly. The wagon tippling and bunker feeding system has been running at rated capacity since Day 1.',
    rating: 5,
    industry: 'Power',
  },
  {
    id: 't3',
    name: 'Dinesh Thakur',
    title: 'Head — Port Operations',
    company: 'Adani Ports & SEZ Ltd.',
    quote: 'The overland conveyor from our jetty to the coal stockyard was a complex project — 2.2 km over challenging terrain with tight environmental compliance requirements. Lepton\'s solution met GPCB norms from Day 1, and the dry fog dust suppression has kept our stockyard compliant through every inspection.',
    rating: 5,
    industry: 'Ports',
  },
  {
    id: 't4',
    name: 'Subroto Biswas',
    title: 'Project Director',
    company: 'Vedanta Aluminium Ltd.',
    quote: 'Bauxite is a challenging material — abrasive, variable moisture, and demanding on equipment. Lepton\'s engineering team selected the right idler and belt specifications for our conditions. The baghouse dust collection they designed has brought our raw material yard well within MOEF emission norms.',
    rating: 5,
    industry: 'Mining',
  },
  {
    id: 't5',
    name: 'P.K. Jha',
    title: 'Works Manager',
    company: 'ACC Limited',
    quote: 'We commissioned Lepton for our limestone crushing and conveying plant at Kymore after seeing their work at another cement plant. They completed erection and commissioning in 11 months — 6 weeks ahead of schedule. The plant has been running at 95%+ availability in the year since commissioning.',
    rating: 5,
    industry: 'Cement',
  },
  {
    id: 't6',
    name: 'B.N. Singh',
    title: 'DGM — Materials Handling',
    company: 'Steel Authority of India Ltd.',
    quote: 'Replacing an existing wagon tippler during a planned shutdown is always high-pressure work — any overrun directly impacts furnace operations. Lepton completed the double wagon tippler replacement within the 21-day shutdown window, with full PLC integration tested and handed over on time. Impressive execution.',
    rating: 5,
    industry: 'Steel',
  },
]
