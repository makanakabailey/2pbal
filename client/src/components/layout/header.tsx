import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import logoPath from '@assets/logo_1753208911294.png';

interface HeaderProps {
  onOpenCalculator: () => void;
}

export default function Header({ onOpenCalculator }: HeaderProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Packages', href: '/packages' },
    { name: 'All Services', href: '/services' },
    { name: 'Get Quote', href: '/quote' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <img src={logoPath} alt="2Pbal Logo" className="h-8 w-auto" />
            </Link>
            <span className="ml-3 text-sm text-gray-medium font-medium hidden lg:block">
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
                    ? 'text-teal-primary' 
                    : 'text-gray-dark hover:text-teal-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              onClick={onOpenCalculator}
              className="bg-lime-primary text-white hover:bg-green-500"
            >
              Calculate Savings
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-gray-dark" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
