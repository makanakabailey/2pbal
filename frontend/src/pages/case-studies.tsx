import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, DollarSign, Clock, Users, BarChart3, 
  ArrowRight, Target, Zap, Award, CheckCircle 
} from 'lucide-react';
import { useEffect } from 'react';

export default function CaseStudies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const caseStudies = [
    {
      company: "ASUS Singapore",
      industry: "Electronics Retail",
      challenge: "Disconnected B2B/B2C systems creating fragmented customer experience",
      solution: "Omnichannel integration with AI personalization and unified platform",
      results: [
        { metric: "Web Sessions Increase", value: "43%", icon: TrendingUp },
        { metric: "Delivery Time Reduction", value: "Under 3 days", icon: Clock },
        { metric: "Platform Unification", value: "Single B2B/B2C System", icon: Target }
      ],
      roi: "250%",
      timeframe: "6 months",
      category: "Digital Transformation"
    },
    {
      company: "Queensland Parliamentary Service",
      industry: "Government",
      challenge: "Outdated back-office system with scaling issues and operational inefficiencies",
      solution: "SaaS-based platform replacement with cloud infrastructure",
      results: [
        { metric: "Cost Overrun Reduction", value: "75%", icon: DollarSign },
        { metric: "System Stability", value: "99.9% Uptime", icon: CheckCircle },
        { metric: "Staff Efficiency", value: "60% Improvement", icon: Users }
      ],
      roi: "320%",
      timeframe: "4 months",
      category: "System Modernization"
    },
    {
      company: "Sentry (Small Business)",
      industry: "Technology Services",
      challenge: "High support ticket volume and low employee productivity",
      solution: "Digital adoption platform with automated training and support",
      results: [
        { metric: "ROI Achievement", value: "$950,000", icon: DollarSign },
        { metric: "Support Ticket Reduction", value: "15% (12,000 tickets)", icon: BarChart3 },
        { metric: "Implementation Time", value: "12 months", icon: Clock }
      ],
      roi: "342%",
      timeframe: "12 months",
      category: "Process Automation"
    },
    {
      company: "Thomas Pink Retail",
      industry: "Fashion Retail",
      challenge: "Limited visibility into online customer preferences and high return rates",
      solution: "Virtual fitting room technology with AI-powered recommendations",
      results: [
        { metric: "Conversion Rate Increase", value: "35%", icon: TrendingUp },
        { metric: "Return Rate Reduction", value: "28%", icon: Target },
        { metric: "Customer Satisfaction", value: "89% Positive", icon: Award }
      ],
      roi: "185%",
      timeframe: "3 months",
      category: "Customer Experience"
    },
    {
      company: "US Bank Digital Transformation",
      industry: "Financial Services",
      challenge: "Fragmented customer experience across multiple channels",
      solution: "Omnichannel customer experience platform with unified data",
      results: [
        { metric: "Employee Productivity", value: "300% Increase", icon: Users },
        { metric: "Customer Satisfaction", value: "45% Improvement", icon: Award },
        { metric: "Processing Speed", value: "70% Faster", icon: Zap }
      ],
      roi: "425%",
      timeframe: "8 months",
      category: "Digital Banking"
    },
    {
      company: "Small Manufacturing Firm",
      industry: "Manufacturing",
      challenge: "Manual processes causing delays and quality control issues",
      solution: "IoT sensors with predictive maintenance and automated quality control",
      results: [
        { metric: "Downtime Reduction", value: "60%", icon: Clock },
        { metric: "Quality Improvement", value: "40%", icon: CheckCircle },
        { metric: "Cost Savings", value: "$2.3M Annually", icon: DollarSign }
      ],
      roi: "280%",
      timeframe: "10 months",
      category: "Smart Manufacturing"
    }
  ];

  const industryStats = [
    {
      title: "Average ROI",
      value: "20-30%",
      description: "Increase in customer satisfaction from digital transformation",
      icon: TrendingUp,
      color: "bg-green-600"
    },
    {
      title: "Cost Reduction",
      value: "50%",
      description: "Reduction in operational costs through automation",
      icon: DollarSign,
      color: "bg-teal-600"
    },
    {
      title: "Implementation Time",
      value: "3-8 months",
      description: "Average time to see significant results",
      icon: Clock,
      color: "bg-blue-600"
    },
    {
      title: "Success Rate",
      value: "85%",
      description: "Of businesses see measurable improvements",
      icon: Award,
      color: "bg-purple-600"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Digital Transformation": "bg-teal-100 text-teal-800",
      "System Modernization": "bg-blue-100 text-blue-800",
      "Process Automation": "bg-purple-100 text-purple-800",
      "Customer Experience": "bg-green-100 text-green-800",
      "Digital Banking": "bg-orange-100 text-orange-800",
      "Smart Manufacturing": "bg-red-100 text-red-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-light">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-teal-primary to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-sky-300">
            Proven Success Stories
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-sky-300">
            Real case studies demonstrating how our services deliver measurable ROI and competitive advantages
          </p>
          <Badge variant="secondary" className="text-lg px-6 py-2">
            Average ROI: 280% across all implementations
          </Badge>
        </div>
      </section>

      {/* Industry Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Industry Benchmarks</h2>
            <p className="text-xl text-gray-medium max-w-2xl mx-auto">
              Our proven methodology consistently outperforms industry standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className={`mx-auto w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-primary">{stat.value}</CardTitle>
                    <CardDescription className="font-semibold">{stat.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-medium">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Success Stories</h2>
            <p className="text-xl text-gray-medium">
              Detailed case studies showing real implementations and their outcomes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{study.company}</CardTitle>
                      <CardDescription className="text-gray-600">{study.industry}</CardDescription>
                    </div>
                    <Badge className={getCategoryColor(study.category)}>
                      {study.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Challenge:</h4>
                      <p className="text-sm text-gray-600">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Solution:</h4>
                      <p className="text-sm text-gray-600">{study.solution}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3">Results:</h4>
                      <div className="space-y-3">
                        {study.results.map((result, resultIndex) => {
                          const IconComponent = result.icon;
                          return (
                            <div key={resultIndex} className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-4 w-4 text-teal-600" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-teal-600">{result.value}</div>
                                <div className="text-sm text-gray-600">{result.metric}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{study.roi}</div>
                        <div className="text-sm text-gray-500">ROI</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{study.timeframe}</div>
                        <div className="text-sm text-gray-500">Implementation</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Our Proven Methodology</h2>
            <p className="text-xl text-gray-medium max-w-2xl mx-auto">
              The systematic approach that delivers consistent results across all industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-teal-primary rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Assessment</h3>
              <p className="text-sm text-gray-medium">
                Comprehensive analysis of current systems and identification of optimization opportunities
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Strategy</h3>
              <p className="text-sm text-gray-medium">
                Custom roadmap development with clear ROI targets and implementation milestones
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Implementation</h3>
              <p className="text-sm text-gray-medium">
                Phased deployment with continuous monitoring and optimization throughout the process
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Results</h3>
              <p className="text-sm text-gray-medium">
                Measurable outcomes with ongoing support and continuous improvement recommendations
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Success Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the ranks of businesses that have transformed their operations and achieved exceptional ROI with our proven methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="min-w-48">
              Get Your Free Assessment
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="min-w-48 border-white text-white hover:bg-white hover:text-teal-primary">
              Download Case Study Report
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}