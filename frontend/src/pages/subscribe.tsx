import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Calendar, Users, Zap, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  popular?: boolean;
  features: string[];
  limitations?: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Perfect for small businesses and startups",
    price: 29,
    interval: "month",
    features: [
      "Up to 5 projects",
      "Basic support",
      "Standard templates",
      "1GB storage",
      "Email notifications"
    ],
    limitations: [
      "No priority support",
      "Limited customization"
    ]
  },
  {
    id: "professional",
    name: "Professional Plan",
    description: "Ideal for growing businesses",
    price: 99,
    interval: "month",
    popular: true,
    features: [
      "Unlimited projects",
      "Priority support",
      "Premium templates",
      "10GB storage",
      "SMS & Email notifications",
      "Advanced analytics",
      "Custom branding",
      "API access"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "For large organizations with custom needs",
    price: 299,
    interval: "month",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited storage",
      "White-label solution",
      "Advanced security",
      "Custom SLA",
      "24/7 phone support"
    ]
  },
  {
    id: "basic-yearly",
    name: "Basic Plan (Yearly)",
    description: "Save 20% with annual billing",
    price: 290,
    interval: "year",
    features: [
      "All Basic Plan features",
      "Save $58 per year",
      "Priority email support"
    ]
  },
  {
    id: "professional-yearly",
    name: "Professional Plan (Yearly)",
    description: "Save 20% with annual billing",
    price: 990,
    interval: "year",
    popular: true,
    features: [
      "All Professional Plan features",
      "Save $198 per year",
      "Quarterly business reviews"
    ]
  },
  {
    id: "enterprise-yearly",
    name: "Enterprise Plan (Yearly)",
    description: "Save 20% with annual billing",
    price: 2990,
    interval: "year",
    features: [
      "All Enterprise Plan features",
      "Save $598 per year",
      "Custom onboarding",
      "Dedicated infrastructure"
    ]
  }
];

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const { toast } = useToast();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = (plan: PricingPlan) => {
    // This would integrate with Stripe when API keys are available
    toast({
      title: "Subscription Process",
      description: `Starting subscription to ${plan.name}. This will integrate with Stripe when API keys are configured.`
    });
    
    // In a real implementation, this would:
    // 1. Create a Stripe customer if needed
    // 2. Create a subscription with the selected plan
    // 3. Redirect to Stripe checkout or show payment form
  };

  const formatPrice = (price: number, interval: 'month' | 'year') => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
    
    const monthlyPrice = interval === 'year' ? price / 12 : price;
    return {
      display: formatter.format(price),
      monthly: formatter.format(monthlyPrice),
      interval
    };
  };

  const filteredPlans = pricingPlans.filter(plan => plan.interval === billingInterval);

  return (
    <div className="pt-16 min-h-screen bg-gray-light">
      {/* Header */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            Choose Your Subscription Plan
          </h1>
          <p className="text-xl text-gray-medium mb-8">
            Select the perfect plan for your business needs. Upgrade or downgrade anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setBillingInterval('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingInterval === 'month'
                  ? 'bg-white text-blue-primary shadow-sm'
                  : 'text-gray-medium hover:text-gray-dark'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingInterval === 'year'
                  ? 'bg-white text-blue-primary shadow-sm'
                  : 'text-gray-medium hover:text-gray-dark'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Yearly <Badge variant="secondary" className="ml-2">Save 20%</Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => {
              const pricing = formatPrice(plan.price, plan.interval);
              const isSelected = selectedPlan === plan.id;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative transition-all duration-200 ${
                    plan.popular 
                      ? 'border-blue-primary shadow-lg scale-105' 
                      : isSelected 
                        ? 'border-teal-primary shadow-md' 
                        : 'hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-primary text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-dark">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-medium">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-gray-dark">
                        {pricing.display}
                      </div>
                      <div className="text-sm text-gray-medium">
                        {plan.interval === 'year' ? (
                          <>
                            {pricing.monthly}/month when billed annually
                          </>
                        ) : (
                          `per ${plan.interval}`
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      className={`w-full mb-6 ${
                        plan.popular 
                          ? 'bg-blue-primary hover:bg-blue-600' 
                          : 'bg-teal-primary hover:bg-teal-600'
                      }`}
                      onClick={() => handleSubscribe(plan)}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isSelected ? 'Subscribe Now' : 'Choose Plan'}
                    </Button>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-dark flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Included Features:
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-medium">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations && (
                        <>
                          <Separator className="my-4" />
                          <h4 className="font-medium text-gray-dark">
                            Limitations:
                          </h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-500">
                                <span className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0">×</span>
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-dark text-center mb-8">
            Why Choose 2PBAL Subscriptions?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                Dedicated Support
              </h3>
              <p className="text-gray-medium">
                Get direct access to our expert team with priority support and dedicated account management.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-teal-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                Faster Delivery
              </h3>
              <p className="text-gray-medium">
                Subscribers get priority in our development queue with faster project turnaround times.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-lime-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-dark mb-2">
                Guaranteed SLA
              </h3>
              <p className="text-gray-medium">
                All subscribers get guaranteed service level agreements with measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-dark text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-dark mb-2">
                  Can I change my plan anytime?
                </h3>
                <p className="text-gray-medium">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-dark mb-2">
                  What happens if I cancel my subscription?
                </h3>
                <p className="text-gray-medium">
                  You'll retain access to all features until the end of your current billing period. No refunds for partial periods.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-dark mb-2">
                  Do you offer custom plans for large organizations?
                </h3>
                <p className="text-gray-medium">
                  Yes, we offer custom Enterprise plans with tailored features, pricing, and dedicated support for organizations with specific needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}