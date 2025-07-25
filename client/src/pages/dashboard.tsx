import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLocation, Link } from 'wouter';
import { 
  User, Settings, LogOut, Plus, FileText, DollarSign,
  Calendar, CheckCircle, Clock, ArrowRight, Target, BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: projects } = useQuery({
    queryKey: ['/api/projects'],
    enabled: !!user,
  });

  const { data: quotesData } = useQuery({
    queryKey: ['/api/quotes'],
    enabled: !!user,
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
      setLocation('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-teal-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation('/login');
    return null;
  }

  const quotes = Array.isArray(quotesData?.quotes) ? quotesData.quotes : [];
  const userProjects = Array.isArray(projects) ? projects : [];
  const activeProjects = userProjects.filter((p: any) => p.status === 'in-progress');
  const completedProjects = userProjects.filter((p: any) => p.status === 'completed');

  return (
    <div className="pt-16 min-h-screen bg-gray-light">
      {/* Header */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-dark">
                Welcome back, {user.firstName || 'there'}!
              </h1>
              <p className="text-gray-medium">
                Here's what's happening with your projects
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/profile-setup">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-medium text-sm">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-dark">{activeProjects.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-teal-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-medium text-sm">Completed Projects</p>
                    <p className="text-2xl font-bold text-gray-dark">{completedProjects.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-lime-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-medium text-sm">Quote Requests</p>
                    <p className="text-2xl font-bold text-gray-dark">{quotes.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-medium text-sm">Est. Savings</p>
                    <p className="text-2xl font-bold text-gray-dark">$24,500</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Projects */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Active Projects</CardTitle>
                  <Link href="/services">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {activeProjects.length > 0 ? (
                    <div className="space-y-4">
                      {activeProjects.slice(0, 3).map((project: any) => (
                        <div key={project.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-dark">{project.name}</h4>
                            <Badge variant="outline">
                              {project.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-medium mb-3">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex-1 mr-4">
                              <div className="flex justify-between text-sm text-gray-medium mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                            <Link href={`/client-portal/project/${project.id}`}>
                              <Button size="sm" variant="outline">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-dark mb-2">No active projects</h3>
                      <p className="text-gray-medium mb-4">Start your first project with 2Pbal</p>
                      <Link href="/services">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Browse Services
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Profile */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span>{user.profileComplete ? '100%' : '60%'}</span>
                    </div>
                    <Progress value={user.profileComplete ? 100 : 60} className="h-2" />
                    {!user.profileComplete && (
                      <Link href="/profile-setup">
                        <Button size="sm" variant="outline" className="w-full">
                          Complete Profile
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Quotes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Recent Quotes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {quotes.length > 0 ? (
                    <div className="space-y-3">
                      {quotes.slice(0, 2).map((quote: any) => (
                        <div key={quote.id} className="border rounded p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{quote.name}</p>
                              <p className="text-xs text-gray-medium">
                                {new Date(quote.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {quote.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Link href="/quote">
                        <Button size="sm" variant="outline" className="w-full">
                          New Quote Request
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-medium text-sm mb-3">No quotes yet</p>
                      <Link href="/quote">
                        <Button size="sm" className="w-full">
                          Request Quote
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}