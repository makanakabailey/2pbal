import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Users, CheckCircle, TrendingUp, Rocket, Star } from 'lucide-react';
import CountingNumbers from '@/components/ui/counting-numbers';
import logoPath from '@assets/logo_1753208911294.png';

export default function Footer() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const footerRef = React.useRef(null);
  const isInView = useInView(footerRef, { once: true });
  const controls = useAnimation();

  const testimonials = [
    { text: "2Pbal transformed our digital presence completely!", author: "Sarah M., CEO" },
    { text: "Saved us $50K annually with their automation solutions", author: "Mike R., Operations" },
    { text: "Best ROI we've ever seen from a digital agency", author: "Lisa K., Marketing" }
  ];

  const stats = [
    { value: 247, label: "Clients Served", icon: Users },
    { value: 1840, label: "Projects Completed", icon: CheckCircle },
    { value: 98, label: "Success Rate %", icon: TrendingUp }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <footer ref={footerRef} className="bg-footer-gradient-glow py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <img src={logoPath} alt="2Pbal Logo" className="h-6 sm:h-8 w-auto mb-3 sm:mb-4" />
            <p className="text-gray-400 text-sm sm:text-base">Precise Programming for Business Advancement and Leverage</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">Digital Marketing</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">AI & Automation</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">Business Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link href="/about" className="hover:text-lime-primary transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="hover:text-lime-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/careers" className="hover:text-lime-primary transition-colors">Careers</Link></li>
              <li><Link href="/quote" className="hover:text-lime-primary transition-colors">Get Quote</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li className="break-all">
                <a href="mailto:infodesk@2pbal.online" className="hover:text-lime-primary transition-colors">
                  infodesk@2pbal.online
                </a>
              </li>
              <li>
                <a href="tel:+16822844934" className="hover:text-lime-primary transition-colors">
                  +1 (682) 284-4934
                </a>
              </li>
              <li>Mon-Fri 9AM-6PM EST</li>
              <li>
                <a href="mailto:recruitment@2pbal.site" className="hover:text-lime-primary transition-colors">
                  Careers: recruitment@2pbal.site
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Interactive CTA Section */}
        <motion.div 
          className="mt-8 sm:mt-12 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Card className="bg-gradient-to-r from-teal-500 via-blue-600 to-lime-500 border-none shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-center lg:text-left flex-1">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block mb-4"
                  >
                    <Rocket className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Ready to scale? Talk to an expert today!
                  </h3>
                  <p className="text-white/90 mb-4">
                    Join 200+ businesses that transformed their digital presence with 2Pbal
                  </p>
                  
                  {/* Live Stats Counter */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                    {stats.map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <motion.div 
                          key={index}
                          className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={controls}
                          variants={{
                            visible: { 
                              opacity: 1, 
                              scale: 1, 
                              transition: { delay: index * 0.2, duration: 0.5 } 
                            }
                          }}
                        >
                          <IconComponent className="h-5 w-5 text-lime-200 mr-2" />
                          <div className="text-white">
                            <div className="font-bold text-lg">
                              <CountingNumbers 
                                end={stat.value} 
                                duration={2} 
                                className="text-white" 
                              />
                              {stat.label.includes('%') && '%'}
                            </div>
                            <div className="text-xs text-white/80">
                              {stat.label.replace(' %', '')}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Link href="/quote">
                    <Button 
                      size="lg" 
                      className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      withRipple
                    >
                      <Star className="h-5 w-5 mr-2" />
                      Get Your Free Quote
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Scrolling Testimonials */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <motion.div 
                  className="text-center text-white"
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="italic text-lg mb-2">"{testimonials[currentTestimonial].text}"</p>
                  <p className="text-white/80 text-sm">- {testimonials[currentTestimonial].author}</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="border-t border-gray-600 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">
            &copy; 2025 2Pbal. All rights reserved. | 
            <Link href="/privacy-policy" className="hover:text-lime-primary transition-colors ml-1 mr-1">Privacy Policy</Link> | 
            Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
