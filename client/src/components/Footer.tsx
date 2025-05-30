import { motion } from "framer-motion";
import { useLocation } from "wouter";

import ecipleLogo from "@assets/eciple-white.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [, setLocation] = useLocation();
  
  // Handle main site logout
  const handleLogout = () => {
    localStorage.removeItem("mainSiteAuthenticated");
    setLocation("/");
  };
  
  const links = {
    quickLinks: [
      { name: "The Problem", href: "#problem" },
      { name: "Our Solution", href: "#solution" },
      { name: "Comparison", href: "#comparison" },
      { name: "Pricing", href: "#pricing" },
      { name: "Contact Us", href: "#contact" }
    ],
    resources: [
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms-conditions" },
      { name: "Main Page", href: "/home" }
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
    <footer className="bg-[#1a2a3d] text-white py-12">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="mb-4">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block hover:opacity-80 transition-opacity cursor-pointer"
              >
                <img 
                  src={ecipleLogo} 
                  alt="eciple logo" 
                  className="h-10 w-auto object-contain" 
                />
              </a>
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
                  {link.href.startsWith('#') ? (
                    <a 
                      href={link.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="text-white text-opacity-70 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a href={link.href} className="text-white text-opacity-70 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
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
            <div className="text-white text-opacity-60">
              <p>&copy; {currentYear} eciple. All rights reserved.</p>
            </div>
            <p className="text-white text-opacity-60 text-xs flex items-center justify-center">
              Built by <a href="https://www.fotype.com" className="text-[#15BEE2] hover:text-white mx-1" target="_blank" rel="noopener noreferrer">FOTYPE</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}