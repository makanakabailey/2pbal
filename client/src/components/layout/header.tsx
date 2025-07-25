import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut, Settings, BarChart3, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import logoPath from '@assets/logo_1753208911294.png';

interface HeaderProps {
  onOpenCalculator: () => void;
}

export default function Header({ onOpenCalculator }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const navigation = [
    { name: 'Packages', href: '/packages' },
    { name: 'All Services', href: '/services' },
    { name: 'Get Recommendations', href: '/recommendations' },
    { name: 'Custom Proposal', href: '/quote' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

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

  return (
    <header className="bg-blue-600 shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src={logoPath} alt="2Pbal Logo" className="h-12 w-auto" />
              <Home className="h-7 w-7 text-white group-hover:text-lime-primary transition-colors" />
            </Link>
            <span className="ml-4 text-sm text-white font-medium hidden lg:block">
              Enterprise Results, Without Enterprise Costs
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  location === item.href 
                    ? 'text-lime-primary' 
                    : 'text-white hover:text-lime-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              onClick={onOpenCalculator}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Calculate Savings
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-lime-primary">
                    <User className="h-4 w-4 mr-2" />
                    {user?.firstName || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center cursor-pointer">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile-setup" className="flex items-center cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-lime-primary">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-white text-teal-primary hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 font-medium text-lg text-gray-dark hover:text-teal-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium text-lg transition-colors ${
                        location === item.href 
                          ? 'text-teal-primary' 
                          : 'text-gray-dark hover:text-teal-primary'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <Button 
                    onClick={() => {
                      onOpenCalculator();
                      setIsOpen(false);
                    }}
                    className="bg-lime-primary text-white hover:bg-green-500 w-full"
                  >
                    Calculate Savings
                  </Button>

                  {isAuthenticated ? (
                    <div className="space-y-2 pt-4 border-t">
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/profile-setup" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Profile Settings
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-4 border-t">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-teal-primary text-white hover:bg-teal-600">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
