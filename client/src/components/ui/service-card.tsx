import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'wouter';

interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  agencyPrice: string;
  image?: React.ReactNode;
}

interface ServiceCardProps {
  service: Service;
  onAddToBundle: (serviceId: string) => void;
  isInBundle: boolean;
}

export default function ServiceCard({ service, onAddToBundle, isInBundle }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all overflow-hidden card-glow">
      {/* Service Image */}
      {service.image && (
        <div className="w-full h-48 bg-gradient-glow">
          {service.image}
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-dark mb-2">{service.name}</h3>
          <p className="text-gray-medium text-sm mb-3">{service.description}</p>
          <div className="text-xs text-gray-400 mb-2 line-through">{service.agencyPrice}</div>
          <div className="text-xl font-bold text-teal-primary">{service.price}</div>
        </div>
        
        <div className="space-y-2">
          <Button
            onClick={() => onAddToBundle(service.id)}
            variant={isInBundle ? "secondary" : "outline"}
            className={`w-full ${isInBundle ? 'btn-gradient-glow' : ''}`}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isInBundle ? 'Added to Bundle' : 'Add to Solution'}
          </Button>
          
          <Link href={`/service/${service.id}`}>
            <Button
              variant="ghost"
              className="w-full text-teal-primary hover:text-teal-600 hover:bg-teal-glow"
            >
              View Service Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
