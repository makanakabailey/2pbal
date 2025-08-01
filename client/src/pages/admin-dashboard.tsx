import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, Activity, Shield, User, Clock, Mail, Phone, Building, Eye, 
  MoreVertical, UserX, Trash2, UserCheck, AlertTriangle, CreditCard 
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [activityLimit, setActivityLimit] = useState(100);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [blockUserId, setBlockUserId] = useState<number | null>(null);

  // Get all users (admin only)
  const { data: allUsers, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  // Get activity logs
  const { data: activityLogs, isLoading: logsLoading } = useQuery({
    queryKey: ["/api/admin/activity-logs", selectedUserId, activityLimit],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedUserId) params.append('userId', selectedUserId.toString());
      params.append('limit', activityLimit.toString());
      return apiRequest(`/api/admin/activity-logs?${params}`);
    },
  });

  // Get quotes for admin view
  const { data: allQuotes, isLoading: quotesLoading } = useQuery({
    queryKey: ["/api/quotes"],
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: number; role: string }) => 
      apiRequest(`/api/admin/users/${userId}/role`, "PUT", { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User role updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleRoleChange = (userId: number, newRole: string) => {
    updateRoleMutation.mutate({ userId, role: newRole });
  };

  // Block/Unblock user mutation
  const blockUserMutation = useMutation({
    mutationFn: ({ userId, isActive }: { userId: number; isActive: boolean }) => 
      apiRequest(`/api/admin/users/${userId}/status`, "PUT", { isActive }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ 
        title: `User ${variables.isActive ? 'unblocked' : 'blocked'} successfully`,
        description: `The user account has been ${variables.isActive ? 'activated' : 'deactivated'}.`
      });
      setBlockUserId(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => 
      apiRequest(`/api/admin/users/${userId}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ 
        title: "User deleted successfully",
        description: "The user account has been permanently removed."
      });
      setDeleteUserId(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleBlockUser = (userId: number, currentStatus: boolean) => {
    blockUserMutation.mutate({ userId, isActive: !currentStatus });
  };

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      admin: "bg-blue-100 text-blue-800",
      user: "bg-purple-100 text-purple-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const users = allUsers?.users || [];
  const logs = activityLogs?.logs || [];
  const quotes = allQuotes?.quotes || [];

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter((user: any) => user.isActive).length;
  const adminUsers = users.filter((user: any) => user.role === 'admin').length;
  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter((quote: any) => quote.status === 'pending').length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users, monitor activity, and oversee platform operations</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsers} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">
              Admin level access
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">
              {pendingQuotes} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">
              Last {activityLimit} actions
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity Logs
          </TabsTrigger>
          <TabsTrigger value="quotes" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Quote Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="flex items-center justify-center h-32">Loading users...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Profile Status</TableHead>
                        <TableHead>Recommendation</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                  <img 
                                    src={user.avatar} 
                                    alt="Avatar" 
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <User className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="h-3 w-3 mr-1" />
                                {user.email}
                              </div>
                              {user.phone && (
                                <div className="flex items-center text-sm text-gray-500">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {user.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {user.company && (
                                <div className="flex items-center text-sm">
                                  <Building className="h-3 w-3 mr-1" />
                                  {user.company}
                                </div>
                              )}
                              {user.industry && (
                                <div className="text-xs text-gray-500">
                                  {user.industry}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge variant={user.profileComplete ? "default" : "outline"} className="text-xs">
                                {user.profileComplete ? "✓ Complete" : "Incomplete"}
                              </Badge>
                              {user.companySize && (
                                <div className="text-xs text-gray-500">
                                  Size: {user.companySize}
                                </div>
                              )}
                              {user.preferredBudget && (
                                <div className="text-xs text-gray-500">
                                  Budget: {user.preferredBudget}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {user.recommendedPackage ? (
                                <>
                                  <Badge variant="secondary" className="text-xs">
                                    {user.recommendedPackage}
                                  </Badge>
                                  {user.recommendationScore && (
                                    <div className="text-xs text-gray-500">
                                      Score: {user.recommendationScore}%
                                    </div>
                                  )}
                                </>
                              ) : (
                                <span className="text-xs text-gray-400">No recommendation</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(user.isActive ? 'active' : 'inactive')}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              {user.emailVerified ? '✅' : '❌'}
                              <span className="ml-1">
                                {user.emailVerified ? 'Verified' : 'Unverified'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Clock className="h-3 w-3 mr-1" />
                              {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(user.createdAt)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Select
                                value={user.role}
                                onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                                disabled={updateRoleMutation.isPending}
                              >
                                <SelectTrigger className="w-20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem 
                                    onClick={() => setBlockUserId(user.id)}
                                    className="text-orange-600"
                                  >
                                    {user.isActive ? (
                                      <>
                                        <UserX className="h-4 w-4 mr-2" />
                                        Block User
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Unblock User
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => setDeleteUserId(user.id)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>Full subscription management features available on dedicated page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Comprehensive Subscription Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Access the full subscription management system with customer portal creation, 
                    subscription updates, billing history, and analytics.
                  </p>
                  <Button onClick={() => window.location.href = '/admin-subscription-management'}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Open Subscription Management
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>File Management</CardTitle>
                <CardDescription>Cloudinary cloud storage management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <svg className="h-12 w-12 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 13h10M7 17h10" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">Cloud File Storage</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage all uploaded files from quotes and forms. View, organize, and delete files stored in Cloudinary.
                  </p>
                  <Button onClick={() => window.location.href = '/admin-file-management'}>
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 13h10M7 17h10" />
                    </svg>
                    Open File Management
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>Monitor user actions and system events</CardDescription>
              <div className="flex space-x-4">
                <div>
                  <Label htmlFor="userFilter">Filter by User</Label>
                  <Select
                    value={selectedUserId?.toString() || "all"}
                    onValueChange={(value) => setSelectedUserId(value === "all" ? null : parseInt(value))}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users</SelectItem>
                      {users.map((user: any) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.firstName} {user.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="limitFilter">Limit</Label>
                  <Select
                    value={activityLimit.toString()}
                    onValueChange={(value) => setActivityLimit(parseInt(value))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="250">250</SelectItem>
                      <SelectItem value="500">500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div className="flex items-center justify-center h-32">Loading activity logs...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log: any) => {
                        const user = users.find((u: any) => u.id === log.userId || u.id === log.adminId);
                        return (
                          <TableRow key={log.id}>
                            <TableCell>
                              <div className="text-sm">
                                {formatDate(log.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell>
                              {user ? (
                                <div className="flex items-center space-x-2">
                                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {user.avatar ? (
                                      <img 
                                        src={user.avatar} 
                                        alt="Avatar" 
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <User className="h-3 w-3 text-gray-400" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">
                                      {user.firstName} {user.lastName}
                                    </div>
                                    {log.adminId && (
                                      <Badge className="text-xs bg-blue-100 text-blue-800">
                                        Admin
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-500">System</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {log.action}
                              </code>
                            </TableCell>
                            <TableCell>
                              {log.target && (
                                <div className="text-sm">
                                  {log.target}
                                  {log.targetId && ` #${log.targetId}`}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <code className="text-sm">
                                {log.ipAddress || 'N/A'}
                              </code>
                            </TableCell>
                            <TableCell>
                              {log.details && (
                                <details className="text-sm">
                                  <summary className="cursor-pointer text-blue-600">
                                    View Details
                                  </summary>
                                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                                    {JSON.stringify(log.details, null, 2)}
                                  </pre>
                                </details>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotes">
          <Card>
            <CardHeader>
              <CardTitle>Quote Management</CardTitle>
              <CardDescription>Review and manage customer quote requests</CardDescription>
            </CardHeader>
            <CardContent>
              {quotesLoading ? (
                <div className="flex items-center justify-center h-32">Loading quotes...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Goals</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotes.map((quote: any) => (
                        <TableRow key={quote.id}>
                          <TableCell>#{quote.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{quote.name}</div>
                              <div className="text-sm text-gray-500">{quote.email}</div>
                              {quote.phone && (
                                <div className="text-sm text-gray-500">{quote.phone}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{quote.company || 'N/A'}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {quote.goals?.slice(0, 2).map((goal: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {goal}
                                </Badge>
                              ))}
                              {quote.goals?.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{quote.goals.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{quote.timeline}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(quote.status)}>
                              {quote.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatDate(quote.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Block User Confirmation Dialog */}
      <AlertDialog open={!!blockUserId} onOpenChange={() => setBlockUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              {users.find((u: any) => u.id === blockUserId)?.isActive ? 'Block User' : 'Unblock User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {users.find((u: any) => u.id === blockUserId)?.isActive 
                ? 'Are you sure you want to block this user? They will be unable to access their account until unblocked.'
                : 'Are you sure you want to unblock this user? They will regain access to their account.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (blockUserId) {
                  const user = users.find((u: any) => u.id === blockUserId);
                  if (user) {
                    handleBlockUser(blockUserId, user.isActive);
                  }
                }
              }}
              className={users.find((u: any) => u.id === blockUserId)?.isActive 
                ? 'bg-orange-600 hover:bg-orange-700' 
                : 'bg-green-600 hover:bg-green-700'
              }
              disabled={blockUserMutation.isPending}
            >
              {blockUserMutation.isPending ? 'Processing...' : 
                (users.find((u: any) => u.id === blockUserId)?.isActive ? 'Block User' : 'Unblock User')
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <Trash2 className="h-5 w-5 text-red-500 mr-2" />
              Delete User Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this user account? This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteUserId) {
                  handleDeleteUser(deleteUserId);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}