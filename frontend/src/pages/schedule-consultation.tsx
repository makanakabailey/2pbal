import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Mail, Phone, Building, Target } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

interface ConsultationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  projectGoals: string;
  currentChallenges: string;
  budget: string;
  timeline: string;
  specificRequirements: string;
}

export default function ScheduleConsultation() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get serviceId from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service');
  
  const service = SERVICES.find(s => s.id === serviceId);

  const [formData, setFormData] = useState<ConsultationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'EST',
    projectGoals: '',
    currentChallenges: '',
    budget: '',
    timeline: '',
    specificRequirements: ''
  });

  if (!service) {
    return <div>Service not found</div>;
  }

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const timezones = ['EST', 'CST', 'MST', 'PST', 'GMT', 'CET'];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000',
    'Need help determining budget'
  ];

  const timelineOptions = [
    'ASAP (Rush project)',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible timeline'
  ];

  const handleInputChange = (field: keyof ConsultationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Consultation Scheduled!",
        description: "We'll send you a calendar invite and preparation materials within 24 hours.",
      });

      // In a real app, this would save to database and send notifications
      setLocation('/dashboard');
    } catch (error) {
      toast({
        title: "Scheduling Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.phone && formData.preferredDate && formData.preferredTime &&
                     formData.projectGoals && formData.budget && formData.timeline;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            Schedule Your Free Consultation
          </h1>
          <p className="text-xl text-gray-medium mb-2">
            Let's discuss your {service.name} project
          </p>
          <p className="text-gray-medium">
            45-minute strategy session • No commitment required • Tailored recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
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
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g., CEO, Marketing Director, Project Manager"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Scheduling Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Scheduling Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Time *</Label>
                  <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map(tz => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="projectGoals">What are your main goals for this project? *</Label>
                <Textarea
                  id="projectGoals"
                  placeholder="Describe what you want to achieve, expected outcomes, success metrics..."
                  value={formData.projectGoals}
                  onChange={(e) => handleInputChange('projectGoals', e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentChallenges">What challenges are you currently facing?</Label>
                <Textarea
                  id="currentChallenges"
                  placeholder="Current pain points, obstacles, or problems you need solved..."
                  value={formData.currentChallenges}
                  onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget Range *</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map(range => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeline">Desired Timeline *</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelineOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="specificRequirements">Specific Requirements or Features</Label>
                <Textarea
                  id="specificRequirements"
                  placeholder="Any specific features, integrations, or requirements you need..."
                  value={formData.specificRequirements}
                  onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="text-center space-y-4">
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="btn-gradient-glow text-lg px-8 py-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule My Free Consultation
                </>
              )}
            </Button>
            
            <p className="text-sm text-gray-medium">
              We'll send you a calendar invite within 24 hours with meeting details and preparation materials.
            </p>
            
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setLocation(`/payment-options/${serviceId}`)}
                className="text-teal-primary hover:text-teal-600"
              >
                Skip consultation and proceed to payment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}