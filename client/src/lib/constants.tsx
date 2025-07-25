export const PACKAGES = [
  {
    id: 'digital-foundation',
    name: 'Digital Foundation',
    tagline: 'For Startups: Look Professional, Attract Customers',
    originalPrice: 8000,
    price: 5500,
    savings: 2500,
    savingsPercent: 31,
    features: [
      '5-page lead-generating website',
      'Brand & content strategy',
      '3 social media profiles',
      'Professional portfolio'
    ],
    description: 'Get everything you need to establish a credible online presence without overspending. Typically delivered in 4-6 weeks.',
    target: 'Ideal for: Startups and small businesses'
  },
  {
    id: 'market-accelerator',
    name: 'Market Accelerator',
    tagline: 'For Growth: Convert Visitors into Customers',
    originalPrice: 15000,
    price: 9500,
    savings: 5500,
    savingsPercent: 37,
    popular: true,
    features: [
      'Everything in Digital Foundation',
      'Lead generation funnel',
      'Social media management',
      'CRM setup & integration'
    ],
    description: 'Perfect for established businesses ready for aggressive growth and systematic customer conversion.',
    target: 'Ideal for: Growing businesses'
  },
  {
    id: 'ai-powered-efficiency',
    name: 'AI-Powered Efficiency',
    tagline: 'For Scale: Automate & Optimize',
    originalPrice: 25000,
    price: 15500,
    savings: 9500,
    savingsPercent: 38,
    features: [
      'Everything in Market Accelerator',
      'AI customer chatbot',
      'AI content engine',
      'Workflow automation'
    ],
    description: 'Embed automation and AI into your core operations to unlock new levels of efficiency and scalability.',
    target: 'Ideal for: Forward-thinking companies'
  },
  {
    id: 'full-suite-advantage',
    name: 'Full Suite Advantage',
    tagline: 'For Enterprise: Complete Digital Domination',
    originalPrice: 45000,
    price: 28500,
    savings: 16500,
    savingsPercent: 37,
    features: [
      'Everything in AI-Powered',
      'Enterprise web applications',
      'Omnichannel marketing',
      'Dedicated strategic unit'
    ],
    description: 'Our premier, all-inclusive solution for enterprises seeking complete digital operations partnership.',
    target: 'Ideal for: Large businesses and enterprises'
  }
];

