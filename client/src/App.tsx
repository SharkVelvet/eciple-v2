import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import EcipleMatch from "@/pages/EcipleMatch";
import Investors from "@/pages/Investors";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

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
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/eciplematch" component={EcipleMatch} />
      <Route path="/investors" component={Investors} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600">Page not found</p>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;