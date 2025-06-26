import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home-page";
import EcipleMatchPage from "@/pages/eciplematch-page";
import InvestorPage from "@/pages/investor-page";
import InvestorDashboard from "@/pages/investor-dashboard";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import CookiePolicy from "@/pages/cookie-policy";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(queryKey[0] as string);
        if (!response.ok) {
          if (response.status >= 500) {
            throw new Error(`Server error: ${response.status}`);
          }
          if (response.status === 404) {
            throw new Error(`Not found: ${response.status}`);
          }
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        return response.json();
      },
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/eciplematch" component={EcipleMatchPage} />
      <Route path="/investors" component={InvestorPage} />
      <Route path="/investor-dashboard" component={InvestorDashboard} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/comparison" component={ComparisonPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;