export const SERVICES = [
  {
    id: 'web-development',
    category: 'Web & Application Development',
    name: 'Custom Website Development',
    description: 'Professional, mobile-first websites that convert visitors into customers',
    price: 'From $2,500',
    agencyPrice: 'Typically $8,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#webGrad)" />
        <rect x="30" y="40" width="340" height="120" fill="white" rx="8" />
        <rect x="45" y="55" width="50" height="8" fill="#0D9488" rx="4" />
        <rect x="45" y="70" width="200" height="4" fill="#D1D5DB" rx="2" />
        <rect x="45" y="80" width="150" height="4" fill="#D1D5DB" rx="2" />
        <rect x="270" y="55" width="85" height="25" fill="#84CC16" rx="4" />
        <rect x="45" y="100" width="310" height="45" fill="#F3F4F6" rx="4" />
        <defs>
          <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'ecommerce',
    category: 'Web & Application Development', 
    name: 'E-Commerce Solutions',
    description: 'Full-featured online stores with payment integration and inventory management',
    price: 'From $5,000',
    agencyPrice: 'Typically $15,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#ecomGrad)" />
        <rect x="50" y="30" width="300" height="140" fill="white" rx="8" />
        <circle cx="100" cy="80" r="25" fill="#F3F4F6" />
        <rect x="140" y="60" width="80" height="6" fill="#0D9488" rx="3" />
        <rect x="140" y="75" width="120" height="4" fill="#D1D5DB" rx="2" />
        <rect x="140" y="85" width="60" height="8" fill="#84CC16" rx="4" />
        <rect x="280" y="55" width="60" height="40" fill="#84CC16" rx="6" />
        <path d="M290 70 L295 75 L305 65" stroke="white" strokeWidth="3" fill="none" />
        <rect x="70" y="120" width="50" height="30" fill="#F3F4F6" rx="4" />
        <rect x="130" y="120" width="50" height="30" fill="#F3F4F6" rx="4" />
        <rect x="190" y="120" width="50" height="30" fill="#F3F4F6" rx="4" />
        <defs>
          <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'web-app',
    category: 'Web & Application Development',
    name: 'Custom Web Applications',
    description: 'Bespoke internal tools, client portals, and specialized software solutions',
    price: 'From $8,000',
    agencyPrice: 'Typically $25,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#webAppGrad)" />
        <rect x="40" y="30" width="320" height="140" fill="white" rx="8" />
        <rect x="60" y="50" width="60" height="40" fill="#0D9488" rx="4" />
        <rect x="140" y="50" width="60" height="40" fill="#84CC16" rx="4" />
        <rect x="220" y="50" width="60" height="40" fill="#0D9488" rx="4" />
        <rect x="300" y="50" width="40" height="40" fill="#84CC16" rx="4" />
        <rect x="60" y="110" width="280" height="45" fill="#F3F4F6" rx="4" />
        <rect x="80" y="125" width="60" height="6" fill="#0D9488" rx="3" />
        <rect x="80" y="135" width="40" height="4" fill="#D1D5DB" rx="2" />
        <rect x="160" y="125" width="80" height="6" fill="#84CC16" rx="3" />
        <rect x="160" y="135" width="60" height="4" fill="#D1D5DB" rx="2" />
        <rect x="260" y="125" width="60" height="6" fill="#0D9488" rx="3" />
        <rect x="260" y="135" width="50" height="4" fill="#D1D5DB" rx="2" />
        <circle cx="90" cy="70" r="8" fill="white" />
        <circle cx="170" cy="70" r="8" fill="white" />
        <circle cx="250" cy="70" r="8" fill="white" />
        <defs>
          <linearGradient id="webAppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'mobile-app',
    category: 'Web & Application Development',
    name: 'Mobile App Development',
    description: 'Native iOS and Android apps or cross-platform solutions',
    price: 'From $12,000',
    agencyPrice: 'Typically $35,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#mobileGrad)" />
        <rect x="150" y="40" width="100" height="120" fill="white" rx="15" />
        <rect x="160" y="55" width="80" height="90" fill="#F3F4F6" rx="8" />
        <circle cx="200" cy="50" r="3" fill="#0D9488" />
        <rect x="170" y="65" width="60" height="4" fill="#0D9488" rx="2" />
        <rect x="170" y="75" width="40" height="4" fill="#D1D5DB" rx="2" />
        <rect x="170" y="85" width="50" height="4" fill="#D1D5DB" rx="2" />
        <rect x="170" y="100" width="60" height="20" fill="#84CC16" rx="4" />
        <rect x="170" y="125" width="60" height="15" fill="#0D9488" rx="4" />
        <circle cx="200" cy="150" r="8" fill="#84CC16" />
        <defs>
          <linearGradient id="mobileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'seo',
    category: 'Digital Marketing & Advertising',
    name: 'Search Engine Optimization',
    description: 'SEO: Rank higher to attract organic leads 24/7',
    price: 'From $1,200/mo',
    agencyPrice: 'Typically $3,000/mo',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#seoGrad)" />
        <rect x="50" y="60" width="300" height="80" fill="white" rx="8" />
        <rect x="70" y="80" width="60" height="6" fill="#84CC16" rx="3" />
        <rect x="70" y="95" width="100" height="4" fill="#D1D5DB" rx="2" />
        <rect x="70" y="105" width="80" height="4" fill="#D1D5DB" rx="2" />
        <rect x="70" y="115" width="90" height="4" fill="#D1D5DB" rx="2" />
        <path d="M250 90 L290 70 L330 85 L330 120 L290 130 L250 120 Z" fill="#0D9488" />
        <path d="M270 100 L285 95 L300 105" stroke="white" strokeWidth="3" fill="none" />
        <circle cx="320" cy="50" r="15" fill="#84CC16" />
        <path d="M312 50 L318 56 L328 46" stroke="white" strokeWidth="2" fill="none" />
        <defs>
          <linearGradient id="seoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'ppc',
    category: 'Digital Marketing & Advertising',
    name: 'Pay-Per-Click Management',
    description: 'Strategic PPC campaigns on Google Ads and social platforms',
    price: 'From $2,000/mo',
    agencyPrice: 'Typically $5,000/mo',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#ppcGrad)" />
        <rect x="60" y="40" width="120" height="80" fill="white" rx="8" />
        <rect x="220" y="40" width="120" height="80" fill="white" rx="8" />
        <rect x="140" y="80" width="120" height="80" fill="white" rx="8" />
        <rect x="80" y="60" width="80" height="6" fill="#3B82F6" rx="3" />
        <rect x="80" y="75" width="50" height="4" fill="#D1D5DB" rx="2" />
        <rect x="240" y="60" width="80" height="6" fill="#EF4444" rx="3" />
        <rect x="240" y="75" width="60" height="4" fill="#D1D5DB" rx="2" />
        <rect x="160" y="100" width="80" height="6" fill="#84CC16" rx="3" />
        <rect x="160" y="115" width="70" height="4" fill="#D1D5DB" rx="2" />
        <circle cx="200" cy="50" r="20" fill="#0D9488" />
        <path d="M192 50 L196 54 L208 42" stroke="white" strokeWidth="3" fill="none" />
        <defs>
          <linearGradient id="ppcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'email-marketing',
    category: 'Digital Marketing & Advertising',
    name: 'Email Marketing & Automation',
    description: 'Campaign strategy, design, and automated sequences',
    price: 'From $800/mo',
    agencyPrice: 'Typically $2,500/mo',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#emailGrad)" />
        <rect x="80" y="60" width="240" height="80" fill="white" rx="8" />
        <path d="M80 60 L200 120 L320 60" stroke="#0D9488" strokeWidth="4" fill="none" />
        <circle cx="120" cy="40" r="8" fill="#84CC16" />
        <circle cx="280" cy="40" r="8" fill="#84CC16" />
        <circle cx="200" cy="30" r="8" fill="#84CC16" />
        <circle cx="120" cy="160" r="8" fill="#84CC16" />
        <circle cx="280" cy="160" r="8" fill="#84CC16" />
        <circle cx="200" cy="170" r="8" fill="#84CC16" />
        <path d="M112 40 L80 60" stroke="#84CC16" strokeWidth="2" />
        <path d="M128 40 L160 60" stroke="#84CC16" strokeWidth="2" />
        <path d="M272 40 L240 60" stroke="#84CC16" strokeWidth="2" />
        <path d="M288 40 L320 60" stroke="#84CC16" strokeWidth="2" />
        <path d="M192 170 L160 140" stroke="#84CC16" strokeWidth="2" />
        <path d="M208 170 L240 140" stroke="#84CC16" strokeWidth="2" />
        <defs>
          <linearGradient id="emailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'ai-chatbot',
    category: 'AI & Automation',
    name: 'AI Customer Chatbot',
    description: '24/7 intelligent customer support and lead qualification',
    price: 'From $1,500',
    agencyPrice: 'Typically $5,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#aiGrad)" />
        <circle cx="200" cy="100" r="50" fill="white" />
        <circle cx="185" cy="90" r="8" fill="#0D9488" />
        <circle cx="215" cy="90" r="8" fill="#0D9488" />
        <path d="M175 110 Q200 125 225 110" stroke="#84CC16" strokeWidth="4" fill="none" />
        <rect x="120" y="50" width="40" height="20" fill="white" rx="10" />
        <rect x="240" y="130" width="40" height="20" fill="white" rx="10" />
        <rect x="100" y="160" width="60" height="20" fill="white" rx="10" />
        <circle cx="140" cy="60" r="2" fill="#0D9488" />
        <circle cx="260" cy="140" r="2" fill="#0D9488" />
        <circle cx="130" cy="170" r="2" fill="#0D9488" />
        <defs>
          <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'process-automation',
    category: 'AI & Automation',
    name: 'Business Process Automation',
    description: 'Automate repetitive tasks in HR, finance, and operations',
    price: 'From $3,000',
    agencyPrice: 'Typically $10,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#automationGrad)" />
        <rect x="60" y="40" width="80" height="60" fill="white" rx="8" />
        <rect x="260" y="40" width="80" height="60" fill="white" rx="8" />
        <rect x="160" y="120" width="80" height="60" fill="white" rx="8" />
        <path d="M140 70 L260 70" stroke="#84CC16" strokeWidth="6" markerEnd="url(#arrow)" />
        <path d="M200 100 L200 120" stroke="#84CC16" strokeWidth="6" markerEnd="url(#arrow)" />
        <circle cx="100" cy="70" r="15" fill="#0D9488" />
        <circle cx="300" cy="70" r="15" fill="#0D9488" />
        <circle cx="200" cy="150" r="15" fill="#84CC16" />
        <rect x="80" y="55" width="40" height="4" fill="#D1D5DB" rx="2" />
        <rect x="80" y="65" width="30" height="4" fill="#D1D5DB" rx="2" />
        <rect x="280" y="55" width="40" height="4" fill="#D1D5DB" rx="2" />
        <rect x="280" y="65" width="30" height="4" fill="#D1D5DB" rx="2" />
        <rect x="180" y="135" width="40" height="4" fill="#D1D5DB" rx="2" />
        <rect x="180" y="145" width="30" height="4" fill="#D1D5DB" rx="2" />
        <defs>
          <linearGradient id="automationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#84CC16" />
          </marker>
        </defs>
      </svg>
    )
  },
  {
    id: 'graphic-design',
    category: 'Content & Design',
    name: 'Professional Graphic Design',
    description: 'Brand identity, marketing materials, and digital assets',
    price: 'From $500',
    agencyPrice: 'Typically $1,500',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#designGrad)" />
        <rect x="50" y="50" width="100" height="100" fill="white" rx="8" />
        <rect x="170" y="50" width="100" height="100" fill="white" rx="8" />
        <rect x="290" y="50" width="100" height="100" fill="white" rx="8" />
        <circle cx="100" cy="80" r="15" fill="#0D9488" />
        <rect x="75" y="110" width="50" height="6" fill="#84CC16" rx="3" />
        <rect x="75" y="125" width="35" height="4" fill="#D1D5DB" rx="2" />
        <path d="M190 70 L210 90 L250 60 L250 130 L190 130 Z" fill="#84CC16" />
        <rect x="310" y="70" width="60" height="40" fill="#0D9488" rx="6" />
        <rect x="310" y="120" width="40" height="4" fill="#D1D5DB" rx="2" />
        <rect x="310" y="130" width="50" height="4" fill="#D1D5DB" rx="2" />
        <circle cx="70" cy="30" r="5" fill="#84CC16" />
        <circle cx="330" cy="30" r="5" fill="#0D9488" />
        <circle cx="370" cy="170" r="5" fill="#84CC16" />
        <defs>
          <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'video-production',
    category: 'Content & Design',
    name: 'Video Production & Editing',
    description: 'Promotional videos, tutorials, and social media content',
    price: 'From $2,000',
    agencyPrice: 'Typically $6,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#videoGrad)" />
        <rect x="80" y="60" width="240" height="80" fill="white" rx="8" />
        <polygon points="160,85 160,115 185,100" fill="#0D9488" />
        <rect x="200" y="85" width="80" height="6" fill="#84CC16" rx="3" />
        <rect x="200" y="100" width="60" height="6" fill="#84CC16" rx="3" />
        <rect x="200" y="115" width="70" height="6" fill="#84CC16" rx="3" />
        <circle cx="320" cy="40" r="12" fill="#EF4444" />
        <circle cx="320" cy="40" r="6" fill="white" />
        <rect x="60" y="160" width="40" height="20" fill="#0D9488" rx="4" />
        <rect x="110" y="160" width="40" height="20" fill="#84CC16" rx="4" />
        <rect x="160" y="160" width="40" height="20" fill="#0D9488" rx="4" />
        <rect x="210" y="160" width="40" height="20" fill="#84CC16" rx="4" />
        <rect x="260" y="160" width="40" height="20" fill="#0D9488" rx="4" />
        <rect x="310" y="160" width="40" height="20" fill="#84CC16" rx="4" />
        <defs>
          <linearGradient id="videoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'consulting',
    category: 'Business & Strategy',
    name: 'Digital Transformation Consulting',
    description: 'Strategic roadmap for digital-first transformation',
    price: 'From $5,000',
    agencyPrice: 'Typically $15,000',
    image: (
      <svg className="w-full h-48 object-cover" viewBox="0 0 400 200" fill="none">
        <rect width="400" height="200" fill="url(#consultGrad)" />
        <circle cx="200" cy="100" r="60" fill="white" />
        <circle cx="200" cy="100" r="40" fill="#F3F4F6" />
        <path d="M160 100 Q200 60 240 100 Q200 140 160 100" fill="#0D9488" />
        <circle cx="200" cy="100" r="15" fill="#84CC16" />
        <rect x="120" y="30" width="60" height="20" fill="white" rx="10" />
        <rect x="220" y="30" width="60" height="20" fill="white" rx="10" />
        <rect x="120" y="150" width="60" height="20" fill="white" rx="10" />
        <rect x="220" y="150" width="60" height="20" fill="white" rx="10" />
        <path d="M150 50 L180 80" stroke="#84CC16" strokeWidth="3" />
        <path d="M250 50 L220 80" stroke="#84CC16" strokeWidth="3" />
        <path d="M150 150 L180 120" stroke="#84CC16" strokeWidth="3" />
        <path d="M250 150 L220 120" stroke="#84CC16" strokeWidth="3" />
        <circle cx="80" cy="100" r="8" fill="#84CC16" />
        <circle cx="320" cy="100" r="8" fill="#84CC16" />
        <path d="M88 100 L140 100" stroke="#84CC16" strokeWidth="2" />
        <path d="M260 100 L312 100" stroke="#84CC16" strokeWidth="2" />
        <defs>
          <linearGradient id="consultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

export const CASE_STUDIES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    challenge: 'Was spending $15k/month with agency for minimal leads',
    solution: 'Switched to 2Pbal\'s Market Accelerator package',
    results: 'Generated 240 leads in 3 months while saving 35%'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    challenge: 'Managing 8 different freelancers was chaotic',
    solution: 'Consolidated with 2Pbal\'s AI-Powered Efficiency',
    results: '3x productivity increase, 50% cost reduction'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    challenge: 'Couldn\'t afford a full in-house development team',
    solution: 'Started with Digital Foundation, scaled to Full Suite',
    results: 'Launched in 6 weeks, 10x faster than expected'
  }
];
