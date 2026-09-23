import type { BusinessCategory, SchemeDetail, Competitor, MarketState, SWOTState, RiskItem } from '../types';

export const DEMO_BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: 'dairy_farm',
    name: 'Small Dairy Enterprise',
    nameTa: 'சிறிய பால் பண்ணை தொழில்',
    indicativeCost: 1000000,
    description: 'Milk production unit with 10 high-yield cows/buffaloes, automated milking equipment, chilling tank, and local distribution network.',
    descriptionTa: '10 உயர் ரக பசுக்கள்/எருமைகள், தானியங்கி பால் கறக்கும் கருவி, குளிரூட்டும் தொட்டி மற்றும் உள்ளூர் விநியோகம் கொண்ட பாலகம்.',
    requirements: [
      '0.5 Acre land for cattle shed and fodder cultivation',
      'Continuous water supply (2,000 liters/day)',
      '3-Phase electricity connection (5 kW)',
      'Clean hygiene sanitation area & veterinary access'
    ],
    components: [
      { name: 'Livestock Acquisition (10 Animals)', cost: 650000 },
      { name: 'Cattle Shed Construction & Fencing', cost: 180000 },
      { name: 'Milking Machine & Bulk Milk Chiller', cost: 110000 },
      { name: 'Initial Fodder & Feed Working Capital', cost: 60000 }
    ]
  },
  {
    id: 'goat_farming',
    name: 'Goat Farming & Livestock Unit',
    nameTa: 'ஆடு வளர்ப்புத் தொழில்',
    indicativeCost: 140000,
    description: 'Stall-fed goat rearing unit with 20 does and 1 buck for meat and breeding stock in rural villages.',
    descriptionTa: 'கிராமப்புறங்களில் இறைச்சி மற்றும் இனப்பெருக்கத்திற்காக 20 பெண் ஆடுகள் மற்றும் 1 ஆண் ஆடு வளர்க்கும் திட்டம்.',
    requirements: [
      'Elevated wooden/bamboo shed (300 sq ft)',
      'Availability of green fodder trees and crop residues',
      'Basic vaccination and deworming kit'
    ],
    components: [
      { name: 'Goat Stock (20 Females + 1 Male)', cost: 95000 },
      { name: 'Shed Construction & Feeding Troughs', cost: 30000 },
      { name: 'Insurance & Healthcare Working Capital', cost: 15000 }
    ]
  },
  {
    id: 'agro_processing',
    name: 'Agro-Processing & Pulse Mill',
    nameTa: 'வேளாண் பதப்படுத்துதல் & பருப்பு ஆலை',
    indicativeCost: 1250000,
    description: 'Mini pulse de-husking mill, flour pulverizer, and spice grinding unit serving local agricultural producers.',
    descriptionTa: 'உள்ளூர் விவசாயிகளுக்கு உதவும் வகையில் பருப்பு தோலுரித்தல், மாவு அரைத்தல் மற்றும் மசாலா பொடி தயாரிக்கும் ஆலை.',
    requirements: [
      'Covered industrial shed (600 sq ft)',
      '3-Phase 15 HP electrical connection',
      'FSSAI basic food safety certification'
    ],
    components: [
      { name: 'Pulse De-husker & Flour Pulverizer Machines', cost: 720000 },
      { name: 'Shed Civil Work & Electrical Wiring', cost: 280000 },
      { name: 'Sealing Machine & Packaging Material', cost: 100000 },
      { name: 'Raw Grain Procurement Working Capital', cost: 150000 }
    ]
  },
  {
    id: 'solar_cold_storage',
    name: 'Solar Micro Cold Storage Unit',
    nameTa: 'சூரிய சக்தி நுண் குளிர்பதன கிடங்கு',
    indicativeCost: 750000,
    description: 'Off-grid solar-powered 5 MT cold room for preserving perishable horticultural produce (fruits, vegetables, flowers).',
    descriptionTa: 'காய்கறிகள், பழங்கள் மற்றும் பூக்களைப் பாதுகாக்க சூரிய சக்தியில் இயங்கும் 5 மெட்ரிக் டன் குளிர்பதனக் கிடங்கு.',
    requirements: [
      'Flat open land space for 5 kW solar panel array',
      'Proximity to local vegetable mandis/farms',
      'Basic thermal insulation structure'
    ],
    components: [
      { name: 'Cold Storage Thermal Box & Compressor', cost: 420000 },
      { name: 'Solar PV Array & Lithium Battery Bank', cost: 230000 },
      { name: 'Installation & Grid Backup Wiring', cost: 50000 },
      { name: 'Initial Maintenance Reserve', cost: 50000 }
    ]
  },
  {
    id: 'handloom_textiles',
    name: 'Handloom & Garment Weaving Unit',
    nameTa: 'கைத்தறி & ஆடை நெசவு அலகு',
    indicativeCost: 350000,
    description: 'Weaving unit with 4 traditional frame looms for cotton sarees, towels, and eco-friendly home textiles.',
    descriptionTa: 'பருத்தி சேலைகள், துண்டுகள் தயாரிப்பதற்கு 4 பாரம்பரிய கைத்தறி நெசவு எந்திரங்கள் கொண்ட அலகு.',
    requirements: [
      '250 sq ft well-lit room or shed',
      'Access to cotton yarn dye houses',
      'Artisan skill certification'
    ],
    components: [
      { name: '4 Frame Looms & Accessories', cost: 160000 },
      { name: 'Yarn Stock & Dyeing Chemicals', cost: 110000 },
      { name: 'Working Capital & Artisan Advances', cost: 80000 }
    ]
  },
  {
    id: 'rural_bakery',
    name: 'Rural Bakery & Snack Unit',
    nameTa: 'கிராமப்புற ரொட்டி மற்றும் சிற்றுண்டி கூடம்',
    indicativeCost: 400000,
    description: 'Bakery unit producing fresh bread, rusks, millet biscuits, and savory snacks for nearby village stores.',
    descriptionTa: 'கிராமப்புற கடைகளுக்கு புத்தம் புதிய ரொட்டி, பிஸ்கட் மற்றும் சிறுதானிய தின்பண்டங்கள் தயாரிக்கும் நிறுவனம்.',
    requirements: [
      'Single phase/3 phase electricity',
      'Commercial LPG connection & Stainless steel tables',
      'Local Panchayat sanitary license'
    ],
    components: [
      { name: 'Commercial Baking Oven & Spiral Mixer', cost: 220000 },
      { name: 'Stainless Tables & Baking Trays', cost: 70000 },
      { name: 'Raw Material (Flour, Sugar, Butter)', cost: 70000 },
      { name: 'Branding & Packaging Sealer', cost: 40000 }
    ]
  },
  {
    id: 'electrical_repair',
    name: 'Electrical & Mobile Repair Shop',
    nameTa: 'மின்சார மற்றும் மொபைல் பழுதுபார்க்கும் கடை',
    indicativeCost: 120000,
    description: 'Micro service hub for repairing agricultural motor pumps, home appliances, smartphones, and solar lamps.',
    descriptionTa: 'விவசாய மோட்டார்கள், வீட்டு உபயோகப் பொருட்கள் மற்றும் கைபேசிகள் பழுதுபார்க்கும் சேவை மையம்.',
    requirements: [
      'Small rented store front (100 sq ft)',
      'Basic electrical test bench & soldering tools',
      'Technical ITI/Diploma skill certification'
    ],
    components: [
      { name: 'Digital Oscilloscope, SMD Station & Toolkits', cost: 65000 },
      { name: 'Spare Parts Inventory (Motors, Screens)', cost: 35000 },
      { name: 'Shop Furniture & Counter', cost: 20000 }
    ]
  }
];

