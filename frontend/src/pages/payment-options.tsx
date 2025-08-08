import { useState, useEffect, useCallback } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { SERVICES, PACKAGES } from '@/lib/constants';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  Lock, 
  Check, 
  ArrowLeft,
  Apple,
  Chrome
} from 'lucide-react';
import { FaPaypal } from 'react-icons/fa';

// Load Stripe with public key
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

interface PaymentFormProps {
  clientSecret: string;
  orderDetails: any;
  onSuccess: () => void;
}

const PaymentForm = ({ clientSecret, orderDetails, onSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required'
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase! We'll be in touch soon.",
        });
        onSuccess();
      }
    } catch (err: any) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <Apple className="h-5 w-5 text-gray-700" />
            <div>
              <div className="font-medium">Apple Pay</div>
              <div className="text-sm text-gray-500">Touch ID or Face ID</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <Chrome className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">Google Pay</div>
              <div className="text-sm text-gray-500">Quick & secure</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <FaPaypal className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-gray-500">Pay with PayPal</div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Stripe Payment Element - supports all payment methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Lock className="h-5 w-5 mr-2 text-green-600" />
          Secure Payment Details
        </h3>
        <div className="p-4 border rounded-lg bg-gray-50">
          <PaymentElement
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['card', 'apple_pay', 'google_pay', 'paypal']
            }}
          />
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
        <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <div className="font-medium text-green-800">Your payment is secure</div>
          <div className="text-green-700">
            All payments are encrypted and processed securely through Stripe. 
            We never store your payment information.
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg py-6"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5 mr-2" />
            Pay ${orderDetails.amount ? (orderDetails.amount / 100).toLocaleString() : '0'}
          </>
        )}
      </Button>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        By completing this payment, you agree to our{' '}
        <a href="/privacy-policy" className="text-blue-600 hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        30-day money-back guarantee.
      </p>
    </form>
  );
};

