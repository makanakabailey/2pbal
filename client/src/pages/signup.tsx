import { useState, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { signupSchema, type SignupData } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, ArrowLeft, Shield, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Signup() {
  const [, setLocation] = useLocation();
  const { signup, isSignupLoading, signupError } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      marketingConsent: false,
    },
  });

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const password = form.watch('password') || '';
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;
    
    let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
    let color = '#ef4444'; // red
    let percentage = 0;

    if (score >= 2) {
      strength = 'fair';
      color = '#f59e0b'; // yellow
      percentage = 40;
    }
    if (score >= 3) {
      strength = 'good';
      color = '#84cc16'; // lime
      percentage = 70;
    }
    if (score >= 4) {
      strength = 'strong';
      color = '#22c55e'; // green
      percentage = 100;
    }
    if (password.length === 0) {
      percentage = 0;
    } else if (score <= 1) {
      percentage = 20;
    }

    return { score, strength, color, percentage, checks, hasPassword: password.length > 0 };
  }, [form.watch('password')]);

  const onSubmit = async (data: SignupData) => {
    try {
      await signup(data);
      toast({
        title: "Account created successfully!",
        description: "Welcome to 2Pbal. You can now access your dashboard.",
      });
      setLocation('/profile-setup');
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-teal-primary to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="absolute top-4 left-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-dark">Create Your Account</CardTitle>
            <p className="text-gray-medium">
              Join 2Pbal and start transforming your business today
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="John"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Doe"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            type="email"
                            placeholder="john.doe@company.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Acme Corp"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="+1 (555) 123-4567"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="pl-10 pr-10"
                                {...field}
                              />
                            </motion.div>
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          
                          {/* Animated Password Strength Indicator */}
                          <AnimatePresence>
                            {passwordStrength.hasPassword && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2"
                              >
                                {/* Progress Bar */}
                                <div className="relative">
                                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ 
                                        width: `${passwordStrength.percentage}%`,
                                        backgroundColor: passwordStrength.color
                                      }}
                                      transition={{ duration: 0.3, ease: "easeOut" }}
                                      className="h-full rounded-full"
                                    />
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <motion.span 
                                      key={passwordStrength.strength}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="text-xs font-medium"
                                      style={{ color: passwordStrength.color }}
                                    >
                                      {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                                    </motion.span>
                                    <motion.div
                                      animate={{ rotate: passwordStrength.strength === 'strong' ? 360 : 0 }}
                                      transition={{ duration: 0.5 }}
                                    >
                                      <Shield className="h-3 w-3" style={{ color: passwordStrength.color }} />
                                    </motion.div>
                                  </div>
                                </div>
                                
                                {/* Password Requirements */}
                                <div className="text-xs space-y-1">
                                  {[
                                    { key: 'length', label: 'At least 8 characters', check: passwordStrength.checks.length },
                                    { key: 'lowercase', label: 'Lowercase letter', check: passwordStrength.checks.lowercase },
                                    { key: 'uppercase', label: 'Uppercase letter', check: passwordStrength.checks.uppercase },
                                    { key: 'numbers', label: 'Number', check: passwordStrength.checks.numbers },
                                    { key: 'symbols', label: 'Special character', check: passwordStrength.checks.symbols }
                                  ].map((req, index) => (
                                    <motion.div
                                      key={req.key}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className={`flex items-center space-x-2 ${req.check ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                      <motion.div
                                        animate={{ scale: req.check ? 1.1 : 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {req.check ? (
                                          <Check className="h-3 w-3" />
                                        ) : (
                                          <div className="h-3 w-3 rounded-full border border-gray-300" />
                                        )}
                                      </motion.div>
                                      <span>{req.label}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I'd like to receive updates about 2Pbal services and industry insights
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {signupError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {signupError.message || 'Signup failed. Please try again.'}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-teal-primary text-white hover:bg-teal-600"
                  disabled={isSignupLoading}
                >
                  {isSignupLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-medium">
                Already have an account?{' '}
                <Link href="/login">
                  <span className="text-teal-primary hover:text-teal-600 font-medium cursor-pointer">
                    Sign in here
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-xs text-gray-medium">
                By creating an account, you agree to our{' '}
                <span className="text-teal-primary cursor-pointer">Terms of Service</span>
                {' '}and{' '}
                <span className="text-teal-primary cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}