export const DEMO_SCHEMES: Record<string, SchemeDetail> = {
  MICRO_FINANCE: {
    id: 'MICRO_FINANCE',
    title: 'Micro Finance Support Route',
    titleTa: 'நுண் நிதி ஆதரவு திட்டம்',
    maxProjectCost: 140000,
    financingPercentage: 90,
    maxLoanAmount: 125000,
    interestRate: 6.5,
    tenureYears: 3,
    moratoriumMonths: 3,
    benefits: [
      'Concessional interest rate of 6.5% per annum for micro-entrepreneurs',
      'No collateral security required for loans up to ₹1.25 Lakh',
      'Flexible quarterly or monthly repayment structures',
      'Assistance with basic digital financial literacy'
    ],
    eligibility: [
      'Rural resident aged 18 to 65 years with valid Aadhaar card',
      'Total proposed enterprise cost must be ≤ ₹1,40,000',
      'Entrepreneur contribution of minimum 10% available capital',
      'No prior default with any Scheduled Commercial Bank or RRB'
    ],
    requiredDocuments: [
      'Aadhaar Card (Identity & Address Proof)',
      'PAN Card / Form 60',
      'Bank Account Passbook (Active 6 months statement)',
      'Proof of Business Premises (Lease deed / Panchayat NOC)',
      'Project Feasibility Estimate Summary'
    ],
    applicationProcess: [
      'Step 1: Complete online advisory verification on REVA Portal',
      'Step 2: Download the generated Feasibility & Financial Summary Report',
      'Step 3: Visit nearest Regional Rural Bank (RRB) or Micro Finance Institution (MFI)',
      'Step 4: Submit document dossier for rapid 7-day appraisal and sanction'
    ],
    faqs: [
      { q: 'Is collateral required for Micro Finance loans?', a: 'No collateral is required for loan amounts up to ₹1.25 Lakh under this scheme.' },
      { q: 'How long is the moratorium period?', a: 'A 3-month moratorium is provided where principal repayment is deferred.' }
    ],
    sources: [
      'NABARD Micro Finance Directives 2024-25',
      'Reserve Bank of India (RBI) Priority Sector Lending (PSL) Master Circular'
    ],
    lastVerified: 'September 2026'
  },
  'TERM_LOAN': {
    id: 'TERM_LOAN',
    title: 'Term Loan Enterprise Financing Route',
    titleTa: 'தவணை முறையில் தவணைக்கடன் திட்டம்',
    maxProjectCost: 5000000,
    financingPercentage: 90,
    maxLoanAmount: 4500000,
    interestRate: 8.0,
    tenureYears: 7,
    moratoriumMonths: 6,
    benefits: [
      'Subsidized 8.0% p.a. interest rate for rural enterprise capital formation',
      'Extended 7-year repayment window with 6-month initial moratorium',
      'Higher credit cap up to ₹45.0 Lakhs for machinery and shed infrastructure',
      'CGTMSE Credit Guarantee cover available for collateral-free sanction'
    ],
    eligibility: [
      'Individual or Partnership rural enterprise in agriculture/services/manufacturing',
      'Proposed project cost between ₹1.40 Lakhs and ₹50.0 Lakhs',
      '10% Minimum Promoter Margin Contribution',
      'Clear land title or minimum 5-year lease agreement'
    ],
    requiredDocuments: [
      'Promoter Aadhaar & PAN Cards',
      'Detailed Project Report (DPR) with cash flow forecasts',
      'Land Ownership Proof / Registered Lease Agreement',
      'Quotations for Machinery / Civil Work Construction Estimates',
      'Panchayat / Local Authority Business NOC',
      'Last 12-month Bank Account Statements'
    ],
    applicationProcess: [
      'Step 1: Generate REVA AI Detailed Feasibility Report & Financial Model',
      'Step 2: Upload DPR to Udyam Assist / Bank Portal',
      'Step 3: Branch Manager appraisal & field verification of proposed site',
      'Step 4: Sanction order issuance and direct vendor disbursement for equipment'
    ],
    faqs: [
      { q: 'What is the moratorium period for Term Loans?', a: 'A 6-month moratorium is provided to allow setting up operations before regular EMI payments begin.' },
      { q: 'Can I get CGTMSE collateral guarantee?', a: 'Yes, eligible projects can avail CGTMSE guarantee scheme for collateral reduction.' }
    ],
    sources: [
      'Ministry of Micro, Small & Medium Enterprises (MSME) Guidelines 2025',
      'State Rural Livelihoods Mission (SRLM) Financial Guidelines'
    ],
    lastVerified: 'September 2026'
  }
};

