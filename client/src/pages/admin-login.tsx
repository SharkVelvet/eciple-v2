import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Shield } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the session token
        localStorage.setItem('adminSessionToken', data.sessionToken);
        localStorage.setItem('adminLoggedIn', 'true');
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        setLocation('/admin-dashboard');
      } else {
        const error = await response.json();
        toast({
          title: "Login failed",
          description: error.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Unable to connect to the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#223349] to-[#15BEE2] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#15BEE2] to-[#223349] rounded-full flex items-center justify-center"
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-[#223349]">
              Admin Login
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Access the EcipleMatch admin dashboard
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="Enter your username"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#15BEE2]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#15BEE2]"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#15BEE2] to-[#223349] hover:from-[#223349] hover:to-[#15BEE2] text-white py-3 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 text-center">
                Default credentials for testing:
              </p>
              <p className="text-sm text-gray-700 text-center mt-1">
                <strong>Username:</strong> admin<br />
                <strong>Password:</strong> password123
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}