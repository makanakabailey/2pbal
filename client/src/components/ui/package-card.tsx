import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  tagline: string;
  originalPrice: number;
  price: number;
  savings: number;
  savingsPercent: number;
  popular?: boolean;
  features: string[];
  description: string;
  target: string;
}

interface PackageCardProps {
  package: Package;
  onSelect: (packageId: string) => void;
}

export default function PackageCard({ package: pkg, onSelect }: PackageCardProps) {
  return (
    <div className={`bg-white p-8 rounded-xl shadow-lg border-2 transition-all hover:shadow-xl relative card-glow ${
      pkg.popular ? 'border-gradient-glow' : 'border-transparent hover:border-gradient-glow'
    }`}>
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="btn-gradient-glow px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-dark">{pkg.name}</h3>
        <p className="text-gray-medium">{pkg.tagline}</p>
      </div>
      
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-4 w-4 text-lime-primary mr-3 flex-shrink-0" />
            <span className="text-gray-dark text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="text-center">
        <div className="text-gray-medium line-through text-lg">
          ${pkg.originalPrice.toLocaleString()}
        </div>
        <div className="text-3xl font-bold text-teal-primary mb-2">
          ${pkg.price.toLocaleString()}
        </div>
        <div className="text-lime-primary font-semibold mb-4">
          Save ${pkg.savings.toLocaleString()} ({pkg.savingsPercent}%)
        </div>
        <Button
          onClick={() => window.location.href = `/package/${pkg.id}`}
          className="w-full font-semibold btn-gradient-glow"
        >
          See Full Value Breakdown
        </Button>
      </div>
    </div>
  );
}
