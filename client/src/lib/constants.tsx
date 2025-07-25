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

// Pricing plans structure for all services
export interface ServicePricingPlan {
  id: string;
  name: string;
  duration: string;
  totalPrice: number;
  monthlyPrice: number;
  setupFee?: number;
  features: string[];
  popular?: boolean;
}

export interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  basePrice: number;
  agencyPrice: number;
  pricingPlans: ServicePricingPlan[];
  image: JSX.Element;
}

export const SERVICES: Service[] = [
  {
    id: 'web-development',
    category: 'Web & Application Development',
    name: 'Custom Website Development',
    description: 'Professional, mobile-first websites that convert visitors into customers',
    basePrice: 2500,
    agencyPrice: 8000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 2500,
        monthlyPrice: 2500,
        features: [
          'Complete 5-page website',
          'Mobile-responsive design',
          'SEO optimization',
          '3 months support',
          '2 revisions included'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 2750,
        monthlyPrice: 917,
        setupFee: 200,
        features: [
          'Everything in one-time plan',
          'Extended 6-month support',
          'Monthly performance reports',
          '3 revisions included',
          'Priority email support'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 3000,
        monthlyPrice: 500,
        setupFee: 300,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Advanced analytics setup',
          'Monthly optimization calls',
          'Unlimited minor revisions',
          'Priority phone support',
          'Content updates included'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 3600,
        monthlyPrice: 300,
        setupFee: 500,
        features: [
          'Everything in 6-month plan',
          'Quarterly strategy sessions',
          'Advanced feature additions',
          'Unlimited revisions',
          'Dedicated account manager',
          'Monthly content creation',
          '1-year maintenance included'
        ]
      }
    ],
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
    basePrice: 5000,
    agencyPrice: 15000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 5000,
        monthlyPrice: 5000,
        features: [
          'Complete e-commerce store',
          'Payment gateway integration',
          'Inventory management',
          'Order management system',
          '3 months support'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 5500,
        monthlyPrice: 1834,
        setupFee: 400,
        features: [
          'Everything in one-time plan',
          'Advanced analytics dashboard',
          'Email marketing integration',
          '6 months support',
          'Monthly sales reports'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 6200,
        monthlyPrice: 1034,
        setupFee: 600,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Multi-channel selling setup',
          'Customer loyalty program',
          'Advanced shipping options',
          'Bi-weekly optimization calls',
          'Product photography guidance'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 7500,
        monthlyPrice: 625,
        setupFee: 800,
        features: [
          'Everything in 6-month plan',
          'AI-powered recommendations',
          'Advanced marketing automation',
          'Dedicated e-commerce strategist',
          'Monthly conversion optimization',
          'Seasonal campaign management',
          '1-year technical support'
        ]
      }
    ],
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
    basePrice: 8000,
    agencyPrice: 25000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 8000,
        monthlyPrice: 8000,
        features: [
          'Custom web application',
          'Database design & setup',
          'User authentication system',
          'Admin dashboard',
          '6 months support'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 8800,
        monthlyPrice: 2934,
        setupFee: 600,
        features: [
          'Everything in one-time plan',
          'Advanced user roles',
          'API integrations',
          '9 months support',
          'Monthly feature updates'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 10000,
        monthlyPrice: 1667,
        setupFee: 900,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Mobile app companion',
          'Advanced reporting system',
          'Third-party integrations',
          'Bi-weekly check-ins',
          'Performance optimization'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 12500,
        monthlyPrice: 1042,
        setupFee: 1200,
        features: [
          'Everything in 6-month plan',
          'AI/ML features integration',
          'Advanced security features',
          'Dedicated development team',
          'Weekly strategy sessions',
          'Continuous feature development',
          '2-year maintenance included'
        ]
      }
    ],
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
    basePrice: 12000,
    agencyPrice: 35000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 12000,
        monthlyPrice: 12000,
        features: [
          'Cross-platform mobile app',
          'iOS & Android deployment',
          'Backend API development',
          'App store submission',
          '6 months support'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 13200,
        monthlyPrice: 4400,
        setupFee: 800,
        features: [
          'Everything in one-time plan',
          'Push notifications system',
          'In-app analytics',
          '9 months support',
          'Monthly performance reports'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 15000,
        monthlyPrice: 2500,
        setupFee: 1200,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Advanced user engagement',
          'Social media integration',
          'Offline functionality',
          'Bi-weekly optimization',
          'App store optimization'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 18000,
        monthlyPrice: 1500,
        setupFee: 1500,
        features: [
          'Everything in 6-month plan',
          'AI-powered features',
          'Advanced security protocols',
          'Dedicated mobile strategist',
          'Weekly development updates',
          'Continuous feature rollouts',
          '2-year maintenance plan'
        ]
      }
    ],
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
    basePrice: 1200,
    agencyPrice: 3000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 1200,
        monthlyPrice: 1200,
        features: [
          'Complete SEO audit',
          'Keyword research & strategy',
          'On-page optimization',
          'Local SEO setup',
          '3 months monitoring'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 1350,
        monthlyPrice: 450,
        setupFee: 150,
        features: [
          'Everything in one-time plan',
          'Monthly content optimization',
          'Link building campaign',
          '6 months monitoring',
          'Monthly ranking reports'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 1620,
        monthlyPrice: 270,
        setupFee: 200,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Competitor analysis',
          'Technical SEO improvements',
          'Content strategy development',
          'Bi-weekly optimization calls',
          'Advanced analytics setup'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 2100,
        monthlyPrice: 175,
        setupFee: 300,
        features: [
          'Everything in 6-month plan',
          'Advanced local SEO',
          'E-commerce SEO optimization',
          'Dedicated SEO strategist',
          'Weekly content creation',
          'Quarterly strategy reviews',
          '1-year ranking guarantee'
        ]
      }
    ],
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
    basePrice: 2000,
    agencyPrice: 5000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 2000,
        monthlyPrice: 2000,
        features: [
          'Complete PPC setup',
          'Keyword research & targeting',
          'Ad copy creation',
          'Landing page optimization',
          '3 months management'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 2200,
        monthlyPrice: 734,
        setupFee: 300,
        features: [
          'Everything in one-time plan',
          'A/B testing campaigns',
          'Conversion tracking setup',
          '6 months management',
          'Monthly ROI reports'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 2600,
        monthlyPrice: 434,
        setupFee: 400,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Multi-platform campaigns',
          'Remarketing campaigns',
          'Advanced audience targeting',
          'Bi-weekly optimization calls',
          'Competitive analysis'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 3200,
        monthlyPrice: 267,
        setupFee: 600,
        features: [
          'Everything in 6-month plan',
          'Shopping campaigns setup',
          'Video advertising campaigns',
          'Dedicated PPC specialist',
          'Weekly campaign optimization',
          'Quarterly strategy sessions',
          '1-year performance guarantee'
        ]
      }
    ],
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
    basePrice: 800,
    agencyPrice: 2500,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 800,
        monthlyPrice: 800,
        features: [
          'Email marketing setup',
          'Template design (5 templates)',
          'List segmentation strategy',
          'Basic automation flows',
          '3 months management'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 900,
        monthlyPrice: 300,
        setupFee: 120,
        features: [
          'Everything in one-time plan',
          'Advanced automation workflows',
          'A/B testing campaigns',
          '6 months management',
          'Monthly performance reports'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 1080,
        monthlyPrice: 180,
        setupFee: 150,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Behavioral trigger campaigns',
          'Dynamic content personalization',
          'Lead scoring setup',
          'Bi-weekly strategy calls',
          'Custom template designs'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 1400,
        monthlyPrice: 117,
        setupFee: 200,
        features: [
          'Everything in 6-month plan',
          'Advanced analytics dashboard',
          'CRM integration setup',
          'Dedicated email strategist',
          'Weekly content creation',
          'Quarterly campaign reviews',
          '1-year deliverability guarantee'
        ]
      }
    ],
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
    basePrice: 1500,
    agencyPrice: 5000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 1500,
        monthlyPrice: 1500,
        features: [
          'Custom AI chatbot development',
          'Natural language processing',
          'Lead qualification system',
          'CRM integration',
          '6 months support'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 1650,
        monthlyPrice: 550,
        setupFee: 200,
        features: [
          'Everything in one-time plan',
          'Advanced conversation flows',
          'Multi-language support',
          '9 months support',
          'Monthly optimization'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 1950,
        monthlyPrice: 325,
        setupFee: 300,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Voice integration capability',
          'Advanced analytics dashboard',
          'Third-party tool integration',
          'Bi-weekly training sessions',
          'Performance optimization'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 2400,
        monthlyPrice: 200,
        setupFee: 400,
        features: [
          'Everything in 6-month plan',
          'AI learning optimization',
          'Advanced sentiment analysis',
          'Dedicated AI specialist',
          'Weekly performance reviews',
          'Continuous learning updates',
          '2-year maintenance included'
        ]
      }
    ],
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
    basePrice: 3000,
    agencyPrice: 10000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 3000,
        monthlyPrice: 3000,
        features: [
          'Process analysis & mapping',
          'Custom automation workflows',
          'Integration with existing tools',
          'Staff training sessions',
          '6 months support'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 3300,
        monthlyPrice: 1100,
        setupFee: 300,
        features: [
          'Everything in one-time plan',
          'Advanced workflow optimization',
          'Error handling & notifications',
          '9 months support',
          'Monthly process reviews'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 3900,
        monthlyPrice: 650,
        setupFee: 450,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Multi-department automation',
          'Advanced reporting dashboard',
          'API development for integrations',
          'Bi-weekly optimization calls',
          'Process expansion planning'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 4800,
        monthlyPrice: 400,
        setupFee: 600,
        features: [
          'Everything in 6-month plan',
          'AI-powered process optimization',
          'Predictive analytics integration',
          'Dedicated automation specialist',
          'Weekly system monitoring',
          'Quarterly expansion planning',
          '2-year maintenance package'
        ]
      }
    ],
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
    basePrice: 500,
    agencyPrice: 1500,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 500,
        monthlyPrice: 500,
        features: [
          'Logo design (3 concepts)',
          'Business card design',
          'Letterhead template',
          'Brand style guide',
          '2 revisions included'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 550,
        monthlyPrice: 184,
        setupFee: 75,
        features: [
          'Everything in one-time plan',
          'Social media templates',
          'Marketing brochure design',
          '3 revisions included',
          'Extended support'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 650,
        monthlyPrice: 109,
        setupFee: 100,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Website graphics package',
          'Trade show materials',
          'Unlimited minor revisions',
          'Monthly design consultations'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 800,
        monthlyPrice: 67,
        setupFee: 125,
        features: [
          'Everything in 6-month plan',
          'Seasonal campaign materials',
          'Product packaging design',
          'Dedicated designer',
          'Weekly design updates',
          'Brand evolution planning'
        ]
      }
    ],
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
    basePrice: 2000,
    agencyPrice: 6000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 2000,
        monthlyPrice: 2000,
        features: [
          'Professional video production',
          'Script writing assistance',
          'Video editing & post-production',
          'Basic motion graphics',
          '2 revisions included'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 2200,
        monthlyPrice: 734,
        setupFee: 200,
        features: [
          'Everything in one-time plan',
          'Social media video variants',
          'Advanced motion graphics',
          '3 revisions included',
          'Extended support'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 2600,
        monthlyPrice: 434,
        setupFee: 300,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Multi-camera production',
          'Professional voiceover',
          'Unlimited minor revisions',
          'Monthly video consultations'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 3200,
        monthlyPrice: 267,
        setupFee: 400,
        features: [
          'Everything in 6-month plan',
          'Monthly video series',
          'Advanced 3D animations',
          'Dedicated video team',
          'Weekly content planning',
          'Video strategy development'
        ]
      }
    ],
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
    basePrice: 5000,
    agencyPrice: 15000,
    pricingPlans: [
      {
        id: 'one-time',
        name: 'One-Time Payment',
        duration: 'Pay in Full',
        totalPrice: 5000,
        monthlyPrice: 5000,
        features: [
          'Complete digital audit',
          'Strategic transformation roadmap',
          'Technology recommendations',
          'Implementation timeline',
          '3 months follow-up'
        ]
      },
      {
        id: '3-month',
        name: '3-Month Plan',
        duration: '3 Monthly Payments',
        totalPrice: 5500,
        monthlyPrice: 1834,
        setupFee: 400,
        features: [
          'Everything in one-time plan',
          'Process optimization analysis',
          'Change management strategy',
          '6 months follow-up',
          'Monthly strategy sessions'
        ]
      },
      {
        id: '6-month',
        name: '6-Month Plan',
        duration: '6 Monthly Payments',
        totalPrice: 6500,
        monthlyPrice: 1084,
        setupFee: 600,
        popular: true,
        features: [
          'Everything in 3-month plan',
          'Implementation oversight',
          'Staff training programs',
          'Performance metrics setup',
          'Bi-weekly strategy calls',
          'Vendor evaluation assistance'
        ]
      },
      {
        id: '12-month',
        name: '12-Month Plan',
        duration: '12 Monthly Payments',
        totalPrice: 8000,
        monthlyPrice: 667,
        setupFee: 800,
        features: [
          'Everything in 6-month plan',
          'Continuous optimization',
          'Advanced analytics setup',
          'Dedicated strategist',
          'Weekly implementation reviews',
          'Quarterly transformation updates',
          '2-year strategic planning'
        ]
      }
    ],
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

// Business assessment questions for personalized recommendations
export interface BusinessAssessment {
  companySize: 'startup' | 'small' | 'medium' | 'large';
  budget: 'under-5k' | '5k-15k' | '15k-35k' | '35k-plus';
  currentStage: 'idea' | 'mvp' | 'growth' | 'scale';
  primaryGoal: 'visibility' | 'leads' | 'automation' | 'efficiency';
  timeframe: 'asap' | '1-3months' | '3-6months' | '6-12months';
  techSavviness: 'basic' | 'intermediate' | 'advanced';
}

// Personalized package recommendation engine
export function getPersonalizedRecommendation(assessment: BusinessAssessment): {
  recommended: string;
  reasons: string[];
  alternatives: string[];
} {
  const { companySize, budget, currentStage, primaryGoal, timeframe, techSavviness } = assessment;
  
  // Score each package based on assessment
  const packageScores = {
    'digital-foundation': 0,
    'market-accelerator': 0,
    'ai-powered-efficiency': 0,
    'full-suite-advantage': 0
  };

  // Company size scoring
  if (companySize === 'startup') {
    packageScores['digital-foundation'] += 3;
    packageScores['market-accelerator'] += 2;
  } else if (companySize === 'small') {
    packageScores['digital-foundation'] += 2;
    packageScores['market-accelerator'] += 3;
    packageScores['ai-powered-efficiency'] += 1;
  } else if (companySize === 'medium') {
    packageScores['market-accelerator'] += 2;
    packageScores['ai-powered-efficiency'] += 3;
    packageScores['full-suite-advantage'] += 1;
  } else if (companySize === 'large') {
    packageScores['ai-powered-efficiency'] += 2;
    packageScores['full-suite-advantage'] += 3;
  }

  // Budget scoring
  if (budget === 'under-5k') {
    packageScores['digital-foundation'] += 3;
  } else if (budget === '5k-15k') {
    packageScores['digital-foundation'] += 1;
    packageScores['market-accelerator'] += 3;
  } else if (budget === '15k-35k') {
    packageScores['market-accelerator'] += 2;
    packageScores['ai-powered-efficiency'] += 3;
  } else if (budget === '35k-plus') {
    packageScores['ai-powered-efficiency'] += 2;
    packageScores['full-suite-advantage'] += 3;
  }

  // Current stage scoring
  if (currentStage === 'idea') {
    packageScores['digital-foundation'] += 3;
  } else if (currentStage === 'mvp') {
    packageScores['digital-foundation'] += 2;
    packageScores['market-accelerator'] += 2;
  } else if (currentStage === 'growth') {
    packageScores['market-accelerator'] += 3;
    packageScores['ai-powered-efficiency'] += 2;
  } else if (currentStage === 'scale') {
    packageScores['ai-powered-efficiency'] += 3;
    packageScores['full-suite-advantage'] += 2;
  }

  // Primary goal scoring
  if (primaryGoal === 'visibility') {
    packageScores['digital-foundation'] += 3;
    packageScores['market-accelerator'] += 2;
  } else if (primaryGoal === 'leads') {
    packageScores['market-accelerator'] += 3;
    packageScores['ai-powered-efficiency'] += 1;
  } else if (primaryGoal === 'automation') {
    packageScores['ai-powered-efficiency'] += 3;
    packageScores['full-suite-advantage'] += 2;
  } else if (primaryGoal === 'efficiency') {
    packageScores['ai-powered-efficiency'] += 2;
    packageScores['full-suite-advantage'] += 3;
  }

  // Find recommended package
  const sortedPackages = Object.entries(packageScores)
    .sort(([,a], [,b]) => b - a)
    .map(([pkg]) => pkg);

  const recommended = sortedPackages[0];
  const alternatives = sortedPackages.slice(1, 3);

  // Generate reasons based on assessment
  const reasons = [];
  if (companySize === 'startup' && recommended === 'digital-foundation') {
    reasons.push('Perfect foundation for startups to establish credibility');
  }
  if (currentStage === 'growth' && recommended === 'market-accelerator') {
    reasons.push('Optimized for businesses ready for aggressive growth');
  }
  if (primaryGoal === 'automation' && recommended === 'ai-powered-efficiency') {
    reasons.push('AI-powered features align with your automation goals');
  }
  if (budget === '35k-plus' && recommended === 'full-suite-advantage') {
    reasons.push('Enterprise-level solution matching your budget range');
  }

  // Default reasons if none matched
  if (reasons.length === 0) {
    const pkg = PACKAGES.find(p => p.id === recommended);
    if (pkg) {
      reasons.push(`Best fit based on your business profile and ${pkg.target.toLowerCase()}`);
    }
  }

  return {
    recommended,
    reasons,
    alternatives
  };
}

// Service recommendation based on business needs
export function getServiceRecommendations(assessment: BusinessAssessment): Service[] {
  const { primaryGoal, currentStage, techSavviness, budget } = assessment;
  
  let recommendedServices: Service[] = [];

  // Base recommendations for all businesses
  const webDev = SERVICES.find(s => s.id === 'web-development');
  if (webDev) recommendedServices.push(webDev);

  // Stage-based recommendations
  if (currentStage === 'idea' || currentStage === 'mvp') {
    const graphicDesign = SERVICES.find(s => s.id === 'graphic-design');
    if (graphicDesign) recommendedServices.push(graphicDesign);
  }

  if (currentStage === 'growth' || currentStage === 'scale') {
    const seo = SERVICES.find(s => s.id === 'seo');
    const ppc = SERVICES.find(s => s.id === 'ppc');
    if (seo && primaryGoal === 'leads') recommendedServices.push(seo);
    if (ppc && budget !== 'under-5k') recommendedServices.push(ppc);
  }

  // Goal-based recommendations
  if (primaryGoal === 'automation' || primaryGoal === 'efficiency') {
    const aiChatbot = SERVICES.find(s => s.id === 'ai-chatbot');
    const processAutomation = SERVICES.find(s => s.id === 'process-automation');
    if (aiChatbot && techSavviness !== 'basic') recommendedServices.push(aiChatbot);
    if (processAutomation && budget === '35k-plus') recommendedServices.push(processAutomation);
  }

  if (primaryGoal === 'visibility') {
    const emailMarketing = SERVICES.find(s => s.id === 'email-marketing');
    const videoProduction = SERVICES.find(s => s.id === 'video-production');
    if (emailMarketing) recommendedServices.push(emailMarketing);
    if (videoProduction && budget !== 'under-5k') recommendedServices.push(videoProduction);
  }

  // Limit to top 4 recommendations
  return recommendedServices.slice(0, 4);
}
