// All content comes from the company deck "Lepton Projects Private Ltd.pptx" (see design/material.md).
// Do not add figures that are not in the deck.

export const COMPANY = {
  name: 'Lepton Projects',
  legalName: 'Lepton Projects Private Limited',
  since: 'Feb 2008',
  tagline: 'Concept to commissioning & beyond.',
  summary:
    'Customised bulk material handling systems and solutions, from concept to commissioning and beyond, for cement, steel, port, power, fertilizer, sugar and mining.',
  email: 'info@lepton.co.in',
  website: 'lepton.co.in',
  certification: 'ISO 9001:2015',
  strength: 135,
}

export const TITLE_BLOCK = [
  { label: 'Projects, India & abroad', value: '450+' },
  { label: 'Stackers & reclaimers', value: '82+' },
  { label: 'Conveyors · aggregate km', value: '260+' },
  { label: 'Longest system · km', value: '38.5' },
]

export const ACHIEVEMENTS = [
  { value: '82+', unit: 'stackers & reclaimers', note: 'up to 3000 TPH' },
  { value: '370+', unit: 'belt & pipe conveyors', note: '260+ km aggregate, up to 5400 TPH, 5.4 m/s, 2200 mm belt' },
  { value: '40+', unit: 'large mines', note: '400 MTPA aggregate capacity' },
  { value: '17+', unit: 'travelling trippers', note: 'up to 3300 TPH on 1800 mm belt' },
  { value: '14+', unit: 'pipe conveyors', note: '27+ km, up to 1875 TPH of lignite on 550 mm pipe' },
  { value: '10+', unit: 'apron feeders', note: '1650 TPH of ROM iron ore, 1830 mm pan, NMDC' },
  { value: '46+', unit: 'HiTechAudits®', note: 'stockyard, port and conveyor systems' },
  { value: '38.5 km', unit: 'longest system', note: "India's longest pipe conveyor/OLBC system: bauxite for Vedanta" },
]

export const RULES = ['Never lose a client.', 'Never forget Rule #1.']

// Slide 94, "Repeat orders"
export const REPEAT_ORDERS: [string, number][] = [
  ['JK Lakshmi Cement', 47],
  ['Jaypee', 24],
  ['Dalmia Cement', 20],
  ['ACC', 18],
  ['UltraTech Cement', 17],
  ['GIPCL', 15],
  ['L&T', 15],
  ['IFFCO', 11],
  ['Udaipur Cement Works', 11],
  ['Dilip Buildcon', 11],
  ['Madhucon Projects', 11],
  ['Asian Energy Services', 10],
  ['KHD Humboldt Wedag', 8],
  ['NTPC', 8],
  ['Vedanta', 7],
  ['Schenck Process', 6],
  ['Technip India', 5],
  ['Tata Projects', 4],
  ['Solum Technology, NL', 4],
]

export const TIMELINE = [
  { year: '2008', text: 'Founded' },
  { year: '2014', text: 'Chopanki factory inaugurated' },
  { year: '2016', text: 'Collaboration with Ac-Tek, USA · Gurgaon office inaugurated' },
  { year: '2018', text: 'Collaboration with FMK, Poland · Acquired Design Forum, India' },
  { year: '2019', text: 'Acquired Hindustan Rollers' },
  { year: '2022', text: 'Gurgaon office expanded · Design office opened in Kolkata' },
  { year: '2023', text: 'Kherani factory inaugurated' },
  { year: '2026', text: 'Construction started on the MET, Haryana factory' },
]

export const WORKS = [
  {
    name: 'Factory 1 · Chopanki',
    place: 'Plot F-407, RIICO Industrial Area, Chopanki, Dist. Alwar, Rajasthan 301019',
    area: '22,000 sq ft',
    makes: 'Stackers, reclaimers, apron feeders, trippers, technological structures',
    photo: '/photos/chopanki-works-1.jpg',
  },
  {
    name: 'Factory 2 · Kherani',
    place: 'Plot G-1/289, RIICO Industrial Area, Kherani, Dist. Alwar, Rajasthan 301019',
    area: '35,000 sq ft',
    makes: 'Idlers (2,500 complete sets a month) and pulleys (280 a month)',
    photo: '/photos/kherani-idlers-pulleys.jpg',
  },
  {
    name: 'Factory 3 · MET Jhajjar',
    place: 'Plot P30, Street H, Sector 2B, Model Economic Township, Jhajjar, Haryana 124515',
    area: 'Under construction',
    makes: '',
    photo: '',
  },
]

