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
import Services from "@/pages/services";
import Quote from "@/pages/quote";
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
          <Route path="/services" component={Services} />
          <Route path="/quote" component={Quote} />
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
