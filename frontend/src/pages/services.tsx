import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceCard from '@/components/ui/service-card';
import BundleBuilder from '@/components/ui/bundle-builder';
import { Search } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bundledServices, setBundledServices] = useState<string[]>([]);

  const categories = [
    'all',
    'Web & Application Development',
    'Digital Marketing & Advertising',
    'AI & Automation',
    'Content & Design',
    'Business & Strategy'
  ];

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToBundle = (serviceId: string) => {
    setBundledServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleRemoveFromBundle = (serviceId: string) => {
    setBundledServices(prev => prev.filter(id => id !== serviceId));
  };

  const handleGetProposal = () => {
    // In a real app, this would create a new project and redirect to the client portal
    const firstServiceId = bundledServices[0] || 'web-development';
    window.location.href = `/client-portal/service/${firstServiceId}`;
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-dark">
            Only Pay for Exactly What You Need
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-medium mb-6 sm:mb-8">
            Mix and match services to build your perfect solution. Every service delivers measurable ROI.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 sm:py-8 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'btn-gradient-glow' 
                      : 'hover:bg-teal-glow hover:text-white'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Categories' : category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onAddToBundle={handleAddToBundle}
                isInBundle={bundledServices.includes(service.id)}
              />
            ))}
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-medium text-base sm:text-lg">No services found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
                className="mt-4 text-sm sm:text-base"
                size="sm"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Bundle Builder Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-dark">Create Your Custom Package & Save</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-medium">Bundle 3+ services and save up to 20%</p>
          </div>
          
          <BundleBuilder
            selectedServices={bundledServices}
            onRemoveService={handleRemoveFromBundle}
            onGetProposal={handleGetProposal}
          />
        </div>
      </section>
    </div>
  );
}