export const OFFICES = [
  { name: 'Gurugram', lines: ['A-225-226, JMD IT Megapolis', 'Sohna Road, Sector 48', 'Gurugram, Haryana'] },
  { name: 'Ghaziabad', lines: ['Aditya City Centre, Vaibhav Khand', 'Indirapuram, Ghaziabad', 'Uttar Pradesh 201012'] },
  { name: 'Kolkata', lines: ['73/C/1 JN Lahiri Road', 'Serampore, Hooghly', 'West Bengal 712201'] },
]

export const TEAM = [
  { dept: 'Design', n: 47 },
  { dept: 'Works', n: 49 },
  { dept: 'Construction', n: 33 },
  { dept: 'Operation', n: 40 },
]

export const PARTNERS = [
  { name: 'FMK', where: 'Poland', what: 'Stockyard & port equipment' },
  { name: 'OLBC & PC', where: '', what: 'Overland & pipe conveyor design: dynamic analysis, DEM chutes, FEA pulleys' },
  { name: 'Galperti Tech', where: 'Italy', what: 'Slew bearing upgradation & replacement' },
  { name: 'Ac-Tek', where: 'USA', what: 'Collaboration since 2016' },
]
export const PAST_PARTNERS = 'MVT Germany · Poltegor Poland · Felguera France · PHB Spain · KOCH Germany · FAM Germany'

/* ── the material route: what Lepton supplies at each stage ── */
export const ROUTE = [
  {
    id: 'receive',
    tt: 'TT-1',
    name: 'Receive',
    items: ['Wagon tippler & side arm charger', 'Apron feeders', 'Track & ground hoppers', 'Paddle & plough feeders'],
  },
  {
    id: 'crush',
    tt: 'TT-2',
    name: 'Crush & screen',
    items: ['Crusher & screen houses', 'Grizzly feeders', 'Aggregate crushing & screening'],
  },
  {
    id: 'convey',
    tt: 'TT-3',
    name: 'Convey',
    items: ['Overland belt conveyors with horizontal curves', 'Pipe conveyors', 'In-plant & shuttle conveyors', 'High angle, slat & drag chain conveyors', 'Bucket elevators', 'Idlers, pulleys, gates'],
  },
  {
    id: 'store',
    tt: 'TT-4',
    name: 'Stack, store & blend',
    items: ['Travelling luffing stackers', 'Bridge, side scraper & portal reclaimers', 'Circular stockyard systems', 'Bucket wheel stacker-reclaimers', 'Travelling trippers', 'MoPlow® mobile plough'],
  },
  {
    id: 'ship',
    tt: 'TT-5',
    name: 'Load & ship',
    items: ['Ship loaders & unloaders', 'Bucket wheel reclaimers', 'Mobile hoppers', 'Rapid loading systems & silos'],
  },
]

