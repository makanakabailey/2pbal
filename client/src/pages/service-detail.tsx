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
                  <p className="text-2xl font-bold text-teal-primary">{service.price}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-medium">Typical Agency Cost</span>
                  <p className="text-2xl font-bold text-red-500 line-through">{service.agencyPrice}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-lime-primary text-white hover:bg-green-500">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Schedule Consultation
                </Button>
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
                      <span className="text-2xl font-bold text-teal-primary">{service.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Typical Agency</span>
                      <span className="text-2xl font-bold text-red-500 line-through">{service.agencyPrice}</span>
                    </div>
                    <div className="bg-lime-50 p-4 rounded-lg">
                      <p className="font-semibold text-lime-700">
                        You Save: {Math.round(((parseInt(service.agencyPrice.replace(/[^0-9]/g, '')) - 
                        parseInt(service.price.replace(/[^0-9]/g, ''))) / 
                        parseInt(service.agencyPrice.replace(/[^0-9]/g, ''))) * 100)}%
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