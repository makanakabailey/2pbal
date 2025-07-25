import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ orderDetails }: { orderDetails: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

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

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium">{orderDetails.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Plan:</span>
              <span className="font-medium">{orderDetails.planName}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-medium">{orderDetails.paymentMethod}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${orderDetails.totalPrice?.toLocaleString()}</span>
            </div>
            {orderDetails.monthlyPrice && (
              <div className="text-sm text-gray-medium">
                Monthly payments of ${orderDetails.monthlyPrice.toLocaleString()}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            
            <div className="flex items-center text-sm text-gray-medium">
              <Shield className="h-4 w-4 mr-2" />
              Your payment information is encrypted and secure
            </div>
            
            <Button
              type="submit"
              disabled={!stripe || !elements || isProcessing}
              className="w-full btn-gradient-glow text-lg py-3"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ${orderDetails.totalPrice ? `$${orderDetails.totalPrice.toLocaleString()}` : ''}`
              )}
            </Button>
            
            <p className="text-xs text-gray-medium text-center">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              30-day money-back guarantee applies.
            </p>
          </form>
        </CardContent>
      </Card>
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

    // Calculate order details
    const basePrice = parseInt(service.price.replace(/[$,]/g, ''));
    let totalPrice = basePrice;
    let monthlyPrice = 0;
    let planName = '';

    switch (planId) {
      case 'one-time':
        planName = 'One-Time Payment';
        totalPrice = basePrice;
        break;
      case '3-month':
        planName = '3-Month Plan';
        totalPrice = Math.round(basePrice * 1.05);
        monthlyPrice = Math.round(totalPrice / 3);
        break;
      case '6-month':
        planName = '6-Month Plan';
        totalPrice = Math.round(basePrice * 1.15);
        monthlyPrice = Math.round(totalPrice / 6);
        break;
      case '12-month':
        planName = '12-Month Plan';
        totalPrice = Math.round(basePrice * 1.25);
        monthlyPrice = Math.round(totalPrice / 12);
        break;
    }

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

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm orderDetails={orderDetails} />
        </Elements>
      </div>
    </div>
  );
}