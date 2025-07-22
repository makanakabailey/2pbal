import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  agencyPrice: string;
}

interface ServiceCardProps {
  service: Service;
  onAddToBundle: (serviceId: string) => void;
  isInBundle: boolean;
}

export default function ServiceCard({ service, onAddToBundle, isInBundle }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-dark mb-2">{service.name}</h3>
        <p className="text-gray-medium text-sm mb-3">{service.description}</p>
        <div className="text-xs text-gray-400 mb-2">{service.agencyPrice}</div>
        <div className="text-xl font-bold text-teal-primary">{service.price}</div>
      </div>
      
      <Button
        onClick={() => onAddToBundle(service.id)}
        variant={isInBundle ? "secondary" : "outline"}
        className={`w-full ${isInBundle ? 'bg-lime-primary text-white hover:bg-green-500' : ''}`}
      >
        <Plus className="h-4 w-4 mr-2" />
        {isInBundle ? 'Added to Bundle' : 'Add to Solution'}
      </Button>
    </div>
  );
}
