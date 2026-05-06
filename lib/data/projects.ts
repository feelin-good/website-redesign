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
    slug: 'jk-lakshmi-cement-stacker-reclaimer',
    title: 'Circular Stacker & Reclaimer System',
    client: 'J.K. Lakshmi Cement Ltd.',
    location: 'Sirohi, Rajasthan',
    year: 2023,
    category: 'Cement',
    services: ['stacker-reclaimer-systems', 'belt-conveyor-systems'],
    description: 'Design, supply, erection, and commissioning of a 600 TPH circular stacker/reclaimer system for limestone stockyard management. The system integrates with the existing plant conveyor network and includes full PLC-based automation with SCADA monitoring for unmanned stockyard operations.',
    highlights: [
      '600 TPH rated circular stacker/reclaimer',
      '25,000 MT active limestone storage capacity',
      'PLC-based automation with remote SCADA monitoring',
      'Integrated with existing plant DCS',
    ],
    image: '/images/projects/stacker-reclaimer.jpg',
    featured: true,
    value: '₹28 Cr',
  },
  {
    id: 'p2',
    slug: 'ntpc-coal-handling-plant',
    title: 'Coal Handling Plant — 2×500 MW',
    client: 'NTPC Limited',
    location: 'Korba, Chhattisgarh',
    year: 2022,
    category: 'Power',
    services: ['coal-fuel-handling-plants', 'belt-conveyor-systems', 'wagon-tipplers-material-handling'],
    description: 'Complete EPC of a coal handling plant serving a 2×500 MW thermal power station. Scope included twin wagon tipplers, primary and secondary crushers, conveyor system from tippler house to coal bunkers (1.8 km), and a motorised tripper car system for bunker loading — all controlled by a centralised PLC/SCADA system.',
    highlights: [
      'Twin 1,500 TPH wagon tippler system',
      '1.8 km coal conveyor network (12 flights)',
      'Primary crusher (1,200 TPH) and secondary crusher (800 TPH)',
      'Motorised tripper car bunker loading system',
    ],
    image: '/images/projects/coal-handling-plant.jpg',
    featured: true,
    value: '₹85 Cr',
  },
  {
    id: 'p3',
    slug: 'adani-ports-conveyor-system',
    title: 'Ship-to-Stockyard Conveyor System',
    client: 'Adani Ports & SEZ Ltd.',
    location: 'Mundra, Gujarat',
    year: 2023,
    category: 'Ports',
    services: ['belt-conveyor-systems', 'dust-management-systems'],
    description: 'Engineering, procurement, and commissioning of a 2.2 km overland conveyor system connecting the ship unloading jetty to the coal stockyard. The system handles 2,000 TPH of imported thermal coal and includes a full dry fog dust suppression network at transfer points, compliant with GPCB environmental norms.',
    highlights: [
      '2.2 km overland conveyor — 2,000 TPH capacity',
      'Five covered transfer towers with dust enclosures',
      'Dry fog dust suppression at all transfer points',
      'GPCB emission-compliant system design',
    ],
    image: '/images/projects/port-conveyor.jpg',
    featured: true,
    value: '₹55 Cr',
  },
  {
    id: 'p4',
    slug: 'vedanta-aluminium-material-handling',
    title: 'Bauxite & Alumina Handling System',
    client: 'Vedanta Aluminium Ltd.',
    location: 'Lanjigarh, Odisha',
    year: 2021,
    category: 'Mining',
    services: ['belt-conveyor-systems', 'stacker-reclaimer-systems', 'dust-management-systems'],
    description: 'Design and supply of bauxite and alumina bulk material handling systems for a 1 MTPA alumina refinery expansion. Includes in-plant overland conveyors, a linear stacker/reclaimer for bauxite stockyard, and a baghouse dust collection system across the raw material handling area.',
    highlights: [
      'Linear stacker/reclaimer — 800 TPH rated',
      '3.5 km in-plant conveyor network',
      'Baghouse dust collection — 36 filter units',
      'Designed for abrasive bauxite service',
    ],
    image: '/images/projects/bauxite-handling.jpg',
    featured: true,
    value: '₹42 Cr',
  },
  {
    id: 'p5',
    slug: 'acc-cement-crusher-conveyor',
    title: 'Limestone Crushing & Conveying Plant',
    client: 'ACC Limited',
    location: 'Kymore, Madhya Pradesh',
    year: 2020,
    category: 'Cement',
    services: ['aggregate-crushing-screening', 'belt-conveyor-systems'],
    description: 'Supply and commissioning of a 1,000 TPH limestone crushing plant (primary jaw crusher + secondary impact crusher) with associated conveyor system from crusher to raw meal storage. Included vibrating grizzly feeder, multi-deck screen, and a radial stacker for fines stockpiling.',
    highlights: [
      '1,000 TPH primary jaw crusher station',
      'Secondary impact crusher for final sizing',
      'Multi-deck vibrating screen and radial stacker',
      '1.2 km crusher-to-raw-mill conveyor',
    ],
    image: '/images/projects/limestone-crusher.jpg',
    featured: false,
    value: '₹32 Cr',
  },
  {
    id: 'p6',
    slug: 'steel-authority-wagon-tippler',
    title: 'Double Wagon Tippler & Apron Feeder',
    client: 'Steel Authority of India Ltd.',
    location: 'Rourkela, Odisha',
    year: 2022,
    category: 'Steel',
    services: ['wagon-tipplers-material-handling', 'belt-conveyor-systems'],
    description: 'Replacement and upgradation of an existing wagon tippling system with a new double wagon tippler (2×1,200 TPH) and apron feeder at the iron ore yard of an integrated steel plant. Scope included civil modifications, new electrical panels, and PLC integration with the plant material tracking system.',
    highlights: [
      'Double wagon tippler — 2×1,200 TPH combined capacity',
      'Heavy-duty apron feeder below tippling station',
      'PLC integration with plant ore tracking system',
      'Completed during planned plant shutdown window',
    ],
    image: '/images/projects/wagon-tippler.jpg',
    featured: false,
    value: '₹18 Cr',
  },
]

export const PROJECT_CATEGORIES = [
  'All',
  'Cement',
  'Power',
  'Ports',
  'Steel',
  'Mining',
]

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter(p => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
