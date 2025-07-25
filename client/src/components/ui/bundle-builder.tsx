import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

interface BundleBuilderProps {
  selectedServices: string[];
  onRemoveService: (serviceId: string) => void;
  onGetProposal: () => void;
}

export default function BundleBuilder({ 
  selectedServices, 
  onRemoveService, 
  onGetProposal 
}: BundleBuilderProps) {
  const bundledServices = SERVICES.filter(service => 
    selectedServices.includes(service.id)
  );

  // Calculate bundle pricing using new structure
  const totalAgencyPrice = bundledServices.reduce((sum, service) => {
    return sum + service.agencyPrice;
  }, 0);

  const totalTwoPbalPrice = bundledServices.reduce((sum, service) => {
    return sum + service.basePrice;
  }, 0);

  const bundleDiscount = selectedServices.length >= 3 ? 0.2 : 0;
  const discountedPrice = totalTwoPbalPrice * (1 - bundleDiscount);
  const totalSavings = totalAgencyPrice - discountedPrice;

  if (selectedServices.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="p-8 text-center">
          <p className="text-gray-medium">Select services to build your custom bundle</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-dark">
          Your Custom Bundle
        </CardTitle>
        {selectedServices.length >= 3 && (
          <p className="text-lime-primary font-semibold">
            🎉 Bundle 3+ services and save 20%!
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {bundledServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-dark">{service.name}</h4>
                <p className="text-sm text-gray-medium">${service.basePrice.toLocaleString()}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveService(service.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-medium">
            <span>Total Agency Price:</span>
            <span className="line-through">${totalAgencyPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-medium">
            <span>2Pbal Base Price:</span>
            <span>${totalTwoPbalPrice.toLocaleString()}</span>
          </div>
          {bundleDiscount > 0 && (
            <div className="flex justify-between text-lime-primary">
              <span>Bundle Discount (20%):</span>
              <span>-${(totalTwoPbalPrice * bundleDiscount).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-2xl font-bold text-teal-primary border-t pt-2">
            <span>Your 2Pbal Price:</span>
            <span>${discountedPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-lime-primary">
            <span>Total Savings:</span>
            <span>${totalSavings.toLocaleString()}</span>
          </div>
        </div>

        <Button 
          onClick={onGetProposal}
          className="w-full btn-gradient-glow"
        >
          Get Your Custom Proposal
        </Button>
      </CardContent>
    </Card>
  );
}
