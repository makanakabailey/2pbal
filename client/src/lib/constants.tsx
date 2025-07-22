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
    agencyPrice: 'Typically $25,000'
  },
  {
    id: 'mobile-app',
    category: 'Web & Application Development',
    name: 'Mobile App Development',
    description: 'Native iOS and Android apps or cross-platform solutions',
    price: 'From $12,000',
    agencyPrice: 'Typically $35,000'
  },
  {
    id: 'seo',
    category: 'Digital Marketing & Advertising',
    name: 'Search Engine Optimization',
    description: 'SEO: Rank higher to attract organic leads 24/7',
    price: 'From $1,200/mo',
    agencyPrice: 'Typically $3,000/mo'
  },
  {
    id: 'ppc',
    category: 'Digital Marketing & Advertising',
    name: 'Pay-Per-Click Management',
    description: 'Strategic PPC campaigns on Google Ads and social platforms',
    price: 'From $2,000/mo',
    agencyPrice: 'Typically $5,000/mo'
  },
  {
    id: 'email-marketing',
    category: 'Digital Marketing & Advertising',
    name: 'Email Marketing & Automation',
    description: 'Campaign strategy, design, and automated sequences',
    price: 'From $800/mo',
    agencyPrice: 'Typically $2,500/mo'
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
    agencyPrice: 'Typically $10,000'
  },
  {
    id: 'graphic-design',
    category: 'Content & Design',
    name: 'Professional Graphic Design',
    description: 'Brand identity, marketing materials, and digital assets',
    price: 'From $500',
    agencyPrice: 'Typically $1,500'
  },
  {
    id: 'video-production',
    category: 'Content & Design',
    name: 'Video Production & Editing',
    description: 'Promotional videos, tutorials, and social media content',
    price: 'From $2,000',
    agencyPrice: 'Typically $6,000'
  },
  {
    id: 'consulting',
    category: 'Business & Strategy',
    name: 'Digital Transformation Consulting',
    description: 'Strategic roadmap for digital-first transformation',
    price: 'From $5,000',
    agencyPrice: 'Typically $15,000'
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
