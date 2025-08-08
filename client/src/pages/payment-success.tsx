import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Calendar, FileText, Star, Trophy, Sparkles, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Confetti component using 2Pbal brand colors (Teal and Lime)
const Confetti = () => {
  const confettiColors = ['#06b6d4', '#14b8a6', '#22c55e', '#84cc16', '#3b82f6']; // Teal, Lime, and Blue brand colors
  const confettiShapes = ['circle', 'square', 'triangle'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(80)].map((_, i) => {
        const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-sm' : ''}`}
            style={{
              backgroundColor: color,
              left: `${Math.random() * 100}%`,
              width: shape === 'triangle' ? 0 : `${Math.random() * 8 + 4}px`,
              height: shape === 'triangle' ? 0 : `${Math.random() * 8 + 4}px`,
              ...(shape === 'triangle' && {
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: `8px solid ${color}`,
                backgroundColor: 'transparent'
              })
            }}
            initial={{
              y: -100,
              x: Math.random() * 40 - 20,
              rotate: 0,
              scale: 0,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 100,
              x: Math.random() * 40 - 20,
              rotate: [0, 180, 360],
              scale: [0, 1, 1, 0.8, 0],
              opacity: [0, 1, 1, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              delay: Math.random() * 1.5,
              ease: "easeOut",
              rotate: { duration: Math.random() * 1 + 2, repeat: Infinity }
            }}
          />
        );
      })}
    </div>
  );
};

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Show confetti animation and then hide it
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    // You could track payment success analytics here
    console.log('Payment completed successfully');
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 pt-20 overflow-hidden relative">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-400 to-teal-600 rounded-full mb-8 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 bg-gradient-to-br from-green-300 to-teal-500 rounded-full opacity-50"
            />
            <CheckCircle className="h-16 w-16 text-white relative z-10" />
            
            {/* Sparkles around success icon */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  top: `${30 + 30 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  left: `${30 + 30 * Math.cos((i * Math.PI * 2) / 8)}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
              🎉 Mission Accomplished!
            </h1>
            <p className="text-2xl text-gray-700 font-medium mb-4">
              Welcome to the 2Pbal Family
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Your transformation journey begins now. Get ready to experience business growth like never before!
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Project Blueprint Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Your Mission Roadmap */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-teal-200 h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Rocket className="h-6 w-6 mr-3 text-teal-600" />
                  </motion.div>
                  Your Mission Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { step: 1, title: "Team Assembly (24-48 hours)", desc: "Your elite squad of digital experts is being assembled and briefed.", icon: "👥" },
                  { step: 2, title: "Strategic Launch Meeting (Within 72 hours)", desc: "Your mission commander will contact you for the strategic briefing.", icon: "🚀" },
                  { step: 3, title: "Execution Phase Begins", desc: "Your project enters active development with real-time progress tracking.", icon: "⚡" }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                    className="flex items-start group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 group-hover:shadow-lg transition-shadow"
                    >
                      {item.step}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
                        {item.icon} {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission Control Center */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-blue-200 h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Trophy className="h-6 w-6 mr-3 text-blue-600" />
                  </motion.div>
                  Mission Control Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { title: "Instant Confirmation", desc: "Mission briefing email deployed to your inbox within 10 minutes.", icon: "📧", status: "active" },
                  { title: "Command Dashboard Access", desc: "Your strategic overview dashboard is now online and ready.", icon: "🎯", status: "ready" },
                  { title: "Success Guarantee Protocol", desc: "30-day mission success guarantee - we stand behind every operation.", icon: "🛡️", status: "protected" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.2 }}
                    className="group"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{item.icon}</span>
                      <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h4>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active' ? 'bg-green-100 text-green-700' :
                          item.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </motion.div>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{item.desc}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setLocation('/client-portal')}
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-lg px-8 py-4 font-semibold relative overflow-hidden group"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center">
                  <Rocket className="h-5 w-5 mr-2" />
                  Enter Your Mission Control
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setLocation('/services')}
                variant="outline"
                className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 text-lg px-8 py-4 font-medium"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore More Solutions
              </Button>
            </motion.div>
          </div>
          
          {/* Success Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex justify-center items-center space-x-8 text-center py-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-5 w-5 text-yellow-500" />
              </motion.div>
              <div>
                <p className="font-bold text-gray-800">500+</p>
                <p className="text-xs text-gray-600">Happy Clients</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-orange-500" />
              <div>
                <p className="font-bold text-gray-800">98%</p>
                <p className="text-xs text-gray-600">Success Rate</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-bold text-gray-800">24/7</p>
                <p className="text-xs text-gray-600">Support</p>
              </div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto border border-gray-200"
          >
            <strong>Direct Support Line:</strong> hello@2pbal.com • +1 (555) 123-4567<br />
            <em>Your success is our mission. We're here whenever you need us.</em>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}