export const DEMO_COMPETITORS: Competitor[] = [
  { id: 'comp_1', name: 'Lakshmi Agro & Dairy Farm', category: 'Dairy Enterprise', distanceKm: 2.1, scale: 'Micro', lat: 12.9812, lng: 79.1324 },
  { id: 'comp_2', name: 'Kaveri Milk Chilling Unit', category: 'Dairy Enterprise', distanceKm: 4.8, scale: 'Small', lat: 12.9650, lng: 79.1510 },
  { id: 'comp_3', name: 'Sri Amman Cattle Products', category: 'Dairy Enterprise', distanceKm: 6.3, scale: 'Micro', lat: 13.0120, lng: 79.1100 },
  { id: 'comp_4', name: 'Green Pastures Dairy Hub', category: 'Dairy Enterprise', distanceKm: 8.7, scale: 'Medium', lat: 12.9210, lng: 79.1890 },
  { id: 'comp_5', name: 'Panchayat Farmers Cooperative', category: 'Agro-Processing', distanceKm: 9.4, scale: 'Small', lat: 13.0300, lng: 79.1950 }
];

export const getDemoMarketState = (village: string, district: string): MarketState => ({
  radiusKm: 5,
  population: 18450,
  households: 4210,
  demandLevel: 'High',
  purchasingPowerScore: `Moderate (Agri-driven ₹12,500/mo avg household spend in ${district || 'Tiruvallur'})`,
  underservedScore: 78,
  indicators: [
    {
      title: 'Local Population Density',
      titleTa: 'உள்ளூர் மக்கள் தொகை அடர்த்தி',
      value: `18,450 residents in 5 km radius of ${village || 'Village'}`,
      source: 'Government Dataset (Census & District Rural Development)',
      dataYear: '2023-24 Estimate',
      status: 'Demonstration Data'
    },
    {
      title: 'Estimated Daily Milk Demand',
      titleTa: 'தினசரி பால் தேவை',
      value: '2,800 Liters / day',
      source: 'District Animal Husbandry Report',
      dataYear: '2024-25',
      status: 'Demonstration Data'
    },
    {
      title: 'Existing Supply Deficit',
      titleTa: 'தற்போதைய விநியோக பற்றாக்குறை',
      value: '950 Liters / day (34% unfulfilled demand)',
      source: 'Hyper-Local Supply-Demand Gap Analysis',
      dataYear: 'Demo',
      status: 'Demonstration Data'
    },
    {
      title: 'Agricultural Household Coverage',
      titleTa: 'விவசாய குடும்பங்களின் எண்ணிக்கை',
      value: '68% households with cattle rearing experience',
      source: 'State Agri Census Database',
      dataYear: '2024',
      status: 'Demonstration Data'
    }
  ]
});

