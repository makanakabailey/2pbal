import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

interface ContactPopupProps {
  children: React.ReactNode;
}

export function ContactPopup({ children }: ContactPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      value: "infodesk@2pbal.online",
      href: "mailto:infodesk@2pbal.online",
      description: "General inquiries and support",
      color: "bg-teal-primary"
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "+1 (682) 284-4934",
      href: "tel:+16822844934",
      description: "Direct line for immediate assistance",
      color: "bg-blue-600"
    },
    {
      icon: Mail,
      title: "Career Inquiries",
      value: "recruitment@2pbal.site",
      href: "mailto:recruitment@2pbal.site",
      description: "Job applications and career opportunities",
      color: "bg-purple-600"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-dark">Contact 2PBAL</DialogTitle>
          <DialogDescription>
            Get in touch with our team for support, inquiries, or career opportunities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-1 gap-4">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-dark">{method.title}</h3>
                            <p className="text-sm text-gray-medium">{method.description}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={method.href}
                              className="flex items-center space-x-2"
                              target={method.href.startsWith('mailto:') ? '_blank' : undefined}
                              rel={method.href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
                            >
                              <span>{method.value}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-teal-primary" />
                Business Hours
              </CardTitle>
              <CardDescription>
                Our team is available during these hours for immediate support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-dark">{schedule.day}</span>
                    <span className="text-gray-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-700">
                For urgent technical issues outside business hours, please email{' '}
                <a 
                  href="mailto:infodesk@2pbal.online" 
                  className="font-semibold underline hover:no-underline"
                >
                  infodesk@2pbal.online
                </a>{' '}
                with "URGENT" in the subject line. We'll respond within 4 hours.
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" asChild>
              <a href="/quote">
                Get Free Quote
              </a>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href="/schedule-consultation">
                Schedule Consultation
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}