import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PackageCard from '@/components/ui/package-card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { PACKAGES } from '@/lib/constants';
import { Check } from 'lucide-react';

interface PackagesProps {
  onOpenCalculator: () => void;
}

export default function Packages({ onOpenCalculator }: PackagesProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [spend, setSpend] = useState([10000]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);

  const solutions = [
    { id: 'agency', label: 'Agency' },
    { id: 'freelancers', label: 'Freelancers' },
    { id: 'inhouse', label: 'In-House' },
    { id: 'none', label: 'None' },
  ];

  const calculateSavings = () => {
    const currentSpend = spend[0];
    const monthlySavings = Math.round(currentSpend * 0.35);
    const annualSavings = monthlySavings * 12;
    return { monthlySavings, annualSavings };
  };

  const { monthlySavings, annualSavings } = calculateSavings();

  const handlePackageSelect = (packageId: string) => {
    window.location.href = `/package/${packageId}`;
  };

  const handleSolutionToggle = (solutionId: string) => {
    setSelectedSolutions(prev =>
      prev.includes(solutionId)
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-dark">
            Package Value That Fits Your Growth Stage
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-medium mb-6 sm:mb-8">
            Choose your package below and see exactly how much you'll save versus agency or in-house solutions.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full bg-white rounded-none sm:rounded-xl shadow-lg min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 sm:p-4 lg:p-6 font-bold text-gray-dark text-sm sm:text-base">Features</th>
                    {PACKAGES.map((pkg) => (
                      <th key={pkg.id} className="text-center p-3 sm:p-4 lg:p-6 font-bold text-gray-dark min-w-[150px] sm:min-w-[180px] lg:min-w-[200px] text-xs sm:text-sm lg:text-base">
                        <button 
                          onClick={() => window.location.href = `/package/${pkg.id}`}
                          className="hover:text-blue-primary cursor-pointer underline underline-offset-2 hover:underline-offset-4 transition-all"
                        >
                          {pkg.name}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 sm:p-4 lg:p-6 font-medium text-gray-dark text-sm sm:text-base">Website Pages</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">5 pages</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">5 pages + funnel</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">5 pages + AI features</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 sm:p-4 lg:p-6 font-medium text-gray-dark text-sm sm:text-base">Lead Generation</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">Basic</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6"><Check className="h-4 w-4 sm:h-5 sm:w-5 text-lime-primary mx-auto" /></td>
                    <td className="text-center p-3 sm:p-4 lg:p-6"><Check className="h-4 w-4 sm:h-5 sm:w-5 text-lime-primary mx-auto" /></td>
                    <td className="text-center p-3 sm:p-4 lg:p-6"><Check className="h-4 w-4 sm:h-5 sm:w-5 text-lime-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 sm:p-4 lg:p-6 font-medium text-gray-dark text-sm sm:text-base">AI Automation</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">-</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">-</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6"><Check className="h-4 w-4 sm:h-5 sm:w-5 text-lime-primary mx-auto" /></td>
                    <td className="text-center p-3 sm:p-4 lg:p-6"><Check className="h-4 w-4 sm:h-5 sm:w-5 text-lime-primary mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 sm:p-4 lg:p-6 font-medium text-gray-dark text-sm sm:text-base">Dedicated Team</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">-</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">-</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6 text-xs sm:text-sm lg:text-base">-</td>
                    <td className="text-center p-3 sm:p-4 lg:p-6"><Check className="h-4 w-4 sm:h-5 sm:w-5 text-lime-primary mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 lg:p-6 font-bold text-gray-dark text-sm sm:text-base">Investment</td>
                    {PACKAGES.map((pkg) => (
                      <td key={pkg.id} className="text-center p-3 sm:p-4 lg:p-6">
                        <div className="text-gray-400 text-xs sm:text-sm line-through">
                          Agency: ${pkg.originalPrice.toLocaleString()}
                        </div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-primary">
                          ${pkg.price.toLocaleString()}
                        </div>
                        <div className="text-lime-primary font-semibold text-xs sm:text-sm">
                          Save ${pkg.savings.toLocaleString()} ({pkg.savingsPercent}%)
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Package Breakdown */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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

      {/* Consultation Booking Widget */}
      <section className="py-16 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-dark">
                Ready to Get Started?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What services do you currently use?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {solutions.map((solution) => (
                    <div key={solution.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={solution.id}
                        checked={selectedSolutions.includes(solution.id)}
                        onCheckedChange={() => handleSolutionToggle(solution.id)}
                      />
                      <label htmlFor={solution.id} className="text-sm font-medium">
                        {solution.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What's your approximate monthly spend?
                </label>
                <Slider
                  value={spend}
                  onValueChange={setSpend}
                  min={0}
                  max={20000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$0</span>
                  <span className="font-semibold text-lg text-gray-dark">
                    ${spend[0].toLocaleString()}/month
                  </span>
                  <span>$20k+</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 rounded-lg text-white text-center">
                <h3 className="text-xl font-bold mb-2">Ready to Transform Your Business?</h3>
                <p className="text-lg mb-4">Get a personalized consultation to discuss your specific needs and see which package fits best.</p>
                <div className="text-lg font-semibold">Free 30-minute strategy session • No commitment required</div>
              </div>
              
              <Button 
                onClick={() => window.location.href = '/schedule-consultation'}
                className="w-full btn-gradient-glow text-lg py-6"
              >
                Schedule Free Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
