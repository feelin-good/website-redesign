export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  features: string[]
  benefits: string[]
  heroImage?: string
  relatedIndustries: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'belt-conveyor-systems',
    slug: 'belt-conveyor-systems',
    title: 'Belt Conveyor Systems',
    shortDescription: 'Design, supply, erection, and commissioning of heavy-duty belt conveyor systems for bulk material transport in industrial plants.',
    description: 'Lepton Projects designs and delivers complete belt conveyor systems tailored to the demanding requirements of cement, steel, port, and mining operations. From single-flight conveyors to complex multi-flight systems with transfers, our solutions are engineered for reliability, low maintenance, and high throughput.',
    icon: 'layers',
    features: [
      'Overland and in-plant conveyor design',
      'Curved and inclined conveyor systems',
      'Conveyor structural steelwork and galleries',
      'Drive station design (head, tail, take-up)',
      'Belt tracking and tensioning systems',
      'Idler, pulley, and belt selection',
      'PLC-based conveyor automation and control',
    ],
    benefits: [
      'High capacity throughput for bulk materials',
      'Low operating and maintenance cost',
      'Integrated dust suppression and spillage control',
      'Designed to IS, CEMA, and DIN standards',
    ],
    relatedIndustries: ['cement', 'steel', 'ports', 'power', 'mining'],
  },
  {
    id: 'stacker-reclaimer-systems',
    slug: 'stacker-reclaimer-systems',
    title: 'Stacker & Reclaimer Systems',
    shortDescription: 'Linear, circular, and bucket wheel stacker/reclaimer systems for stockyard automation in cement, port, and power plant applications.',
    description: 'Our stacker and reclaimer systems enable efficient stockpile management for large-volume bulk material operations. We supply linear stacker/reclaimers, circular stacker/reclaimers, and bucket wheel stacker/reclaimers engineered to handle coal, limestone, iron ore, and other materials with minimal manpower.',
    icon: 'building-2',
    features: [
      'Linear stacker / reclaimer systems',
      'Circular stacker / reclaimer systems',
      'Bucket wheel stacker / reclaimer systems',
      'Side scraper reclaimer systems',
      'Stockyard management and automation',
      'Structural and mechanical design',
      'PLC-based control and SCADA integration',
    ],
    benefits: [
      'Maximised stockyard utilisation and blending',
      'Reduced manual handling and labour cost',
      'Reliable performance in harsh industrial environments',
      'Full automation with remote monitoring capability',
    ],
    relatedIndustries: ['cement', 'steel', 'ports', 'power', 'mining'],
  },
  {
    id: 'coal-fuel-handling-plants',
    slug: 'coal-fuel-handling-plants',
    title: 'Coal & Fuel Handling Plants',
    shortDescription: 'End-to-end coal handling plant (CHP) and biomass fuel handling system design and EPC for power plants and captive power applications.',
    description: 'Lepton executes complete coal handling plants (CHP) for thermal power stations and captive power plants, as well as biomass fuel handling systems for green energy facilities. Our scope spans from wagon tippling and primary crushing through to bunker feeding, covering all mechanical, electrical, and structural elements.',
    icon: 'factory',
    features: [
      'Wagon tippler and track hopper systems',
      'Primary and secondary crushing stations',
      'Screening and sizing equipment',
      'Coal bunker feeding systems',
      'Biomass fuel handling for CPP',
      'Silo and storage design',
      'Fire detection and suppression systems',
    ],
    benefits: [
      'Single-source EPC accountability',
      'Optimised plant layout for minimum footprint',
      'Compliant with CEA and MOEF guidelines',
      'Proven performance in 15+ MW to 300+ MW plants',
    ],
    relatedIndustries: ['power', 'steel', 'cement'],
  },
  {
    id: 'wagon-tipplers-material-handling',
    slug: 'wagon-tipplers-material-handling',
    title: 'Wagon Tipplers & Cranes',
    shortDescription: 'Wagon tippling equipment, EOT cranes, mobile cranes, and associated material handling solutions for industrial unloading applications.',
    description: 'We supply and install wagon tipplers, rotary couplers, and track systems for efficient rail wagon unloading, as well as electric overhead travelling (EOT) cranes and mobile ELL cranes for in-plant material handling. Our solutions are designed for high cycle rates and minimal downtime.',
    icon: 'settings',
    features: [
      'Single and double wagon tippler systems',
      'Rotary coupler and empty wagon pusher',
      'Electric Overhead Travelling (EOT) cranes',
      'Mobile ELL cranes for outdoor operations',
      'Skip hoists and bucket elevators',
      'Slat chain and apron conveyors',
      'Weigh bridge and measurement systems',
    ],
    benefits: [
      'High cycle rate wagon unloading capacity',
      'Durable construction for continuous operation',
      'Low maintenance design with extended service intervals',
      'Designed to IS 3177 and FEM standards',
    ],
    relatedIndustries: ['steel', 'power', 'ports', 'mining'],
  },
  {
    id: 'aggregate-crushing-screening',
    slug: 'aggregate-crushing-screening',
    title: 'Aggregate Crushing & Screening',
    shortDescription: 'Complete aggregate crushing and screening plant design, supply, and commissioning for quarry, mining, and construction aggregate applications.',
    description: 'Lepton Projects designs and delivers aggregate crushing and screening plants for quarry operations and mine site beneficiation. Our plants integrate primary jaw crushers, secondary and tertiary cone/impact crushers, vibrating screens, and conveyors into a seamless, high-capacity production system.',
    icon: 'map',
    features: [
      'Primary jaw crusher stations',
      'Secondary and tertiary cone/impact crushers',
      'Multi-deck vibrating screens',
      'Finished product stockpiling systems',
      'Water and aggregate washing systems',
      'Plant layout and civil design',
      'Plant automation and weighing systems',
    ],
    benefits: [
      'Customised production capacity from 50 to 500+ TPH',
      'High material recovery with low fines generation',
      'Modular design for phased expansion',
      'On-site erection and commissioning support',
    ],
    relatedIndustries: ['mining', 'cement', 'ports'],
  },
  {
    id: 'dust-management-systems',
    slug: 'dust-management-systems',
    title: 'Dust Suppression & Extraction',
    shortDescription: 'Engineering design and supply of dust suppression and dust extraction systems for cleaner, compliant bulk material handling operations.',
    description: 'Effective dust management is critical in bulk material handling environments. Lepton designs and installs dry fog dust suppression systems, baghouse dust collectors, and wet scrubbers to control fugitive dust at transfer points, crushers, and stockyards — helping plants meet MOEF/CPCB environmental norms.',
    icon: 'zap',
    features: [
      'Dry fog and water spray dust suppression',
      'Bag filter and baghouse dust collectors',
      'Pulse jet filter systems at transfer points',
      'Enclosure and hood design at transfer chutes',
      'Wet scrubber systems',
      'Aspiration systems for enclosed conveyors',
      'MOEF / CPCB compliant emission control',
    ],
    benefits: [
      'Reduced PM10 and PM2.5 emissions at source',
      'Compliance with environmental regulations',
      'Improved workplace health and safety',
      'Reduced material loss from dust spillage',
    ],
    relatedIndustries: ['cement', 'steel', 'power', 'mining', 'ports'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug)
}
