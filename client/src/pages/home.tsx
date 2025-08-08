import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PackageCard from '@/components/ui/package-card';
import { Check, X, MessageCircle, ClipboardList, Rocket, TrendingUp, Shield } from 'lucide-react';
import { PACKAGES, CASE_STUDIES } from '@/lib/constants';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion, useInView, useAnimation } from 'framer-motion';
import CountingNumbers from '@/components/ui/counting-numbers';
import { Link } from 'wouter';
import { HesitationTooltip } from '@/components/ui/smart-tooltip';

interface HomeProps {
  onOpenCalculator: () => void;
}

export default function Home({ onOpenCalculator }: HomeProps) {
  const { user, isAuthenticated } = useAuth();
  const [roiVisible, setRoiVisible] = useState(false);
  const [heroTransformed, setHeroTransformed] = useState(false);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const trustBarRef = useRef(null);
  
  const problemInView = useInView(problemRef, { once: true });
  const solutionInView = useInView(solutionRef, { once: true });
  const trustBarInView = useInView(trustBarRef, { once: true });
  
  const problemControls = useAnimation();
  const solutionControls = useAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (problemInView) {
      problemControls.start("visible");
    }
  }, [problemControls, problemInView]);

  useEffect(() => {
    if (solutionInView) {
      // Delay solution animation slightly after problem
      setTimeout(() => {
        solutionControls.start("visible");
      }, 800);
    }
  }, [solutionControls, solutionInView]);

  useEffect(() => {
    if (trustBarInView) {
      setRoiVisible(true);
    }
  }, [trustBarInView]);
  
  const handlePackageSelect = (packageId: string) => {
    window.location.href = `/package/${packageId}`;
  };

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`${isAuthenticated && !user?.emailVerified ? 'pt-[104px] lg:pt-[120px]' : 'pt-16 lg:pt-20'}`}>
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-gradient-to-br from-blue-600 via-teal-500 to-lime-400"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Main Content - 8 columns */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-gray-900 order-2 lg:order-1 lg:col-span-8"
            >
              {/* Dynamic Headline with staggered animation */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                {/* First part fades in immediately */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="block"
                >
                  {["Stop", "Overpaying", "for", "Digital", "Solutions."].map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: "easeOut" 
                      }}
                      className="inline-block mr-2 sm:mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Second part with delay and special animation */}
                <motion.span
                  initial={{ opacity: 0, x: -30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    duration: 1, 
                    delay: 2,
                    ease: "backOut"
                  }}
                  className="text-lime-primary inline-block"
                >
                  Start Scaling.
                </motion.span>
              </div>
              
              {/* Subtext slides in from left after 2 second delay */}
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-600"
              >
                Get a dedicated team of experts for less than the cost of one in-house hire. 
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 0.6 }}
                  className="font-semibold text-teal-600"
                >
                  {" "}Save up to 70% vs. traditional agencies.
                </motion.span>
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="flex flex-col gap-3 max-w-xs sm:max-w-sm"
              >
                {/* Enhanced Pulsing CTA Button with "pulse" state after 3 seconds */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button 
                    onClick={() => {
                      setHeroTransformed(true);
                      setTimeout(() => onOpenCalculator(), 800);
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-lime-400 to-lime-600 hover:from-lime-500 hover:to-lime-700 text-white text-sm sm:text-base px-4 sm:px-6 py-3 w-full relative overflow-hidden group"
                  >
                    {/* Enhanced glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-lime-600 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Button content */}
                    <span className="relative z-10 font-semibold">
                      <span className="hidden sm:inline">Schedule Free Consultation</span>
                      <span className="sm:hidden">Free Consultation</span>
                    </span>
                    
                    {/* Enhanced pulse animation that starts after headline animation */}
                    <motion.div
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.15, 1], 
                        opacity: [0.2, 0.4, 0.2] 
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity,
                        delay: 3.5,  // Start pulsing after headline completes
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-lime-400 rounded-lg"
                    />
                    
                    {/* Additional shimmer effect */}
                    <motion.div
                      animate={{
                        x: [-200, 300],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 4
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent w-16 skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Button>
                </motion.div>
                {/* Smart Secondary CTAs */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="flex gap-2"
                >
                  {isAuthenticated ? (
                    <>
                      <Button 
                        onClick={() => window.location.href = '/dashboard'}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm px-3 py-2 flex-1"
                      >
                        View Dashboard
                      </Button>
                      <Button 
                        onClick={() => window.location.href = '/client-portal'}
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm px-3 py-2 flex-1"
                      >
                        <span className="hidden sm:inline">My Savings Report</span>
                        <span className="sm:hidden">My Savings</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={scrollToPackages}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm px-3 py-2 flex-1"
                      >
                        <span className="hidden sm:inline">Explore Packages</span>
                        <span className="sm:hidden">Packages</span>
                      </Button>
                      <Button 
                        onClick={() => window.location.href = '/services'}
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm px-3 py-2 flex-1"
                      >
                        <span className="hidden sm:inline">View Services</span>
                        <span className="sm:hidden">Services</span>
                      </Button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* The Value Stack - 4 columns */}
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "backOut" }}
              className="order-1 lg:order-2 lg:col-span-4 space-y-4"
            >
              {/* ROI Statement with parallax effect */}
              <motion.div
                whileInView={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                viewport={{ once: false }}
                className="bg-gradient-to-br from-teal-50 to-lime-50 border border-teal-200 rounded-xl p-6 shadow-lg"
              >
                <div className="text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-3xl font-bold text-teal-600 mb-2"
                  >
                    <CountingNumbers end={70} suffix="%" trigger={true} />
                  </motion.div>
                  <p className="text-sm text-gray-700 font-medium">Average Client Savings</p>
                  <p className="text-xs text-gray-500 mt-1">vs. Traditional Agencies</p>
                </div>
              </motion.div>

              {/* Savings Badge with enhanced animation */}
              <motion.div
                whileInView={{ y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                viewport={{ once: false }}
                className="bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200 rounded-xl p-6 shadow-lg"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-12 h-12 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <span className="text-white font-bold text-lg">$</span>
                  </motion.div>
                  <h3 className="font-semibold text-gray-800">Cost-Effective Teams</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Full team for less than one hire
                  </p>
                </div>
              </motion.div>

              {/* Trust Indicator */}
              <motion.div
                whileInView={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                viewport={{ once: false }}
                className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-6 shadow-lg"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-gray-800">Trusted by 200+</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Growing businesses worldwide
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <motion.img 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Modern collaborative workspace with diverse team" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="absolute -bottom-4 -right-4 bg-white p-4 sm:p-6 rounded-xl shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="text-teal-600 font-bold text-xl sm:text-2xl">
                  200+
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">Happy Clients</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section ref={trustBarRef} className="py-8 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={trustBarInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-gray-medium mb-6"
            >
              Trusted by innovative companies to deliver ROI-driven results:
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={trustBarInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="bg-lime-primary text-white px-4 py-2 rounded-full font-semibold"
              >
                Avg. <CountingNumbers end={3.5} trigger={roiVisible} />x ROI in first year
              </motion.span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-dark"
          >
            The Hidden Costs of Getting Digital Wrong
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 relative">
            {/* Problem Column */}
            <motion.div
              ref={problemRef}
              animate={problemControls}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.8,
                    staggerChildren: 0.2
                  }
                }
              }}
              className="relative z-10"
            >
              <Card className="bg-red-50 border-red-200 shadow-lg">
                <CardContent className="p-8">
                  <motion.h3 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-2xl font-bold mb-6 text-red-600"
                  >
                    Costs of Alternatives
                  </motion.h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Agencies', desc: 'Paying premium prices for junior talent?' },
                      { title: 'Freelancers', desc: 'Wasting hours managing 10+ specialists?' },
                      { title: 'In-House', desc: 'Spending $200K+ per year for one expert?' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, x: -30 },
                          visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: index * 0.1 }
                          }
                        }}
                        className="flex items-start"
                      >
                        <motion.div
                          variants={{
                            hidden: { scale: 0, rotate: -180 },
                            visible: { 
                              scale: 1, 
                              rotate: 0,
                              transition: { 
                                type: "spring", 
                                stiffness: 200,
                                delay: index * 0.1 + 0.3
                              }
                            }
                          }}
                        >
                          <X className="text-red-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-gray-dark">{item.title}</h4>
                          <p className="text-gray-medium">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Solution Column */}
            <motion.div
              ref={solutionRef}
              animate={solutionControls}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.8,
                    staggerChildren: 0.15
                  }
                }
              }}
              className="relative z-10"
            >
              <Card className="bg-green-50 border-green-200 shadow-lg">
                <CardContent className="p-8">
                  <motion.h3 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-2xl font-bold mb-6 text-green-600"
                  >
                    2Pbal Solution
                  </motion.h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Expert Team', desc: 'Dedicated specialists at 70% less cost' },
                      { title: 'Single Contact', desc: 'One point of contact manages everything' },
                      { title: 'Predictable Budget', desc: 'Fixed pricing with guaranteed results' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, x: 30 },
                          visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: index * 0.1 }
                          }
                        }}
                        className="flex items-start"
                      >
                        <motion.div
                          variants={{
                            hidden: { scale: 0, rotate: -180 },
                            visible: { 
                              scale: 1, 
                              rotate: 0,
                              transition: { 
                                type: "spring", 
                                stiffness: 200,
                                delay: index * 0.1 + 0.3
                              }
                            }
                          }}
                        >
                          <Check className="text-green-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-gray-dark">{item.title}</h4>
                          <p className="text-gray-medium">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits - Bento Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-dark"
          >
            Why 2Pbal Outperforms Traditional Solutions
          </motion.h2>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[600px]">
            {/* Large card - Predictable Budgets */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-lime-400 to-lime-600 p-8 rounded-2xl text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <TrendingUp className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Predictable Budgets</h3>
                <p className="text-lime-100 mb-6">Stop budget surprises. Our fixed-price packages give you complete cost visibility from day one.</p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      <CountingNumbers end={70} suffix="%" trigger={true} />
                    </div>
                    <div className="text-sm text-lime-100">Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-sm text-lime-100">Hidden Fees</div>
                  </div>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16" />
            </motion.div>

            {/* Faster Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <Rocket className="w-8 h-8 mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3 text-gray-dark">Faster Delivery</h3>
              <p className="text-gray-medium text-sm">Launch 3x faster with our proven process</p>
              <div className="mt-4 text-2xl font-bold text-blue-600">
                <CountingNumbers end={3} suffix="x" trigger={true} /> Faster
              </div>
            </motion.div>

            {/* Expert Team */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-teal-500 to-teal-700 p-6 rounded-2xl text-white"
            >
              <MessageCircle className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-3">Expert Team Access</h3>
              <p className="text-teal-100 text-sm">Dedicated specialists for less than one employee</p>
              <div className="mt-4 text-sm text-teal-100">
                10+ Specialists Available
              </div>
            </motion.div>

            {/* Scalable Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <ClipboardList className="w-8 h-8 mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-3 text-gray-dark">Scalable Solutions</h3>
              <p className="text-gray-medium">Grow your package as your business expands</p>
              <div className="flex gap-4 mt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">Starter</div>
                  <div className="text-sm text-gray-500">$2,997/mo</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-teal-600">Growth</div>
                  <div className="text-sm text-gray-500">$4,997/mo</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-lime-600">Pro</div>
                  <div className="text-sm text-gray-500">$7,997/mo</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Packages Overview */}
      <section id="packages" className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              All-Inclusive Packages, Not All-Inclusive Prices
            </h2>
            <p className="text-xl text-gray-medium">Choose your growth stage and see immediate savings</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <PackageCard
                  package={pkg}
                  onSelect={handlePackageSelect}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              Transparent Process, Predictable Savings
            </h2>
            <p className="text-xl text-gray-medium">Four simple steps to transform your digital presence</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: MessageCircle, title: 'Consult', desc: 'Free discovery session to align on goals & budget', color: 'lime-primary' },
              { icon: ClipboardList, title: 'Plan', desc: 'Fixed-price proposal - no hourly billing surprises', color: 'teal-primary' },
              { icon: Rocket, title: 'Execute', desc: 'Track progress & costs in real-time dashboard', color: 'lime-primary' },
              { icon: TrendingUp, title: 'Grow', desc: 'Ongoing optimization to maximize your ROI', color: 'teal-primary' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`bg-${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <step.icon className="text-white h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-dark">{step.title}</h3>
                <p className="text-gray-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-dark">
              See The Savings In Action
            </h2>
            <p className="text-xl text-gray-medium">Real results from real clients</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((caseStudy) => (
              <Card key={caseStudy.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <img 
                    src={caseStudy.image} 
                    alt="Case study client scenario" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-dark mb-2">Challenge:</h4>
                    <p className="text-gray-medium">"{caseStudy.challenge}"</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-dark mb-2">Solution:</h4>
                    <p className="text-gray-medium">"{caseStudy.solution}"</p>
                  </div>
                  <div className="bg-lime-primary p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Results:</h4>
                    <p className="text-white">"{caseStudy.results}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-primary to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-10 w-24 h-24 border-4 border-lime-400 rounded-full"
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold mb-4 text-white"
          >
            Ready to Stop Wasting Your Budget?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-white opacity-90"
          >
            Join hundreds of smart businesses that scaled efficiently.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/quote">
              <Button 
                size="lg"
                className="bg-lime-primary text-white hover:bg-green-500 text-lg px-8 py-4 shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10">Schedule Free Consultation</span>
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 skew-x-12"
              />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
