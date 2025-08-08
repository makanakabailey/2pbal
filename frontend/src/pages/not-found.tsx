import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { Home, Search, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-lime-50 pt-16">
      <Card className="w-full max-w-2xl mx-4 shadow-xl border-2 border-teal-200">
        <CardContent className="pt-12 pb-8 px-8 text-center">
          {/* Animated Digital Gear Illustration */}
          <motion.div 
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                <motion.div
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, -20, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-sm transform rotate-45"></div>
                </motion.div>
              </div>
              {/* Floating Sparkles */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-lime-400 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-1 -left-3 w-3 h-3 bg-yellow-400 rounded-full"
                animate={{ 
                  x: [0, 5, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </motion.div>

          {/* Friendly Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Oops, that page seems to have gone missing! 
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              Don't worry, even the best digital solutions sometimes take unexpected detours. Let's get you back on track!
            </p>
          </motion.div>

          {/* Helpful Navigation Links */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 border-teal-200 hover:border-teal-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200 transition-colors">
                      <Home className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Home</h3>
                    <p className="text-sm text-gray-600">Back to the main page</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link href="/services">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 border-blue-200 hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                      <Search className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Services</h3>
                    <p className="text-sm text-gray-600">Explore our solutions</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link href="/quote">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 border-lime-200 hover:border-lime-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-lime-200 transition-colors">
                      <MessageCircle className="h-6 w-6 text-lime-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Get Quote</h3>
                    <p className="text-sm text-gray-600">Start your project</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg px-8"
                withRipple
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Take Me Home
              </Button>
            </Link>
          </motion.div>

          {/* Subtle Brand Message */}
          <motion.p 
            className="mt-8 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            2Pbal - Precise Programming for Business Advancement and Leverage
          </motion.p>
        </CardContent>
      </Card>
    </div>
  );
}