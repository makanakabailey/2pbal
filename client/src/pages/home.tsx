import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PackageCard from '@/components/ui/package-card';
import { Check, X, MessageCircle, ClipboardList, Rocket, TrendingUp } from 'lucide-react';
import { PACKAGES, CASE_STUDIES } from '@/lib/constants';

interface HomeProps {
  onOpenCalculator: () => void;
}

export default function Home({ onOpenCalculator }: HomeProps) {
  const handlePackageSelect = (packageId: string) => {
    window.location.href = `/package/${packageId}`;
  };

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-gray-900 order-2 lg:order-1 lg:pr-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Stop Overpaying for Digital Solutions. <span className="text-lime-primary">Start Scaling.</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-600">
                Get a dedicated team of experts for less than the cost of one in-house hire. Save up to 70% vs. traditional agencies.
              </p>
              <div className="flex flex-col gap-3 max-w-xs sm:max-w-sm">
                <Button 
                  onClick={onOpenCalculator}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-4 sm:px-6 py-3 w-full"
                >
                  <span className="hidden sm:inline">See How Much You Can Save</span>
                  <span className="sm:hidden">Calculate Savings</span>
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => window.location.href = '/dashboard'}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm px-3 py-2 flex-1"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={scrollToPackages}
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm px-3 py-2 flex-1"
                  >
                    <span className="hidden sm:inline">Explore Packages</span>
                    <span className="sm:hidden">Packages</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 lg:pl-8">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern collaborative workspace with diverse team" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 bg-white p-3 sm:p-6 rounded-lg shadow-lg">
                <div className="text-teal-primary font-bold text-xl sm:text-2xl">70%</div>
                <div className="text-gray-medium text-xs sm:text-sm">Average Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-medium mb-6">Trusted by innovative companies to deliver ROI-driven results:</p>
            <div className="flex justify-center items-center">
              <span className="bg-lime-primary text-white px-4 py-2 rounded-full font-semibold">
                Avg. 3.5x ROI in first year
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-dark">
            The Hidden Costs of Getting Digital Wrong
          </h2>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-red-600">Costs of Alternatives</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <X className="text-red-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-dark">Agencies</h4>
                      <p className="text-gray-medium">Paying premium prices for junior talent?</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <X className="text-red-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-dark">Freelancers</h4>
                      <p className="text-gray-medium">Wasting hours managing 10+ specialists?</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <X className="text-red-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-dark">In-House</h4>
                      <p className="text-gray-medium">Spending $120k+/year per developer + benefits?</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-lime-primary">2Pbal Savings</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Check className="text-lime-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-dark">Fixed Monthly Cost</h4>
                      <p className="text-gray-medium">No surprises, no overhead</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-lime-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-dark">One Dedicated Team Lead</h4>
                      <p className="text-gray-medium">Save 15+ hours/week</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-lime-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-dark">Pay Only for What You Need</h4>
                      <p className="text-gray-medium">Scale up or down</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Packages Overview */}
      <section id="packages" className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              All-Inclusive Packages, Not All-Inclusive Prices
            </h2>
            <p className="text-xl text-gray-medium">Choose your growth stage and see immediate savings</p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onSelect={handlePackageSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              Transparent Process, Predictable Savings
            </h2>
            <p className="text-xl text-gray-medium">Four simple steps to transform your digital presence</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-lime-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-dark">Consult</h3>
              <p className="text-gray-medium">Free discovery session to align on goals & budget</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-dark">Plan</h3>
              <p className="text-gray-medium">Fixed-price proposal - no hourly billing surprises</p>
            </div>
            <div className="text-center">
              <div className="bg-lime-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-dark">Execute</h3>
              <p className="text-gray-medium">Track progress & costs in real-time dashboard</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-dark">Grow</h3>
              <p className="text-gray-medium">Ongoing optimization to maximize your ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              See The Savings In Action
            </h2>
            <p className="text-xl text-gray-medium">Real results from real clients</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((caseStudy) => (
              <Card key={caseStudy.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <img 
                    src={caseStudy.image} 
                    alt="Case study client scenario" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-dark mb-2">Challenge:</h4>
                    <p className="text-gray-medium">"{caseStudy.challenge}"</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-dark mb-2">Solution:</h4>
                    <p className="text-gray-medium">"{caseStudy.solution}"</p>
                  </div>
                  <div className="bg-lime-primary p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Results:</h4>
                    <p className="text-white">"{caseStudy.results}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-teal-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Ready to Stop Wasting Your Budget?
          </h2>
          <p className="text-xl mb-8 text-gradient-glow">
            Join hundreds of smart businesses that scaled efficiently.
          </p>
          <Button 
            onClick={onOpenCalculator}
            size="lg"
            className="bg-lime-primary text-white hover:bg-green-500 text-lg px-8 py-4"
          >
            Get Your Free Savings Estimate
          </Button>
        </div>
      </section>
    </div>
  );
}
