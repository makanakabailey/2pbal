import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, DollarSign, Calculator, Zap } from 'lucide-react';

interface ROIData {
  currentSpend: number;
  projectedSavings: number;
  timeToROI: number;
  annualSavings: number;
}

export function InteractiveROICard() {
  const [currentSpend, setCurrentSpend] = useState([25000]);
  const [roiData, setRoiData] = useState<ROIData>({
    currentSpend: 25000,
    projectedSavings: 10000,
    timeToROI: 6,
    annualSavings: 20000
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Calculate ROI based on current spend
    const spend = currentSpend[0];
    const savingsPercent = Math.min(Math.max((spend / 1000) * 0.4, 20), 45);
    const projectedSavings = Math.round(spend * (savingsPercent / 100));
    const timeToROI = Math.max(Math.round(12 - (spend / 5000)), 3);
    const annualSavings = projectedSavings * 2;

    setIsAnimating(true);
    setTimeout(() => {
      setRoiData({
        currentSpend: spend,
        projectedSavings,
        timeToROI,
        annualSavings
      });
      setIsAnimating(false);
    }, 300);
  }, [currentSpend]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-teal-200">
      <CardHeader>
        <CardTitle className="flex items-center text-teal-700">
          <Calculator className="h-5 w-5 mr-2" />
          ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Annual Digital Spend
          </label>
          <div className="space-y-2">
            <Slider
              value={currentSpend}
              onValueChange={setCurrentSpend}
              max={100000}
              min={5000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$5K</span>
              <motion.span 
                className="font-semibold text-teal-600"
                animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
              >
                {formatCurrency(currentSpend[0])}
              </motion.span>
              <span>$100K+</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            key={roiData.projectedSavings}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 border border-green-200"
          >
            <div className="flex items-center text-green-600 mb-2">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">6-Month Savings</span>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(roiData.projectedSavings)}
            </div>
          </motion.div>

          <motion.div
            key={roiData.timeToROI}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-4 border border-blue-200"
          >
            <div className="flex items-center text-blue-600 mb-2">
              <Zap className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Time to ROI</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {roiData.timeToROI} months
            </div>
          </motion.div>
        </div>

        <motion.div
          key={roiData.annualSavings}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-1">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span className="font-medium">Annual Savings Potential</span>
              </div>
              <div className="text-3xl font-bold">
                {formatCurrency(roiData.annualSavings)}
              </div>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              📈
            </motion.div>
          </div>
        </motion.div>

        <div className="text-xs text-gray-500 text-center">
          * Calculations based on industry averages and 2Pbal's proven track record
        </div>
      </CardContent>
    </Card>
  );
}