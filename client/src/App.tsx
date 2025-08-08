import { useState } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityPanel } from "@/components/ui/accessibility-toggle";
import { ContextualHelp } from "@/components/ui/contextual-help";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SavingsCalculator from "@/components/ui/savings-calculator";
import Home from "@/pages/home";
import About from "@/pages/about";
import Packages from "@/pages/packages";
import PackageDetails from "@/pages/package-details";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import PaymentOptions from "@/pages/payment-options";
import Payment from "@/pages/payment";
import ScheduleConsultation from "@/pages/schedule-consultation";
import Checkout from "@/pages/checkout";
import PaymentSuccess from "@/pages/payment-success";
import Quote from "@/pages/quote";
import ClientPortal from "@/pages/client-portal";
import RecommendationPage from "@/pages/recommendation";
import CaseStudies from "@/pages/case-studies";
import Careers from "@/pages/careers";
import PrivacyPolicy from "@/pages/privacy-policy";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import VerifyEmail from "@/pages/verify-email";
import Dashboard from "@/pages/dashboard";
import ProfileSetup from "@/pages/profile-setup";
import AccountSettings from "@/pages/account-settings";
import AdminDashboard from "@/pages/admin-dashboard";
import SubscriptionManagement from "@/pages/subscription-management";
import EnhancedSubscriptionManagement from "@/pages/enhanced-subscription-management";
import AdminSubscriptionManagement from "@/pages/admin-subscription-management";
import EnhancedAdminSubscriptionManagement from "@/pages/enhanced-admin-subscription-management";
import AdminFileManagement from "@/pages/admin-file-management";
import Subscribe from "@/pages/subscribe";
import NotFound from "@/pages/not-found";

function Router() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <>
      <Header onOpenCalculator={() => setCalculatorOpen(true)} />
      <main>
        <Switch>
          <Route path="/" component={() => <Home onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/about" component={About} />
          <Route path="/packages" component={() => <Packages onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/package/:id" component={() => <PackageDetails onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/package-details/:id" component={() => <PackageDetails onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/services" component={Services} />
          <Route path="/service/:serviceId" component={ServiceDetail} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/careers" component={Careers} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/payment-options" component={PaymentOptions} />
          <Route path="/payment-options/:serviceId" component={PaymentOptions} />
          <Route path="/payment/:packageId" component={Payment} />
          <Route path="/payment" component={Payment} />
          <Route path="/schedule-consultation" component={ScheduleConsultation} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/quote" component={Quote} />
          <Route path="/recommendations" component={RecommendationPage} />
          <Route path="/client-portal/:type/:id" component={() => <ClientPortal onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/client-portal" component={() => <ClientPortal onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile-setup" component={ProfileSetup} />
          <Route path="/account-settings" component={AccountSettings} />
          <Route path="/subscription-management" component={EnhancedSubscriptionManagement} />
          <Route path="/subscription-management-legacy" component={SubscriptionManagement} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/admin-subscription-management" component={EnhancedAdminSubscriptionManagement} />
          <Route path="/admin-subscription-management-legacy" component={AdminSubscriptionManagement} />
          <Route path="/admin-file-management" component={AdminFileManagement} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <SavingsCalculator 
        open={calculatorOpen} 
        onOpenChange={setCalculatorOpen} 
      />
      <AccessibilityPanel />
      <ContextualHelp />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
