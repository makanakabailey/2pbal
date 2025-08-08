import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SmartTooltipProps {
  children: React.ReactNode;
  content: string;
  delay?: number;
  showAfterHesitation?: boolean;
  hesitationTime?: number;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export function SmartTooltip({ 
  children, 
  content, 
  delay = 0,
  showAfterHesitation = false,
  hesitationTime = 3000,
  variant = 'default',
  className 
}: SmartTooltipProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [showHesitationTooltip, setShowHesitationTooltip] = useState(false);
  const [hasShownHesitation, setHasShownHesitation] = useState(false);

  useEffect(() => {
    let hesitationTimer: NodeJS.Timeout;
    
    if (showAfterHesitation && isHovering && !hasShownHesitation) {
      hesitationTimer = setTimeout(() => {
        setShowHesitationTooltip(true);
        setHasShownHesitation(true);
      }, hesitationTime);
    }

    return () => {
      if (hesitationTimer) {
        clearTimeout(hesitationTimer);
      }
    };
  }, [isHovering, showAfterHesitation, hesitationTime, hasShownHesitation]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-600 text-white border-green-500';
      case 'warning':
        return 'bg-yellow-600 text-white border-yellow-500';
      case 'info':
        return 'bg-blue-600 text-white border-blue-500';
      default:
        return 'bg-gray-800 text-white border-gray-700';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>
          <div 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setShowHesitationTooltip(false);
            }}
          >
            {children}
          </div>
        </TooltipTrigger>
        <AnimatePresence>
          {(isHovering || showHesitationTooltip) && (
            <TooltipContent asChild>
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  'px-3 py-2 rounded-md shadow-lg border text-sm font-medium',
                  getVariantStyles(),
                  className
                )}
              >
                {content}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-white/30 rounded-full"
                />
              </motion.div>
            </TooltipContent>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
}

export function HesitationTooltip({ 
  children, 
  content, 
  hesitationTime = 3000,
  variant = 'info'
}: Omit<SmartTooltipProps, 'showAfterHesitation'>) {
  return (
    <SmartTooltip
      showAfterHesitation
      hesitationTime={hesitationTime}
      variant={variant}
      content={content}
    >
      {children}
    </SmartTooltip>
  );
}