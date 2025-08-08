import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CountingNumbersProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  trigger?: boolean;
}

export default function CountingNumbers({ 
  end, 
  start = 0, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = '',
  trigger = true 
}: CountingNumbersProps) {
  const [current, setCurrent] = useState(start);

  useEffect(() => {
    if (!trigger) return;

    const steps = 60; // 60fps animation
    const stepTime = (duration * 1000) / steps;
    const stepValue = (end - start) / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = start + (stepValue * currentStep);
      
      if (currentStep >= steps) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.round(nextValue));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, start, duration, trigger]);

  return (
    <motion.span 
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{current}{suffix}
    </motion.span>
  );
}