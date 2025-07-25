import { useState } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SavingsCalculator from "@/components/ui/savings-calculator";
import Home from "@/pages/home";
import Packages from "@/pages/packages";
import PackageDetails from "@/pages/package-details";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import PaymentOptions from "@/pages/payment-options";
import ScheduleConsultation from "@/pages/schedule-consultation";
import Checkout from "@/pages/checkout";
import PaymentSuccess from "@/pages/payment-success";
import Quote from "@/pages/quote";
import ClientPortal from "@/pages/client-portal";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import ProfileSetup from "@/pages/profile-setup";
import NotFound from "@/pages/not-found";

function Router() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <>
      <Header onOpenCalculator={() => setCalculatorOpen(true)} />
      <main>
        <Switch>
          <Route path="/" component={() => <Home onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/packages" component={() => <Packages onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/package/:id" component={() => <PackageDetails onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/services" component={Services} />
          <Route path="/service/:serviceId" component={ServiceDetail} />
          <Route path="/payment-options/:serviceId" component={PaymentOptions} />
          <Route path="/schedule-consultation" component={ScheduleConsultation} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/quote" component={Quote} />
          <Route path="/client-portal/:type/:id" component={() => <ClientPortal onOpenCalculator={() => setCalculatorOpen(true)} />} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile-setup" component={ProfileSetup} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <SavingsCalculator 
        open={calculatorOpen} 
        onOpenChange={setCalculatorOpen} 
      />
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
