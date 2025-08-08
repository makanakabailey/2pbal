import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, MessageCircle, X, Lightbulb, ArrowRight, Clock, Phone } from 'lucide-react';
import { useLocation } from 'wouter';

interface HelpContent {
  question: string;
  answer: string;
  category: 'form' | 'navigation' | 'payment' | 'account' | 'general';
}

interface PageHelp {
  [key: string]: {
    title: string;
    description: string;
    faqs: HelpContent[];
    tips: string[];
  }
}

const helpContent: PageHelp = {
  '/quote': {
    title: 'Quote Form Help',
    description: 'Get help with submitting your project quote request',
    faqs: [
      {
        question: 'How detailed should my project description be?',
        answer: 'The more details you provide, the more accurate your quote will be. Include your goals, timeline, and any specific requirements.',
        category: 'form'
      },
      {
        question: 'Can I attach files to my quote request?',
        answer: 'Yes! You can upload documents, images, or any relevant files. We support up to 10MB per file.',
        category: 'form'
      },
      {
        question: 'How long does it take to receive a quote?',
        answer: 'We typically respond within 24 hours with a detailed quote and next steps.',
        category: 'general'
      }
    ],
    tips: [
      'Use the audio recording feature to explain complex requirements',
      'Select all applicable business goals for better recommendations',
      'Include your budget range for more accurate proposals'
    ]
  },
  '/services': {
    title: 'Services Help',
    description: 'Learn about our digital services and solutions',
    faqs: [
      {
        question: 'Which service is right for my business?',
        answer: 'Use our recommendation wizard or describe your challenges in a quote request for personalized advice.',
        category: 'general'
      },
      {
        question: 'Can I combine multiple services?',
        answer: 'Absolutely! Our packages combine complementary services for maximum value and efficiency.',
        category: 'general'
      },
      {
        question: 'Do you offer custom solutions?',
        answer: 'Yes, we create tailored solutions based on your specific business needs and goals.',
        category: 'general'
      }
    ],
    tips: [
      'Check our packages for bundled savings',
      'Read case studies for similar businesses',
      'Use the savings calculator to estimate ROI'
    ]
  },
  '/packages': {
    title: 'Packages Help',
    description: 'Choose the right package for your business needs',
    faqs: [
      {
        question: 'What\'s the difference between packages?',
        answer: 'Each package is designed for different business sizes and needs. Starter for small businesses, Pro for growing companies, Enterprise for large organizations.',
        category: 'general'
      },
      {
        question: 'Can I upgrade my package later?',
        answer: 'Yes, you can upgrade at any time. We\'ll apply any payments already made to your new package.',
        category: 'payment'
      },
      {
        question: 'Do packages include ongoing support?',
        answer: 'All packages include different levels of support. Higher tiers include priority support and dedicated account management.',
        category: 'general'
      }
    ],
    tips: [
      'Start with a smaller package and upgrade as needed',
      'Consider your 6-month growth projections',
      'Ask about custom package modifications'
    ]
  },
  '/login': {
    title: 'Account Access Help',
    description: 'Get help logging into your account',
    faqs: [
      {
        question: 'I forgot my password, what should I do?',
        answer: 'Click the "Forgot Password" link and we\'ll send you a secure reset link via email.',
        category: 'account'
      },
      {
        question: 'Why am I not receiving the verification email?',
        answer: 'Check your spam folder first. If still not found, click "Resend" or contact support.',
        category: 'account'
      },
      {
        question: 'Can I login with social media accounts?',
        answer: 'Currently we support email/password login, but social login options are coming soon.',
        category: 'account'
      }
    ],
    tips: [
      'Use a strong password with numbers and symbols',
      'Enable two-factor authentication for security',
      'Keep your contact information updated'
    ]
  }
};

export function ContextualHelp() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState<HelpContent[]>([]);
  const [showProactiveChat, setShowProactiveChat] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);

  const currentHelp = helpContent[location] || helpContent['/services']; // Default fallback

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [location]);

  // Proactive intervention for quote page after 5 minutes
  useEffect(() => {
    if (location === '/quote' && timeOnPage > 300 && !showProactiveChat) {
      setShowProactiveChat(true);
    }
  }, [timeOnPage, location, showProactiveChat]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = currentHelp.faqs.filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(currentHelp.faqs);
    }
  }, [searchQuery, currentHelp]);

  const handleCloseProactive = () => {
    setShowProactiveChat(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.div
            className="fixed bottom-20 right-4 z-40"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 2 
            }}
          >
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
              withRipple
            >
              <HelpCircle className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Lightbulb className="h-5 w-5 mr-2 text-teal-600" />
              {currentHelp.title}
            </DialogTitle>
            <DialogDescription>
              {currentHelp.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Tips */}
            {currentHelp.tips.length > 0 && (
              <Card className="bg-gradient-to-r from-lime-50 to-teal-50 border-teal-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center text-teal-700">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {currentHelp.tips.map((tip, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start text-sm text-teal-800"
                      >
                        <ArrowRight className="h-3 w-3 mr-2 mt-0.5 text-teal-500 flex-shrink-0" />
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* FAQs */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-800 flex-1">
                            {faq.question}
                          </h4>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredFaqs.length === 0 && searchQuery && (
                <Card className="bg-gray-50">
                  <CardContent className="p-6 text-center">
                    <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Try a different search term or contact support directly
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Support */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">
                      Still need help?
                    </h4>
                    <p className="text-sm text-blue-600">
                      Our support team is here to help you succeed
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Button size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Proactive Chat Bot */}
      <AnimatePresence>
        {showProactiveChat && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-36 right-4 z-50"
          >
            <Card className="w-80 shadow-2xl border-2 border-teal-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                      className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mr-3"
                    >
                      <MessageCircle className="h-4 w-4 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Need a hand?</h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Support Agent
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0"
                    onClick={handleCloseProactive}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-700 mb-4">
                  I noticed you've been working on your quote for a while. 
                  Need any help getting it submitted?
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1" 
                    onClick={() => {
                      setIsOpen(true);
                      setShowProactiveChat(false);
                    }}
                  >
                    Yes, help me!
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCloseProactive}
                  >
                    I'm good
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}