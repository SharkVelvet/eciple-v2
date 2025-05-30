import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ecipleLogo from "@assets/eciple-white.png";

export default function LegalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 bg-[#223349] shadow-lg py-4">
      <div className="max-w-[1380px] mx-auto px-8 md:px-6">
        <div className="flex items-center justify-between" style={{ minHeight: '60px' }}>
          {/* Logo - Left aligned */}
          <div className="flex-none">
            <a 
              href="/" 
              className="block"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex flex-col items-start">
                  <img 
                    src={ecipleLogo} 
                    alt="eciple logo" 
                    className="h-8 w-auto object-contain" 
                  />
                  <span className="text-white text-opacity-70 text-xs mt-1">
                    Igniting Spiritual Growth
                  </span>
                </div>
              </motion.div>
            </a>
          </div>
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Right side - Mobile menu button */}
          <div className="flex items-center">
            {/* Mobile menu button - only shows on mobile */}
            <div className="md:hidden flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-white flex items-center justify-center"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0.3, 1] }}
            className="md:hidden bg-[#223349] w-full py-5 shadow-lg absolute overflow-hidden top-full"
          >
            <motion.ul 
              className="flex flex-col space-y-1 px-8 max-w-lg mx-auto"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 }
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 }
                }
              }}
            >
              <motion.li 
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.15,
                      ease: "easeOut"
                    }
                  },
                  closed: {
                    y: 10,
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                      ease: "easeIn"
                    }
                  }
                }}
              >
                <a 
                  href="/" 
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 py-3 px-4 text-white hover:text-white/90 hover:bg-white/10 rounded-md transition-colors font-medium"
                >
                  <Home className="h-4 w-4" />
                  Back to Main Site
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}