import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, CreditCard, HelpCircle, CheckCircle, Users, DollarSign, MapPin, Mail, User } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const CheckoutForm = ({ orderDetails }: { orderDetails: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Live order summary state
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  
  const [showCvvHelp, setShowCvvHelp] = useState(false);
  const [cardFocused, setCardFocused] = useState(false);
  const [cardValid, setCardValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase! We'll be in touch soon.",
      });
      setLocation('/dashboard');
    }
    
    setIsProcessing(false);
  };

  const updateBillingInfo = useCallback((field: string, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-none">
      {/* Live Order Summary */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:order-2"
      >
        <Card className="sticky top-8 glass-card border-blue-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Your Project Blueprint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Service Details */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-blue-50 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium text-blue-800">Service Package</span>
              </div>
              <p className="font-semibold text-lg">{orderDetails.serviceName}</p>
              <p className="text-sm text-gray-600">{orderDetails.planName}</p>
            </motion.div>

            {/* Live Billing Information */}
            <AnimatePresence>
              {billingInfo.fullName && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium text-green-800">Bill To</span>
                  </div>
                  <p className="font-semibold">{billingInfo.fullName}</p>
                  {billingInfo.email && <p className="text-sm text-gray-600">{billingInfo.email}</p>}
                  {billingInfo.address && (
                    <div className="text-sm text-gray-600 mt-1">
                      <p>{billingInfo.address}</p>
                      {billingInfo.city && <p>{billingInfo.city}, {billingInfo.zipCode}</p>}
                      {billingInfo.country && <p>{billingInfo.country}</p>}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <Separator />
            
            {/* Pricing Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${orderDetails.totalPrice?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>You save:</span>
                <span className="font-medium">$2,500+</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${orderDetails.totalPrice?.toLocaleString()}</span>
              </div>
              {orderDetails.monthlyPrice && (
                <div className="text-sm text-gray-medium">
                  Monthly payments of ${orderDetails.monthlyPrice.toLocaleString()}
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-green-500" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Payment Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:order-1"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <motion.div
                animate={cardValid ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Lock className="h-5 w-5 mr-2 text-blue-600" />
              </motion.div>
              Secure Checkout
            </CardTitle>
            <p className="text-sm text-gray-600">Your information is protected with bank-level security</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        id="fullName"
                        value={billingInfo.fullName}
                        onChange={(e) => updateBillingInfo('fullName', e.target.value)}
                        placeholder="John Doe"
                        className="mt-1"
                        required
                      />
                    </motion.div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        id="email"
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => updateBillingInfo('email', e.target.value)}
                        placeholder="john@example.com"
                        className="mt-1"
                        required
                      />
                    </motion.div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Input
                      id="address"
                      value={billingInfo.address}
                      onChange={(e) => updateBillingInfo('address', e.target.value)}
                      placeholder="123 Main Street"
                      className="mt-1"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        id="city"
                        value={billingInfo.city}
                        onChange={(e) => updateBillingInfo('city', e.target.value)}
                        placeholder="New York"
                        className="mt-1"
                        required
                      />
                    </motion.div>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        id="zipCode"
                        value={billingInfo.zipCode}
                        onChange={(e) => updateBillingInfo('zipCode', e.target.value)}
                        placeholder="10001"
                        className="mt-1"
                        required
                      />
                    </motion.div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        id="country"
                        value={billingInfo.country}
                        onChange={(e) => updateBillingInfo('country', e.target.value)}
                        placeholder="United States"
                        className="mt-1"
                        required
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Payment Information</Label>
                  <div className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setShowCvvHelp(true)}
                      onMouseLeave={() => setShowCvvHelp(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {showCvvHelp && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute right-0 top-6 z-10 w-64 p-3 bg-white rounded-lg shadow-lg border"
                        >
                          <div className="text-xs text-gray-600">
                            <p className="font-medium mb-1">CVV Security Code</p>
                            <p>Found on the back of your card, usually 3 digits</p>
                            <div className="mt-2 p-2 bg-gray-50 rounded text-center">
                              <span className="font-mono">123</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.div
                  className={`relative transition-all duration-300 ${
                    cardFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                  onFocus={() => setCardFocused(true)}
                  onBlur={() => setCardFocused(false)}
                >
                  <PaymentElement />
                </motion.div>
              </div>

              {/* Security Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-sm text-green-800 font-medium">
                  Your payment information is encrypted and secure
                </span>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={!stripe || !elements || isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-3 font-medium relative overflow-hidden group"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center">
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Complete Secure Payment ${orderDetails.totalPrice?.toLocaleString()}
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>

              <p className="text-xs text-gray-medium text-center leading-relaxed">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                <br />
                <strong>30-day money-back guarantee applies.</strong> Cancel anytime.
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    const planId = urlParams.get('plan');
    const paymentMethod = urlParams.get('method');

    if (!serviceId || !planId || !paymentMethod) {
      setLocation('/services');
      return;
    }

    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) {
      setLocation('/services');
      return;
    }

    // Calculate order details using service pricing plans
    const selectedPlan = service.pricingPlans.find(plan => plan.id === planId);
    if (!selectedPlan) {
      setLocation('/services');
      return;
    }

    const planName = selectedPlan.name;
    const totalPrice = selectedPlan.totalPrice;
    const monthlyPrice = selectedPlan.monthlyPrice;

    const details = {
      serviceName: service.name,
      planName,
      paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer',
      totalPrice,
      monthlyPrice: planId !== 'one-time' ? monthlyPrice : 0
    };

    setOrderDetails(details);

    // Create PaymentIntent
    apiRequest("POST", "/api/create-payment-intent", { 
      amount: totalPrice,
      serviceId,
      planId 
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Payment intent creation failed:', error);
        setLocation('/services');
      });
  }, [setLocation]);

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-teal-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-medium">Setting up your secure payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-dark mb-2">Complete Your Purchase</h1>
          <p className="text-gray-medium">Secure checkout for {orderDetails.serviceName}</p>
        </div>

        {stripePromise ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm orderDetails={orderDetails} />
          </Elements>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-medium">Payment processing is not available in development mode.</p>
            <p className="text-sm text-gray-light mt-2">Stripe keys need to be configured for payments.</p>
          </div>
        )}
      </div>
    </div>
  );
}