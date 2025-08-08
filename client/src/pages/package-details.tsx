import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Target, ArrowLeft, DollarSign, Clock, Shield, Calculator, Calendar } from 'lucide-react';
import { PACKAGES } from '@/lib/constants';

interface PackageDetailsProps {
  onOpenCalculator: () => void;
}

export default function PackageDetails({ onOpenCalculator }: PackageDetailsProps) {
  const [, params] = useRoute('/package/:id') || useRoute('/package-details/:id');
  const packageId = params?.id;
  const [showSavingsCalculator, setShowSavingsCalculator] = useState(false);
  const [startTime] = useState(Date.now());
  
  const packageData = PACKAGES.find(pkg => pkg.id === packageId);

  // Track package view
  useEffect(() => {
    if (!packageData) return;

    const trackView = async () => {
      try {
        await fetch('/api/packages/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            packageName: packageData.name,
            packageType: packageData.id,
            pageUrl: window.location.pathname,
            viewDuration: 0 // Initial view, duration will be updated on unmount
          })
        });
      } catch (error) {
        console.error('Failed to track package view:', error);
      }
    };

    trackView();

    // Track view duration when user leaves the page
    const handleBeforeUnload = async () => {
      const viewDuration = Math.floor((Date.now() - startTime) / 1000); // in seconds
      
      try {
        // Use sendBeacon for reliable tracking on page unload
        if (navigator.sendBeacon) {
          const data = JSON.stringify({
            packageName: packageData.name,
            packageType: packageData.id,
            pageUrl: window.location.pathname,
            viewDuration
          });
          navigator.sendBeacon('/api/packages/track-view', data);
        }
      } catch (error) {
        console.error('Failed to track view duration:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also track when component unmounts
      handleBeforeUnload();
    };
  }, [packageData, startTime]);
  
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
            subtitle: "Your Complete Digital Launch System",
            description: "Everything you need to establish professional credibility online – delivered by one trusted team instead of hunting for 4+ different specialists.",
            icon: Target,
            audience: "Startups, solopreneurs, local businesses"
          },
          whyPackage: {
            title: "Why This Package Beats Hiring Individual Specialists",
            benefits: [
              {
                advantage: "One Trusted Partner vs. 4+ Different Specialists",
                details: "No more vetting web designers, brand specialists, social media managers, and content creators separately. We handle everything with seamless coordination.",
                cost: "Save 40+ hours of research and interviews"
              },
              {
                advantage: "Integrated Strategy vs. Disconnected Services",
                details: "Your website, branding, and social media work together cohesively instead of pulling in different directions from separate freelancers.",
                cost: "Avoid $2k+ in rework when services don't align"
              },
              {
                advantage: "Proven System vs. Trial and Error",
                details: "Our battle-tested process delivers consistent results instead of gambling on individual contractors' varying quality levels.",
                cost: "Skip 3-6 months of testing different providers"
              },
              {
                advantage: "All-Inclusive Price vs. Hidden Costs",
                details: "Individual specialists typically cost: Web design ($2,500), Branding ($2,000), Social setup ($1,500), Content creation ($2,000) = $8,000+ total",
                cost: "Save $2,500+ vs. hiring separately"
              }
            ]
          },
          painPoints: [
            {
              problem: "My business looks unprofessional online",
              solution: "Cohesive brand identity + professional website design",
              impact: "74% of users judge credibility by design - instant trust boost"
            },
            {
              problem: "I'm invisible to potential customers",
              solution: "Strategic social presence + SEO-optimized content",
              impact: "81% of consumers research businesses online first"
            },
            {
              problem: "DIY attempts waste time and money",
              solution: "Professional execution with proven templates",
              impact: "Avoid $3k+ in redesign costs within 12 months"
            },
            {
              problem: "Can't afford to hire multiple specialists",
              solution: "All services bundled at 31% savings",
              impact: "Get professional results at startup-friendly price"
            }
          ],
          outcomes: [
            "Launch with instant professional credibility",
            "Stop losing customers to poor first impressions", 
            "Build scalable foundation for future growth",
            "Establish trusted brand presence across all platforms"
          ],
          roi: {
            title: "Return on Investment",
            metrics: [
              "Break even with just 3-5 new customers",
              "Typical clients see 25-40% increase in inquiry quality",
              "Professional presence commands 15-30% higher prices",
              "Foundation supports 2-3 years of growth without rebuilding"
            ]
          }
        };
      
      case 'market-accelerator':
        return {
          hero: {
            title: "Market Accelerator", 
            subtitle: "Your Complete Revenue Growth System",
            description: "Transform your business into a lead-generating, sale-closing machine with integrated systems that work 24/7 – no need to hire separate marketing and sales specialists.",
            icon: TrendingUp,
            audience: "Growing businesses, post-revenue startups, scaling service companies"
          },
          whyPackage: {
            title: "Why This Beats Hiring Marketing & Sales Specialists Separately",
            benefits: [
              {
                advantage: "Unified Revenue System vs. Fragmented Efforts", 
                details: "Instead of hiring separate web developers, email marketers, social media managers, CRM specialists, and funnel experts, get one integrated system.",
                cost: "Avoid coordination chaos between 5+ different contractors"
              },
              {
                advantage: "Proven Conversion Architecture vs. Experimental Tactics",
                details: "Our tested funnel system converts at 3-5x higher rates than typical 'build-as-you-go' approaches from individual freelancers.",
                cost: "Skip 6-12 months of A/B testing with different specialists"
              },
              {
                advantage: "All-Inclusive Growth Engine vs. Piecemeal Services", 
                details: "Individual costs: Web dev ($3k), Email marketing ($2k), Social management ($3k), CRM setup ($2k), Funnel design ($5k) = $15k+",
                cost: "Save $5,500+ vs. hiring specialists separately"
              },
              {
                advantage: "Strategic Oversight vs. Tactical Execution",
                details: "Most contractors focus on their narrow specialty. We orchestrate all elements to maximize your revenue growth as a system.",
                cost: "Ensure 25-40% better results through strategic coordination"
              }
            ]
          },
          painPoints: [
            {
              problem: "Website traffic doesn't convert to sales",
              solution: "Conversion-optimized funnel + lead magnets + automated follow-up",
              impact: "Recover 68% of visitors who would otherwise disappear forever"
            },
            {
              problem: "Marketing efforts feel disconnected and wasteful",
              solution: "Integrated campaign system across all channels with unified tracking",
              impact: "Cut marketing waste by 40% through better attribution"
            },
            {
              problem: "Leads go cold before sales team can follow up",
              solution: "Automated nurture sequences + intelligent lead scoring",
              impact: "Convert 3-5x more leads with systematic follow-up"
            },
            {
              problem: "Can't scale without hiring expensive sales/marketing staff",
              solution: "Automated systems handle qualification and nurturing",
              impact: "Scale to $500k+ revenue with existing team size"
            }
          ],
          outcomes: [
            "Transform website into 24/7 lead generation machine",
            "Systematically nurture and convert prospects automatically", 
            "Scale revenue 2-3x without expanding team",
            "Build predictable, measurable growth engine"
          ],
          roi: {
            title: "Revenue Impact",
            metrics: [
              "Typical ROI: 300-500% within 6 months",
              "Average client sees 40-60% increase in qualified leads",
              "Conversion rate improvements of 25-45%",
              "System pays for itself with 15-20 additional customers"
            ]
          }
        };
      
      case 'ai-powered-efficiency':
        return {
          hero: {
            title: "AI-Powered Efficiency",
            subtitle: "Your Complete Automation & Optimization System", 
            description: "Embed cutting-edge AI and automation into every aspect of your business – delivering enterprise-level efficiency without enterprise complexity or cost.",
            icon: Zap,
            audience: "Scaling companies, service businesses, teams drowning in manual work"
          },
          whyPackage: {
            title: "Why This Beats Hiring AI/Automation Specialists Separately",
            benefits: [
              {
                advantage: "Complete AI Integration vs. Scattered Tools",
                details: "Instead of hiring AI consultants, chatbot developers, automation experts, and content specialists separately, get one unified intelligence system.",
                cost: "Avoid $50k+ in consultant fees and integration headaches"
              },
              {
                advantage: "Pre-Built Enterprise Solutions vs. Custom Development",
                details: "Our battle-tested AI systems work immediately instead of 6-12 month custom development cycles that often fail.",
                cost: "Skip $25k-50k in custom AI development costs"
              },
              {
                advantage: "Coordinated Automation vs. Tool Chaos", 
                details: "Individual specialists create isolated solutions. We build interconnected systems that compound efficiency gains.",
                cost: "Get 3-5x better results through systematic integration"
              },
              {
                advantage: "Proven ROI vs. Experimental Technology",
                details: "Individual costs: AI consultant ($15k), Chatbot dev ($8k), Automation expert ($12k), Content AI ($10k) = $45k+ for uncertain results",
                cost: "Save $29,500+ while guaranteeing measurable efficiency gains"
              }
            ]
          },
          painPoints: [
            {
              problem: "Team spends hours on repetitive tasks daily",
              solution: "AI workflow automation + intelligent task routing",
              impact: "Free up 15-25 hours per week for revenue-generating activities"
            },
            {
              problem: "Customer support overwhelms your team",
              solution: "AI chatbot handling 80% of inquiries + smart escalation",
              impact: "Cut support time by 60% while improving response speed"
            },
            {
              problem: "Content creation bottlenecks growth",
              solution: "AI content engine + automated publishing workflows",  
              impact: "Produce 5x more content with same team effort"
            },
            {
              problem: "Manual processes limit scalability",
              solution: "End-to-end automation connecting all business systems",
              impact: "Scale operations 3-5x without proportional staff increases"
            }
          ],
          outcomes: [
            "Eliminate 60-80% of manual, repetitive work",
            "Scale operations without expanding headcount",
            "Deliver faster, more consistent customer experiences", 
            "Free up team for strategic, high-value activities"
          ],
          roi: {
            title: "Efficiency Gains",
            metrics: [
              "Typical time savings: 20-30 hours per week per team",
              "Cost reduction: $50k-150k annually in operational efficiency",
              "Productivity increase: 200-400% in automated processes", 
              "Payback period: 3-6 months for most implementations"
            ]
          }
        };

      case 'full-suite-advantage':
        return {
          hero: {
            title: "Full Suite Advantage",
            subtitle: "Your Complete Digital Transformation System",
            description: "Everything you need to dominate your market digitally – delivered as one unified solution instead of managing 10+ different specialists and agencies.",
            icon: Users,
            audience: "Established companies, enterprises, ambitious growth-stage businesses"
          },
          whyPackage: {
            title: "Why This Beats Building an Enterprise Team Separately",
            benefits: [
              {
                advantage: "Complete Digital Ecosystem vs. Fragmented Solutions",
                details: "Instead of hiring web developers, AI specialists, marketing teams, automation experts, designers, and strategists separately, get one integrated digital powerhouse.",
                cost: "Avoid 12+ months of hiring and $200k+ in salary costs"
              },
              {
                advantage: "Enterprise-Grade Systems vs. Small Business Tools",
                details: "Get sophisticated omnichannel marketing, enterprise applications, and strategic oversight typically reserved for Fortune 500 companies.",
                cost: "Access $500k+ worth of enterprise capabilities"
              },
              {
                advantage: "Dedicated Strategic Unit vs. Vendor Management",
                details: "Your dedicated team acts as your digital transformation department, not external contractors requiring constant oversight and coordination.",
                cost: "Eliminate 20+ hours weekly of vendor management"
              },
              {
                advantage: "All-Inclusive Transformation vs. Piecemeal Upgrades",
                details: "Individual enterprise costs: Development team ($180k), Marketing agency ($120k), AI consultants ($100k), Automation specialists ($80k) = $480k+ annually",
                cost: "Save $451,500+ vs. building enterprise capabilities separately"
              }
            ]
          },
          painPoints: [
            {
              problem: "Competitors are outpacing us digitally",
              solution: "Complete digital ecosystem with omnichannel presence + advanced analytics",
              impact: "Regain market leadership with enterprise-level digital capabilities"
            },
            {
              problem: "Our systems don't talk to each other",
              solution: "Unified platform connecting all business functions and data",
              impact: "Eliminate data silos and unlock operational intelligence"
            },
            {
              problem: "We need enterprise features but can't afford enterprise costs",
              solution: "Fractional access to enterprise-grade team and technology",
              impact: "Get Fortune 500 capabilities at SMB investment levels"
            },
            {
              problem: "Digital transformation projects keep failing",
              solution: "Proven framework with dedicated strategic oversight",
              impact: "Guarantee successful transformation with systematic approach"
            }
          ],
          outcomes: [
            "Establish digital dominance in your market",
            "Unify all business operations on intelligent platforms",
            "Scale to enterprise levels without enterprise overhead",
            "Future-proof your business with cutting-edge capabilities"
          ],
          roi: {
            title: "Strategic Impact",
            metrics: [
              "Market position: Leap 2-3 years ahead of competitors",
              "Operational efficiency: 300-500% improvement in key processes",
              "Revenue impact: Support 5-10x revenue growth without proportional cost increases",
              "Strategic value: Build sellable, scalable enterprise asset"
            ]
          }
        };

      default:
        return null;
    }
  };

  const details = getPackageDetails(packageId || '');
  if (!details) {
    return (
      <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-dark">Package Details Not Available</h1>
            <p className="text-gray-medium mb-6">Details for this package are currently being updated.</p>
            <Button onClick={() => window.location.href = '/packages'}>
              View All Packages
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = details.hero.icon;

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-light via-white to-blue-50">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-primary/10 rounded-full">
              <IconComponent className="w-12 h-12 text-blue-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-dark mb-4">
            {details.hero.title}
          </h1>
          
          <h2 className="text-xl md:text-2xl text-blue-primary font-medium mb-6">
            {details.hero.subtitle}
          </h2>
          
          <p className="text-lg text-gray-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            {details.hero.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Target className="w-4 h-4 mr-2" />
              {details.hero.audience}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-green-600 text-green-700">
              <DollarSign className="w-4 h-4 mr-2" />
              Save ${packageData.savings.toLocaleString()}+
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-orange-600 text-orange-700">
              <Clock className="w-4 h-4 mr-2" />
              4-6 week delivery
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4" onClick={() => window.location.href = `/payment?package=${packageId}`}>
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Dialog open={showSavingsCalculator} onOpenChange={setShowSavingsCalculator}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    setShowSavingsCalculator(false);
                    window.location.href = '/schedule-consultation';
                  }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-blue-primary">
                    Your Savings Report - {packageData.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Money Savings */}
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <DollarSign className="w-6 h-6" />
                        Money Savings Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                          <div className="text-2xl font-bold text-red-600 line-through">
                            ${packageData.originalPrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">If hired separately</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                          <div className="text-2xl font-bold text-green-600">
                            ${packageData.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">2Pbal package price</div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-300">
                        <div className="text-3xl font-bold text-green-800">
                          ${packageData.savings.toLocaleString()} SAVED
                        </div>
                        <div className="text-lg text-green-700">
                          That's {packageData.savingsPercent}% off the market rate!
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Time Savings */}
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Clock className="w-6 h-6" />
                        Time Savings Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                          <div className="text-2xl font-bold text-red-600">
                            12-16 weeks
                          </div>
                          <div className="text-sm text-gray-600">Finding & coordinating specialists</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">
                            4-6 weeks
                          </div>
                          <div className="text-sm text-gray-600">2Pbal delivery timeline</div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-100 rounded-lg border-2 border-blue-300">
                        <div className="text-3xl font-bold text-blue-800">
                          6-10 weeks faster
                        </div>
                        <div className="text-lg text-blue-700">
                          Get to market 2-3 months earlier!
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Benefits */}
                  <Card className="border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        <Shield className="w-6 h-6" />
                        Risk Reduction & Quality Assurance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>No coordination headaches between multiple contractors</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Guaranteed project completion (no abandoned projects)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Consistent quality across all deliverables</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Single point of contact and accountability</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center pt-4">
                    <Button 
                      size="lg" 
                      onClick={() => {
                        setShowSavingsCalculator(false);
                        window.location.href = `/payment?package=${packageId}`;
                      }}
                      className="px-8 py-4"
                    >
                      Lock In These Savings Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Package Value Proposition */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-dark mb-4">
              {details.whyPackage.title}
            </h2>
            <p className="text-lg text-gray-medium text-center mb-12 max-w-3xl mx-auto">
              Stop the endless hunt for reliable specialists. Get everything coordinated by one trusted team.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {details.whyPackage.benefits.map((benefit, index) => (
                <Card key={index} className="border-2 hover:border-blue-primary/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-primary">
                      {benefit.advantage}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-medium mb-4">
                      {benefit.details}
                    </p>
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <p className="font-medium text-green-800">
                        💡 {benefit.cost}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-dark mb-12">
              Problems We Solve
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {details.painPoints.map((point, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-dark mb-2">
                          "{point.problem}"
                        </h3>
                        <p className="text-blue-primary font-medium mb-2">
                          ✓ {point.solution}
                        </p>
                        <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                          {point.impact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes & ROI */}
      <section className="py-16 bg-blue-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 glow-heading typing-text">
                  What You'll Achieve
                </h2>
                <div className="space-y-4">
                  {details.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3" style={{
                      animation: `typing 2s steps(30, end) ${1.5 + (index * 0.3)}s both`
                    }}>
                      <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-lg glow-text leading-relaxed typing-text">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="bg-white text-gray-dark">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-blue-primary">
                    {details.roi.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {details.roi.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-primary flex-shrink-0" />
                        <p className="font-medium">{metric}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-dark mb-8">
              Ready to Transform Your Business?
            </h2>
            
            <Card className="max-w-md mx-auto mb-8 border-2 border-blue-primary">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-2xl text-gray-medium line-through">
                      ${packageData.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-4xl font-bold text-blue-primary ml-4">
                      ${packageData.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-green-700 font-semibold mb-4">
                    Save ${packageData.savings.toLocaleString()} ({packageData.savingsPercent}% off)
                  </p>
                  <div className="space-y-2 text-sm text-gray-medium">
                    <p>✓ All services included</p>
                    <p>✓ No hidden costs</p>
                    <p>✓ 4-6 week delivery</p>
                    <p>✓ Dedicated project manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4" onClick={() => window.location.href = `/payment?package=${packageId}`}>
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/schedule-consultation'}>
                Book Free Consultation
              </Button>
            </div>
            
            <p className="text-sm text-gray-medium mt-6">
              Questions? <Link href="/schedule-consultation" className="text-blue-primary hover:underline">Schedule a free consultation</Link> to discuss your specific needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}