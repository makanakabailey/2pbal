import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  ExternalLink,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Subscription {
  id: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  amount: number;
  interval: 'month' | 'year';
  cancelAtPeriodEnd: boolean;
  createdAt: string;
}

interface Customer {
  id: string;
  email: string;
  name: string;
  subscriptions: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1234567890",
    customerId: "cus_1234567890",
    customerEmail: "john@example.com",
    customerName: "John Doe",
    planName: "Professional Plan",
    status: "active",
    currentPeriodStart: "2025-01-01",
    currentPeriodEnd: "2025-02-01",
    amount: 99,
    interval: "month",
    cancelAtPeriodEnd: false,
    createdAt: "2024-12-01"
  },
  {
    id: "sub_1234567891",
    customerId: "cus_1234567891",
    customerEmail: "jane@example.com",
    customerName: "Jane Smith",
    planName: "Enterprise Plan",
    status: "active",
    currentPeriodStart: "2025-01-01",
    currentPeriodEnd: "2025-02-01",
    amount: 299,
    interval: "month",
    cancelAtPeriodEnd: false,
    createdAt: "2024-11-15"
  },
  {
    id: "sub_1234567892",
    customerId: "cus_1234567892",
    customerEmail: "bob@example.com",
    customerName: "Bob Johnson",
    planName: "Basic Plan",
    status: "past_due",
    currentPeriodStart: "2025-01-01",
    currentPeriodEnd: "2025-02-01",
    amount: 29,
    interval: "month",
    cancelAtPeriodEnd: false,
    createdAt: "2024-10-20"
  }
];

const mockCustomers: Customer[] = [
  {
    id: "cus_1234567890",
    email: "john@example.com",
    name: "John Doe",
    subscriptions: 1,
    totalSpent: 995,
    status: "active"
  },
  {
    id: "cus_1234567891",
    email: "jane@example.com",
    name: "Jane Smith",
    subscriptions: 1,
    totalSpent: 2990,
    status: "active"
  },
  {
    id: "cus_1234567892",
    email: "bob@example.com",
    name: "Bob Johnson",
    subscriptions: 1,
    totalSpent: 145,
    status: "inactive"
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

export default function AdminSubscriptionManagement() {
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [newSubscription, setNewSubscription] = useState({
    customerEmail: "",
    planId: "",
    interval: "month" as "month" | "year"
  });
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      canceled: "destructive",
      past_due: "destructive",
      trialing: "secondary",
      incomplete: "secondary"
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

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubscription = () => {
    if (!newSubscription.customerEmail || !newSubscription.planId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // API call would go here
    toast({
      title: "Subscription Created",
      description: "New subscription has been created successfully"
    });
    setShowCreateDialog(false);
    setNewSubscription({ customerEmail: "", planId: "", interval: "month" });
  };

  const handleUpdateSubscription = () => {
    if (!selectedSubscription) return;

    // API call would go here
    toast({
      title: "Subscription Updated",
      description: "Subscription has been updated successfully"
    });
    setShowUpdateDialog(false);
    setSelectedSubscription(null);
  };

  const handleCancelSubscription = (subscriptionId: string) => {
    // API call would go here
    toast({
      title: "Subscription Canceled",
      description: "Subscription has been canceled successfully"
    });
  };

  const handleCreatePortalSession = (customerId: string) => {
    // API call would go here
    toast({
      title: "Portal Session Created",
      description: "Customer portal session created successfully"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalRevenue = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => total + sub.amount, 0);
  };

  const getActiveSubscriptions = () => {
    return subscriptions.filter(sub => sub.status === 'active').length;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">Manage customer subscriptions and billing</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subscription</DialogTitle>
              <DialogDescription>
                Create a new subscription for a customer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  value={newSubscription.customerEmail}
                  onChange={(e) => setNewSubscription(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="customer@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Plan</Label>
                <Select value={newSubscription.planId} onValueChange={(value) => setNewSubscription(prev => ({ ...prev, planId: value }))}>
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSubscription}>
                Create Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveSubscriptions()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(getTotalRevenue())}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
                <SelectItem value="trialing">Trialing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subscriptions Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Current Period</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subscription.customerName}</div>
                          <div className="text-sm text-muted-foreground">{subscription.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{subscription.planName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(subscription.status)}
                          {getStatusBadge(subscription.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatAmount(subscription.amount)}</div>
                          <div className="text-sm text-muted-foreground">per {subscription.interval}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(subscription.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedSubscription(subscription);
                              setShowUpdateDialog(true);
                            }}>
                              <Edit className="h-4 w-4 mr-2" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCreatePortalSession(subscription.customerId)}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Portal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCancelSubscription(subscription.id)}>
                              <Trash className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>Manage customer accounts and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subscriptions</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.subscriptions}</TableCell>
                      <TableCell>{formatAmount(customer.totalSpent)}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCreatePortalSession(customer.id)}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Portal
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly recurring revenue and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Revenue analytics coming soon</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Trends</CardTitle>
                <CardDescription>New subscriptions and churn rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Subscription trends coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Update Subscription Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Subscription</DialogTitle>
            <DialogDescription>
              Update the subscription plan for {selectedSubscription?.customerName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Plan</Label>
              <div className="text-sm text-muted-foreground">
                {selectedSubscription?.planName} - {formatAmount(selectedSubscription?.amount || 0)}/{selectedSubscription?.interval}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPlan">New Plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a new plan" />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSubscription}>
              Update Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}