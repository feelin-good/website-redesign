export interface Project {
  id: string
  slug: string
  title: string
  client: string
  location: string
  year: number
  category: string
  services: string[]
  description: string
  highlights: string[]
  image: string
  featured: boolean
  area?: string
  value?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'cipla-api-plant-kurkumbh',
    title: 'API Manufacturing Plant — Kurkumbh',
    client: 'Cipla Ltd.',
    location: 'Kurkumbh, Pune',
    year: 2022,
    category: 'Pharmaceuticals',
    services: ['mep-engineering', 'process-engineering', 'epc-turnkey'],
    description: 'Complete USFDA-aligned API manufacturing facility with multi-product capability, GMP HVAC, solvent recovery systems, and effluent treatment. Delivered on a fast-track EPC basis within 18 months.',
    highlights: [
      '45,000 sq.m facility on a fast-track schedule',
      'USFDA & EU-GMP compliant HVAC design',
      'Solvent recovery and ZLD effluent system',
      'Integrated BIM coordination (MEP + Civil + Process)',
    ],
    image: '/images/projects/api-plant.jpg',
    featured: true,
    area: '45,000 sq.m',
    value: '₹180 Cr',
  },
  {
    id: 'p2',
    slug: 'tata-motors-stamping-plant',
    title: 'Press Shop & Body-in-White Facility',
    client: 'Tata Motors Ltd.',
    location: 'Chakan, Pune',
    year: 2021,
    category: 'Manufacturing',
    services: ['structural-engineering', 'mep-engineering', 'civil-infrastructure'],
    description: 'Design and PMC for a large-span press shop and body-in-white facility including PEB structure, overhead crane systems, compressed air, and fire protection.',
    highlights: [
      '80m clear-span pre-engineered building',
      '250T overhead crane rail system design',
      'NFPA 13 compliant fire suppression',
      'Compressed air and nitrogen distribution',
    ],
    image: '/images/projects/stamping-plant.jpg',
    featured: true,
    area: '32,000 sq.m',
    value: '₹95 Cr',
  },
  {
    id: 'p3',
    slug: 'tier3-data-center-mumbai',
    title: 'Tier III Data Center',
    client: 'Confidential (Leading IT Firm)',
    location: 'Navi Mumbai',
    year: 2023,
    category: 'Data Centers',
    services: ['mep-engineering', 'structural-engineering', 'epc-turnkey'],
    description: 'End-to-end design and EPC execution for a 4 MW Tier III data center with N+1 redundant UPS systems, precision cooling, and a PUE of 1.28.',
    highlights: [
      '4 MW critical IT load capacity',
      'N+1 UPS and 2N power distribution',
      'PUE 1.28 achieved through aisle containment',
      'Uptime Institute Tier III compliant design',
    ],
    image: '/images/projects/data-center.jpg',
    featured: true,
    area: '8,500 sq.m',
    value: '₹120 Cr',
  },
  {
    id: 'p4',
    slug: 'apollo-hospital-hyderabad',
    title: '500-Bed Multi-Specialty Hospital',
    client: 'Apollo Hospitals Group',
    location: 'Hyderabad, Telangana',
    year: 2022,
    category: 'Healthcare',
    services: ['mep-engineering', 'structural-engineering', 'project-management'],
    description: 'Comprehensive MEP engineering for a 500-bed multi-specialty hospital including laminar-flow OTs, medical gas, and NABH-compliant fire and electrical systems.',
    highlights: [
      '8 laminar-flow operating theatres',
      'Medical gas piping (O₂, N₂O, vacuum, MGPS)',
      'NABH and JCI documentation support',
      'Three-tier electrical redundancy',
    ],
    image: '/images/projects/hospital.jpg',
    featured: true,
    area: '62,000 sq.m',
    value: '₹210 Cr',
  },
  {
    id: 'p5',
    slug: 'pune-ring-road-package',
    title: 'Pune Ring Road — Package 4',
    client: 'Maharashtra PWD',
    location: 'Pune, Maharashtra',
    year: 2020,
    category: 'Infrastructure',
    services: ['civil-infrastructure', 'structural-engineering'],
    description: 'Detailed engineering design for a 22 km stretch of the Pune Ring Road including two underpasses, three overpasses, storm water drainage, and service roads.',
    highlights: [
      '22 km four-lane carriageway design',
      'Two grade-separated interchanges',
      'Hydraulic modelling for storm drainage',
      'DPR and tender documents for MSRDC',
    ],
    image: '/images/projects/road.jpg',
    featured: false,
    value: '₹340 Cr (construction)',
  },
  {
    id: 'p6',
    slug: 'godrej-industrial-park',
    title: 'Integrated Industrial Park',
    client: 'Godrej Properties Ltd.',
    location: 'Chakan, Pune',
    year: 2021,
    category: 'Commercial',
    services: ['civil-infrastructure', 'mep-engineering', 'project-management'],
    description: 'Master planning and infrastructure engineering for a 150-acre integrated industrial park including roads, utilities, STP, and plug-and-play factory shells.',
    highlights: [
      '150-acre master planned industrial park',
      '12 km internal road network',
      'Common utility spine (water, power, gas)',
      '2 MLD STP and 1 MLD WTP',
    ],
    image: '/images/projects/industrial-park.jpg',
    featured: false,
    area: '150 acres',
    value: '₹85 Cr',
  },
]

export const PROJECT_CATEGORIES = [
  'All',
  'Pharmaceuticals',
  'Manufacturing',
  'Data Centers',
  'Healthcare',
  'Infrastructure',
  'Commercial',
]

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter(p => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
