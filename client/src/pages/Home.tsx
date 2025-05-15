import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Product from "@/components/Product";
import Competition from "@/components/Competition";
import Market from "@/components/Market";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUp, LogOut } from "lucide-react";


export default function Home() {
  const [, setLocation] = useLocation();

  
  // Check if user is authenticated for main site
  useEffect(() => {
    const isMainSiteAuthenticated = localStorage.getItem("mainSiteAuthenticated");
    if (isMainSiteAuthenticated !== "true") {
      setLocation("/");
    }
  }, [setLocation]);
  
  // Handle main site logout
  const handleMainSiteLogout = () => {
    localStorage.removeItem("mainSiteAuthenticated");
    // No toast notification
    setLocation("/");
  };
  useEffect(() => {
    // Set up smooth scrolling behavior with animated transition
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId as string);
        if (targetElement) {
          // Calculate the distance to scroll
          const offsetTop = (targetElement as HTMLElement).offsetTop;
          const headerOffset = 80;
          const elementPosition = offsetTop - headerOffset;
          const startPosition = window.pageYOffset;
          const distance = elementPosition - startPosition;
          
          // Animate scroll with easing
          const duration = 800; // ms
          let start: number | null = null;
          
          // Easing function for smoother animation
          const easeInOutQuad = (t: number): number => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          };
          
          const animateScroll = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const timePercent = Math.min(progress / duration, 1);
            const easePercent = easeInOutQuad(timePercent);
            
            window.scrollTo({
              top: startPosition + distance * easePercent,
            });
            
            if (progress < duration) {
              window.requestAnimationFrame(animateScroll);
            }
          };
          
          window.requestAnimationFrame(animateScroll);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Add scroll to top button with animation
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <Solution />
        <Product />
        <Competition />
        {/* Market section moved to investor dashboard */}
        <Pricing />
        <Contact />
      </main>
      <Footer />
      
      {/* Investor Portal button has been moved to the header */}
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 md:right-8 bottom-8 z-40 text-[#15BEE2] p-2 hover:text-[#0368C1] transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 stroke-[2]" />
        </button>
      )}
    </div>
  );
}


