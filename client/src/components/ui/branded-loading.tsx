import React from 'react';
import { motion } from 'framer-motion';
import logoPath from '@assets/logo_1753208911294.png';

interface BrandedLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  loadingText?: string;
}

export function BrandedLoading({ 
  size = 'md', 
  className = '', 
  showText = true, 
  loadingText = 'Loading...' 
}: BrandedLoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16', 
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-2 border-teal-200 border-t-teal-500`}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* Inner pulsing logo */}
        <motion.div
          className="absolute inset-2 flex items-center justify-center bg-white rounded-full shadow-lg"
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <motion.img
            src={logoPath}
            alt="2Pbal"
            className="w-full h-full object-contain p-1"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-lime-400 rounded-full"
          animate={{
            y: [0, -8, 0],
            x: [0, 4, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.3
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            y: [0, 8, 0],
            x: [0, -4, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.8
          }}
        />
      </div>
      
      {showText && (
        <motion.p 
          className={`mt-4 text-gray-600 font-medium ${textSizeClasses[size]}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {loadingText}
        </motion.p>
      )}
    </div>
  );
}

export function PageTransition({ 
  children, 
  direction = 'right' 
}: { 
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
}) {
  const variants = {
    initial: {
      x: direction === 'right' ? 100 : direction === 'left' ? -100 : 0,
      y: direction === 'down' ? 100 : direction === 'up' ? -100 : 0,
      opacity: 0
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1
    },
    exit: {
      x: direction === 'right' ? -100 : direction === 'left' ? 100 : 0,
      y: direction === 'down' ? -100 : direction === 'up' ? 100 : 0,
      opacity: 0
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
}

export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-block ${className}`}>
      <BrandedLoading size="sm" showText={false} />
    </div>
  );
}

// Replace all generic loading spinners with branded ones
export function LoadingPage({ message = 'Loading your dashboard...' }: { message?: string }) {
  return (
    <div className="pt-16 min-h-screen bg-gray-light flex items-center justify-center">
      <BrandedLoading size="lg" loadingText={message} />
    </div>
  );
}