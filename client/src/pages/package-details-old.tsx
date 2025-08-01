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