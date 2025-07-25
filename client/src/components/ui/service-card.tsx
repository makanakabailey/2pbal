import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'wouter';
import { Service } from '@/lib/constants';

interface ServiceCardProps {
  service: Service;
  onAddToBundle: (serviceId: string) => void;
  isInBundle: boolean;
}

export default function ServiceCard({ service, onAddToBundle, isInBundle }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all overflow-hidden card-glow h-full flex flex-col">
      {/* Service Image */}
      {service.image && (
        <div className="w-full h-40 sm:h-48 bg-gradient-glow flex-shrink-0">
          {service.image}
        </div>
      )}
      
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="mb-4 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-dark mb-2">{service.name}</h3>
          <p className="text-gray-medium text-xs sm:text-sm mb-3 line-clamp-3">{service.description}</p>
          <div className="text-xs text-gray-400 mb-1 sm:mb-2 line-through">Typically ${service.agencyPrice.toLocaleString()}</div>
          <div className="text-lg sm:text-xl font-bold text-teal-primary">From ${service.basePrice.toLocaleString()}</div>
        </div>
        
        <div className="space-y-2 mt-auto">
          <Button
            onClick={() => onAddToBundle(service.id)}
            variant={isInBundle ? "secondary" : "outline"}
            className={`w-full text-xs sm:text-sm ${isInBundle ? 'btn-gradient-glow' : ''}`}
            size="sm"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{isInBundle ? 'Added to Bundle' : 'Add to Solution'}</span>
            <span className="sm:hidden">{isInBundle ? 'Added' : 'Add'}</span>
          </Button>
          
          <Link href={`/service/${service.id}`}>
            <Button
              variant="ghost"
              className="w-full text-teal-primary hover:text-teal-600 hover:bg-teal-glow text-xs sm:text-sm"
              size="sm"
            >
              <span className="hidden sm:inline">View Service Details</span>
              <span className="sm:hidden">Details</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
