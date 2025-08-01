import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Target, ArrowLeft } from 'lucide-react';
import { PACKAGES } from '@/lib/constants';

interface PackageDetailsProps {
  onOpenCalculator: () => void;
}

export default function PackageDetails({ onOpenCalculator }: PackageDetailsProps) {
  const [, params] = useRoute('/package/:id') || useRoute('/package-details/:id');
  const packageId = params?.id;
  
  const packageData = PACKAGES.find(pkg => pkg.id === packageId);
  
  if (!packageData) {
    return (
      <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-dark">Package Not Found</h1>
            <p className="text-gray-medium mb-6">The package you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = '/packages'}>
              View All Packages
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getPackageDetails = (id: string) => {
    switch (id) {
      case 'digital-foundation':
        return {
          hero: {
            title: "Digital Foundation",
            subtitle: "Your Launchpad to Credibility",
            description: "Transform from invisible hobbyist to credible player in 30 days – attracting higher-value clients who pay premiums.",
            icon: Target,
            audience: "Startups, solopreneurs, local businesses"
          },
          painPoints: [
            {
              problem: "My business looks amateurish online",
              solution: "Professionally designed website + brand strategy",
              impact: "Win trust instantly: 74% of users judge credibility based on web design (Stanford)"
            },
            {
              problem: "I'm invisible on social media",
              solution: "Optimized social profiles on 3 key platforms",
              impact: "Capture local/mobile traffic: 81% of consumers research on social first"
            },
            {
              problem: "My competitors outshine me",
              solution: "Portfolio curation + strategic content",
              impact: "Differentiate your brand: Showcase unique value visually"
            },
            {
              problem: "DIY sites hurt my reputation",
              solution: "Scalable tech stack + mobile optimization",
              impact: "Avoid $3k+ in redesign costs next year"
            }
          ],
          outcomes: [
            "Establish instant authority and credibility",
            "Stop losing opportunities to poor first impressions",
            "Build foundation for scalable growth",
            "Professional brand presence across platforms"
          ]
        };
      
      case 'market-accelerator':
        return {
          hero: {
            title: "Market Accelerator",
            subtitle: "Your Sales Growth Engine",
            description: "Turn your website into a 24/7 sales machine – scaling revenue without hiring new staff.",
            icon: TrendingUp,
            audience: "Scaling businesses, post-funding startups, revenue-focused teams"
          },
          painPoints: [
            {
              problem: "Leads vanish without follow-up",
              solution: "Automated email sequences + CRM integration",
              impact: "Recover 68% of abandoned leads (Invesp)"
            },
            {
              problem: "Social media doesn't drive sales",
              solution: "Proactive engagement + conversion content",
              impact: "3-5x higher engagement-to-sale rate"
            },
            {
              problem: "I can't track what's working",
              solution: "Funnel analytics + lead scoring",
              impact: "Identify highest-ROI channels (save 20-50% on ad waste)"
            },
            {
              problem: "Sales team drowns in admin",
              solution: "CRM automation + workflow design",
              impact: "Free up 11 hrs/week for closing deals"
            }
          ],
          outcomes: [
            "Systematically convert visitors into paying customers",
            "Reclaim wasted ad spend through better tracking",
            "Automate lead nurturing and follow-up",
            "Scale revenue without expanding sales team"
          ]
        };
      
      case 'ai-powered-efficiency':
        return {
          hero: {
            title: "AI-Powered Efficiency",
            subtitle: "Your Profitability Upgrade",
            description: "Embed enterprise-grade efficiency into your operations – turning overhead costs into profit margins.",
            icon: Zap,
            audience: "Growth-stage companies, ops-heavy businesses, service firms"
          },
          painPoints: [
            {
              problem: "Customer inquiries overwhelm us",
              solution: "AI chatbot + automated scheduling",
              impact: "Handle 80% of support without human labor (Gartner)"
            },
            {
              problem: "Content creation bottlenecks growth",
              solution: "AI content engine + human oversight",
              impact: "10x content output at 30% lower cost"
            },
            {
              problem: "Manual processes kill productivity",
              solution: "Workflow automation + system integrations",
              impact: "Save 23 workdays/year per employee (Asana)"
            },
            {
              problem: "We miss upsell opportunities",
              solution: "CRM predictive scoring + triggers",
              impact: "Identify 35% more expansion revenue"
            }
          ],
          outcomes: [
            "Automate $18k/year in hidden operational costs",
            "Outpace competitors through AI optimization",
            "Free up team time for strategic work",
            "Turn manual overhead into automated profit"
          ]
        };
      
      case 'full-suite-advantage':
        return {
          hero: {
            title: "Full Suite Advantage",
            subtitle: "Your Market Dominance Platform",
            description: "Operate with startup agility at enterprise scale – outpacing competitors through integrated execution.",
            icon: Users,
            audience: "Enterprises, category leaders, private equity portfolios"
          },
          painPoints: [
            {
              problem: "Digital vendors can't align with strategy",
              solution: "Dedicated unit + executive oversight",
              impact: "Eliminate 70% of vendor management headaches"
            },
            {
              problem: "Tech debt slows innovation",
              solution: "Enterprise architecture + proactive maintenance",
              impact: "Prevent $50k+/year in emergency fixes"
            },
            {
              problem: "We lack unified customer insights",
              solution: "Cross-channel analytics + predictive modeling",
              impact: "Identify 28% more revenue opportunities (McKinsey)"
            },
            {
              problem: "Campaigns operate in silos",
              solution: "Omnichannel marketing orchestration",
              impact: "27% higher customer lifetime value (Adobe)"
            }
          ],
          outcomes: [
            "Deploy Fortune 500 capabilities without corporate bloat",
            "Achieve unified execution across all channels",
            "Prevent costly technical and strategic missteps",
            "Maintain competitive advantage through integrated systems"
          ]
        };
      
      default:
        return null;
    }
  };

  const details = packageId ? getPackageDetails(packageId) : null;
  if (!details) return null;

  const IconComponent = details.hero.icon;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-teal-primary to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-lime-primary hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="bg-lime-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconComponent className="text-white h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              {details.hero.title}
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-lime-primary">
              {details.hero.subtitle}
            </h2>
            <p className="text-xl text-gradient-glow mb-8 max-w-3xl mx-auto">
              {details.hero.description}
            </p>
            <Badge variant="secondary" className="bg-white text-teal-primary text-lg px-6 py-2">
              Ideal for: {details.hero.audience}
            </Badge>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              From Pain Points to Profit
            </h2>
            <p className="text-xl text-gray-medium">
              See how we transform your biggest challenges into competitive advantages
            </p>
          </div>
          
          <div className="space-y-8">
            {details.painPoints.map((point, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-6 items-center">
                    <div className="text-center lg:text-left">
                      <h3 className="text-lg font-bold text-red-600 mb-2">The Problem:</h3>
                      <p className="text-gray-dark">"{point.problem}"</p>
                    </div>
                    <div className="text-center">
                      <ArrowRight className="h-8 w-8 text-lime-primary mx-auto mb-2" />
                      <h3 className="text-lg font-bold text-teal-primary mb-2">Our Solution:</h3>
                      <p className="text-gray-dark">{point.solution}</p>
                    </div>
                    <div className="text-center lg:text-right">
                      <h3 className="text-lg font-bold text-lime-primary mb-2">Business Impact:</h3>
                      <p className="text-gray-dark font-semibold">{point.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Outcomes */}
      <section className="py-16 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              What You'll Achieve
            </h2>
            <p className="text-xl text-gray-medium">
              Measurable outcomes that transform your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {details.outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-lime-primary mr-4 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-dark font-medium">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment & Value */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-2 border-lime-primary">
            <CardHeader className="text-center bg-lime-primary text-white">
              <CardTitle className="text-2xl">Your Strategic Investment</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-gray-medium line-through text-xl mb-2">
                  Typical Agency Cost: ${packageData.originalPrice.toLocaleString()}
                </div>
                <div className="text-4xl font-bold text-teal-primary mb-2">
                  Your Investment: ${packageData.price.toLocaleString()}
                </div>
                <div className="text-2xl font-semibold text-lime-primary">
                  You Save: ${packageData.savings.toLocaleString()} ({packageData.savingsPercent}%)
                </div>
              </div>
              
              <div className="bg-gray-light p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-gray-dark mb-4 text-center">
                  Value Recovery Timeline
                </h3>
                <p className="text-gray-medium text-center">
                  Most clients recover their investment within 90 days through increased efficiency, 
                  reduced operational costs, and improved conversion rates.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onOpenCalculator}
                  size="lg"
                  className="bg-lime-primary text-white hover:bg-green-500 text-lg px-8 py-4"
                >
                  Calculate Your Savings
                </Button>
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-white text-lg px-8 py-4"
                >
                  Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Package Progression */}
      <section className="py-16 bg-teal-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Strategic Value Continuum
          </h2>
          <p className="text-xl text-gradient-glow mb-12">
            See how our packages build upon each other for maximum impact
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, index) => (
              <div key={pkg.id} className="relative">
                <Card className={`transition-all ${pkg.id === packageId ? 'ring-4 ring-lime-primary scale-105' : 'hover:scale-102'}`}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-gray-dark mb-2">{pkg.name}</h3>
                    <div className="text-sm text-gray-medium">
                      {pkg.id === 'digital-foundation' && 'CREDIBILITY'}
                      {pkg.id === 'market-accelerator' && 'REVENUE'}
                      {pkg.id === 'ai-powered-efficiency' && 'PROFITABILITY'}
                      {pkg.id === 'full-suite-advantage' && 'DOMINANCE'}
                    </div>
                  </CardContent>
                </Card>
                {index < PACKAGES.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 h-6 w-6 text-lime-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}