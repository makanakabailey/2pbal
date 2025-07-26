import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Briefcase, MapPin, Clock, DollarSign, Code, Users, 
  Megaphone, BarChart3, Shield, Mail, Upload 
} from 'lucide-react';

export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { toast } = useToast();
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setApplicationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setApplicationForm(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send to your recruitment API
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll review your application and get back to you soon.",
    });
    
    // Reset form
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      coverLetter: '',
      resume: null
    });
  };

  const jobCategories = [
    {
      title: "Technology & Development",
      icon: Code,
      color: "bg-blue-600",
      positions: [
        { title: "Full Stack Developer", type: "Full-time", location: "Remote", salary: "$60k-$90k" },
        { title: "Frontend Developer", type: "Full-time", location: "Remote", salary: "$50k-$75k" },
        { title: "Backend Developer", type: "Full-time", location: "Remote", salary: "$55k-$80k" },
        { title: "DevOps Engineer", type: "Full-time", location: "Remote", salary: "$70k-$95k" },
        { title: "UI/UX Designer", type: "Full-time", location: "Remote", salary: "$45k-$70k" }
      ]
    },
    {
      title: "Business & Strategy",
      icon: BarChart3,
      color: "bg-teal-600",
      positions: [
        { title: "Business Development Manager", type: "Full-time", location: "Hybrid", salary: "$55k-$85k" },
        { title: "Project Manager", type: "Full-time", location: "Remote", salary: "$50k-$75k" },
        { title: "Business Analyst", type: "Full-time", location: "Remote", salary: "$45k-$70k" },
        { title: "Strategy Consultant", type: "Contract", location: "Remote", salary: "$40-$80/hr" }
      ]
    },
    {
      title: "Marketing & Sales",
      icon: Megaphone,
      color: "bg-lime-600",
      positions: [
        { title: "Digital Marketing Specialist", type: "Full-time", location: "Remote", salary: "$40k-$65k" },
        { title: "Content Creator", type: "Part-time", location: "Remote", salary: "$25k-$40k" },
        { title: "Sales Representative", type: "Full-time", location: "Remote", salary: "$35k-$60k + Commission" },
        { title: "SEO Specialist", type: "Contract", location: "Remote", salary: "$30-$50/hr" }
      ]
    },
    {
      title: "Customer Success",
      icon: Users,
      color: "bg-purple-600",
      positions: [
        { title: "Customer Success Manager", type: "Full-time", location: "Remote", salary: "$45k-$70k" },
        { title: "Technical Support Specialist", type: "Full-time", location: "Remote", salary: "$35k-$55k" },
        { title: "Account Manager", type: "Full-time", location: "Remote", salary: "$40k-$65k" }
      ]
    },
    {
      title: "Operations & Security",
      icon: Shield,
      color: "bg-gray-600",
      positions: [
        { title: "Operations Manager", type: "Full-time", location: "Hybrid", salary: "$50k-$75k" },
        { title: "Cybersecurity Analyst", type: "Full-time", location: "Remote", salary: "$60k-$90k" },
        { title: "Quality Assurance Tester", type: "Full-time", location: "Remote", salary: "$40k-$60k" }
      ]
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-light">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-teal-primary to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-sky-300">
            Join the 2PBAL Team
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-sky-300">
            Help us empower small businesses worldwide with innovative digital solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:recruitment@2pbal.site" className="inline-flex items-center">
              <Button size="lg" variant="secondary">
                <Mail className="h-5 w-5 mr-2" />
                recruitment@2pbal.site
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Why Choose 2PBAL?</h2>
            <p className="text-xl text-gray-medium max-w-2xl mx-auto">
              Be part of a mission-driven company that's making a real impact on small businesses worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-teal-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Remote-First Culture</h3>
              <p className="text-sm text-gray-medium">
                Work from anywhere with flexible schedules and work-life balance.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-lime-primary rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Growth Opportunities</h3>
              <p className="text-sm text-gray-medium">
                Continuous learning, skill development, and career advancement paths.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Competitive Benefits</h3>
              <p className="text-sm text-gray-medium">
                Competitive salaries, health insurance, and performance bonuses.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-dark mb-2">Meaningful Work</h3>
              <p className="text-sm text-gray-medium">
                Make a real impact helping small businesses succeed and grow.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Current Openings</h2>
            <p className="text-xl text-gray-medium">
              Explore opportunities across different departments and find your perfect fit.
            </p>
          </div>

          <div className="space-y-8">
            {jobCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <CardDescription>{category.positions.length} open positions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.positions.map((position, posIndex) => (
                        <Card key={posIndex} className="p-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-dark">{position.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {position.type}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <MapPin className="h-3 w-3 mr-1" />
                                {position.location}
                              </Badge>
                            </div>
                            <p className="text-sm text-teal-primary font-medium">
                              {position.salary}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Apply Now</h2>
            <p className="text-xl text-gray-medium">
              Ready to join our team? Submit your application below.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Job Application</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={applicationForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={applicationForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position Applied For *</Label>
                    <Input
                      id="position"
                      value={applicationForm.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      placeholder="e.g., Full Stack Developer"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={applicationForm.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="e.g., 3-5 years"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter">Cover Letter *</Label>
                  <Textarea
                    id="coverLetter"
                    value={applicationForm.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume/CV</Label>
                  <div className="mt-2">
                    <Input
                      id="resume"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button type="submit" size="lg" className="bg-teal-primary hover:bg-teal-600">
                    <Upload className="h-5 w-5 mr-2" />
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-gray-medium">
              Questions about a position? Email us at{' '}
              <a 
                href="mailto:recruitment@2pbal.site" 
                className="text-teal-primary hover:underline font-medium"
              >
                recruitment@2pbal.site
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}