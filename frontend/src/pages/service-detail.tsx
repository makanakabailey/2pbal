import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, TrendingUp, Clock, DollarSign, Users, Zap, Shield, Target, BarChart3 } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

// Enhanced service data with detailed benefits and ROI information
const ENHANCED_SERVICE_DATA = {
  'web-development': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#webDevGrad)" />
        <rect x="60" y="80" width="680" height="240" fill="white" rx="12" />
        <rect x="90" y="110" width="100" height="16" fill="#0D9488" rx="8" />
        <rect x="90" y="140" width="400" height="8" fill="#D1D5DB" rx="4" />
        <rect x="90" y="160" width="300" height="8" fill="#D1D5DB" rx="4" />
        <rect x="540" y="110" width="170" height="50" fill="#84CC16" rx="8" />
        <rect x="90" y="200" width="620" height="90" fill="#F3F4F6" rx="8" />
        <circle cx="150" cy="245" r="20" fill="#0D9488" />
        <circle cx="220" cy="245" r="20" fill="#84CC16" />
        <circle cx="290" cy="245" r="20" fill="#0D9488" />
        <defs>
          <linearGradient id="webDevGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Average ROI', value: '400%', icon: TrendingUp },
      { label: 'Payback Period', value: '6 months', icon: Clock },
      { label: 'Cost vs Agency', value: '70% less', icon: DollarSign },
      { label: 'Conversion Increase', value: '250%', icon: Target }
    ],
    benefits: [
      {
        title: 'Professional Credibility',
        description: '94% of first impressions are design-related. A professional website instantly establishes trust and credibility with potential customers.',
        impact: 'Increases customer confidence by 75%',
        icon: Shield
      },
      {
        title: '24/7 Sales Generation',
        description: 'Your website works around the clock, capturing leads and driving sales while you sleep. No geographical limitations or business hours.',
        impact: 'Generates leads 24/7 without additional costs',
        icon: Clock
      },
      {
        title: 'Mobile-First Performance',
        description: 'With 67% of customers preferring mobile-friendly sites, responsive design directly impacts your bottom line.',
        impact: 'Increases mobile conversions by 15%',
        icon: Zap
      },
      {
        title: 'SEO Foundation',
        description: 'Custom websites are built with SEO best practices, making it easier for customers to find you organically.',
        impact: 'Reduces customer acquisition costs by 40%',
        icon: Target
      }
    ],
    process: [
      { step: 'Discovery & Strategy', duration: '1 week', description: 'Understanding your business goals and target audience' },
      { step: 'Design & Wireframes', duration: '2 weeks', description: 'Creating visual mockups and user experience flow' },
      { step: 'Development & Testing', duration: '3-4 weeks', description: 'Building responsive, high-performance website' },
      { step: 'Launch & Optimization', duration: '1 week', description: 'Going live with ongoing performance monitoring' }
    ],
    features: [
      'Mobile-responsive design',
      'SEO optimization',
      'Fast loading speeds (<3 seconds)',
      'Content management system',
      'Analytics integration',
      'Security protocols',
      'Lead capture forms',
      'Social media integration'
    ]
  },
  'ecommerce': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#ecomGrad)" />
        <rect x="100" y="60" width="600" height="280" fill="white" rx="12" />
        <circle cx="200" cy="160" r="40" fill="#F3F4F6" />
        <rect x="280" y="120" width="160" height="12" fill="#0D9488" rx="6" />
        <rect x="280" y="150" width="240" height="8" fill="#D1D5DB" rx="4" />
        <rect x="280" y="170" width="120" height="16" fill="#84CC16" rx="8" />
        <rect x="560" y="110" width="120" height="80" fill="#84CC16" rx="12" />
        <path d="M590 140 L605 155 L630 130" stroke="white" strokeWidth="6" fill="none" />
        <rect x="140" y="240" width="100" height="60" fill="#F3F4F6" rx="8" />
        <rect x="260" y="240" width="100" height="60" fill="#F3F4F6" rx="8" />
        <rect x="380" y="240" width="100" height="60" fill="#F3F4F6" rx="8" />
        <rect x="500" y="240" width="100" height="60" fill="#F3F4F6" rx="8" />
        <defs>
          <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Revenue Increase', value: '350%', icon: TrendingUp },
      { label: 'Global Reach', value: 'Unlimited', icon: Users },
      { label: 'Operating Hours', value: '24/7', icon: Clock },
      { label: 'Setup vs Physical', value: '90% faster', icon: Zap }
    ],
    benefits: [
      {
        title: 'Global Market Access',
        description: 'Break free from geographical limitations. Reach 2.71 billion online shoppers worldwide and tap into the $6.3 trillion global ecommerce market.',
        impact: 'Expands potential customer base by 1000%+',
        icon: Users
      },
      {
        title: 'Lower Operating Costs',
        description: 'Eliminate rent, utilities, and physical store staff. Reduce overhead by up to 60% compared to traditional retail operations.',
        impact: 'Saves $50,000+ annually vs physical stores',
        icon: DollarSign
      },
      {
        title: 'Automated Operations',
        description: 'Inventory management, payment processing, and order fulfillment work automatically, freeing you to focus on growth.',
        impact: 'Reduces operational time by 75%',
        icon: Zap
      },
      {
        title: 'Data-Driven Insights',
        description: 'Real-time analytics show exactly what customers want, enabling data-driven decisions for maximum profitability.',
        impact: 'Increases conversion rates by 200%',
        icon: BarChart3
      }
    ],
    process: [
      { step: 'Platform Setup', duration: '1 week', description: 'Configuring ecommerce platform and payment systems' },
      { step: 'Product Catalog', duration: '2 weeks', description: 'Adding products, descriptions, and photography' },
      { step: 'Integration & Testing', duration: '2 weeks', description: 'Payment, shipping, and inventory integration' },
      { step: 'Launch & Marketing', duration: '1 week', description: 'Going live with initial marketing campaigns' }
    ],
    features: [
      'Secure payment processing',
      'Inventory management',
      'Order tracking system',
      'Customer accounts',
      'Product reviews',
      'Discount & coupon system',
      'Multi-currency support',
      'Analytics dashboard'
    ]
  },
  'ai-chatbot': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#aiGrad)" />
        <circle cx="400" cy="200" r="80" fill="white" />
        <circle cx="370" cy="180" r="12" fill="#0D9488" />
        <circle cx="430" cy="180" r="12" fill="#0D9488" />
        <path d="M350 220 Q400 250 450 220" stroke="#84CC16" strokeWidth="8" fill="none" />
        <rect x="200" y="100" width="80" height="40" fill="white" rx="20" />
        <rect x="520" y="260" width="80" height="40" fill="white" rx="20" />
        <rect x="150" y="320" width="120" height="40" fill="white" rx="20" />
        <rect x="530" y="80" width="100" height="40" fill="#84CC16" rx="20" />
        <circle cx="220" cy="120" r="4" fill="#0D9488" />
        <circle cx="240" cy="120" r="4" fill="#0D9488" />
        <circle cx="260" cy="120" r="4" fill="#0D9488" />
        <circle cx="560" cy="280" r="4" fill="#0D9488" />
        <circle cx="580" cy="280" r="4" fill="#0D9488" />
        <circle cx="210" cy="340" r="4" fill="#0D9488" />
        <text x="550" y="105" fill="white" fontSize="14" fontWeight="bold">Hi there!</text>
        <defs>
          <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Cost Reduction', value: '30%', icon: DollarSign },
      { label: 'Query Resolution', value: '85%', icon: CheckCircle },
      { label: 'Response Time', value: 'Instant', icon: Zap },
      { label: 'Annual Savings', value: '$300K', icon: TrendingUp }
    ],
    benefits: [
      {
        title: 'Instant Customer Support',
        description: 'Provide immediate responses to customer inquiries 24/7, eliminating wait times and improving satisfaction scores.',
        impact: 'Reduces response time from hours to seconds',
        icon: Zap
      },
      {
        title: 'Massive Cost Savings',
        description: 'Handle 85% of routine inquiries automatically, reducing customer support costs by $300,000 annually for mid-sized businesses.',
        impact: 'Saves $0.50-$0.70 per customer interaction',
        icon: DollarSign
      },
      {
        title: 'Scalable Support',
        description: 'Handle unlimited simultaneous conversations without hiring additional staff or dealing with peak-time bottlenecks.',
        impact: 'Manages 10,000+ concurrent conversations',
        icon: Users
      },
      {
        title: 'Lead Qualification',
        description: 'Automatically qualify leads and route high-value prospects to your sales team, increasing conversion rates.',
        impact: 'Improves lead quality by 60%',
        icon: Target
      }
    ],
    process: [
      { step: 'Requirements Analysis', duration: '3 days', description: 'Identifying common queries and support workflows' },
      { step: 'Bot Training', duration: '1 week', description: 'Training AI on your specific business knowledge' },
      { step: 'Integration Setup', duration: '3 days', description: 'Connecting to existing systems and platforms' },
      { step: 'Testing & Launch', duration: '3 days', description: 'Quality assurance and live deployment' }
    ],
    features: [
      'Natural language processing',
      'Multi-language support',
      'CRM integration',
      'Lead capture forms',
      'Escalation to human agents',
      'Analytics dashboard',
      'Custom branding',
      'API integrations'
    ]
  },
  'process-automation': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#autoGrad)" />
        <rect x="100" y="80" width="120" height="80" fill="white" rx="8" />
        <rect x="340" y="80" width="120" height="80" fill="white" rx="8" />
        <rect x="580" y="80" width="120" height="80" fill="white" rx="8" />
        <rect x="100" y="240" width="120" height="80" fill="white" rx="8" />
        <rect x="340" y="240" width="120" height="80" fill="white" rx="8" />
        <rect x="580" y="240" width="120" height="80" fill="white" rx="8" />
        
        {/* Automation flow arrows */}
        <path d="M220 120 L340 120" stroke="#84CC16" strokeWidth="6" markerEnd="url(#arrowhead)" />
        <path d="M460 120 L580 120" stroke="#84CC16" strokeWidth="6" markerEnd="url(#arrowhead)" />
        <path d="M160 160 L160 240" stroke="#84CC16" strokeWidth="6" markerEnd="url(#arrowhead)" />
        <path d="M400 160 L400 240" stroke="#84CC16" strokeWidth="6" markerEnd="url(#arrowhead)" />
        <path d="M640 160 L640 240" stroke="#84CC16" strokeWidth="6" markerEnd="url(#arrowhead)" />
        
        {/* Process icons */}
        <circle cx="160" cy="120" r="20" fill="#0D9488" />
        <circle cx="400" cy="120" r="20" fill="#0D9488" />
        <circle cx="640" cy="120" r="20" fill="#0D9488" />
        <circle cx="160" cy="280" r="20" fill="#84CC16" />
        <circle cx="400" cy="280" r="20" fill="#84CC16" />
        <circle cx="640" cy="280" r="20" fill="#84CC16" />
        
        <defs>
          <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#84CC16" />
          </marker>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'ROI Range', value: '30-200%', icon: TrendingUp },
      { label: 'Error Reduction', value: '75%', icon: CheckCircle },
      { label: 'Time Saved', value: '200+ hrs/year', icon: Clock },
      { label: 'Productivity Boost', value: '30%', icon: Zap }
    ],
    benefits: [
      {
        title: 'Dramatic Cost Reduction',
        description: 'Eliminate repetitive manual tasks and reduce operational costs by 10-50% through intelligent automation of HR, finance, and operations.',
        impact: 'Saves 200+ hours annually per employee',
        icon: DollarSign
      },
      {
        title: 'Error Elimination',
        description: 'Automated processes reduce human errors by 40-75%, preventing costly mistakes and improving data accuracy across all operations.',
        impact: 'Prevents $50,000+ in error-related costs',
        icon: Shield
      },
      {
        title: 'Scalable Operations',
        description: 'Handle increased workload without proportional staff increases. Automation scales seamlessly with business growth.',
        impact: 'Supports 300% business growth with same staff',
        icon: TrendingUp
      },
      {
        title: '24/7 Processing',
        description: 'Automated systems work continuously without fatigue, processing tasks overnight and on weekends for maximum efficiency.',
        impact: 'Increases processing capacity by 500%',
        icon: Clock
      }
    ],
    process: [
      { step: 'Process Mapping', duration: '1 week', description: 'Documenting current workflows and identifying automation opportunities' },
      { step: 'Solution Design', duration: '1 week', description: 'Creating automated workflow architecture' },
      { step: 'Development & Testing', duration: '3 weeks', description: 'Building and testing automation systems' },
      { step: 'Deployment & Training', duration: '1 week', description: 'Going live with staff training and monitoring' }
    ],
    features: [
      'Workflow automation',
      'Data processing automation',
      'Report generation',
      'Email notifications',
      'Integration APIs',
      'Error handling',
      'Audit trails',
      'Performance monitoring'
    ]
  },
  'web-app': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#webAppHeroGrad)" />
        <rect x="80" y="60" width="640" height="280" fill="white" rx="16" />
        <rect x="120" y="100" width="120" height="80" fill="#0D9488" rx="8" />
        <rect x="280" y="100" width="120" height="80" fill="#84CC16" rx="8" />
        <rect x="440" y="100" width="120" height="80" fill="#0D9488" rx="8" />
        <rect x="600" y="100" width="80" height="80" fill="#84CC16" rx="8" />
        <rect x="120" y="220" width="560" height="90" fill="#F3F4F6" rx="8" />
        <rect x="160" y="250" width="120" height="12" fill="#0D9488" rx="6" />
        <rect x="160" y="270" width="80" height="8" fill="#D1D5DB" rx="4" />
        <rect x="320" y="250" width="160" height="12" fill="#84CC16" rx="6" />
        <rect x="320" y="270" width="120" height="8" fill="#D1D5DB" rx="4" />
        <rect x="520" y="250" width="120" height="12" fill="#0D9488" rx="6" />
        <rect x="520" y="270" width="100" height="8" fill="#D1D5DB" rx="4" />
        <circle cx="180" cy="140" r="16" fill="white" />
        <circle cx="340" cy="140" r="16" fill="white" />
        <circle cx="500" cy="140" r="16" fill="white" />
        <defs>
          <linearGradient id="webAppHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Productivity Gain', value: '300%', icon: TrendingUp },
      { label: 'Process Efficiency', value: '75%', icon: Zap },
      { label: 'Cost Reduction', value: '$50K/year', icon: DollarSign },
      { label: 'User Satisfaction', value: '95%', icon: Users }
    ],
    benefits: [
      {
        title: 'Custom Business Logic',
        description: 'Built specifically for your unique business processes, workflows, and requirements. No compromises or workarounds needed.',
        impact: 'Perfectly aligned with business needs',
        icon: Target
      },
      {
        title: 'Massive Productivity Boost',
        description: 'Automate complex workflows and eliminate manual processes. Custom applications increase team productivity by 300%.',
        impact: 'Saves 20+ hours per week per employee',
        icon: TrendingUp
      },
      {
        title: 'Scalable Architecture',
        description: 'Built to grow with your business. Handle increasing data, users, and complexity without performance degradation.',
        impact: 'Supports unlimited business growth',
        icon: Zap
      },
      {
        title: 'Integration Capabilities',
        description: 'Seamlessly connect with existing systems, APIs, and databases. Create unified workflows across all platforms.',
        impact: 'Eliminates data silos and manual transfers',
        icon: Shield
      }
    ],
    process: [
      { step: 'Requirements Analysis', duration: '1 week', description: 'Deep dive into business processes and technical requirements' },
      { step: 'System Architecture', duration: '1 week', description: 'Database design, API structure, and technical planning' },
      { step: 'Development & Testing', duration: '6-10 weeks', description: 'Agile development with regular testing and feedback' },
      { step: 'Deployment & Training', duration: '1 week', description: 'Production deployment and team training' }
    ],
    features: [
      'Custom user interfaces',
      'Database integration',
      'API development',
      'User authentication',
      'Role-based permissions',
      'Real-time updates',
      'Mobile responsiveness',
      'Analytics & reporting'
    ]
  },
  'mobile-app': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#mobileHeroGrad)" />
        <rect x="300" y="80" width="200" height="240" fill="white" rx="30" />
        <rect x="320" y="110" width="160" height="180" fill="#F3F4F6" rx="16" />
        <circle cx="400" cy="100" r="6" fill="#0D9488" />
        <rect x="340" y="130" width="120" height="8" fill="#0D9488" rx="4" />
        <rect x="340" y="150" width="80" height="8" fill="#D1D5DB" rx="4" />
        <rect x="340" y="170" width="100" height="8" fill="#D1D5DB" rx="4" />
        <rect x="340" y="200" width="120" height="40" fill="#84CC16" rx="8" />
        <rect x="340" y="250" width="120" height="30" fill="#0D9488" rx="8" />
        <circle cx="400" cy="300" r="16" fill="#84CC16" />
        <defs>
          <linearGradient id="mobileHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Market Reach', value: '6.8B users', icon: Users },
      { label: 'Engagement Rate', value: '3x higher', icon: TrendingUp },
      { label: 'Revenue Growth', value: '25%', icon: DollarSign },
      { label: 'Customer Retention', value: '2x better', icon: Target }
    ],
    benefits: [
      {
        title: 'Massive Market Opportunity',
        description: 'Tap into 6.8 billion smartphone users worldwide. Mobile apps generate 57% of all digital media usage.',
        impact: 'Access to billions of potential customers',
        icon: Users
      },
      {
        title: 'Superior User Experience',
        description: 'Native mobile apps provide faster performance, better user experience, and access to device features.',
        impact: 'Increases user engagement by 300%',
        icon: Zap
      },
      {
        title: 'Push Notification Power',
        description: 'Direct communication channel with 90% open rates, driving immediate customer action and repeat business.',
        impact: 'Boosts customer retention by 200%',
        icon: Target
      },
      {
        title: 'App Store Revenue',
        description: 'Generate revenue through app sales, in-app purchases, and subscriptions in the $935 billion app economy.',
        impact: 'Multiple revenue streams and passive income',
        icon: DollarSign
      }
    ],
    process: [
      { step: 'Strategy & Planning', duration: '1 week', description: 'App concept, target audience, and feature definition' },
      { step: 'UI/UX Design', duration: '3 weeks', description: 'User interface design and user experience optimization' },
      { step: 'Development & Testing', duration: '8-12 weeks', description: 'Native or cross-platform app development' },
      { step: 'App Store Launch', duration: '1 week', description: 'App store submission and marketing launch' }
    ],
    features: [
      'iOS and Android compatibility',
      'Push notifications',
      'Offline functionality',
      'GPS and location services',
      'Camera integration',
      'Social media sharing',
      'In-app purchases',
      'Analytics tracking'
    ]
  },
  'seo': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#seoHeroGrad)" />
        <rect x="100" y="120" width="600" height="160" fill="white" rx="16" />
        <rect x="140" y="160" width="120" height="12" fill="#84CC16" rx="6" />
        <rect x="140" y="190" width="200" height="8" fill="#D1D5DB" rx="4" />
        <rect x="140" y="210" width="160" height="8" fill="#D1D5DB" rx="4" />
        <rect x="140" y="230" width="180" height="8" fill="#D1D5DB" rx="4" />
        <path d="M500 180 L540 140 L580 170 L580 240 L540 260 L500 240 Z" fill="#0D9488" />
        <path d="M520 200 L535 190 L550 210" stroke="white" strokeWidth="6" fill="none" />
        <circle cx="640" cy="100" r="30" fill="#84CC16" />
        <path d="M624 100 L636 112 L656 88" stroke="white" strokeWidth="4" fill="none" />
        <defs>
          <linearGradient id="seoHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Organic Traffic', value: '1000%+', icon: TrendingUp },
      { label: 'Cost Per Lead', value: '61% lower', icon: DollarSign },
      { label: 'Conversion Rate', value: '14.6%', icon: Target },
      { label: 'Long-term Value', value: 'Compounds yearly', icon: Clock }
    ],
    benefits: [
      {
        title: 'Massive Organic Traffic',
        description: 'Rank on page 1 for high-value keywords and capture 71% of search traffic. SEO drives 1000%+ more traffic than social media.',
        impact: 'Generates unlimited organic leads',
        icon: TrendingUp
      },
      {
        title: 'Ultra-Low Cost Per Lead',
        description: 'SEO leads cost 61% less than PPC leads and have a 14.6% close rate compared to 1.7% for outbound leads.',
        impact: 'Reduces customer acquisition costs by 60%',
        icon: DollarSign
      },
      {
        title: 'Builds Long-term Assets',
        description: 'Unlike paid ads, SEO creates lasting value. Top rankings compound over time, providing years of free traffic.',
        impact: 'Creates permanent traffic-generating assets',
        icon: Shield
      },
      {
        title: '24/7 Lead Generation',
        description: 'Your SEO-optimized content works around the clock, capturing leads while you sleep, vacation, or focus on other tasks.',
        impact: 'Generates leads 24/7 without additional costs',
        icon: Clock
      }
    ],
    process: [
      { step: 'SEO Audit & Strategy', duration: '1 week', description: 'Comprehensive site analysis and keyword research' },
      { step: 'On-Page Optimization', duration: '2 weeks', description: 'Content, meta tags, and technical SEO improvements' },
      { step: 'Content Creation', duration: 'Ongoing', description: 'High-quality, keyword-targeted content development' },
      { step: 'Link Building & Monitoring', duration: 'Ongoing', description: 'Authority building and performance tracking' }
    ],
    features: [
      'Keyword research & analysis',
      'On-page optimization',
      'Technical SEO audits',
      'Content strategy',
      'Link building campaigns',
      'Local SEO optimization',
      'Performance monitoring',
      'Monthly reporting'
    ]
  },
  'ppc': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#ppcHeroGrad)" />
        <rect x="120" y="80" width="240" height="160" fill="white" rx="16" />
        <rect x="440" y="80" width="240" height="160" fill="white" rx="16" />
        <rect x="280" y="160" width="240" height="160" fill="white" rx="16" />
        <rect x="160" y="120" width="160" height="12" fill="#3B82F6" rx="6" />
        <rect x="160" y="150" width="100" height="8" fill="#D1D5DB" rx="4" />
        <rect x="480" y="120" width="160" height="12" fill="#EF4444" rx="6" />
        <rect x="480" y="150" width="120" height="8" fill="#D1D5DB" rx="4" />
        <rect x="320" y="200" width="160" height="12" fill="#84CC16" rx="6" />
        <rect x="320" y="230" width="140" height="8" fill="#D1D5DB" rx="4" />
        <circle cx="400" cy="100" r="40" fill="#0D9488" />
        <path d="M384 100 L392 108 L416 84" stroke="white" strokeWidth="6" fill="none" />
        <defs>
          <linearGradient id="ppcHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Average ROI', value: '200%', icon: TrendingUp },
      { label: 'Immediate Results', value: 'Same day', icon: Zap },
      { label: 'Conversion Rate', value: '3.75%', icon: Target },
      { label: 'Revenue Growth', value: '$2 per $1 spent', icon: DollarSign }
    ],
    benefits: [
      {
        title: 'Instant Traffic & Results',
        description: 'Unlike SEO, PPC delivers immediate traffic and results. Launch campaigns today and see visitors within hours.',
        impact: 'Generates leads from day one',
        icon: Zap
      },
      {
        title: 'Laser-Targeted Audience',
        description: 'Target exact demographics, interests, locations, and behaviors. Reach only the people most likely to buy.',
        impact: 'Increases conversion rates by 300%',
        icon: Target
      },
      {
        title: 'Measurable ROI',
        description: 'Track every click, conversion, and dollar spent. Average businesses see $2 return for every $1 invested in Google Ads.',
        impact: 'Average 200% ROI with proper management',
        icon: DollarSign
      },
      {
        title: 'Scalable Growth',
        description: 'Successful campaigns can be scaled up instantly. Increase budget to multiply results and business growth.',
        impact: 'Unlimited scalability for profitable campaigns',
        icon: TrendingUp
      }
    ],
    process: [
      { step: 'Account Setup & Strategy', duration: '3 days', description: 'Campaign structure, keyword research, and targeting setup' },
      { step: 'Ad Creation & Landing Pages', duration: '1 week', description: 'Compelling ad copy and optimized landing pages' },
      { step: 'Campaign Launch & Testing', duration: '1 week', description: 'Live campaign launch with A/B testing' },
      { step: 'Optimization & Scaling', duration: 'Ongoing', description: 'Continuous optimization and performance improvement' }
    ],
    features: [
      'Google Ads management',
      'Facebook & Instagram ads',
      'Keyword research & bidding',
      'Ad copy creation',
      'Landing page optimization',
      'A/B testing',
      'Conversion tracking',
      'Performance reporting'
    ]
  },
  'email-marketing': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#emailHeroGrad)" />
        <rect x="160" y="120" width="480" height="160" fill="white" rx="16" />
        <path d="M160 120 L400 240 L640 120" stroke="#0D9488" strokeWidth="8" fill="none" />
        <circle cx="240" cy="80" r="16" fill="#84CC16" />
        <circle cx="560" cy="80" r="16" fill="#84CC16" />
        <circle cx="400" cy="60" r="16" fill="#84CC16" />
        <circle cx="240" cy="320" r="16" fill="#84CC16" />
        <circle cx="560" cy="320" r="16" fill="#84CC16" />
        <circle cx="400" cy="340" r="16" fill="#84CC16" />
        <path d="M224 80 L160 120" stroke="#84CC16" strokeWidth="4" />
        <path d="M256 80 L320 120" stroke="#84CC16" strokeWidth="4" />
        <path d="M544 80 L480 120" stroke="#84CC16" strokeWidth="4" />
        <path d="M576 80 L640 120" stroke="#84CC16" strokeWidth="4" />
        <path d="M384 340 L320 280" stroke="#84CC16" strokeWidth="4" />
        <path d="M416 340 L480 280" stroke="#84CC16" strokeWidth="4" />
        <defs>
          <linearGradient id="emailHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Average ROI', value: '$42 per $1', icon: DollarSign },
      { label: 'Open Rate', value: '22.86%', icon: TrendingUp },
      { label: 'Click Rate', value: '3.71%', icon: Target },
      { label: 'Conversion Rate', value: '15.22%', icon: Zap }
    ],
    benefits: [
      {
        title: 'Highest ROI Marketing Channel',
        description: 'Email marketing delivers $42 for every $1 spent, making it the highest ROI digital marketing channel available.',
        impact: 'Generates 4200% ROI on average',
        icon: DollarSign
      },
      {
        title: 'Direct Customer Access',
        description: 'Own your audience completely. Unlike social media, you control the communication channel and relationship.',
        impact: 'Build owned audience independent of platforms',
        icon: Shield
      },
      {
        title: 'Automated Revenue Generation',
        description: 'Set up automated sequences that nurture leads and generate sales 24/7 without manual intervention.',
        impact: 'Creates passive revenue streams',
        icon: Zap
      },
      {
        title: 'Personalized Customer Journeys',
        description: 'Segment audiences and deliver personalized content that drives 6x higher transaction rates.',
        impact: 'Increases transaction rates by 600%',
        icon: Users
      }
    ],
    process: [
      { step: 'Strategy & List Building', duration: '1 week', description: 'Email strategy development and subscriber acquisition' },
      { step: 'Template Design', duration: '1 week', description: 'Professional email templates and branding' },
      { step: 'Automation Setup', duration: '2 weeks', description: 'Automated sequences and segmentation' },
      { step: 'Campaign Launch & Optimization', duration: 'Ongoing', description: 'Regular campaigns and performance optimization' }
    ],
    features: [
      'Email automation sequences',
      'List segmentation',
      'A/B testing',
      'Professional templates',
      'Analytics & reporting',
      'Lead magnets',
      'CRM integration',
      'Spam compliance'
    ]
  },
  'graphic-design': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#designHeroGrad)" />
        <rect x="100" y="100" width="200" height="200" fill="white" rx="16" />
        <rect x="340" y="100" width="200" height="200" fill="white" rx="16" />
        <rect x="580" y="100" width="200" height="200" fill="white" rx="16" />
        <circle cx="200" cy="160" r="30" fill="#0D9488" />
        <rect x="150" y="220" width="100" height="12" fill="#84CC16" rx="6" />
        <rect x="150" y="250" width="70" height="8" fill="#D1D5DB" rx="4" />
        <path d="M380 140 L420 180 L500 120 L500 260 L380 260 Z" fill="#84CC16" />
        <rect x="620" y="140" width="120" height="80" fill="#0D9488" rx="12" />
        <rect x="620" y="240" width="80" height="8" fill="#D1D5DB" rx="4" />
        <rect x="620" y="260" width="100" height="8" fill="#D1D5DB" rx="4" />
        <circle cx="140" cy="60" r="10" fill="#84CC16" />
        <circle cx="660" cy="60" r="10" fill="#0D9488" />
        <circle cx="740" cy="340" r="10" fill="#84CC16" />
        <defs>
          <linearGradient id="designHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Brand Recognition', value: '80% increase', icon: TrendingUp },
      { label: 'Customer Trust', value: '94% higher', icon: Shield },
      { label: 'Conversion Rate', value: '2.3x better', icon: Target },
      { label: 'Time to Market', value: '75% faster', icon: Zap }
    ],
    benefits: [
      {
        title: 'Professional Brand Credibility',
        description: '94% of first impressions are design-related. Professional graphics instantly establish trust and credibility.',
        impact: 'Increases customer confidence by 94%',
        icon: Shield
      },
      {
        title: 'Higher Conversion Rates',
        description: 'Well-designed marketing materials convert 2.3x better than amateur designs, directly impacting revenue.',
        impact: 'Increases conversions by 230%',
        icon: Target
      },
      {
        title: 'Brand Recognition & Recall',
        description: 'Consistent, professional branding increases brand recognition by 80% and customer recall by 65%.',
        impact: 'Builds lasting brand memory and loyalty',
        icon: TrendingUp
      },
      {
        title: 'Cost-Effective Marketing',
        description: 'Professional graphics perform better across all channels, reducing overall marketing costs per acquisition.',
        impact: 'Reduces marketing costs by 40%',
        icon: DollarSign
      }
    ],
    process: [
      { step: 'Brand Discovery', duration: '3 days', description: 'Understanding brand values, target audience, and objectives' },
      { step: 'Concept Development', duration: '1 week', description: 'Initial design concepts and style exploration' },
      { step: 'Design Creation', duration: '1-2 weeks', description: 'Professional design creation and refinement' },
      { step: 'Final Delivery', duration: '2 days', description: 'Final files in all required formats and sizes' }
    ],
    features: [
      'Logo design & branding',
      'Marketing materials',
      'Social media graphics',
      'Print design',
      'Digital assets',
      'Brand guidelines',
      'Multiple file formats',
      'Unlimited revisions'
    ]
  },
  'video-production': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#videoHeroGrad)" />
        <rect x="160" y="120" width="480" height="160" fill="white" rx="16" />
        <polygon points="280,160 280,230 350,195" fill="#0D9488" />
        <rect x="400" y="160" width="160" height="12" fill="#84CC16" rx="6" />
        <rect x="400" y="190" width="120" height="12" fill="#84CC16" rx="6" />
        <rect x="400" y="220" width="140" height="12" fill="#84CC16" rx="6" />
        <circle cx="640" cy="80" r="24" fill="#EF4444" />
        <circle cx="640" cy="80" r="12" fill="white" />
        <rect x="120" y="320" width="80" height="40" fill="#0D9488" rx="8" />
        <rect x="220" y="320" width="80" height="40" fill="#84CC16" rx="8" />
        <rect x="320" y="320" width="80" height="40" fill="#0D9488" rx="8" />
        <rect x="420" y="320" width="80" height="40" fill="#84CC16" rx="8" />
        <rect x="520" y="320" width="80" height="40" fill="#0D9488" rx="8" />
        <rect x="620" y="320" width="80" height="40" fill="#84CC16" rx="8" />
        <defs>
          <linearGradient id="videoHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Engagement Rate', value: '1200% higher', icon: TrendingUp },
      { label: 'Conversion Rate', value: '80% increase', icon: Target },
      { label: 'Social Shares', value: '12x more', icon: Users },
      { label: 'ROI', value: '$5.2 per $1', icon: DollarSign }
    ],
    benefits: [
      {
        title: 'Massive Engagement Boost',
        description: 'Video content generates 1200% more engagement than text and images combined, capturing attention like no other medium.',
        impact: 'Increases engagement by 1200%',
        icon: TrendingUp
      },
      {
        title: 'Superior Conversion Power',
        description: 'Landing pages with video convert 80% better. Product videos increase purchase likelihood by 144%.',
        impact: 'Boosts conversions by 80%+',
        icon: Target
      },
      {
        title: 'Viral Social Media Reach',
        description: 'Video content is shared 1200% more than text and images, exponentially expanding your reach organically.',
        impact: 'Generates 12x more social shares',
        icon: Users
      },
      {
        title: 'Premium Pricing Justification',
        description: 'Professional video content allows you to charge premium prices and positions you as an industry leader.',
        impact: 'Enables 30-50% higher pricing',
        icon: DollarSign
      }
    ],
    process: [
      { step: 'Pre-Production Planning', duration: '1 week', description: 'Script writing, storyboarding, and production planning' },
      { step: 'Video Production', duration: '1-2 days', description: 'Professional filming with high-quality equipment' },
      { step: 'Post-Production Editing', duration: '1-2 weeks', description: 'Video editing, color correction, and sound design' },
      { step: 'Final Delivery', duration: '2 days', description: 'Multiple formats optimized for different platforms' }
    ],
    features: [
      'Professional videography',
      'Script writing',
      'Storyboarding',
      'Post-production editing',
      'Color correction',
      'Sound design',
      'Multiple format delivery',
      'Platform optimization'
    ]
  },
  'consulting': {
    heroImage: (
      <svg className="w-full h-64 object-cover rounded-lg" viewBox="0 0 800 400" fill="none">
        <rect width="800" height="400" fill="url(#consultHeroGrad)" />
        <circle cx="400" cy="200" r="120" fill="white" />
        <circle cx="400" cy="200" r="80" fill="#F3F4F6" />
        <path d="M320 200 Q400 120 480 200 Q400 280 320 200" fill="#0D9488" />
        <circle cx="400" cy="200" r="30" fill="#84CC16" />
        <rect x="240" y="60" width="120" height="40" fill="white" rx="20" />
        <rect x="440" y="60" width="120" height="40" fill="white" rx="20" />
        <rect x="240" y="300" width="120" height="40" fill="white" rx="20" />
        <rect x="440" y="300" width="120" height="40" fill="white" rx="20" />
        <path d="M300 100 L360 160" stroke="#84CC16" strokeWidth="6" />
        <path d="M500 100 L440 160" stroke="#84CC16" strokeWidth="6" />
        <path d="M300 300 L360 240" stroke="#84CC16" strokeWidth="6" />
        <path d="M500 300 L440 240" stroke="#84CC16" strokeWidth="6" />
        <circle cx="160" cy="200" r="16" fill="#84CC16" />
        <circle cx="640" cy="200" r="16" fill="#84CC16" />
        <path d="M176 200 L280 200" stroke="#84CC16" strokeWidth="4" />
        <path d="M520 200 L624 200" stroke="#84CC16" strokeWidth="4" />
        <defs>
          <linearGradient id="consultHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
      </svg>
    ),
    roiStats: [
      { label: 'Implementation Success', value: '95%', icon: CheckCircle },
      { label: 'Efficiency Gain', value: '40%', icon: TrendingUp },
      { label: 'Cost Reduction', value: '25%', icon: DollarSign },
      { label: 'Competitive Advantage', value: '2-3 years', icon: Target }
    ],
    benefits: [
      {
        title: 'Strategic Digital Roadmap',
        description: 'Get a clear, actionable plan for digital transformation that aligns with your business goals and maximizes ROI.',
        impact: 'Provides 3-5 year strategic advantage',
        icon: Target
      },
      {
        title: 'Avoid Costly Mistakes',
        description: 'Benefit from proven strategies and avoid the $900B annually lost to failed digital transformation projects.',
        impact: 'Prevents $100K+ in costly mistakes',
        icon: Shield
      },
      {
        title: 'Accelerated Implementation',
        description: 'Expert guidance reduces implementation time by 50% and increases success rate to 95% vs 30% industry average.',
        impact: 'Achieves results 2x faster',
        icon: Zap
      },
      {
        title: 'Competitive Market Position',
        description: 'Stay ahead of competitors with cutting-edge digital strategies that create lasting competitive advantages.',
        impact: 'Gains 2-3 year market advantage',
        icon: TrendingUp
      }
    ],
    process: [
      { step: 'Business Assessment', duration: '1 week', description: 'Comprehensive analysis of current systems and processes' },
      { step: 'Strategy Development', duration: '2 weeks', description: 'Custom digital transformation roadmap creation' },
      { step: 'Implementation Planning', duration: '1 week', description: 'Detailed project plans and resource allocation' },
      { step: 'Ongoing Support', duration: 'Ongoing', description: 'Continuous guidance and optimization support' }
    ],
    features: [
      'Digital maturity assessment',
      'Technology roadmap',
      'Process optimization',
      'Change management',
      'ROI projections',
      'Risk mitigation',
      'Team training',
      'Ongoing support'
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const service = SERVICES.find(s => s.id === serviceId);
  const enhancedData = ENHANCED_SERVICE_DATA[serviceId as keyof typeof ENHANCED_SERVICE_DATA];
  
  if (!service || !enhancedData) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-dark mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-light min-h-screen">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/services">
            <Button variant="ghost" className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-teal-primary text-white">
                {service.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-dark mb-6">
                {service.name}
              </h1>
              <p className="text-xl text-gray-medium mb-8">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div>
                  <span className="text-sm text-gray-medium">Our Price</span>
                  <p className="text-2xl font-bold text-teal-primary">${service.basePrice.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-medium">Typical Agency Cost</span>
                  <p className="text-2xl font-bold text-red-500 line-through">${service.agencyPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href={`/payment-options/${serviceId}`}>
                  <Button size="lg" className="btn-gradient-glow">
                    Get Started
                  </Button>
                </Link>
                <Link href={`/schedule-consultation?service=${serviceId}`}>
                  <Button variant="outline" size="lg" className="border-teal-primary text-teal-primary hover:bg-teal-50">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              {enhancedData.heroImage}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-dark mb-12">
            Proven Results & ROI
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enhancedData.roiStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-teal-primary" />
                  <div className="text-3xl font-bold text-gray-dark mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Benefits</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {enhancedData.benefits.map((benefit, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <benefit.icon className="h-8 w-8 text-teal-primary" />
                        <CardTitle>{benefit.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-medium mb-4">{benefit.description}</p>
                      <div className="bg-lime-50 p-4 rounded-lg border-l-4 border-lime-primary">
                        <p className="font-semibold text-lime-700">Impact: {benefit.impact}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="process" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Proven Process</CardTitle>
                  <CardDescription>
                    How we deliver results with our systematic approach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {enhancedData.process.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-teal-primary text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold text-gray-dark">{step.step}</h3>
                            <Badge variant="outline">{step.duration}</Badge>
                          </div>
                          <p className="text-gray-medium">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                  <CardDescription>
                    Comprehensive features designed for maximum impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {enhancedData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-lime-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Breakdown</CardTitle>
                    <CardDescription>
                      Transparent pricing with no hidden costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Our Price</span>
                      <span className="text-2xl font-bold text-teal-primary">${service.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Typical Agency</span>
                      <span className="text-2xl font-bold text-red-500 line-through">${service.agencyPrice.toLocaleString()}</span>
                    </div>
                    <div className="bg-lime-50 p-4 rounded-lg">
                      <p className="font-semibold text-lime-700">
                        You Save: {Math.round(((service.agencyPrice - service.basePrice) / service.agencyPrice) * 100)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ready to Get Started?</CardTitle>
                    <CardDescription>
                      Let's discuss your specific needs and create a custom proposal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="/quote">
                      <Button size="lg" className="w-full bg-lime-primary text-white hover:bg-green-500">
                        Get Custom Quote
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="w-full">
                      Schedule Free Consultation
                    </Button>
                    <p className="text-sm text-gray-medium text-center">
                      No commitment required • Free consultation • Fast response
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}