import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Contrast, Eye, Palette } from 'lucide-react';

interface AccessibilityFeatures {
  darkMode: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState<AccessibilityFeatures>({
    darkMode: false,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
  });

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem('accessibility-preferences');
    if (saved) {
      setFeatures(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply accessibility features
    const root = document.documentElement;
    
    if (features.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    if (features.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (features.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (features.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    // Save preferences
    localStorage.setItem('accessibility-preferences', JSON.stringify(features));
  }, [features]);

  const updateFeature = (key: keyof AccessibilityFeatures, value: boolean) => {
    setFeatures(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        aria-label="Accessibility Options"
      >
        <Eye className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 right-4 z-50"
          >
            <Card className="w-72 shadow-xl border-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    Accessibility
                  </h3>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="flex items-center text-sm">
                      {features.darkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                      Dark Mode
                    </Label>
                    <Switch
                      id="dark-mode"
                      checked={features.darkMode}
                      onCheckedChange={(checked) => updateFeature('darkMode', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast" className="flex items-center text-sm">
                      <Contrast className="h-4 w-4 mr-2" />
                      High Contrast
                    </Label>
                    <Switch
                      id="high-contrast"
                      checked={features.highContrast}
                      onCheckedChange={(checked) => updateFeature('highContrast', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="large-text" className="flex items-center text-sm">
                      <span className="text-lg mr-2">Aa</span>
                      Large Text
                    </Label>
                    <Switch
                      id="large-text"
                      checked={features.largeText}
                      onCheckedChange={(checked) => updateFeature('largeText', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduced-motion" className="text-sm">
                      Reduce Motion
                    </Label>
                    <Switch
                      id="reduced-motion"
                      checked={features.reducedMotion}
                      onCheckedChange={(checked) => updateFeature('reducedMotion', checked)}
                    />
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                  These settings are saved to your browser and will persist across sessions.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}