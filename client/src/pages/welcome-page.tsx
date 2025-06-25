import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import ecipleLogo from "@assets/eciple-white.png";

export default function WelcomePage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  
  // Check if already authenticated
  useEffect(() => {
    const isMainSiteAuthenticated = localStorage.getItem("mainSiteAuthenticated");
    if (isMainSiteAuthenticated === "true") {
      setLocation("/home");
    }
  }, [setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      if (password === "VanNuno@41456") {
        localStorage.setItem("mainSiteAuthenticated", "true");
        setLocation("/home");
      } else {
        console.log("Access denied - incorrect password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#223349] to-[#15BEE2] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img 
            src={ecipleLogo} 
            alt="eciple" 
            className="mx-auto h-16 mb-6" 
          />
          <h1 className="text-white text-2xl md:text-3xl font-bold">Welcome to eciple</h1>
          <p className="text-white/70 mt-2">
            One-to-one discipleship platform - Please enter the access code to continue
          </p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Enter access code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#15BEE2] to-[#223349] hover:from-[#223349] hover:to-[#15BEE2] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Access Platform"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-white/50 text-sm">
          <p>Transforming Discipleship Through Technology</p>
          <p className="mt-1">© {new Date().getFullYear()} eciple. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}