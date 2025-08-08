import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLocation, Link } from 'wouter';
import { 
  User, Settings, LogOut, Plus, FileText, DollarSign,
  Calendar, CheckCircle, Clock, ArrowRight, Target, BarChart3, CreditCard, Rocket, Star, Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

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

  const quotes = Array.isArray(quotesData?.quotes) ? quotesData.quotes : Array.isArray(quotesData) ? quotesData : [];
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
              <Link href="/subscription-management">
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Subscription
                </Button>
              </Link>
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
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="mb-6"
                      >
                        <div className="relative mx-auto w-24 h-24 mb-4">
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-20"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <div className="absolute inset-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Rocket className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-xl font-bold text-gray-dark mb-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                          Ready to Launch Your First Project?
                        </h3>
                        <p className="text-gray-medium mb-6 max-w-md mx-auto">
                          Transform your business with professional digital solutions. Let's build something amazing together!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                          <Link href="/quote">
                            <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg" withPulse>
                              <Star className="h-4 w-4 mr-2" />
                              Request Your First Quote
                            </Button>
                          </Link>
                          <Link href="/services">
                            <Button variant="outline" className="border-teal-300 text-teal-600 hover:bg-teal-50">
                              <Zap className="h-4 w-4 mr-2" />
                              Browse Services
                            </Button>
                          </Link>
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="mt-6 p-4 bg-gradient-to-r from-lime-50 to-teal-50 rounded-lg border border-teal-200"
                        >
                          <div className="flex items-center justify-center space-x-6 text-sm text-teal-700">
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span>Expert Team</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span>24hr Response</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span>Guaranteed ROI</span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
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
                      {quotes.slice(0, 2).map((quote: any, index: number) => (
                        <motion.div 
                          key={quote.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border rounded-lg p-3 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-gray-50 to-blue-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-800">{quote.name}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(quote.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                quote.status === 'completed' ? 'border-green-300 text-green-700 bg-green-50' :
                                quote.status === 'in-progress' ? 'border-blue-300 text-blue-700 bg-blue-50' :
                                'border-yellow-300 text-yellow-700 bg-yellow-50'
                              }`}
                            >
                              {quote.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                      <Link href="/quote">
                        <Button size="sm" variant="outline" className="w-full hover:bg-teal-50 hover:border-teal-300">
                          <Plus className="h-4 w-4 mr-2" />
                          New Quote Request
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-4"
                      >
                        <FileText className="h-8 w-8 text-teal-400 mx-auto" />
                      </motion.div>
                      <p className="text-gray-medium text-sm mb-4">Ready to get started?</p>
                      <Link href="/quote">
                        <Button size="sm" className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
                          <Star className="h-4 w-4 mr-2" />
                          Request Your First Quote
                        </Button>
                      </Link>
                    </motion.div>
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