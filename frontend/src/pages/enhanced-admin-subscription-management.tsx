import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { CreditCard, Calendar, DollarSign, Users, TrendingUp, Package, Plus, Settings, Search, Filter } from "lucide-react";
import { format } from "date-fns";

interface AdminSubscription {
  id: string;
  stripeSubscriptionId: string;
  customerName: string;
  customerEmail: string;
  status: string;
  packageType: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  currency: string;
  interval: string;
  createdAt: string;
}

interface CreateSubscriptionForm {
  customerEmail: string;
  priceId: string;
  packageType: string;
}

interface AdminSubscriptionsResponse {
  subscriptions: AdminSubscription[];
}

const PLAN_OPTIONS = [
  { id: 'price_basic', name: 'Basic Plan', price: 2900, packageType: 'basic' },
  { id: 'price_professional', name: 'Professional Plan', price: 9900, packageType: 'professional' },
  { id: 'price_enterprise', name: 'Enterprise Plan', price: 29900, packageType: 'enterprise' },
];

export default function EnhancedAdminSubscriptionManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateSubscriptionForm>({
    customerEmail: "",
    priceId: "",
    packageType: ""
  });

  const { data: subscriptions, isLoading: subscriptionsLoading } = useQuery<AdminSubscriptionsResponse>({
    queryKey: ["/api/admin/subscriptions"],
    enabled: !!user && user.role === 'admin',
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: async (data: CreateSubscriptionForm) =>
      apiRequest("POST", "/api/admin/subscriptions/create", data),
    onSuccess: () => {
      toast({
        title: "Subscription Created",
        description: "New subscription has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscriptions"] });
      setIsCreateDialogOpen(false);
      setCreateForm({ customerEmail: "", priceId: "", packageType: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      });
    },
  });

  const updateSubscriptionMutation = useMutation({
    mutationFn: async ({ subscriptionId, newPriceId }: { subscriptionId: string; newPriceId: string }) =>
      apiRequest("PUT", `/api/admin/subscriptions/${subscriptionId}/update`, { newPriceId }),
    onSuccess: () => {
      toast({
        title: "Subscription Updated",
        description: "Subscription has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscriptions"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update subscription",
        variant: "destructive",
      });
    },
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: async ({ subscriptionId, cancelAtPeriodEnd }: { subscriptionId: string; cancelAtPeriodEnd: boolean }) =>
      apiRequest("POST", `/api/admin/subscriptions/${subscriptionId}/cancel`, { cancelAtPeriodEnd }),
    onSuccess: () => {
      toast({
        title: "Subscription Updated",
        description: "Subscription has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscriptions"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update subscription",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      trialing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      past_due: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      unpaid: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    return (
      <Badge variant="secondary" className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const allSubscriptions = subscriptions?.subscriptions || [];
  const filteredSubscriptions = allSubscriptions.filter((sub: AdminSubscription) => {
    const matchesSearch = 
      sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.packageType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const activeSubscriptions = allSubscriptions.filter((sub: AdminSubscription) => 
    ['active', 'trialing'].includes(sub.status)
  );

  const totalRevenue = allSubscriptions.reduce((total: number, sub: AdminSubscription) => {
    if (['active', 'trialing'].includes(sub.status)) {
      const monthlyAmount = sub.interval === 'year' ? sub.amount / 12 : sub.amount;
      return total + monthlyAmount;
    }
    return total;
  }, 0);

  const uniqueCustomers = new Set(allSubscriptions.map(sub => sub.customerEmail)).size;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Subscription Management</h1>
          <p className="text-muted-foreground">Manage all customer subscriptions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subscription</DialogTitle>
              <DialogDescription>
                Create a new subscription for an existing customer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={createForm.customerEmail}
                  onChange={(e) => setCreateForm({ ...createForm, customerEmail: e.target.value })}
                  placeholder="customer@example.com"
                />
              </div>
              <div>
                <Label htmlFor="plan">Plan</Label>
                <Select 
                  value={createForm.priceId} 
                  onValueChange={(value) => {
                    const plan = PLAN_OPTIONS.find(p => p.id === value);
                    setCreateForm({ 
                      ...createForm, 
                      priceId: value,
                      packageType: plan?.packageType || ""
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLAN_OPTIONS.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name} - {formatCurrency(plan.price)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => createSubscriptionMutation.mutate(createForm)}
                disabled={createSubscriptionMutation.isPending || !createForm.customerEmail || !createForm.priceId}
              >
                Create Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeSubscriptions.length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Recurring monthly revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Unique customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trialing">Trialing</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {subscriptionsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription: AdminSubscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subscription.customerName}</div>
                          <div className="text-sm text-muted-foreground">{subscription.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{subscription.packageType}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(subscription.status)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(subscription.amount, subscription.currency)} / {subscription.interval}
                      </TableCell>
                      <TableCell>
                        {format(new Date(subscription.currentPeriodEnd), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        {format(new Date(subscription.createdAt), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select onValueChange={(newPriceId) => {
                            if (newPriceId) {
                              updateSubscriptionMutation.mutate({
                                subscriptionId: subscription.stripeSubscriptionId,
                                newPriceId
                              });
                            }
                          }}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Change plan" />
                            </SelectTrigger>
                            <SelectContent>
                              {PLAN_OPTIONS.map((plan) => (
                                <SelectItem key={plan.id} value={plan.id}>
                                  {plan.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {!subscription.cancelAtPeriodEnd ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                cancelSubscriptionMutation.mutate({
                                  subscriptionId: subscription.stripeSubscriptionId,
                                  cancelAtPeriodEnd: true,
                                })
                              }
                              disabled={cancelSubscriptionMutation.isPending}
                            >
                              Cancel
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                cancelSubscriptionMutation.mutate({
                                  subscriptionId: subscription.stripeSubscriptionId,
                                  cancelAtPeriodEnd: false,
                                })
                              }
                              disabled={cancelSubscriptionMutation.isPending}
                            >
                              Reactivate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No subscriptions found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}