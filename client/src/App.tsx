import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import InvestorDashboard from "@/pages/investor-dashboard";
import WelcomePage from "@/pages/welcome-page";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      {/* Initial welcome page with password protection */}
      <Route path="/" component={WelcomePage} />
      
      {/* Main site (protected by welcome page authentication) */}
      <Route path="/home" component={Home} />
      
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
