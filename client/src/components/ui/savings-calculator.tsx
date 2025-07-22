import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

interface SavingsCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SavingsCalculator({ open, onOpenChange }: SavingsCalculatorProps) {
  const [spend, setSpend] = useState([10000]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [savings, setSavings] = useState(3500);

  useEffect(() => {
    // Calculate savings (35% average)
    const currentSpend = spend[0];
    const calculatedSavings = Math.round(currentSpend * 0.35);
    setSavings(calculatedSavings);
  }, [spend]);

  const services = [
    { id: 'agency', label: 'Traditional Agency' },
    { id: 'freelancer', label: 'Multiple Freelancers' },
    { id: 'inhouse', label: 'In-House Team' },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-dark flex items-center justify-between">
            Calculate Your Savings
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What services do you currently use?
            </label>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <label htmlFor={service.id} className="text-sm font-medium leading-none">
                    {service.label}
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
              min={1000}
              max={50000}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$1,000</span>
              <span className="font-semibold text-lg text-gray-dark">
                ${spend[0].toLocaleString()}
              </span>
              <span>$50,000+</span>
            </div>
          </div>
          
          <div className="bg-lime-primary p-6 rounded-lg text-white">
            <h4 className="text-xl font-bold mb-2">Your Potential Savings:</h4>
            <div className="text-3xl font-bold mb-2">
              ${savings.toLocaleString()}
            </div>
            <p className="text-sm opacity-90">per month with 2Pbal's integrated approach</p>
          </div>
          
          <Button className="w-full bg-teal-primary text-white hover:bg-teal-600">
            Get Personalized Package Recommendations
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
