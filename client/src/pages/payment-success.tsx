import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Calendar, FileText } from 'lucide-react';

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // You could track payment success analytics here
    console.log('Payment completed successfully');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-dark mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-medium">
            Thank you for choosing 2Pbal. Your project will begin soon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                What Happens Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Project Setup (1-2 days)</h4>
                    <p className="text-sm text-gray-medium">We'll prepare your project workspace and assign your dedicated team.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Kickoff Call (Within 3 days)</h4>
                    <p className="text-sm text-gray-medium">Schedule your project kickoff call to discuss requirements and timeline.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Project Begins</h4>
                    <p className="text-sm text-gray-medium">Your team starts working and you'll receive regular progress updates.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Email Confirmation</h4>
                  <p className="text-sm text-gray-medium">
                    You'll receive a detailed email confirmation with payment receipt and project details within 10 minutes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Client Portal Access</h4>
                  <p className="text-sm text-gray-medium">
                    Your project dashboard is now active. Track progress, communicate with your team, and access all project files.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">30-Day Guarantee</h4>
                  <p className="text-sm text-gray-medium">
                    If you're not completely satisfied within 30 days, we'll refund your payment, no questions asked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation('/dashboard')}
              className="btn-gradient-glow"
            >
              Access Your Project Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <Button
              onClick={() => setLocation('/services')}
              variant="outline"
              className="border-teal-primary text-teal-primary hover:bg-teal-50"
            >
              Browse More Services
            </Button>
          </div>
          
          <p className="text-sm text-gray-medium">
            Questions? Contact us at hello@2pbal.com or call +1 (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
}