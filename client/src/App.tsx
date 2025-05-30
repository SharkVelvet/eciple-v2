import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import AuthPage from "@/pages/auth-page";
import InvestorDashboard from "@/pages/investor-dashboard";
import WelcomePage from "@/pages/welcome-page";
import ComparisonPage from "@/pages/ComparisonPage";
import CookiePolicyPage from "@/pages/cookie-policy";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsConditionsPage from "@/pages/terms-conditions";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      {/* Main site - now the home page */}
      <Route path="/" component={ComparisonPage} />
      
      {/* Main site alternate route */}
      <Route path="/home" component={ComparisonPage} />
      
      {/* Policy pages */}
      <Route path="/cookie-policy" component={CookiePolicyPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-conditions" component={TermsConditionsPage} />
      
      {/* Investor portal authentication */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Investor dashboard (protected by investor authentication) */}
      <Route path="/investor-dashboard" component={InvestorDashboard} />
      
      {/* 404 page */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>

          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
