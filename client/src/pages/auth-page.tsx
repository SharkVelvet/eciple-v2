import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Sparkles, Key, Users, ShieldCheck } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/investor-dashboard");
    }
  }, [user, setLocation]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    const { confirmPassword, ...userData } = values;
    registerMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col md:flex-row items-center justify-center p-4">
      <div className="w-full md:w-1/2 max-w-md p-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="w-full">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              <span className="text-secondary inline-block">e</span>ciple
              <span className="ml-2 text-sm text-muted-foreground">Investor Portal</span>
            </h1>
          </div>
          
          <Card className="w-full border-2 border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                {activeTab === "login" ? "Welcome Back" : "Create Your Account"}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === "login" 
                  ? "Sign in to access exclusive investor materials" 
                  : "Register for investor access to eciple"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-6"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-6"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm">
              <p className="text-muted-foreground">
                {activeTab === "login" 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                >
                  {activeTab === "login" ? "Register here" : "Sign in"}
                </button>
              </p>
              <p className="text-muted-foreground">
                <a href="/" className="text-primary underline">Return to public site</a>
              </p>
            </CardFooter>
          </Card>
        </Tabs>
      </div>
      
      <div className="hidden md:flex w-1/2 p-8 flex-col items-center justify-center">
        <div className="max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-primary">Investor Access</h2>
          <p className="text-muted-foreground">
            Welcome to the exclusive eciple investor portal. Access detailed market analyses, financial projections, and strategic roadmaps.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <Sparkles className="h-8 w-8 text-secondary mb-2" />
              <h3 className="font-semibold">Investment Opportunities</h3>
              <p className="text-sm text-center text-muted-foreground">Detailed funding rounds and equity options</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <Key className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold">Secure Portal</h3>
              <p className="text-sm text-center text-muted-foreground">Protected access to confidential materials</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Investor Community</h3>
              <p className="text-sm text-center text-muted-foreground">Connect with other potential stakeholders</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <ShieldCheck className="h-8 w-8 text-success mb-2" />
              <h3 className="font-semibold">Due Diligence</h3>
              <p className="text-sm text-center text-muted-foreground">Complete financial and market analyses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}