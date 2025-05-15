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

import { Sparkles, Key, Users, ShieldCheck, Lock } from "lucide-react";
import ecipleBlueLogo from "@assets/eciple-blue.png";

const accessRequestSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
});

const passcodeSchema = z.object({
  passcode: z.string().min(4, {
    message: "Passcode must be at least 4 characters.",
  }),
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"request" | "passcode">("request");
  const [, setLocation] = useLocation();

  
  // The passcode that allows access to the investor dashboard
  // In a real app, this would be validated against a secure backend
  const INVESTOR_PASSCODE = "eciple2023";

  // Check if user is already authenticated
  useEffect(() => {
    // Check if authenticated for main site access
    const isMainSiteAuthenticated = localStorage.getItem("mainSiteAuthenticated");
    if (isMainSiteAuthenticated !== "true") {
      setLocation("/");
      return;
    }
    
    // Check if already investor authenticated
    const isAuthenticated = localStorage.getItem("investorAuthenticated") === "true";
    if (isAuthenticated) {
      setLocation("/investor-dashboard");
    }
  }, [setLocation]);

  const accessRequestForm = useForm<z.infer<typeof accessRequestSchema>>({
    resolver: zodResolver(accessRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
    },
  });

  const passcodeForm = useForm<z.infer<typeof passcodeSchema>>({
    resolver: zodResolver(passcodeSchema),
    defaultValues: {
      passcode: "",
    },
  });

  const onAccessRequestSubmit = (values: z.infer<typeof accessRequestSchema>) => {
    // In a real app, this would send the request to a backend service
    console.log("Access request submitted:", values);
    // No toast notification
    accessRequestForm.reset();
  };
  
  const onPasscodeSubmit = (values: z.infer<typeof passcodeSchema>) => {
    if (values.passcode === INVESTOR_PASSCODE) {
      // Store authentication in localStorage
      localStorage.setItem("investorAuthenticated", "true");
      localStorage.setItem("investorUsername", "Investor");
      
      // No toast notification
      setLocation("/investor-dashboard");
    } else {
      // No toast notification for failure
      console.log("Invalid passcode attempt");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#223349]/10 via-white to-[#15BEE2]/10 flex flex-col md:flex-row items-center justify-center p-4">
      <div className="w-full md:w-1/2 max-w-md p-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "request" | "passcode")} className="w-full">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-2">
              <img src={ecipleBlueLogo} alt="eciple logo" className="h-12" />
            </div>
            <span className="text-sm text-muted-foreground">Investor Portal</span>
          </div>
          
          <Card className="w-full border-2 border-[#15BEE2]/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                {activeTab === "request" ? "Request Investor Access" : "Enter Passcode"}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === "request" 
                  ? "Submit your information to request access" 
                  : "Enter your investor passcode to view exclusive materials"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="request">Request Access</TabsTrigger>
                <TabsTrigger value="passcode">Enter Passcode</TabsTrigger>
              </TabsList>
              
              <TabsContent value="request">
                <Form {...accessRequestForm}>
                  <form onSubmit={accessRequestForm.handleSubmit(onAccessRequestSubmit)} className="space-y-4">
                    <FormField
                      control={accessRequestForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accessRequestForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accessRequestForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={accessRequestForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-[#223349] hover:bg-[#15BEE2]"
                    >
                      Submit Request
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="passcode">
                <Form {...passcodeForm}>
                  <form onSubmit={passcodeForm.handleSubmit(onPasscodeSubmit)} className="space-y-4">
                    <FormField
                      control={passcodeForm.control}
                      name="passcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investor Passcode</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input 
                                className="pl-9" 
                                placeholder="Enter your passcode" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-[#223349] hover:bg-[#15BEE2]"
                    >
                      Access Portal
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm">
              <p className="text-muted-foreground">
                {activeTab === "request" 
                  ? "Already have a passcode? " 
                  : "Need to request access? "}
                <button
                  type="button"
                  className="text-[#15BEE2] underline"
                  onClick={() => setActiveTab(activeTab === "request" ? "passcode" : "request")}
                >
                  {activeTab === "request" ? "Enter it here" : "Request here"}
                </button>
              </p>
              <p className="text-muted-foreground">
                <a href="/" className="text-[#15BEE2] underline">Visit Main Site</a>
              </p>
            </CardFooter>
          </Card>
        </Tabs>
      </div>
      
      <div className="hidden md:flex w-1/2 p-8 flex-col items-center justify-center">
        <div className="max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-[#223349]">Investor Access</h2>
          <p className="text-muted-foreground">
            Welcome to the exclusive eciple investor portal. Access detailed market analyses, financial projections, and strategic roadmaps.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <Sparkles className="h-8 w-8 text-[#15BEE2] mb-2" />
              <h3 className="font-semibold text-center">Investment Opportunities</h3>
              <p className="text-sm text-center text-muted-foreground">Detailed funding rounds and equity options</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <Key className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold">Secure Portal</h3>
              <p className="text-sm text-center text-muted-foreground">Protected access to confidential materials</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <Users className="h-8 w-8 text-[#15BEE2] mb-2" />
              <h3 className="font-semibold">Investor Community</h3>
              <p className="text-sm text-center text-muted-foreground">Connect with other potential stakeholders</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <ShieldCheck className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold">Due Diligence</h3>
              <p className="text-sm text-center text-muted-foreground">Complete financial and market analyses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}