export default function PaymentOptions() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/payment-options/:serviceId');
  const [clientSecret, setClientSecret] = useState('');
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('one-time');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { toast } = useToast();

  const calculatePlanAmount = (baseAmount: number, plan: string) => {
    switch (plan) {
      case '3-month':
        return Math.round(baseAmount * 1.15); // 15% interest
      case '6-month':
        return Math.round(baseAmount * 1.25); // 25% interest
      default:
        return baseAmount;
    }
  };

  const getMonthlyAmount = (totalAmount: number, plan: string) => {
    switch (plan) {
      case '3-month':
        return Math.round(totalAmount / 3);
      case '6-month':
        return Math.round(totalAmount / 6);
      default:
        return totalAmount;
    }
  };

  const createPaymentIntent = useCallback(async (orderData: any, paymentPlan: string = 'one-time') => {
    try {
      const planAmount = calculatePlanAmount(orderData.amount, paymentPlan);
      const monthlyAmount = getMonthlyAmount(planAmount, paymentPlan);
      
      const data = await apiRequest('/api/create-payment-intent', 'POST', {
        amount: paymentPlan === 'one-time' ? planAmount : monthlyAmount,
        serviceId: orderData.serviceId,
        planId: orderData.packageId,
        description: `${orderData.description} - ${paymentPlan} payment`,
        paymentPlan
      });
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        return true;
      } else {
        throw new Error('Failed to create payment intent');
      }
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      toast({
        title: "Payment Setup Failed",
        description: "Unable to initialize payment. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  useEffect(() => {
    if (initialized) return; // Prevent re-initialization
    
    window.scrollTo(0, 0);
    
    // Get serviceId from route parameters
    const routeServiceId = params?.serviceId;
    
    // Parse URL parameters (for query strings)
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('package');
    const queryServiceId = urlParams.get('service');
    const amount = urlParams.get('amount');
    const description = urlParams.get('description');

    // Use service ID from route or query parameter
    const serviceId = routeServiceId || queryServiceId;
    
    // If we have a serviceId, get service data
    if (serviceId) {
      const service = SERVICES.find(s => s.id === serviceId);
      if (service) {
        const orderData = {
          amount: service.basePrice,
          serviceId,
          serviceName: service.name,
          description: `${service.name} - ${service.description}`
        };
        setOrderDetails(orderData);
        setInitialized(true);
        setLoading(false); // Show payment page without creating payment intent yet
        return;
      }
    }

    // Handle package data
    if (packageId) {
      const packageData = PACKAGES.find(p => p.id === packageId);
      if (packageData) {
        const orderData = {
          amount: packageData.price,
          packageId,
          packageName: packageData.name,
          description: `${packageData.name} - ${packageData.tagline}`
        };
        setOrderDetails(orderData);
        setInitialized(true);
        setLoading(false); // Show payment page without creating payment intent yet
        return;
      }
    }

    // Fallback to query parameters (for packages)
    if (amount) {
      const orderData = {
        amount: parseFloat(amount),
        packageId,
        serviceId: queryServiceId,
        description: description || 'Payment for 2Pbal services'
      };
      setOrderDetails(orderData);
      setInitialized(true);
      setLoading(false);
      return;
    }

    // If no valid data found, redirect back
    toast({
      title: "Invalid Payment",
      description: "No payment information found",
      variant: "destructive",  
    });
    setLocation('/packages');
  }, [params?.serviceId, initialized, createPaymentIntent, toast, setLocation]);

  // Handle payment plan changes
  const handlePlanChange = (newPlan: string) => {
    setSelectedPlan(newPlan);
  };

  // Handle proceed to payment
  const handleProceedToPayment = async () => {
    setProcessingPayment(true);
    const success = await createPaymentIntent(orderDetails, selectedPlan);
    if (success) {
      setShowPaymentForm(true);
    }
    setProcessingPayment(false);
  };

  const handlePaymentSuccess = () => {
    setLocation('/payment-success');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Setting up secure payment...</p>
        </div>
      </div>
    );
  }

  // Show payment form with Stripe if clientSecret is available
  if (showPaymentForm && clientSecret && stripePromise) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => setShowPaymentForm(false)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Payment Details
          </Button>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm 
              clientSecret={clientSecret} 
              orderDetails={orderDetails}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation(orderDetails.serviceId ? '/services' : '/packages')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {orderDetails.serviceId ? 'Services' : 'Packages'}
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure checkout with multiple payment options</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-600" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {orderDetails.serviceId ? 'Service:' : 'Package:'}
                </span>
                <span className="text-right">
                  {orderDetails.serviceName || orderDetails.packageName || orderDetails.description}
                </span>
              </div>
              
              {orderDetails.serviceId && (
                <div className="text-sm text-gray-600">
                  Professional digital service solution
                </div>
              )}
              
              {orderDetails.packageId && (
                <div className="text-sm text-gray-600">
                  Complete business growth package
                </div>
              )}
              
              <Separator />
              
              {/* Payment Plan Selection */}
              <div className="space-y-4">
                <h4 className="font-medium">Choose Payment Plan:</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment-plan"
                      value="one-time"
                      checked={selectedPlan === 'one-time'}
                      onChange={(e) => {
                        handlePlanChange(e.target.value);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Pay in Full</span>
                        <span className="text-green-600 font-bold">
                          ${orderDetails.amount ? orderDetails.amount.toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">One-time payment - Best Value</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment-plan"
                      value="3-month"
                      checked={selectedPlan === '3-month'}
                      onChange={(e) => {
                        handlePlanChange(e.target.value);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">3 Monthly Payments</span>
                        <span className="text-blue-600 font-bold">
                          ${orderDetails.amount ? Math.round(calculatePlanAmount(orderDetails.amount, '3-month') / 3).toLocaleString() : '0'}/mo
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: ${orderDetails.amount ? calculatePlanAmount(orderDetails.amount, '3-month').toLocaleString() : '0'} (15% interest)
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment-plan"
                      value="6-month"
                      checked={selectedPlan === '6-month'}
                      onChange={(e) => {
                        handlePlanChange(e.target.value);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">6 Monthly Payments</span>
                        <span className="text-blue-600 font-bold">
                          ${orderDetails.amount ? Math.round(calculatePlanAmount(orderDetails.amount, '6-month') / 6).toLocaleString() : '0'}/mo
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: ${orderDetails.amount ? calculatePlanAmount(orderDetails.amount, '6-month').toLocaleString() : '0'} (25% interest)
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>
                  {selectedPlan === 'one-time' ? 'Total:' : 'First Payment:'}
                </span>
                <span className="text-blue-600">
                  ${orderDetails.amount ? (
                    selectedPlan === 'one-time' 
                      ? orderDetails.amount.toLocaleString()
                      : getMonthlyAmount(calculatePlanAmount(orderDetails.amount, selectedPlan), selectedPlan).toLocaleString()
                  ) : '0'}
                </span>
              </div>

              {/* Payment Methods Accepted */}
              <div className="pt-4">
                <h4 className="font-medium mb-3">We Accept:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <CreditCard className="h-3 w-3" />
                    <span>Cards</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Apple className="h-3 w-3" />
                    <span>Apple Pay</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Chrome className="h-3 w-3" />
                    <span>Google Pay</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <FaPaypal className="h-3 w-3" />
                    <span>PayPal</span>
                  </Badge>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 text-green-800">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">30-Day Money-Back Guarantee</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Not satisfied? Get a full refund within 30 days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Action */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-green-600" />
                Ready to Proceed?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Review your order details and click below to proceed to secure payment.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure Payment Processing</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Your payment will be processed securely through Stripe with bank-level encryption.
                  </p>
                </div>
                
                <Button
                  onClick={handleProceedToPayment}
                  disabled={processingPayment || !orderDetails.amount}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg py-6"
                >
                  {processingPayment ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Setting up payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Proceed to Secure Payment
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center max-w-md mx-auto">
                  You will be taken to our secure payment form where you can enter your payment details. 
                  No payment will be processed until you explicitly confirm your purchase.
                </p>
              </div>
              
              {/* What Happens Next */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">What happens next:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">1</div>
                    <span>Enter your payment information securely</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                    <span>Review and confirm your purchase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                    <span>Receive confirmation and get started</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}