import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  FileText, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  id: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  amount: number;
  interval: 'month' | 'year';
  cancelAtPeriodEnd: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  downloadUrl?: string;
}

const mockSubscription: Subscription = {
  id: "sub_1234567890",
  planName: "Professional Plan",
  status: "active",
  currentPeriodStart: "2025-01-01",
  currentPeriodEnd: "2025-02-01",
  amount: 99,
  interval: "month",
  cancelAtPeriodEnd: false
};

const mockInvoices: Invoice[] = [
  {
    id: "in_1234567890",
    date: "2025-01-01",
    amount: 99,
    status: "paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "in_1234567891",
    date: "2024-12-01",
    amount: 99,
    status: "paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "in_1234567892",
    date: "2024-11-01",
    amount: 99,
    status: "paid",
    description: "Professional Plan - Monthly"
  }
];

const plans = [
  { id: "basic", name: "Basic Plan", price: 29, interval: "month" as const },
  { id: "professional", name: "Professional Plan", price: 99, interval: "month" as const },
  { id: "enterprise", name: "Enterprise Plan", price: 299, interval: "month" as const },
  { id: "basic-yearly", name: "Basic Plan (Yearly)", price: 290, interval: "year" as const },
  { id: "professional-yearly", name: "Professional Plan (Yearly)", price: 990, interval: "year" as const },
  { id: "enterprise-yearly", name: "Enterprise Plan (Yearly)", price: 2990, interval: "year" as const }
];

export default function SubscriptionManagement() {
  const [subscription] = useState<Subscription>(mockSubscription);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      canceled: "destructive",
      past_due: "destructive",
      trialing: "secondary"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'trialing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const handleUpdateSubscription = () => {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a plan to update to",
        variant: "destructive"
      });
      return;
    }

    // API call would go here
    toast({
      title: "Subscription Updated",
      description: "Your subscription plan has been updated successfully"
    });
    setShowUpdateDialog(false);
  };

  const handleCancelSubscription = () => {
    // API call would go here
    toast({
      title: "Subscription Canceled",
      description: "Your subscription has been canceled and will end at the current period"
    });
    setShowCancelDialog(false);
  };

  const handleCreatePortalSession = () => {
    // API call would go here
    toast({
      title: "Redirecting",
      description: "Opening customer portal..."
    });
    // window.open(portalUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">Manage your subscription, billing, and invoices</p>
        </div>
        <Button onClick={handleCreatePortalSession} variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Customer Portal
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Billing History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Subscription
              </CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{subscription.planName}</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(subscription.status)}
                    {getStatusBadge(subscription.status)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {formatAmount(subscription.amount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per {subscription.interval}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Current Period</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Next Billing Date</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(subscription.currentPeriodEnd)}
                    </div>
                  </div>
                </div>
              </div>

              {subscription.cancelAtPeriodEnd && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div className="text-sm">
                    Your subscription will cancel at the end of the current period.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Settings className="h-5 w-5" />
                  Update Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Subscription Plan</DialogTitle>
                  <DialogDescription>
                    Choose a new plan for your subscription. Changes will take effect immediately.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - {formatAmount(plan.price)}/{plan.interval}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateSubscription}>
                    Update Plan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Cancel Subscription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Subscription</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel your subscription? You'll still have access until the end of your current billing period.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Keep Subscription
                  </Button>
                  <Button variant="destructive" onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Billing History
              </CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{formatAmount(invoice.amount)}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                          {invoice.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Settings</CardTitle>
              <CardDescription>Manage your subscription preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Payment Method</h4>
                <p className="text-sm text-muted-foreground">
                  Manage your payment methods through the customer portal
                </p>
                <Button variant="outline" onClick={handleCreatePortalSession}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Payment Method
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Billing Address</h4>
                <p className="text-sm text-muted-foreground">
                  Update your billing address through the customer portal
                </p>
                <Button variant="outline" onClick={handleCreatePortalSession}>
                  <Settings className="h-4 w-4 mr-2" />
                  Update Billing Address
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Download Invoices</h4>
                <p className="text-sm text-muted-foreground">
                  Access all your invoices and receipts
                </p>
                <Button variant="outline" onClick={handleCreatePortalSession}>
                  <FileText className="h-4 w-4 mr-2" />
                  View All Invoices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}