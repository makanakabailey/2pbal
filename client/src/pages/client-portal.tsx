import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, CheckCircle, Clock, AlertCircle, CreditCard, 
  Calendar, FileText, MessageSquare, DollarSign, Shield,
  Users, Zap, Target
} from 'lucide-react';
import { PACKAGES, SERVICES } from '@/lib/constants';

interface ClientPortalProps {
  onOpenCalculator: () => void;
}

export default function ClientPortal({ onOpenCalculator }: ClientPortalProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [, params] = useRoute('/client-portal/:type/:id');
  const { type, id } = params || {};
  
  // Initial demo data - everything set at zero until account is created
  const [projectData] = useState({
    id: 'demo_project',
    name: 'Your Project',
    client: 'Your Company',
    services: [],
    package: type === 'package' ? id : null,
    status: 'not-started',
    progress: 0,
    startDate: null,
    estimatedCompletion: null,
    totalCost: 0,
    paidAmount: 0,
    nextPayment: {
      amount: 0,
      dueDate: null
    },
    milestones: [
      { id: 1, name: 'Project Setup', status: 'pending', progress: 0, completedDate: null },
      { id: 2, name: 'Discovery & Planning', status: 'pending', progress: 0, completedDate: null },
      { id: 3, name: 'Design & Development', status: 'pending', progress: 0, completedDate: null },
      { id: 4, name: 'Testing & Review', status: 'pending', progress: 0, completedDate: null },
      { id: 5, name: 'Launch & Delivery', status: 'pending', progress: 0, completedDate: null }
    ],
    timeline: [
      { date: 'TBD', event: 'Awaiting project initiation', type: 'pending' }
    ]
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-lime-primary" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-lime-primary text-white">Completed</Badge>;
      case 'in-progress': return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', description: 'Visa, MasterCard, American Express', icon: CreditCard },
    { id: 'bank', name: 'Bank Transfer', description: 'Direct bank transfer (ACH)', icon: Shield },
    { id: 'paypal', name: 'PayPal', description: 'Pay with your PayPal account', icon: DollarSign }
  ];

  if (!type || !id) {
    return (
      <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-dark">Invalid Portal Link</h1>
            <p className="text-gray-medium mb-6">Please check your portal URL or contact support.</p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-light">
      {/* Header */}
      <section className="py-6 sm:py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Home</span>
                </Button>
              </Link>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-dark truncate">{projectData.name}</h1>
                <p className="text-gray-medium text-sm sm:text-base">Client Portal - {projectData.client}</p>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
              {getStatusBadge(projectData.status)}
              <p className="text-xs sm:text-sm text-gray-medium mt-1">
                {projectData.progress}% Complete
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4 py-2">Overview</TabsTrigger>
              <TabsTrigger value="progress" className="text-xs sm:text-sm px-2 sm:px-4 py-2">Progress</TabsTrigger>
              <TabsTrigger value="payments" className="text-xs sm:text-sm px-2 sm:px-4 py-2">Payments</TabsTrigger>
              <TabsTrigger value="communication" className="text-xs sm:text-sm px-2 sm:px-4 py-2">Updates</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Project Summary */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-teal-primary" />
                      Project Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-dark">Services Included</p>
                        <div className="mt-2 space-y-1">
                          {projectData.services.map(serviceId => {
                            const service = SERVICES.find(s => s.id === serviceId);
                            return service ? (
                              <Badge key={serviceId} variant="outline" className="mr-2">
                                {service.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-dark">Timeline</p>
                        <p className="text-gray-medium">
                          Started: {projectData.startDate ? new Date(projectData.startDate).toLocaleDateString() : 'Not started'}
                        </p>
                        <p className="text-gray-medium">
                          Est. Completion: {projectData.estimatedCompletion ? new Date(projectData.estimatedCompletion).toLocaleDateString() : 'TBD'}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-dark">Overall Progress</p>
                        <span className="text-sm text-gray-medium">{projectData.progress}%</span>
                      </div>
                      <Progress value={projectData.progress} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-lime-primary" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-medium">Total Investment</span>
                        <span className="font-semibold">${projectData.totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-medium">Amount Paid</span>
                        <span className="font-semibold text-lime-primary">${projectData.paidAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-medium">Remaining</span>
                        <span className="font-semibold">${(projectData.totalCost - projectData.paidAmount).toLocaleString()}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <span className="text-gray-medium">Next Payment</span>
                        <div className="text-right">
                          <p className="font-semibold">${projectData.nextPayment.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-medium">{projectData.nextPayment.dueDate ? new Date(projectData.nextPayment.dueDate).toLocaleDateString() : 'TBD'}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-dark">{milestone.name}</h4>
                            {getStatusBadge(milestone.status)}
                          </div>
                          {milestone.status === 'in-progress' && (
                            <div className="mt-2">
                              <div className="flex justify-between text-sm text-gray-medium mb-1">
                                <span>Progress</span>
                                <span>{milestone.progress}%</span>
                              </div>
                              <Progress value={milestone.progress} className="h-2" />
                            </div>
                          )}
                          {milestone.completedDate && (
                            <p className="text-sm text-gray-medium mt-1">
                              Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-teal-primary" />
                      Payment Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-lime-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-dark">Initial Payment</p>
                          <p className="text-sm text-gray-medium">Project Start - Paid</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lime-primary">$6,250</p>
                          <p className="text-xs text-gray-medium">Dec 15, 2024</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div>
                          <p className="font-medium text-gray-dark">Milestone Payment</p>
                          <p className="text-sm text-gray-medium">50% Complete - Due Soon</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">$3,125</p>
                          <p className="text-xs text-gray-medium">Jan 15, 2025</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-dark">Final Payment</p>
                          <p className="text-sm text-gray-medium">Project Completion</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">$3,125</p>
                          <p className="text-xs text-gray-medium">Feb 15, 2025</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-teal-primary text-white hover:bg-teal-600">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Make Payment
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <IconComponent className="h-6 w-6 text-teal-primary" />
                          <div>
                            <p className="font-medium text-gray-dark">{method.name}</p>
                            <p className="text-sm text-gray-medium">{method.description}</p>
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="bg-lime-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-dark mb-2">Secure Payment Processing</h4>
                      <p className="text-sm text-gray-medium">
                        All payments are processed securely through encrypted channels. 
                        We never store your payment information.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-teal-primary" />
                    Project Timeline & Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full mt-2 ${
                            item.type === 'completed' ? 'bg-lime-primary' :
                            item.type === 'payment' ? 'bg-green-500' :
                            item.type === 'payment-due' ? 'bg-red-500' :
                            item.type === 'update' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`} />
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-dark">{item.event}</p>
                            <span className="text-sm text-gray-medium">
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.type.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}