import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PackageCard from '@/components/ui/package-card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { PACKAGES } from '@/lib/constants';
import { Check } from 'lucide-react';

interface PackagesProps {
  onOpenCalculator: () => void;
}

export default function Packages({ onOpenCalculator }: PackagesProps) {
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
    console.log('Selected package:', packageId);
  };

  const handleSolutionToggle = (solutionId: string) => {
    setSelectedSolutions(prev =>
      prev.includes(solutionId)
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-dark">
            Package Value That Fits Your Growth Stage
          </h1>
          <p className="text-xl text-gray-medium mb-8">
            Choose your package below and see exactly how much you'll save versus agency or in-house solutions.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 font-bold text-gray-dark">Features</th>
                  {PACKAGES.map((pkg) => (
                    <th key={pkg.id} className="text-center p-6 font-bold text-gray-dark min-w-[200px]">
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-6 font-medium text-gray-dark">Website Pages</td>
                  <td className="text-center p-6">5 pages</td>
                  <td className="text-center p-6">5 pages + funnel</td>
                  <td className="text-center p-6">5 pages + AI features</td>
                  <td className="text-center p-6">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-6 font-medium text-gray-dark">Lead Generation</td>
                  <td className="text-center p-6">Basic</td>
                  <td className="text-center p-6"><Check className="h-5 w-5 text-lime-primary mx-auto" /></td>
                  <td className="text-center p-6"><Check className="h-5 w-5 text-lime-primary mx-auto" /></td>
                  <td className="text-center p-6"><Check className="h-5 w-5 text-lime-primary mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-6 font-medium text-gray-dark">AI Automation</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6"><Check className="h-5 w-5 text-lime-primary mx-auto" /></td>
                  <td className="text-center p-6"><Check className="h-5 w-5 text-lime-primary mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-6 font-medium text-gray-dark">Dedicated Team</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6"><Check className="h-5 w-5 text-lime-primary mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-gray-dark">Investment</td>
                  {PACKAGES.map((pkg) => (
                    <td key={pkg.id} className="text-center p-6">
                      <div className="text-gray-400 text-sm line-through">
                        Agency: ${pkg.originalPrice.toLocaleString()}
                      </div>
                      <div className="text-2xl font-bold text-teal-primary">
                        ${pkg.price.toLocaleString()}
                      </div>
                      <div className="text-lime-primary font-semibold">
                        Save ${pkg.savings.toLocaleString()} ({pkg.savingsPercent}%)
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Package Breakdown */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Savings Calculator Widget */}
      <section className="py-16 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-dark">
                How Much Could You Save?
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
              
              <div className="bg-teal-primary p-6 rounded-lg text-white text-center">
                <h3 className="text-xl font-bold mb-2">By switching to 2Pbal, you could save approximately:</h3>
                <div className="text-4xl font-bold mb-2">${monthlySavings.toLocaleString()}/month</div>
                <div className="text-2xl font-semibold">That's ${annualSavings.toLocaleString()}/year!</div>
              </div>
              
              <Button 
                onClick={onOpenCalculator}
                className="w-full bg-lime-primary text-white hover:bg-green-500 text-lg py-6"
              >
                See Personalized Package Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
