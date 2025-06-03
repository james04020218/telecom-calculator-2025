import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TelecomProvider } from "@/context/TelecomContext";
import Dashboard from "@/pages/Dashboard";
import CalculatorPage from "@/pages/CalculatorPage";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";

function Router() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 300);
    }
  }, [location, displayLocation]);

  return (
    <div className={`transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <Switch location={displayLocation}>
        <Route path="/" component={Dashboard} />
        <Route path="/calculator/:telecomType">
          {(params) => <CalculatorPage telecomType={params.telecomType} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TelecomProvider>
          <Toaster />
          <Router />
        </TelecomProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
