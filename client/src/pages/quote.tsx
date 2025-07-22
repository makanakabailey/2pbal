import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  goals: string[];
  overspending: string[];
  outcomes: string[];
  projectDescription: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  phone: string;
}

export default function Quote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    goals: [],
    overspending: [],
    outcomes: [],
    projectDescription: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const businessGoals = [
    'Increase Sales',
    'Reduce Costs', 
    'Automate Tasks',
    'Improve Customer Experience',
    'Scale Operations',
    'Enter New Markets'
  ];

  const overspendingAreas = [
    'Agency Fees',
    'Freelancer Management',
    'In-House Salaries',
    'Software Licenses',
    'Marketing Costs',
    'Operational Overhead'
  ];

  const importantOutcomes = [
    'More Leads',
    'Faster Execution',
    'Predictable Budget',
    'Better ROI',
    'Reduced Management Time',
    'Scalable Solutions'
  ];

  const handleCheckboxChange = (field: keyof Pick<FormData, 'goals' | 'overspending' | 'outcomes'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would normally submit to your API
      console.log('Submitting form data:', formData);
      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We're preparing your personalized savings proposal now.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
        <Card className="max-w-2xl mx-4">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-lime-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-gray-dark">Thank You!</h1>
            <p className="text-lg text-gray-medium mb-8">
              We're building your personalized savings proposal now. You'll receive it within 24 hours.
            </p>
            <div className="bg-lime-primary p-6 rounded-lg mb-8">
              <h3 className="text-white font-bold mb-2">Immediate Value:</h3>
              <Button variant="secondary" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download "5 Strategies to Reduce Digital Costs by 40%"
              </Button>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-teal-primary text-white hover:bg-teal-600"
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-light">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-dark">
            Maximize Your ROI With a Tailored Solution
          </h1>
          <p className="text-xl text-gray-medium mb-8">
            Tell us about your goals and we'll show you exactly how to achieve them efficiently.
          </p>
          <Progress value={progress} className="max-w-md mx-auto" />
          <p className="text-sm text-gray-medium mt-2">Step {currentStep} of {totalSteps}</p>
        </div>
      </section>

      {/* Multi-Step Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-dark">
                {currentStep === 1 && "What are your top business goals?"}
                {currentStep === 2 && "Where are you currently overspending?"}
                {currentStep === 3 && "Which outcomes matter most to you?"}
                {currentStep === 4 && "Tell us about your project"}
                {currentStep === 5 && "Contact information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Business Goals */}
              {currentStep === 1 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {businessGoals.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={formData.goals.includes(goal)}
                        onCheckedChange={() => handleCheckboxChange('goals', goal)}
                      />
                      <Label htmlFor={goal} className="font-medium">{goal}</Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Overspending Areas */}
              {currentStep === 2 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {overspendingAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.overspending.includes(area)}
                        onCheckedChange={() => handleCheckboxChange('overspending', area)}
                      />
                      <Label htmlFor={area} className="font-medium">{area}</Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Important Outcomes */}
              {currentStep === 3 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {importantOutcomes.map((outcome) => (
                    <div key={outcome} className="flex items-center space-x-2">
                      <Checkbox
                        id={outcome}
                        checked={formData.outcomes.includes(outcome)}
                        onCheckedChange={() => handleCheckboxChange('outcomes', outcome)}
                      />
                      <Label htmlFor={outcome} className="font-medium">{outcome}</Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Project Details */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project, challenges, and requirements..."
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Desired Timeline</Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 3 months, ASAP, Q2 2025"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Contact Info */}
              {currentStep === 5 && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="bg-teal-primary text-white hover:bg-teal-600"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-lime-primary text-white hover:bg-green-500"
                    disabled={!formData.name || !formData.email}
                  >
                    Get Custom Proposal
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
