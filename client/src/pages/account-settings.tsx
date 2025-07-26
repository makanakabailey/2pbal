import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, Lock, Mail, Trash2, Upload, Shield } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function AccountSettings() {
  const { toast } = useToast();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Get current user
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
  });

  // Get subscription details
  const { data: subscription } = useQuery({
    queryKey: ["/api/users/subscription"],
  });

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/users/profile", "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({ title: "Profile updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Avatar update mutation
  const avatarMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return fetch("/api/users/avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({ title: "Avatar updated successfully" });
      setAvatarFile(null);
      setAvatarPreview(null);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Preferences update mutation
  const preferencesMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/users/preferences", "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({ title: "Preferences updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Password change mutation
  const passwordMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/users/change-password", "POST", data),
    onSuccess: () => {
      toast({ title: "Password changed successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Account deletion mutation
  const deleteMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/users/account", "DELETE", data),
    onSuccess: () => {
      toast({ title: "Account deleted successfully" });
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      avatarMutation.mutate(formData);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    profileMutation.mutate(data);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    passwordMutation.mutate(data);
  };

  const handleDeleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    deleteMutation.mutate(data);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const user = currentUser?.user;
  const subscriptionData = subscription?.subscription;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account, preferences, and security settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="danger" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {avatarPreview || user?.avatar ? (
                    <img 
                      src={avatarPreview || user?.avatar} 
                      alt="Avatar" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="w-64"
                  />
                  {avatarFile && (
                    <Button 
                      onClick={handleAvatarUpload} 
                      disabled={avatarMutation.isPending}
                      size="sm"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {avatarMutation.isPending ? "Uploading..." : "Upload Avatar"}
                    </Button>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      defaultValue={user?.firstName || ""} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      defaultValue={user?.lastName || ""} 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    defaultValue={user?.email || ""} 
                    disabled 
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-gray-600 mt-1">Email cannot be changed</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      defaultValue={user?.company || ""} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      defaultValue={user?.phone || ""} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      name="jobTitle" 
                      defaultValue={user?.jobTitle || ""} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry" 
                      name="industry" 
                      defaultValue={user?.industry || ""} 
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={profileMutation.isPending}
                  className="w-full"
                >
                  {profileMutation.isPending ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-gray-600">Choose your preferred theme</p>
                  </div>
                  <Select 
                    defaultValue={user?.preferences?.theme || "light"}
                    onValueChange={(value) => 
                      preferencesMutation.mutate({ theme: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive email notifications</p>
                  </div>
                  <Switch 
                    checked={user?.preferences?.notifications !== false}
                    onCheckedChange={(checked) => 
                      preferencesMutation.mutate({ notifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Language</Label>
                    <p className="text-sm text-gray-600">Choose your preferred language</p>
                  </div>
                  <Select 
                    defaultValue={user?.preferences?.language || "en"}
                    onValueChange={(value) => 
                      preferencesMutation.mutate({ language: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">
                    Email verified: {user?.emailVerified ? "✅ Yes" : "❌ No"}
                  </span>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword" 
                      type="password" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword" 
                      type="password" 
                      required 
                      minLength={6}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      required 
                      minLength={6}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={passwordMutation.isPending}
                  >
                    {passwordMutation.isPending ? "Changing..." : "Change Password"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>View your current subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent>
              {subscriptionData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Plan</Label>
                      <p className="font-semibold capitalize">{subscriptionData.plan}</p>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <p className="font-semibold capitalize">{subscriptionData.status}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Start Date</Label>
                    <p>{new Date(subscriptionData.startDate).toLocaleDateString()}</p>
                  </div>
                  
                  {subscriptionData.endDate && (
                    <div>
                      <Label>End Date</Label>
                      <p>{new Date(subscriptionData.endDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label>Features</Label>
                    <ul className="list-disc list-inside space-y-1">
                      {subscriptionData.features?.map((feature: string, index: number) => (
                        <li key={index} className="text-sm">{feature.replace('_', ' ')}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>Loading subscription details...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions that will affect your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="border-red-200 bg-red-50">
                <Trash2 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. 
                  All your data will be permanently removed.
                </AlertDescription>
              </Alert>
              
              <form onSubmit={handleDeleteAccount} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="deletePassword">Enter your password to confirm deletion</Label>
                  <Input 
                    id="deletePassword" 
                    name="password" 
                    type="password" 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmation">Type "DELETE" to confirm</Label>
                  <Input 
                    id="confirmation" 
                    name="confirmation" 
                    required 
                    placeholder="DELETE"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  className="w-full"
                >
                  {deleteMutation.isPending ? "Deleting Account..." : "Delete Account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}