export const getDemoSWOT = (categoryName: string): SWOTState => ({
  strengths: [
    `High local demand for fresh ${categoryName} products within 10 km radius.`,
    'Abundant availability of local raw materials and fodder resources.',
    'Promoter margin contribution satisfies 10% scheme requirement.',
    'Low transport overhead due to proximity to rural mandis.'
  ],
  weaknesses: [
    'Initial dependency on seasonal weather and rainfall patterns.',
    'Limited formal financial record keeping prior to setup.',
    'Sensitivity to feed and input raw material price fluctuations.'
  ],
  opportunities: [
    'Government subsidy support under Rural Enterprise schemes.',
    'Direct-to-consumer distribution bypassing village middlemen.',
    'Expansion into organic and value-added derivative products.'
  ],
  threats: [
    'Unscheduled power outages requiring solar/generator backup.',
    'Disease outbreaks in livestock requiring strict vaccination.',
    'Emergence of new local competitors within 5 km radius.'
  ]
});

export const getDemoRisks = (): RiskItem[] => [
  {
    category: 'Market',
    title: 'Demand Seasonality & Price Fluctuation',
    titleTa: 'சந்தை தேவை மாற்றம் மற்றும் விலை ஏற்ற இறக்கம்',
    impact: 'Medium',
    description: 'Milk and agricultural product prices vary by 10-15% during monsoon vs summer seasons.',
    mitigation: 'Establish fixed 6-month supply contracts with local dairies and sweet shops to ensure price stability.'
  },
  {
    category: 'Financial',
    title: 'Working Capital Shortfall in Initial 3 Months',
    titleTa: 'முதல் 3 மாதங்களில் வேலை மூலதன பற்றாக்குறை',
    impact: 'High',
    description: 'Cash inflows may lag behind initial feed, fuel, and utility expenses.',
    mitigation: 'Utilize the 3-month or 6-month loan moratorium period to build a liquid emergency reserve.'
  },
  {
    category: 'Competition',
    title: 'Nearby Micro Competitors within 5 km',
    titleTa: '5 கி.மீ சுற்றளவில் உள்ள போட்டியாளர்கள்',
    impact: 'Low',
    description: 'Two small competitors exist in nearby villages.',
    mitigation: 'Offer door-step morning delivery and quality-tested hygienic milk packaging to differentiate.'
  },
  {
    category: 'Supply',
    title: 'Quality Fodder & Feed Availability',
    titleTa: 'தரமான தீவனம் கிடைப்பதில் உள்ள சிரமம்',
    impact: 'Medium',
    description: 'Dry fodder prices escalate during summer drought months.',
    mitigation: 'Lease 0.5 acre dedicated land for fodder grass (Co-4) cultivation on site.'
  },
  {
    category: 'Operations',
    title: 'Cold Storage / Power Interruption Risk',
    titleTa: 'மின்சாரத் தடை மற்றும் குளிரூட்டல் அபாயம்',
    impact: 'Medium',
    description: 'Power cuts in rural feeder lines could affect milk chilling tanks.',
    mitigation: 'Include a 3 kVA solar inverter backup system in the initial machinery cost breakdown.'
  }
];
