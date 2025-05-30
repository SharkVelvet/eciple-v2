import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Users, ArrowRight, Heart } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AdminContext } from "@/pages/ComparisonPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContentValue } from '@/lib/contentDefaults';

export default function Hero() {
  // Access admin context
  const { isAdmin, editMode, editableContent, updateContent } = useContext(AdminContext);
  
  // Define editable text content keys
  const heroHeading = "hero_heading";
  const heroSubheading = "hero_subheading";
  const heroCtaText = "hero_cta_text";
  
  // Helper functions to get content values with fallback to defaults
  const getHeroHeading = () => {
    // Try to read directly from localStorage first
    try {
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed && parsed.hero_heading) {
          return parsed.hero_heading;
        }
      }
    } catch (e) {
      console.error("Error reading heading from localStorage:", e);
    }
    
    // Fall back to using the admin context content
    return editableContent[heroHeading] || "Discipleship Reimagined";
  };
  
  const getHeroSubheading = () => {
    // Try to read directly from localStorage first
    try {
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed && parsed.hero_subheading) {
          return parsed.hero_subheading;
        }
      }
    } catch (e) {
      console.error("Error reading subheading from localStorage:", e);
    }
    
    // Fall back to using the admin context content
    return editableContent[heroSubheading] || 
      "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.";
  };
  
  const getHeroCtaText = () => {
    // Try to read directly from localStorage first
    try {
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed && parsed.hero_cta_text) {
          return parsed.hero_cta_text;
        }
      }
    } catch (e) {
      console.error("Error reading CTA text from localStorage:", e);
    }
    
    // Fall back to using the admin context content
    return editableContent[heroCtaText] || "Learn More";
  };
  // Optimized animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delayChildren: 0.1,
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.25,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-[#15BEE2] via-[#15BEE2]/80 to-[#0368C1] text-white relative overflow-hidden">
      {/* Animated background elements - simplified for performance */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-[#0368C1]/30 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#0368C1]/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#15BEE2]/30 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "tween" }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8"
              variants={itemVariants}
            >
              <Sparkles className="h-4 w-4 mr-2 text-secondary" />
              <span>Transforming Church Communities</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans mb-6 leading-tight hero-heading"
              variants={itemVariants}
            >
              {editMode && isAdmin ? (
                <Input
                  type="text"
                  value={getHeroHeading()}
                  onChange={(e) => updateContent(heroHeading, e.target.value)}
                  className="text-white bg-transparent border-white/20"
                />
              ) : (
                <>
                  {getHeroHeading()}
                </>
              )}
            </motion.h1>
            
            <motion.div 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed"
            >
              {editMode && isAdmin ? (
                <Textarea
                  value={getHeroSubheading()}
                  onChange={(e) => updateContent(heroSubheading, e.target.value)}
                  className="text-white/90 w-full bg-transparent border-white/20 resize-y"
                />
              ) : (
                <p className="hero-subheading">
                  {getHeroSubheading()}
                </p>
              )}
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                asChild 
                className="!bg-[#223349] hover:!bg-[#223349]/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-[#223349]/20 hero-cta-button"
              >
                <a 
                  href="#product" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#product');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {editMode && isAdmin ? (
                    <Input
                      type="text"
                      value={getHeroCtaText()}
                      onChange={(e) => updateContent(heroCtaText, e.target.value)}
                      className="w-24 text-white bg-transparent border-white/20 p-0 h-auto text-center"
                    />
                  ) : (
                    <span className="hero-button-text">{getHeroCtaText()}</span>
                  )}
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </a>
              </Button>
            </motion.div>
            
            <div 
              className="mt-12 flex items-center gap-6 transform translate-y-0 opacity-100"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary p-0.5">
                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      {i}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="text-white/80">Join <span className="font-bold text-white">1,200+ churches</span></p>
                <div className="flex items-center gap-1 text-accent">
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                  <Heart className="h-3 w-3 fill-accent" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <div
            className="relative hidden lg:block transform translate-y-0 opacity-100"
          >
            <div className="relative bg-white/10 backdrop-blur-sm p-1 rounded-xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-secondary/20 opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="People engaged in spiritual mentorship" 
                className="rounded-lg w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            
            <div 
              className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-primary font-medium">Connected Mentorship</p>
                  <p className="text-sm text-gray-500">AI-powered matching</p>
                </div>
              </div>
            </div>
            
            <div 
              className="absolute -top-5 -right-5 bg-white p-4 rounded-lg shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-primary font-medium">Spiritual Growth</p>
                  <p className="text-sm text-gray-500">Measurable progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
