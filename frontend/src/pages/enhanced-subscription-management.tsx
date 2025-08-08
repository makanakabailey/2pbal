import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { CreditCard, Calendar, DollarSign, ExternalLink, Download, AlertCircle, Settings, TrendingUp, Package } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";

interface Subscription {
  id: string;
  stripeSubscriptionId: string;
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

interface Invoice {
  id: string;
  amount_paid: number;
  currency: string;
  status: string;
  created: number;
  invoice_pdf?: string;
  hosted_invoice_url?: string;
  number?: string;
}

interface SubscriptionsResponse {
  subscriptions: Subscription[];
}

interface InvoicesResponse {
  invoices: Invoice[];
}

const PLAN_OPTIONS = [
  { id: 'price_basic', name: 'Basic Plan', price: 2900, description: 'Essential features for small businesses' },
  { id: 'price_professional', name: 'Professional Plan', price: 9900, description: 'Advanced features for growing businesses' },
  { id: 'price_enterprise', name: 'Enterprise Plan', price: 29900, description: 'Complete solution for large organizations' },
];

export default function EnhancedSubscriptionManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscriptions, isLoading: subscriptionsLoading } = useQuery<SubscriptionsResponse>({
    queryKey: ["/api/subscriptions"],
    enabled: !!user,
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery<InvoicesResponse>({
    queryKey: ["/api/subscriptions/invoices"],
    enabled: !!user,
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: async ({ subscriptionId, cancelAtPeriodEnd }: { subscriptionId: string; cancelAtPeriodEnd: boolean }) =>
      apiRequest("POST", "/api/subscriptions/cancel", { subscriptionId, cancelAtPeriodEnd }),
    onSuccess: () => {
      toast({
        title: "Subscription Updated",
        description: "Your subscription has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update subscription",
        variant: "destructive",
      });
    },
  });

  const updateSubscriptionMutation = useMutation({
    mutationFn: async ({ subscriptionId, newPriceId }: { subscriptionId: string; newPriceId: string }) =>
      apiRequest("PUT", "/api/subscriptions/update", { subscriptionId, newPriceId }),
    onSuccess: () => {
      toast({
        title: "Plan Updated",
        description: "Your subscription plan has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update plan",
        variant: "destructive",
      });
    },
  });

  const createPortalSessionMutation = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/subscriptions/portal"),
    onSuccess: (data: any) => {
      window.location.href = data.url;
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to open customer portal",
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

  const getPlanName = (packageType: string) => {
    const plan = PLAN_OPTIONS.find(p => p.name.toLowerCase().includes(packageType?.toLowerCase()));
    return plan?.name || packageType || 'Unknown Plan';
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please log in to view your subscriptions</h1>
          <Button asChild className="mt-4">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const activeSubscriptions = subscriptions?.subscriptions?.filter((sub: Subscription) => 
    ['active', 'trialing'].includes(sub.status)
  ) || [];

  const totalMonthlySpend = activeSubscriptions.reduce((total: number, sub: Subscription) => {
    const monthlyAmount = sub.interval === 'year' ? sub.amount / 12 : sub.amount;
    return total + monthlyAmount;
  }, 0);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">Manage your subscriptions and billing</p>
        </div>
        <Button 
          onClick={() => createPortalSessionMutation.mutate()}
          disabled={createPortalSessionMutation.isPending}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ExternalLink size={16} />
          Customer Portal
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {subscriptions?.subscriptions?.length || 0} total subscriptions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMonthlySpend)}</div>
            <p className="text-xs text-muted-foreground">
              Estimated monthly cost
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeSubscriptions.length > 0 
                ? format(new Date(Math.min(...activeSubscriptions.map((sub: Subscription) => new Date(sub.currentPeriodEnd).getTime()))), 'MMM dd')
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Next charge date
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          {subscriptionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : subscriptions?.subscriptions?.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">No Active Subscriptions</h3>
                    <p className="text-muted-foreground">You don't have any active subscriptions yet.</p>
                  </div>
                  <Button asChild>
                    <Link href="/packages">Browse Plans</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions?.subscriptions?.map((subscription: Subscription) => (
                <Card key={subscription.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{getPlanName(subscription.packageType)}</CardTitle>
                      {getStatusBadge(subscription.status)}
                    </div>
                    <CardDescription>
                      {formatCurrency(subscription.amount, subscription.currency)} / {subscription.interval}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={16} />
                        <span>
                          Next billing: {format(new Date(subscription.currentPeriodEnd), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp size={16} />
                        <span>
                          Since: {format(new Date(subscription.createdAt), 'MMM yyyy')}
                        </span>
                      </div>
                    </div>

                    {subscription.cancelAtPeriodEnd && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md dark:bg-yellow-900/20 dark:border-yellow-800">
                        <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
                          <AlertCircle size={16} />
                          <span>Cancels at period end</span>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-2">
                      {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Change Plan</label>
                          <Select onValueChange={(newPriceId) => {
                            if (newPriceId) {
                              updateSubscriptionMutation.mutate({
                                subscriptionId: subscription.stripeSubscriptionId,
                                newPriceId
                              });
                            }
                          }}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select new plan" />
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
                      )}
                      
                      <div className="flex flex-col gap-2">
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
                            Cancel at Period End
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
                            Reactivate Subscription
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {invoicesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !invoices?.invoices || invoices?.invoices?.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">No Billing History</h3>
                    <p className="text-muted-foreground">You don't have any invoices yet.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {invoices?.invoices?.map((invoice: Invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            Invoice #{invoice.number || invoice.id.slice(-8).toUpperCase()}
                          </span>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {format(new Date(invoice.created * 1000), 'MMM dd, yyyy')}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign size={14} />
                            {formatCurrency(invoice.amount_paid, invoice.currency)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {invoice.hosted_invoice_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={14} />
                              View
                            </a>
                          </Button>
                        )}
                        {invoice.invoice_pdf && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                              <Download size={14} />
                              PDF
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}