import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { PACKAGES } from '@/lib/constants';

export default function Payment() {
  const [, params] = useRoute('/payment/:packageId');
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get('package') || params?.packageId;
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  // Format card number with spaces (4-4-4-4 pattern)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date (MM/YY pattern)
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Format CVV (3-4 digits only, masked with •)
  const formatCvv = (value: string) => {
    return value.replace(/[^0-9]/gi, '').substring(0, 4);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCvv(e.target.value);
    setCvv(formatted);
  };
  
  const packageData = PACKAGES.find(pkg => pkg.id === packageId);
  
  if (!packageData) {
    return (
      <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-dark">Package Not Found</h1>
            <p className="text-gray-medium mb-6">The package you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = '/packages'}>
              View All Packages
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const monthlyPrice = packageData.price;
  const annualPrice = Math.round(packageData.price * 12 * 0.8); // 20% discount for annual
  const currentPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice;
  const annualSavings = (monthlyPrice * 12) - annualPrice;

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link href="/packages">
            <Button variant="ghost" className="mb-4 text-sm sm:text-base">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-dark mb-2">Complete Your Purchase</h1>
          <p className="text-gray-medium text-sm sm:text-base">You're one step away from transforming your business</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Order Summary */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-dark">{packageData.name}</h3>
                <p className="text-gray-medium text-sm">{packageData.tagline}</p>
              </div>

              {/* Billing Cycle */}
              <div>
                <Label className="text-base font-medium">Billing Cycle</Label>
                <RadioGroup value={billingCycle} onValueChange={setBillingCycle} className="mt-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Monthly</span>
                        <span className="font-semibold">${monthlyPrice.toLocaleString()}/month</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg bg-green-50 border-green-200">
                    <RadioGroupItem value="annual" id="annual" />
                    <Label htmlFor="annual" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <span>Annual</span>
                          <div className="text-xs text-green-600 font-medium">Save ${annualSavings.toLocaleString()}/year</div>
                        </div>
                        <span className="font-semibold">${annualPrice.toLocaleString()}/year</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Total */}
              <div className="space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-teal-primary">
                    ${currentPrice.toLocaleString()}{billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-600">
                    You're saving ${annualSavings.toLocaleString()} compared to monthly billing!
                  </p>
                )}
              </div>

              {/* What's Included */}
              <div>
                <h4 className="font-medium mb-3">What's included:</h4>
                <ul className="space-y-2">
                  {packageData.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-lime-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscription Benefits */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Subscription Benefits</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    Cancel anytime through your dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    Automatic billing and invoicing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    Priority customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    Full subscription management portal
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-4 w-4" />
                    <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pl-6">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input 
                          id="cardNumber" 
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          autoComplete="cc-number"
                          className="font-mono tracking-wider pr-12"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          type="text"
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          autoComplete="cc-exp"
                          className="font-mono"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Input 
                            id="cvv" 
                            type="password"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="•••"
                            maxLength={4}
                            autoComplete="cc-csc"
                            className="font-mono tracking-widest pr-10"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Hidden
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Security Notice */}
              {paymentMethod === 'card' && cardNumber && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-sm text-green-800">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">Payment Information Protected</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your card number and CVV are encrypted and masked for security. 
                    We use industry-standard SSL encryption to protect your payment data.
                  </p>
                </div>
              )}

              {/* Complete Purchase */}
              <div className="space-y-4">
                <Button 
                  className="w-full btn-gradient-glow py-6 text-lg font-semibold"
                  onClick={() => {
                    // TODO: Implement actual payment processing
                    alert('Payment processing will be implemented. For now, this is a demo.');
                    window.location.href = '/client-portal';
                  }}
                >
                  Complete Purchase - ${currentPrice.toLocaleString()}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  🔒 Secure payment powered by Stripe. Your information is encrypted and secure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}