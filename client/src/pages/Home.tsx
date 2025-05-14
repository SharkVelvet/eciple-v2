import { useEffect, useState } from "react";
import { Link } from "wouter";
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
import { ArrowUpCircle, LockKeyhole } from "lucide-react";

export default function Home() {
  useEffect(() => {
    // Set up smooth scrolling behavior
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId as string);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
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
        <Market />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      
      {/* Investor Portal Button */}
      <div className="fixed right-4 md:right-8 top-24 z-40">
        <Button 
          variant="secondary" 
          className="font-medium shadow-lg gap-2 group relative overflow-hidden"
          asChild
        >
          <Link href="/auth">
            <LockKeyhole className="h-4 w-4" />
            <span>Investor Portal</span>
            <span className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>
        </Button>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-4 md:right-8 bottom-8 z-40 bg-secondary text-secondary-foreground rounded-full p-2 shadow-lg hover:bg-secondary/90 transition-all duration-300 animate-bounce-slow"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}


