import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
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
  const [clientSecret, setClientSecret] = useState('');
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('package');
    const serviceId = urlParams.get('service');
    const amount = urlParams.get('amount');
    const description = urlParams.get('description');

    if (!amount) {
      toast({
        title: "Invalid Payment",
        description: "Payment amount is required",
        variant: "destructive",
      });
      setLocation('/packages');
      return;
    }

    const orderData = {
      amount: parseFloat(amount),
      packageId,
      serviceId,
      description: description || 'Payment for 2Pbal services'
    };

    setOrderDetails(orderData);

    // Create payment intent
    createPaymentIntent(orderData);
  }, [setLocation, toast]);

  const createPaymentIntent = async (orderData: any) => {
    try {
      const response = await apiRequest('POST', '/api/create-payment-intent', {
        amount: orderData.amount,
        serviceId: orderData.serviceId,
        planId: orderData.packageId,
        description: orderData.description
      });

      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
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
      setLocation('/packages');
    } finally {
      setLoading(false);
    }
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

  if (!stripePromise) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Payment Not Available</h1>
            <p className="text-gray-600 mb-6">
              Payment processing is currently not configured. Please contact support.
            </p>
            <Button onClick={() => setLocation('/packages')}>
              Back to Packages
            </Button>
          </CardContent>
        </Card>
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
            onClick={() => setLocation('/packages')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Packages
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
                <span className="font-medium">Service:</span>
                <span>{orderDetails.description}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${orderDetails.amount ? orderDetails.amount.toLocaleString() : '0'}
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

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              {clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#2563eb',
                        colorBackground: '#ffffff',
                        colorText: '#30313d',
                        colorDanger: '#df1b41',
                        borderRadius: '8px',
                      }
                    }
                  }}
                >
                  <PaymentForm
                    clientSecret={clientSecret}
                    orderDetails={orderDetails}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-gray-600">Loading payment form...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}