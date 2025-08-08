import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { Home, ArrowRight, Star, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoPath from '@assets/logo_1753208911294.png';

const caseStudies = [
  {
    title: "E-commerce Growth: 300% Revenue Increase",
    description: "Helped an online retailer automate their inventory management and implement AI-driven marketing campaigns.",
    industry: "E-commerce",
    result: "300% revenue growth in 6 months",
    image: "🛒"
  },
  {
    title: "SaaS Platform Optimization: 60% Cost Reduction", 
    description: "Streamlined operations for a growing SaaS company by implementing automated workflows and scaling infrastructure.",
    industry: "SaaS",
    result: "$240K annual savings",
    image: "💼"
  },
  {
    title: "Healthcare Digital Transformation",
    description: "Built a patient management system that reduced administrative overhead by 45% while improving patient experience.",
    industry: "Healthcare",
    result: "45% efficiency improvement",
    image: "🏥"
  },
  {
    title: "Manufacturing Automation Success",
    description: "Implemented IoT sensors and predictive analytics to reduce equipment downtime and optimize production.",
    industry: "Manufacturing", 
    result: "30% productivity increase",
    image: "🏭"
  }
];

export default function ThankYouLogout() {
  const [currentCase, setCurrentCase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCase((prev) => (prev + 1) % caseStudies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNextCase = () => {
    setCurrentCase((prev) => (prev + 1) % caseStudies.length);
  };

  const handlePrevCase = () => {
    setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-lime-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo and Main Message */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.img 
            src={logoPath} 
            alt="2Pbal Logo" 
            className="h-16 mx-auto mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Thanks for your work today!
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We're here when you're ready to scale again.
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-6 text-teal-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">247+ Clients</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">98% Success Rate</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">$2M+ Client Savings</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Case Studies Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Success Stories
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="shadow-xl border-2 border-teal-200 bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-left flex-1">
                        <div className="flex items-center mb-4">
                          <span className="text-4xl mr-4">{caseStudies[currentCase].image}</span>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              {caseStudies[currentCase].title}
                            </h3>
                            <div className="flex items-center text-sm text-teal-600">
                              <span className="bg-teal-100 px-2 py-1 rounded-full">
                                {caseStudies[currentCase].industry}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {caseStudies[currentCase].description}
                        </p>
                        
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 mr-2" />
                          <span className="font-semibold text-gray-800">
                            {caseStudies[currentCase].result}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {caseStudies.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCase 
                      ? 'bg-teal-500 w-8' 
                      : 'bg-teal-200 hover:bg-teal-300'
                  }`}
                  onClick={() => setCurrentCase(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrevCase}
                className="border-teal-300 text-teal-600 hover:bg-teal-50"
              >
                ← Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleNextCase}
                className="border-teal-300 text-teal-600 hover:bg-teal-50"
              >
                Next →
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="space-y-4"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our success stories?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 shadow-lg"
                withRipple
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/quote">
              <Button 
                size="lg" 
                variant="outline"
                className="border-teal-300 text-teal-600 hover:bg-teal-50 px-8"
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Start New Project
              </Button>
            </Link>
          </div>
          
          <motion.p 
            className="text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Your session data has been securely saved. See you next time!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}