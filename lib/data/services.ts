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
    id: 'mep-engineering',
    slug: 'mep-engineering',
    title: 'MEP Engineering',
    shortDescription: 'Comprehensive mechanical, electrical, and plumbing engineering design and execution for complex facilities.',
    description: 'Our MEP engineering team delivers precision-engineered building services for industrial, commercial, and healthcare facilities. We integrate mechanical systems, electrical infrastructure, and plumbing/fire protection into cohesive, high-performance building ecosystems.',
    icon: 'zap',
    features: [
      'HVAC system design and optimization',
      'Electrical load analysis and LV/MV distribution',
      'Fire detection and suppression systems',
      'Plumbing, drainage, and sanitation design',
      'Building automation systems (BMS/BAS)',
      'Energy modelling and simulation',
      'Commissioning and validation',
    ],
    benefits: [
      'Reduced energy consumption by up to 30%',
      'Compliance with NBC, ASHRAE, and IEC standards',
      'Integrated BIM coordination across disciplines',
      'Lifecycle cost optimization',
    ],
    relatedIndustries: ['pharma', 'data-centers', 'healthcare', 'manufacturing'],
  },
  {
    id: 'structural-engineering',
    slug: 'structural-engineering',
    title: 'Structural Engineering',
    shortDescription: 'Steel and concrete structural design for industrial plants, warehouses, commercial buildings, and infrastructure.',
    description: 'We provide rigorous structural engineering services from concept to construction, covering industrial buildings, process plants, bridges, and large commercial complexes. Our structures are designed for performance, safety, and economy.',
    icon: 'building-2',
    features: [
      'RCC and pre-engineered steel structures',
      'Foundation design (piled, raft, spread)',
      'Seismic and wind load analysis',
      'Industrial plant structures and equipment supports',
      'Retrofit and structural rehabilitation',
      'BIM-based structural modelling (Revit, STAAD)',
      'Peer review and value engineering',
    ],
    benefits: [
      'Optimised steel tonnage, reducing material cost',
      'IS 456, IS 800, IS 1893 compliant designs',
      'Coordinated multi-discipline BIM models',
      'Fast-track design delivery',
    ],
    relatedIndustries: ['manufacturing', 'power-energy', 'commercial-real-estate', 'infrastructure'],
  },
  {
    id: 'project-management',
    slug: 'project-management',
    title: 'Project Management',
    shortDescription: 'End-to-end project planning, scheduling, cost control, and delivery management for large-scale engineering projects.',
    description: 'Our certified project managers bring decades of experience delivering complex engineering projects on time and within budget. We provide PMC, EPCM, and owner\'s engineer services across industries.',
    icon: 'clipboard-list',
    features: [
      'Project planning and scheduling (Primavera P6, MS Project)',
      'Cost estimating and budget control',
      'Risk management and mitigation',
      'Contractor selection and management',
      'Quality assurance and control',
      'HSE management',
      'Progress monitoring and reporting',
    ],
    benefits: [
      'On-time delivery track record >92%',
      'Transparent real-time project dashboards',
      'Certified PMPs and RICS-qualified QS',
      'Independent owner\'s engineer perspective',
    ],
    relatedIndustries: ['pharma', 'infrastructure', 'manufacturing', 'power-energy'],
  },
  {
    id: 'civil-infrastructure',
    slug: 'civil-infrastructure',
    title: 'Civil & Infrastructure',
    shortDescription: 'Roads, bridges, utilities, and site development engineering for industrial parks, townships, and public infrastructure.',
    description: 'Lepton\'s civil and infrastructure practice covers the full spectrum from master planning and geotechnical investigation through to detailed design, tendering, and construction supervision of roads, bridges, water supply, drainage, and industrial site infrastructure.',
    icon: 'map',
    features: [
      'Roads, highways, and industrial access',
      'Bridges and elevated structures',
      'Water supply and sewage treatment',
      'Storm water management',
      'Master planning and site development',
      'Geotechnical investigation and design',
      'Topographic surveying and mapping',
    ],
    benefits: [
      'Complete in-house civil capability',
      'Integration with MEP and structural disciplines',
      'Government-approved design standards',
      'CAD + BIM deliverables',
    ],
    relatedIndustries: ['infrastructure', 'manufacturing', 'power-energy'],
  },
  {
    id: 'process-engineering',
    slug: 'process-engineering',
    title: 'Process Engineering',
    shortDescription: 'Process design, simulation, P&ID development, and equipment selection for chemical, pharma, and manufacturing plants.',
    description: 'We deliver front-end process engineering through to detailed engineering for pharmaceutical, chemical, and food & beverage processing facilities. Our process engineers combine technical rigour with regulatory knowledge to deliver compliant, efficient plants.',
    icon: 'settings',
    features: [
      'Process flow diagrams (PFD) and simulation',
      'P&ID development and review',
      'Equipment sizing and vendor selection',
      'Utility balances and utility systems design',
      'Process safety (HAZOP, LOPA)',
      'FDA / GMP / cGMP compliance',
      'Process validation support',
    ],
    benefits: [
      'Reduced time-to-market for new facilities',
      'Risk-based process safety approach',
      'Deep pharma and API manufacturing expertise',
      'Integrated with automation design',
    ],
    relatedIndustries: ['pharma', 'manufacturing', 'food-beverage'],
  },
  {
    id: 'epc-turnkey',
    slug: 'epc-turnkey',
    title: 'EPC / Turnkey',
    shortDescription: 'Engineering, procurement, and construction execution on a turnkey basis — single-point accountability.',
    description: 'For clients who want single-point accountability, Lepton delivers EPC and turnkey projects covering the complete design-build cycle. We manage every facet from basic engineering through to commissioning and handover.',
    icon: 'layers',
    features: [
      'Basic and detailed engineering',
      'Procurement management and vendor management',
      'Civil, structural, and MEP construction',
      'Equipment installation and hook-up',
      'Commissioning, testing, and validation',
      'Training and knowledge transfer',
      'Post-project O&M support',
    ],
    benefits: [
      'Single point of responsibility',
      'Faster project execution',
      'Reduced client coordination burden',
      'Fixed-price and milestone-based contracts',
    ],
    relatedIndustries: ['pharma', 'manufacturing', 'data-centers', 'power-energy'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug)
}