export const SERVICES = [
  {
    code: 'E',
    name: 'Engineering',
    lines: [
      'Site survey & feasibility study',
      'Plant layout and flow diagrams',
      'Mechanical GA of conveyors, transfer towers, crusher & screen houses, WT complex, stockyards, RLS, bunkers',
      'Design calculations, technical specifications, TS & TBI for bought-out items',
      'Structural steel & civil design with BOQ',
      'Electrical, control & instrumentation engineering',
      'DBR for dust extraction, dust suppression, ventilation & fire protection',
      'Dynamic analysis & field measurement for OLBC and pipe conveyors',
      'DEM analysis for chutes, FEA for pulleys',
    ],
  },
  {
    code: 'PCM',
    name: 'Project & construction management',
    lines: [
      'L-1, L-2 and L-3 schedules, dispatch schedules',
      'QAP & FQAP, WPS, PQR · review of TC, IR & inspection',
      'Vendor selection for BOI and site erection',
      'Manufacturing & construction supervision',
      'Testing, pre-commissioning, PG tests, start-up & commissioning',
      'Training & establishment of the O&M team',
      'Periodic MIS on progress, quality and budget vs actual',
    ],
  },
  {
    code: 'EPCM',
    name: 'EPCM: the owner stays in control',
    lines: [
      'Cost saving compared with EPC mode',
      'Better cash flow management',
      'Best-of-breed vendors, with better control over after-sales service and spares prices',
      'All GA and shop fabrication drawings stay with the owner, for future expansion or modification at optimal cost',
    ],
  },
  {
    code: 'PB',
    name: 'Pre-bid engineering',
    lines: [
      'Complete pre-bid engineering for EPC & MDO tenders: GA of buildings, stockyards and conveyors, power calculation, utilities, HT/LT electricals, C&I and BOQ',
      'For GE Power, Dilip Buildcon, Asian Energy, BTL EPC, Zuberi Engineering, Matrix Mining and others',
    ],
  },
  {
    code: 'UP',
    name: 'Upgradation & revamping',
    lines: [
      'Capacity upgradation of stockyard & port equipment, conveyors, wagon tipplers, apron feeders',
      'Revamping & rehabilitation of stockyard and port equipment',
      'Debottlenecking · obsolescence management',
      'Slew bearing replacement, with Galperti Tech, Italy',
      'Thermal metal spray coating & dual paint system (25–30 year life in ISO 12944 C-4)',
    ],
  },
]

export const AUDIT_BENEFITS = [
  'Sudden breakdown of the machine eliminated',
  'Longer useful life of the equipment',
  'Improved reliability & availability',
  'Lower overall O&M cost',
  'Fewer production losses',
  'Safer for men and machine',
  'Lower running cost through current technology',
  'Optimised spares inventory',
]

/** The QCC Saudi Arabia story, as a revision history. */
export const QCC_REVISIONS = [
  { rev: '0', date: '1985', text: 'Limestone stacker commissioned by MVT, Germany, for 1800 TPH' },
  { rev: 'A', date: '2005', text: 'Capacity upgraded by IHI, Japan, from 1800 to 2200 TPH' },
  { rev: 'B', date: 'May 2015', text: 'HiTechAudit® by Lepton; final report submitted' },
  { rev: 'C', date: 'Sep 2015', text: 'Stacker collapses' },
  { rev: 'D', date: 'Oct 2015', text: 'Restored in 24 days: critical components replaced with new, improved designs', mark: true },
  { rev: 'E', date: '2016', text: 'New long-travel bogies, VFD drives and ceramic-lagged drive pulley. 2200 TPH achieved, foundation load and rail wear reduced' },
]

/* ── the register ── */
export type Kind = 'Stockyard' | 'Feeders' | 'Conveyors' | 'EPCM' | 'HiTechAudit®' | 'Revamp' | 'Erection'

export interface Project {
  ref?: string // filled in below: works number, or LP-nnn register index
  no?: string // real project number where the deck gives one
  title: string
  client: string
  site: string
  date: string
  kind: Kind
  rating?: string
  scope: string
  specs: string[]
  photo?: string
  abroad?: boolean
}

