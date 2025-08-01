import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut, Settings, BarChart3, Home, Shield, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ContactPopup } from '@/components/ui/contact-popup';
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
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Packages', href: '/packages', icon: 'package' },
    { name: 'Services', href: '/services', icon: 'grid' },
    { name: 'Quote', href: '/quote', icon: 'clipboard' },
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
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center min-w-0 flex-1">
            <Link href="/" className="flex items-center group mr-4 lg:mr-8 flex-shrink-0">
              <img 
                src={logoPath} 
                alt="2Pbal Logo" 
                className="h-10 sm:h-12 lg:h-16 w-auto object-contain max-w-none" 
              />
            </Link>
            <span className="text-xs sm:text-sm text-white font-medium hidden xl:block truncate">
              Enterprise Results, Without Enterprise Costs
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-3 flex-shrink-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors text-xs xl:text-sm whitespace-nowrap px-2 py-1 rounded hover:bg-blue-700 ${
                  location === item.href 
                    ? 'text-lime-primary bg-blue-700' 
                    : 'text-white hover:text-lime-primary'
                }`}
              >
                <span className="xl:hidden">{item.name.split(' ')[0]}</span>
                <span className="hidden xl:inline">{item.name}</span>
              </Link>
            ))}
            <ContactPopup>
              <Button 
                className="bg-lime-primary text-white hover:bg-lime-600 text-xs px-2 py-1 whitespace-nowrap ml-2"
                size="sm"
              >
                <Mail className="h-3 w-3 mr-1" />
                <span className="xl:hidden">Contact</span>
                <span className="hidden xl:inline">Contact</span>
              </Button>
            </ContactPopup>
            
            <Button 
              onClick={onOpenCalculator}
              className="bg-white text-blue-600 hover:bg-gray-100 text-xs px-2 py-1 whitespace-nowrap ml-2"
              size="sm"
            >
              <span className="xl:hidden">Save</span>
              <span className="hidden xl:inline">Calculate</span>
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-lime-primary text-xs px-2 py-1" size="sm">
                    <User className="h-3 w-3 mr-1" />
                    <span className="hidden xl:inline">{user?.firstName || 'Account'}</span>
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
                    <Link href="/account-settings" className="flex items-center cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin-dashboard" className="flex items-center cursor-pointer">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-lime-primary text-xs px-2 py-1" size="sm">
                    <span className="xl:hidden">Login</span>
                    <span className="hidden xl:inline">Sign In</span>
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-white text-teal-primary hover:bg-gray-100 text-xs px-2 py-1" size="sm">
                    <span className="xl:hidden">Start</span>
                    <span className="hidden xl:inline">Get Started</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-1">
                  <Menu className="h-5 w-5 text-white" />
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
