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
    <div 
      onClick={() => onSelect(pkg.id)}
      className={`bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border-2 transition-all hover:shadow-xl relative card-glow cursor-pointer ${
        pkg.popular ? 'border-gradient-glow' : 'border-transparent hover:border-gradient-glow'
      }`}>
      {pkg.popular && (
        <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
          <span className="btn-gradient-glow px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-gray-dark">{pkg.name}</h3>
        <p className="text-gray-medium text-sm sm:text-base">{pkg.tagline}</p>
      </div>
      
      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-lime-primary mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-gray-dark text-xs sm:text-sm lg:text-base">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="text-center">
        <div className="text-gray-medium line-through text-sm sm:text-base lg:text-lg">
          ${pkg.originalPrice.toLocaleString()}
        </div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-teal-primary mb-2">
          ${pkg.price.toLocaleString()}
        </div>
        <div className="text-lime-primary font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
          Save ${pkg.savings.toLocaleString()} ({pkg.savingsPercent}%)
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            window.location.href = `/package/${pkg.id}`;
          }}
          className="w-full font-semibold btn-gradient-glow text-sm sm:text-base"
          size="sm"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