export const PROJECTS: Project[] = [
  { no: '453.1872', title: '12 stackers & reclaimers', client: 'UltraTech Cement', site: 'Kukrudih CG · Karur TN · Brunpur WB', date: 'Dec 2025', kind: 'Stockyard', rating: '1980 TPH',
    scope: 'Design, manufacture, supply & supervision of E&C of travelling luffing linear stackers and side scraper reclaimers for slag, gypsum and coal.',
    specs: ['Stacker 1800/1980 TPH, boom 16.1 m (Kukrudih)', 'Stackers 400/440 TPH, boom 16.1 m (Karur, Brunpur)', 'Side scraper reclaimers 150/180 TPH, boom 24 m'] },
  { no: '465.1691', title: '6 stackers & reclaimers', client: 'TKIL Industries (thyssenkrupp)', site: 'Tororo Cement, Uganda', date: '—', kind: 'Stockyard', rating: '1210 TPH', abroad: true,
    scope: 'Design, manufacture, supply & supervision of E&C of six stockyard machines for limestone, additives and coal.',
    specs: ['Limestone stacker 1100/1210 TPH, boom 23.5 m', 'Bridge reclaimer 600/660 TPH, span 37.35 m', 'Additive stacker 300/330 TPH + side scraper reclaimer 100/110 TPH', 'Coal stacker 165/182 TPH + side scraper reclaimer 75/90 TPH'] },
  { title: 'Bucket wheel reclaimer', client: 'SAIL', site: 'Meghahatuburu iron ore mines', date: 'Nov 2019', kind: 'Stockyard', rating: '3000 TPH',
    scope: 'Design, manufacture, supply, erection & commissioning.', specs: ['3000 TPH iron ore', 'Boom 41.25 m'], photo: '/photos/bwr-sail-meghahatuburu.jpg' },
  { title: 'Stacker & side scraper reclaimer', client: 'UltraTech Cement', site: 'Manikgarh', date: 'May 2023', kind: 'Stockyard', rating: '275 TPH',
    scope: 'Coal, clay, bauxite and iron ore stockyard equipment. Its performance led to the order for 12 more machines.',
    specs: ['Stacker 275 TPH, boom 16.1 m', 'Side scraper reclaimer 275 TPH, boom 24 m'], photo: '/photos/ultratech-manikgarh.jpg' },
  { title: 'Stacker & bridge reclaimer', client: 'KHD · Sadguru Cement', site: 'Madhya Pradesh', date: 'Jun 2021', kind: 'Stockyard', rating: '600 TPH',
    scope: 'Limestone stockyard equipment.', specs: ['Travelling luffing stacker 600 TPH, boom 22.6 m', 'Bridge reclaimer 450 TPH, span 33 m'], photo: '/photos/sadguru-stockyard.jpg' },
  { title: 'Stacker & side scraper reclaimer', client: 'KHD · Samrat Cement', site: '—', date: 'Mar 2020', kind: 'Stockyard',
    scope: 'Coal & additives stockyard equipment.', specs: ['Travelling & luffing stacker', 'Side scraper reclaimer'], photo: '/photos/khd-samrat-stockyard.jpg' },
  { title: 'Stacker & side scraper reclaimer', client: 'KHD · Gaurishankar Cement', site: '—', date: 'Apr 2024', kind: 'Stockyard', rating: '275 TPH',
    scope: 'Coal & additive stockyard equipment.', specs: ['Stacker 275 TPH, boom 15 m', 'Side scraper reclaimer 100 TPH, boom 18 m'] },
  { title: 'Side scraper reclaimer', client: 'Dalmia Cement', site: 'Belgaum', date: 'May 2023', kind: 'Stockyard', rating: '550 TPH',
    scope: 'Reclaimer for additives.', specs: ['550 TPH', 'Shovel 1600 × 400 mm', 'Boom 26.7 m'] },
  { title: 'Stacker & bridge reclaimer', client: 'Hills Cement', site: 'Meghalaya', date: '—', kind: 'Stockyard', rating: '600 TPH',
    scope: 'Limestone stockyard equipment.', specs: ['Stacker 600 TPH, boom 17.1 m', 'Bridge reclaimer 400 TPH, span 28 m'], photo: '/photos/hills-cement-stockyard.jpg' },
  { title: 'Apron feeders', client: 'NMDC', site: 'Donimalai', date: 'Aug 2023', kind: 'Feeders', rating: '1650 TPH',
    scope: 'Apron feeders for run-of-mine iron ore.', specs: ['1650 TPH iron ore', 'Pan width 1825 mm', 'Bull gear & chain drive, in-line helical gearbox, 22 kW'] },
  { title: 'Apron feeders at ROM receiving hopper', client: 'NALCO', site: '—', date: 'Jun 2023', kind: 'Feeders', rating: '1250 TPH',
    scope: 'Design, manufacture, supply, E&C.', specs: ['Bauxite, 1250 TPH', 'Pan width 1600 mm', '75 kW VFD, shaft-mounted planetary gearbox, hydraulic take-up, centralised lubrication'], photo: '/photos/nalco-apron-feeder.jpg' },
  { title: 'Apron feeders at WT hopper', client: 'Paradeep Port Trust', site: 'Paradeep', date: 'Jul 2017', kind: 'Feeders', rating: '1375 TPH',
    scope: 'Two apron feeders for iron ore, test-assembled at the Chopanki works.', specs: ['Pan width 1600 mm', '1375 TPH iron ore', '2 nos.'], photo: '/photos/paradeep-apron-feeder.jpg' },
  { title: 'Apron feeder', client: 'Suluq Aljadeeda Cement', site: 'Libya', date: 'Oct 2023', kind: 'Feeders', rating: '110 TPH', abroad: true,
    scope: 'Apron feeder with shaft-mounted planetary geared motor.', specs: ['110 TPH', 'Pan width 800 mm', '15 kW with VFD'] },
  { title: 'Travelling tripper', client: 'IFFCO', site: 'Paradip', date: 'Jul 2016', kind: 'Conveyors', rating: '3300 TPH',
    scope: 'Tripper for sulphur & rock phosphate. A repeat order.', specs: ['BW 1800 mm', '3300 TPH'] },
  { title: '2200 TPH OLBC & pipe conveyor system', client: 'Vedanta', site: 'Sijimali mine → Lanjigarh plant', date: '—', kind: 'EPCM', rating: '2200 TPH',
    scope: "India's longest pipe conveyor/OLBC system, for bauxite.",
    specs: ['Total length 38.5 km; longest flight 12.3 km', '7 OLBCs, 1000 mm belt at 4.9 m/s', '1 pipe conveyor, 4.3 km with 446 m downhill, 400 mm pipe', '8 transfer towers, 6 substations'], photo: '/photos/vedanta-olbc-flowsheet.jpg' },
  { title: '1000 TPH pipe conveyor system', client: 'Hindalco', site: 'Renukoot', date: '—', kind: 'EPCM', rating: '1000 TPH',
    scope: 'Pipe conveyor with feeders, plant conveyors and circular luffing stackers.', specs: ['Pipe 400 mm, belt 1450 mm, 4.5 m/s', '2250 m horizontal, 25.9 m lift', 'Circular luffing stackers, 20 m & 40 m booms, 500 TPH'] },
  { title: '1875 TPH lignite handling system', client: 'BEC (2×250 MW), via PCPMSC', site: 'Bhavnagar', date: 'Nov 2021', kind: 'EPCM', rating: '1875 TPH',
    scope: 'EPCM for the external lignite handling system (plant end).', specs: ['1950 mm belt conveyors', 'Pipe conveyor 550 mm × 2.16 km, 32.6 m lift, 4 m/s, 3×400 kW', 'Over-ground hopper with apron feeder'] },
  { title: '20 MTY CHP, Gevra Phase-2 OCP', client: 'Asian Energy', site: 'Gevra', date: '—', kind: 'EPCM', rating: '5400 TPH',
    scope: 'EPCM for the coal handling plant.', specs: ['1800 mm belt, 5400 TPH, 9.8 km', 'OG bunker 10,000 MT', 'RLS 2 × 3000 MT, loading 4500 TPH'] },
  { title: '2000 TPH external CHP, jetty to TPS', client: 'MEIL', site: '1×525 MW TPS', date: '—', kind: 'EPCM', rating: '2000 TPH',
    scope: 'EPCM from jetty to power station.', specs: ['Pipe conveyor 2.8 km', '9 belt conveyors, 2.6 km', '2 barge unloaders, 1000 TPH each'] },
  { title: 'Limestone & gypsum handling for FGD', client: 'Schenck Process · NTPC Farakka', site: 'Farakka', date: 'May 2021', kind: 'EPCM', rating: '150 TPH',
    scope: 'Engineering, project & construction management for the FGD material handling system.', specs: ['BRU, mobile plough, crushers & screens', 'Vibrating feeders, belt conveyors, bucket elevators, DS system, electricals'] },
  { title: 'Limestone & gypsum handling for STPP 3×550 MW', client: 'Tata Projects · NTPC Vallur', site: 'Vallur', date: 'Oct 2023', kind: 'Conveyors',
    scope: 'Design, manufacture, supply & supervision of E&C.', specs: [] },
  { title: 'Lignite handling system', client: 'BEC (2×250 MW)', site: 'Ghogha Surka mine', date: 'Feb 2018', kind: 'Conveyors',
    scope: 'Design, manufacture, supply, E&C of the external lignite handling system (plant end).', specs: ['2 receiving hoppers, 50 MT each', '2000 mm belt conveyors with pyrite picking stations', 'Complete civil, structural, electrical & control'] },
  { title: 'Belt conveyor with travelling tripper', client: 'Vedanta Aluminium', site: 'Odisha', date: 'Jun 2011', kind: 'Conveyors', rating: '345 TPH',
    scope: 'Hydrate handling.', specs: ['BW 800 mm', '345 TPH'] },
  { title: 'Bridge reclaimer rake car & harrow', client: 'ACC (LafargeHolcim)', site: 'Jamul', date: 'Sep 2017', kind: 'Revamp', rating: '850 TPH',
    scope: 'Machine was achieving 500 TPH against a design of 850. After a HiTechAudit®, phase 1 made it safe at 600 TPH; phase 2 (a new rake car & harrow, bridge strengthening) took it to 850.',
    specs: ['500 → 600 → 850 TPH'], photo: '/photos/acc-jamul-bridge-reclaimer.jpg' },
  { title: 'Limestone stacker restoration', client: 'Qassim Cement Co.', site: 'Burayadh, Saudi Arabia', date: 'Oct 2015', kind: 'Revamp', rating: '2200 TPH', abroad: true,
    scope: 'Restored in 24 days after the stacker collapsed; long-travel mechanism redesigned in 2016.', specs: ['2200 TPH achieved', 'Bogie long travel with VFD', 'Ceramic-lagged drive pulley'], photo: '/photos/qcc-stacker-restored.jpg' },
  { title: 'Limestone stacker & bridge reclaimer revamp', client: 'Udaipur Cement Works', site: 'Rajasthan', date: 'Dec 2016', kind: 'Revamp', rating: '1100 TPH',
    scope: 'Rehabilitation and capacity upgradation of a system abandoned in 2010.', specs: ['Stacking 450 → 1100 TPH', 'Reclaiming 400 → 700 TPH', 'BW 1000 belt conveyors'] },
  { title: 'Circular stacker-reclaimer upgrade', client: 'Dalmia Cement', site: 'Banjari', date: 'Oct 2020', kind: 'Revamp', rating: '300 TPH',
    scope: 'Reclaimer upgraded from 200 to 300 TPH; new controls, HMI and VFD travel; new luffing hydraulics; structure strengthened.', specs: ['200 → 300 TPH'], photo: '/photos/dalmia-banjari-circular.jpg' },
  { title: 'Circular reclaimer rake car & harrow', client: 'JK Lakshmi Cement', site: 'Sirohi', date: 'Feb 2009', kind: 'Revamp', rating: '900 TPH',
    scope: 'Improved design to upgrade capacity.', specs: ['750 → 900 TPH'] },
  { title: 'Slew bearing replacement', client: 'CSPGCL', site: 'Korba East, 2×250 MW', date: 'Apr 2018', kind: 'Revamp',
    scope: 'Slew bearing replaced with plastic grouting.', specs: ['6 days pre-shutdown', '14 days of shutdown'], photo: '/photos/korba-slew-bearing.jpg' },
  { title: 'Trestle & gallery strengthening', client: 'NTECL Vallur 2×800 MW', site: 'Vallur', date: 'Mar 2023', kind: 'Revamp',
    scope: 'Detail design & replacement of corroded trestle bracings, column strengthening for the conveyor gallery.', specs: ['Trestles up to 72 m', '~900 MT'] },
  { title: 'Kiln outlet shell & cooling jacket', client: 'Qassim Cement Co.', site: 'Saudi Arabia', date: 'Jul 2016', kind: 'Revamp', abroad: true,
    scope: 'Manufacture, supply & supervision of E&C.', specs: ['Kiln PL-3, 4800 mm dia, 45 mm shell'], photo: '/photos/qcc-kiln-shell.jpg' },
  { title: 'HiTechAudit® of RMHS', client: 'Tata Projects · JSPL', site: 'Angul', date: 'Dec 2020', kind: 'HiTechAudit®', rating: '2000 TPH',
    scope: 'Recommendations for performance and optimal use of the raw material handling system.', specs: ['58 belt conveyors & feeders', '3 bucket wheel stacker-reclaimers', '2 wagon tipplers'] },
  { title: 'HiTechAudit® of BWSR slew bearing', client: 'Parichha TPS', site: 'Uttar Pradesh', date: 'May 2019', kind: 'HiTechAudit®', rating: '1350 TPH',
    scope: 'The slew bearing failed after 5 years, and again 4 years after replacement. Lepton studied it and recommended changes for a 20-year life; these are being implemented.', specs: ['Stacking 1000 TPH / reclaiming 1350 TPH', 'Boom 37 m'] },
  { title: 'HiTechAudit® of stacker-reclaimer', client: 'PPGCL (Tata Power)', site: 'Nigrie', date: 'Aug 2021', kind: 'HiTechAudit®', rating: '1600 TPH',
    scope: 'Frequent slew bearing failure, balancing and teething problems.', specs: ['1600/1400 TPH', 'Boom 41 m'] },
  { title: 'HiTechAudit® of wagon tippler & side arm charger', client: 'ACC', site: 'Jamul', date: 'Dec 2016', kind: 'HiTechAudit®',
    scope: 'Designed for 140 MT wagons at 25 tips/h but could not tip a loaded 110 MT wagon. Fixed with minimum changes; in operation since 2016.', specs: ['Hydraulic rotaside', '25 tips/hour'] },
  { title: 'HiTechAudit® of portal scraper reclaimer', client: 'Holcim Lafarge', site: 'Davao, Philippines', date: 'Dec 2016', kind: 'HiTechAudit®', rating: '450 TPH', abroad: true,
    scope: 'Low reclaiming capacity after 25 years in use; design modifications to the scraper chain drive and hoist; LOTOTO implemented.', specs: ['Rail span 60 m', 'Limestone'] },
  { title: 'CHP for 2×660 MW TPS', client: 'L&T · Jaypee Nigrie', site: 'Singrauli', date: 'Jun 2014', kind: 'Erection', rating: '2250 TPH',
    scope: 'Erection & commissioning of the coal handling plant.', specs: ['11 conveyors, 1600 mm at 4.6 m/s', 'Track hopper with 4 paddle feeders', '4 crushers & screens, 4 travelling trippers'] },
  { title: 'BWSRs & yard conveyors', client: 'L&T · Adani West Port', site: 'Mundra', date: 'Oct 2016', kind: 'Erection', rating: '6800 TPH',
    scope: 'Erection & commissioning of CHP facilities ARD-5 to ARD-7.', specs: ['4 BWSRs, 2 BWRs', 'Stacking 6800 TPH, reclaiming 3500 TPH', '2200 mm belt conveyors'], photo: '/photos/adani-mundra-bwsr.jpg' },
  { title: 'Coal & limestone handling', client: 'Jaypee Himachal Cement', site: 'Solan', date: 'Mar 2011', kind: 'Erection', rating: '1850 TPH',
    scope: 'Erection, testing & commissioning: 4 km of troughed conveyors, pipe conveyors, circular stacker with bridge reclaimer.', specs: ['Limestone pipe conveyor 1850 TPH, 1125 m, 550 mm, 4×630 kW', 'Limestone stacker 1500 TPH, reclaimer 1000 TPH'], photo: '/photos/himachal-circular-stockyard.jpg' },
  { title: 'Circular dome & stacker-reclaimer', client: 'Jaypee Super Cement', site: 'Sonebhadra', date: 'Oct 2012', kind: 'Erection',
    scope: 'Erection, testing & commissioning of an 82 m dome, circular stacker/reclaimer and coal feed conveyor.', specs: ['Dome 82 m dia.'], photo: '/photos/jaypee-super-dome.jpg' },
  { title: 'BWSR restoration', client: 'GIPCL', site: 'Surat', date: 'Nov 2011', kind: 'Revamp', rating: '1200 TPH',
    scope: 'Restoration after a 2010 accident: slew bearing replaced, structure strengthened, tested and recommissioned.', specs: ['1200/800 TPH lignite'], photo: '/photos/gipcl-bwsr.jpg' },
]

PROJECTS.forEach((p, i) => { p.ref = p.no ?? `LP-${String(i + 1).padStart(3, '0')}` })

export const KINDS: Kind[] = ['Stockyard', 'Feeders', 'Conveyors', 'EPCM', 'Revamp', 'HiTechAudit®', 'Erection']
