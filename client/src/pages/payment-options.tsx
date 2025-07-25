import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Calendar, Clock } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

interface PaymentPlan {
  id: string;
  name: string;
  duration: string;
  totalPrice: number;
  monthlyPrice: number;
  discount: number;
  popular?: boolean;
  features: string[];
}

export default function PaymentOptions() {
  const { serviceId } = useParams();
  const [, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const service = SERVICES.find(s => s.id === serviceId);

  if (!service) {
    return <div>Service not found</div>;
  }

  // Extract base price from service.price string (e.g., "$2,500" -> 2500)
  const basePrice = parseInt(service.price.replace(/[$,]/g, ''));

  const paymentPlans: PaymentPlan[] = [
    {
      id: 'one-time',
      name: 'One-Time Payment',
      duration: 'Pay in Full',
      totalPrice: basePrice,
      monthlyPrice: basePrice,
      discount: 0,
      features: [
        'Complete service delivery',
        'Full access to all features',
        'Priority support',
        '90-day warranty'
      ]
    },
    {
      id: '3-month',
      name: '3-Month Plan',
      duration: '3 Monthly Payments',
      totalPrice: Math.round(basePrice * 1.05),
      monthlyPrice: Math.round(basePrice * 1.05 / 3),
      discount: 0,
      features: [
        'Complete service delivery',
        'Full access to all features',
        'Standard support',
        '60-day warranty',
        'No setup fees'
      ]
    },
    {
      id: '6-month',
      name: '6-Month Plan',
      duration: '6 Monthly Payments',
      totalPrice: Math.round(basePrice * 1.15),
      monthlyPrice: Math.round(basePrice * 1.15 / 6),
      discount: 0,
      popular: true,
      features: [
        'Complete service delivery',
        'Full access to all features',
        'Priority support',
        '90-day warranty',
        'Free consultation calls',
        'Progress tracking dashboard'
      ]
    },
    {
      id: '12-month',
      name: '12-Month Plan',
      duration: '12 Monthly Payments',
      totalPrice: Math.round(basePrice * 1.25),
      monthlyPrice: Math.round(basePrice * 1.25 / 12),
      discount: 0,
      features: [
        'Complete service delivery',
        'Full access to all features',
        'Premium support',
        '1-year warranty',
        'Monthly consultation calls',
        'Progress tracking dashboard',
        'Additional revisions included'
      ]
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'bank', name: 'Bank Transfer', icon: <Calendar className="h-5 w-5" /> },
  ];

  const handleProceed = () => {
    if (selectedPlan && paymentMethod) {
      // In a real app, this would integrate with Stripe or another payment processor
      setLocation(`/checkout?service=${serviceId}&plan=${selectedPlan}&method=${paymentMethod}`);
    }
  };

  const handleScheduleConsultation = () => {
    setLocation(`/schedule-consultation?service=${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            Get Started with {service.name}
          </h1>
          <p className="text-xl text-gray-medium">
            Choose your payment plan and method to begin your project
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Payment Plans */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-dark mb-6">Select Your Payment Plan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {paymentPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-teal-primary border-teal-primary' 
                      : 'hover:border-teal-primary'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="btn-gradient-glow">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="text-sm text-gray-medium">{plan.duration}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-teal-primary">
                        ${plan.monthlyPrice.toLocaleString()}
                        {plan.id !== 'one-time' && <span className="text-sm font-normal">/month</span>}
                      </div>
                      <div className="text-sm text-gray-medium">
                        Total: ${plan.totalPrice.toLocaleString()}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-lime-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary & Payment Method */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Agency Price:</span>
                    <span className="line-through text-gray-400">{service.agencyPrice}</span>
                  </div>
                  <div className="flex justify-between text-teal-primary font-semibold">
                    <span>2Pbal Price:</span>
                    <span>{service.price}</span>
                  </div>
                  {selectedPlan && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Payment Plan:</span>
                        <span className="font-medium">
                          {paymentPlans.find(p => p.id === selectedPlan)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${paymentPlans.find(p => p.id === selectedPlan)?.totalPrice.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {selectedPlan && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-teal-primary bg-teal-50'
                            : 'border-gray-200 hover:border-teal-primary'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center">
                          {method.icon}
                          <span className="ml-3 font-medium">{method.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleProceed}
                disabled={!selectedPlan || !paymentMethod}
                className="w-full btn-gradient-glow text-lg py-3"
              >
                Proceed to Payment
              </Button>
              
              <div className="text-center text-gray-medium">or</div>
              
              <Button
                onClick={handleScheduleConsultation}
                variant="outline"
                className="w-full border-teal-primary text-teal-primary hover:bg-teal-50"
              >
                <Clock className="h-4 w-4 mr-2" />
                Schedule Free Consultation First
              </Button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-medium">
          <p>🔒 Secure payment processing • 30-day money-back guarantee • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}