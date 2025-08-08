import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginData } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, AlertCircle, CheckCircle2, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [, setLocation] = useLocation();
  const { login, isLoginLoading, loginError } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidationState, setEmailValidationState] = useState<'idle' | 'checking' | 'exists' | 'not-found'>('idle');
  const [emailCheckTimeout, setEmailCheckTimeout] = useState<NodeJS.Timeout | null>(null);
  const [supportsBiometric, setSupportsBiometric] = useState(false);
  const [showMagicLinkOption, setShowMagicLinkOption] = useState(false);
  const formShakeRef = useRef<HTMLDivElement>(null);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Check for biometric authentication support
  useEffect(() => {
    const checkBiometricSupport = async () => {
      if (window.PublicKeyCredential && typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        try {
          const available = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setSupportsBiometric(available);
        } catch (error) {
          console.log('Biometric not available:', error);
        }
      }
    };
    checkBiometricSupport();
  }, []);

  // Proactive email validation
  const checkEmailExists = useCallback(async (email: string) => {
    if (!email || !email.includes('@')) return;
    
    setEmailValidationState('checking');
    try {
      const response = await apiRequest(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
      setEmailValidationState(response.exists ? 'exists' : 'not-found');
    } catch (error) {
      setEmailValidationState('idle');
    }
  }, []);

  // Debounced email checking
  const handleEmailChange = useCallback((email: string) => {
    form.setValue('email', email);
    
    if (emailCheckTimeout) {
      clearTimeout(emailCheckTimeout);
    }
    
    const timeout = setTimeout(() => {
      checkEmailExists(email);
    }, 1000);
    
    setEmailCheckTimeout(timeout);
  }, [emailCheckTimeout, checkEmailExists, form]);

  // Magic Link Authentication
  const handleMagicLink = async () => {
    const email = form.getValues('email');
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest('/api/auth/magic-link', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      
      toast({
        title: "Magic Link Sent!",
        description: "Check your email for the login link. It expires in 10 minutes.",
      });
      setShowMagicLinkOption(false);
    } catch (error: any) {
      toast({
        title: "Failed to Send Magic Link",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Biometric Authentication
  const handleBiometricLogin = async () => {
    try {
      // Simulate biometric authentication flow
      toast({
        title: "Feature Coming Soon",
        description: "Biometric login will be available in the next update.",
      });
    } catch (error: any) {
      toast({
        title: "Biometric Login Failed",
        description: error.message || "Please use password login.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await login(data);
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
      
      // Redirect based on user role
      if (result?.user?.role === 'admin') {
        setLocation('/admin-dashboard');
      } else {
        setLocation('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-teal-primary to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <CardTitle className="text-2xl font-bold text-gray-dark">Welcome Back</CardTitle>
            <p className="text-gray-medium">
              Sign in to your 2Pbal account to access your projects
            </p>
          </CardHeader>
          <CardContent>
            {/* Biometric Login Option - Primary CTA */}
            {supportsBiometric && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Button
                  type="button"
                  onClick={handleBiometricLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-medium relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center">
                    <Fingerprint className="h-5 w-5 mr-2" />
                    Login with Face ID
                  </span>
                </Button>
              </motion.div>
            )}

            <Form {...form}>
              <motion.div
                ref={formShakeRef}
                animate={emailValidationState === 'not-found' ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className={`pl-10 pr-10 transition-all duration-300 ${
                                  emailValidationState === 'exists' ? 'ring-2 ring-green-500 ring-opacity-50' :
                                  emailValidationState === 'not-found' ? 'ring-2 ring-red-500 ring-opacity-50' : ''
                                }`}
                                onChange={(e) => handleEmailChange(e.target.value)}
                                value={field.value}
                              />
                            </motion.div>
                            
                            {/* Email validation indicator */}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <AnimatePresence>
                                {emailValidationState === 'checking' && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"
                                  />
                                )}
                                {emailValidationState === 'exists' && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                  >
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  </motion.div>
                                )}
                                {emailValidationState === 'not-found' && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                  >
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </FormControl>
                        
                        {/* Proactive feedback for non-existent email */}
                        <AnimatePresence>
                          {emailValidationState === 'not-found' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-1 text-sm text-red-600"
                            >
                              No account found. <Link href="/signup"><span className="text-blue-600 hover:text-blue-800 underline cursor-pointer">Create one?</span></Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loginError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {loginError.message || 'Login failed. Please try again.'}
                    </AlertDescription>
                  </Alert>
                )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 font-medium relative overflow-hidden group"
                      disabled={isLoginLoading}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center">
                        <Lock className="h-4 w-4 mr-2" />
                        {isLoginLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Signing In...
                          </>
                        ) : (
                          'Sign In Securely'
                        )}
                      </span>
                    </Button>
                  </motion.div>
                  
                  {/* Magic Link Option */}
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowMagicLinkOption(!showMagicLinkOption)}
                      className="text-sm text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                    >
                      {showMagicLinkOption ? 'Hide Magic Link' : 'Login with Magic Link'}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showMagicLinkOption && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <p className="text-sm text-blue-800 mb-3 text-center">
                          We'll send you a secure login link - no password needed!
                        </p>
                        <Button
                          type="button"
                          onClick={handleMagicLink}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Magic Link
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-medium">
                Don't have an account?{' '}
                <Link href="/signup">
                  <span className="text-teal-primary hover:text-teal-600 font-medium cursor-pointer">
                    Sign up here
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-sm text-gray-medium">
                Continue without account?{' '}
                <Link href="/">
                  <span className="text-teal-primary hover:text-teal-600 cursor-pointer">
                    Browse as guest
                  </span>
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}