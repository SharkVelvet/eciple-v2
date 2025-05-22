import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import ecipleLogo from "@assets/eciple-white.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  
  // Handle main site logout
  const handleLogout = () => {
    localStorage.removeItem("mainSiteAuthenticated");
    setLocation("/");
  };
  
  // Handle admin login
  const handleAdminLogin = () => {
    if (adminPassword === "bobby") {
      localStorage.setItem("isAdmin", "true");
      setShowAdminDialog(false);
      setAdminPassword(""); // Clear password
      toast({
        title: "Admin Access Granted",
        description: "You now have admin privileges.",
      });
      // Force a reload to update the admin state
      window.location.reload();
    } else {
      toast({
        title: "Invalid Password",
        description: "Please try again with the correct password.",
        variant: "destructive",
      });
    }
  };
  
  const links = {
    quickLinks: [
      { name: "The Problem", href: "#problem" },
      { name: "Our Solution", href: "#solution" },
      { name: "Product Features", href: "#product" },
      { name: "Competitive Analysis", href: "#competition" },
      { name: "Market Opportunity", href: "#market" },
      { name: "Pricing", href: "#pricing" }
    ],
    resources: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ],
    contact: [
      { icon: "envelope", text: "info@eciple.com" }
    ],
    social: [
      { icon: "facebook-f", href: "#" },
      { icon: "twitter", href: "#" },
      { icon: "instagram", href: "#" },
      { icon: "linkedin-in", href: "#" }
    ]
  };

  return (
    <footer className="bg-[#223349] text-white py-12">
      {/* Admin Login Dialog */}
      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>
              Enter your password to access admin features.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input 
                id="admin-password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAdminLogin();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdminDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdminLogin}>
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="mb-4">
              <img 
                src={ecipleLogo} 
                alt="eciple logo" 
                className="h-10 w-auto object-contain" 
              />
            </div>
            <p className="text-white text-opacity-70 mb-4">
              Transforming discipleship through innovative technology and intentional relationships.
            </p>
            <div className="flex space-x-4">
              {links.social.map((item, index) => (
                <a key={index} href={item.href} className="text-white text-opacity-80 hover:text-white transition-colors">
                  <i className={`fab fa-${item.icon}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
          >
            <h4 className="text-lg font-semibold font-sans mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white text-opacity-70 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
          >
            <h4 className="text-lg font-semibold font-sans mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white text-opacity-70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
          >
            <h4 className="text-lg font-semibold font-sans mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-accent mr-2 mt-1">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="text-white text-opacity-70">{links.contact[0].text}</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-white text-opacity-60">
              &copy; {currentYear} eciple. All rights reserved. Discipleship Reimagined.
            </p>
            <p className="text-white text-opacity-60 text-xs flex items-center justify-center">
              Built by <a href="https://www.fotype.com" className="text-[#15BEE2] hover:text-white mx-1" target="_blank" rel="noopener noreferrer">FOTYPE</a>
              <span className="cursor-pointer px-1" onClick={() => setShowAdminDialog(true)}>
                <i className="fas fa-cog text-white/30 hover:text-[#15BEE2] transition-colors text-xs"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
