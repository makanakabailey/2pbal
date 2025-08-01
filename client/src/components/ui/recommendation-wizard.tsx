import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft, Star } from 'lucide-react';
import { 
  BusinessAssessment, 
  getPersonalizedRecommendation, 
  getServiceRecommendations,
  PACKAGES,
  SERVICES 
} from '@/lib/constants';

interface RecommendationWizardProps {
  onComplete?: (recommendations: any) => void;
}

const questions = [
  {
    key: 'companySize' as keyof BusinessAssessment,
    question: 'What size is your company?',
    options: [
      { value: 'startup', label: 'Startup (1-10 employees)', desc: 'Early-stage business getting started' },
      { value: 'small', label: 'Small Business (11-50 employees)', desc: 'Established local or regional business' },
      { value: 'medium', label: 'Medium Business (51-200 employees)', desc: 'Growing company with multiple locations' },
      { value: 'large', label: 'Large Enterprise (200+ employees)', desc: 'Major corporation or organization' }
    ]
  },
  {
    key: 'budget' as keyof BusinessAssessment,
    question: 'What\'s your budget range for digital services?',
    options: [
      { value: 'under-5k', label: 'Under $5,000', desc: 'Essential services on a tight budget' },
      { value: '5k-15k', label: '$5,000 - $15,000', desc: 'Standard business investment' },
      { value: '15k-35k', label: '$15,000 - $35,000', desc: 'Comprehensive digital transformation' },
      { value: '35k-plus', label: '$35,000+', desc: 'Premium enterprise solutions' }
    ]
  },
  {
    key: 'currentStage' as keyof BusinessAssessment,
    question: 'What stage is your business in?',
    options: [
      { value: 'idea', label: 'Idea Stage', desc: 'Planning and developing your concept' },
      { value: 'mvp', label: 'MVP/Launch', desc: 'Building or launching your first product' },
      { value: 'growth', label: 'Growth Stage', desc: 'Expanding your customer base' },
      { value: 'scale', label: 'Scale Stage', desc: 'Optimizing for efficiency and automation' }
    ]
  },
  {
    key: 'primaryGoal' as keyof BusinessAssessment,
    question: 'What\'s your primary business goal?',
    options: [
      { value: 'visibility', label: 'Increase Visibility', desc: 'Get found by more potential customers' },
      { value: 'leads', label: 'Generate Leads', desc: 'Convert visitors into qualified prospects' },
      { value: 'automation', label: 'Automate Processes', desc: 'Reduce manual work with AI and automation' },
      { value: 'efficiency', label: 'Improve Efficiency', desc: 'Streamline operations and reduce costs' }
    ]
  },
  {
    key: 'timeframe' as keyof BusinessAssessment,
    question: 'When do you need to see results?',
    options: [
      { value: 'asap', label: 'ASAP', desc: 'Urgent need, ready to start immediately' },
      { value: '1-3months', label: '1-3 Months', desc: 'Planning for near-term launch' },
      { value: '3-6months', label: '3-6 Months', desc: 'Strategic planning timeline' },
      { value: '6-12months', label: '6-12 Months', desc: 'Long-term digital transformation' }
    ]
  },
  {
    key: 'techSavviness' as keyof BusinessAssessment,
    question: 'How would you rate your team\'s technical expertise?',
    options: [
      { value: 'basic', label: 'Basic', desc: 'Limited technical knowledge, need guidance' },
      { value: 'intermediate', label: 'Intermediate', desc: 'Some technical knowledge, can learn quickly' },
      { value: 'advanced', label: 'Advanced', desc: 'Strong technical team, comfortable with complex solutions' }
    ]
  }
];

export default function RecommendationWizard({ onComplete }: RecommendationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<BusinessAssessment>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (key: keyof BusinessAssessment, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate recommendations
      const assessment = newAnswers as BusinessAssessment;
      const packageRec = getPersonalizedRecommendation(assessment);
      const serviceRecs = getServiceRecommendations(assessment);
      
      const recommendations = {
        package: packageRec,
        services: serviceRecs,
        assessment
      };
      
      setShowResults(true);
      onComplete?.(recommendations);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const assessment = answers as BusinessAssessment;
    const packageRec = getPersonalizedRecommendation(assessment);
    const serviceRecs = getServiceRecommendations(assessment);
    const recommendedPackage = PACKAGES.find(p => p.id === packageRec.recommended);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-teal-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-dark mb-2">Your Personalized Recommendations</h2>
          <p className="text-gray-medium">Based on your business assessment, here's what we recommend:</p>
        </div>

        {/* Recommended Package */}
        <Card className="mb-8 border-teal-primary bg-gradient-to-r from-teal-50 to-lime-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-teal-primary">
                <Star className="h-5 w-5 inline mr-2" />
                Recommended Package
              </CardTitle>
              <Badge className="bg-teal-primary">Perfect Match</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {recommendedPackage && (
              <div>
                <h3 className="text-2xl font-bold text-gray-dark mb-2">{recommendedPackage.name}</h3>
                <p className="text-gray-medium mb-4">{recommendedPackage.tagline}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold text-teal-primary">
                    ${recommendedPackage.price.toLocaleString()}
                  </div>
                  <div className="text-gray-medium line-through">
                    ${recommendedPackage.originalPrice.toLocaleString()}
                  </div>
                  <Badge className="bg-lime-500">Save {recommendedPackage.savingsPercent}%</Badge>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Why this package is perfect for you:</h4>
                  <ul className="space-y-1">
                    {packageRec.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-dark">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="btn-gradient-glow"
                  onClick={() => window.location.href = `/package/${recommendedPackage.id}`}
                >
                  Get Started with {recommendedPackage.name}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Services */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-dark mb-6">Recommended Individual Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceRecs.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <p className="text-sm text-gray-medium">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-bold text-teal-primary">
                      ${service.basePrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-medium line-through">
                      ${service.agencyPrice.toLocaleString()}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={restart}>
            Take Assessment Again
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-medium">Question {currentStep + 1} of {questions.length}</span>
          <span className="text-sm text-gray-medium">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full p-4 h-auto text-left justify-start hover:border-teal-primary hover:bg-teal-50"
                onClick={() => handleAnswer(currentQuestion.key, option.value)}
              >
                <div>
                  <div className="font-semibold text-gray-dark">{option.label}</div>
                  <div className="text-sm text-gray-medium mt-1">{option.desc}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-sm text-gray-medium self-center">
          Step {currentStep + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}