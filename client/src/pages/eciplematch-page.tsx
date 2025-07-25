import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, TrendingUp, Users, Target, Code, DollarSign, Handshake, ChevronUp, Sparkles, Download, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/api-config";
import ecipleLogo from "@assets/eciple-white.png";
import eCipleDashImage from "@assets/eciple-dashboard-trim.jpg";
import mentoringImage from "@assets/eciple-Two-guys-mentoring.jpg";
import whiteboardImage from "@assets/eciple-whiteboard_1749234969691.jpg";
import womenMentoringImage from "@assets/eciple-women-mentoring_1749235548005.jpg";
import prayerImage from "@assets/eciple-prayer_1749237169487.jpg";
import investmentImage from "@assets/eciple-investment_1749240889384.jpg";
import Footer from "@/components/Footer";

interface EcipleDocument {
  id: number;
  title: string;
  filename: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function EcipleMatchPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Fetch documents from the database
  const { data: documentsData, isLoading } = useQuery({
    queryKey: ['/api/eciple-documents'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.documents);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      // Handle both old format (array) and new format (object with documents key)
      const documents = Array.isArray(data) ? data : data.documents;
      return documents as EcipleDocument[];
    },
  });

  const documents = documentsData || [];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestDeck = () => {
    setShowDocumentModal(true);
  };

  const downloadDocument = (documentId: number, filename: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = `/api/download-document/${documentId}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScheduleCall = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add noindex meta tag to prevent search engine indexing
  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.name = 'robots';
    metaTag.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(metaTag);

    return () => {
      // Cleanup meta tag when component unmounts
      const existingMeta = document.querySelector('meta[name="robots"]');
      if (existingMeta) {
        document.head.removeChild(existingMeta);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="absolute top-6 left-0 right-0 z-50">
        <div className="max-w-[1380px] mx-auto px-8 md:px-6">
          <div className="flex justify-center">
            {/* Logo - Centered */}
            <div className="flex-none">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex flex-col items-center">
                    <img 
                      src={ecipleLogo} 
                      alt="eciple logo" 
                      className="h-10 w-auto object-contain" 
                    />
                  </div>
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-28 bg-gradient-to-br from-[#15BEE2] via-[#15BEE2]/80 to-[#0368C1] text-white relative overflow-hidden min-h-[600px]">
        {/* Background Photo */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${mentoringImage})` }}
          ></div>
          {/* Fade overlay - strong at top, transparent at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#15BEE2]/60 via-[#15BEE2]/30 to-transparent"></div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-60 h-60 bg-[#0368C1]/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#0368C1]/15 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#15BEE2]/20 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center justify-center min-h-[480px]">
            {/* Centered Content */}
            <motion.div 
              className="text-center space-y-6 max-w-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans" style={{ lineHeight: '1.28', textWrap: 'balance', widows: '2', orphans: '2' }}>
                <span className="text-[#223349]">The discipleship crisis is real</span><br />
                Join eciple in transforming the future of spiritual&nbsp;growth.
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed" style={{ textWrap: 'balance', widows: '2', orphans: '2' }}>
                <span className="font-bold text-white">Your investment</span> in eciple will help revolutionize discipleship, empower believers across the globe and forever change the face of the&nbsp;Church.
              </p>
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleRequestDeck}
                  size="lg" 
                  className="bg-[#223349] hover:bg-[#223349]/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-[#223349]/20"
                >
                  <span className="flex items-center gap-2">
                    Download Investor Documents
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>

              {/* Achievement Highlights */}
              <motion.div 
                className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-2 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                  <span className="text-xs font-medium whitespace-nowrap">$200,000 Founder investments made</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                  <span className="text-xs font-medium whitespace-nowrap">Live, fully functional product launched</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                  <span className="text-xs font-medium whitespace-nowrap">Multiple, active pilot programs running</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discipleship Crisis Section */}
      <section className="pt-20 pb-16 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1180px] mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Addressing The Discipleship Crisis</h2>
                  <motion.div 
                    className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">The Market Opportunity</span>
                  </motion.div>
                </div>
                
                <p className="text-xl leading-relaxed text-foreground/80 max-w-xl mb-8" style={{ textWrap: 'balance', widows: '2', orphans: '2' }}>
                  eciple was founded to address the most urgent and impactful challenge facing the Church today: the pervasive problem of ineffective discipleship&nbsp;models.
                </p>
                
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">The Reality:</h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#15BEE2] mt-2 flex-shrink-0"></div>
                      <span>Content-heavy, group discipleship, (90% of all efforts), is ineffective and a primary driver of alarming deterioration across The Church.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#15BEE2] mt-2 flex-shrink-0"></div>
                      <span>The most effective model (80% Pastors) —relationship-driven, one-to-one mentoring—is inaccessible due to the absence of technology.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Right side with animated statistics */}
            <div className="lg:pl-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                {/* First Statistic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center">
                    <div className="w-3/5 pr-6">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Only 40% of evangelicals hold the entire Bible as the "actual word of God," 51% say only parts of the Bible is the "inspired word of God"
                      </p>
                    </div>
                    <div className="w-2/5 flex justify-center">
                      <div className="relative w-40 h-40">
                        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#15BEE2"
                            strokeWidth="3"
                            strokeDasharray="40, 60"
                            initial={{ strokeDasharray: "0, 100" }}
                            whileInView={{ strokeDasharray: "40, 60" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: 1 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-bold text-[#15BEE2] text-lg mb-1">40%</span>
                          <span className="text-gray-500 text-center text-xs leading-tight px-3">say entire Bible is actual word of God</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Second Statistic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center">
                    <div className="w-3/5 pr-6">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        80% of people who make a decision for Christ typically fall away from the faith within the first year
                      </p>
                    </div>
                    <div className="w-2/5 flex justify-center">
                      <div className="relative w-40 h-40">
                        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#15BEE2"
                            strokeWidth="3"
                            strokeDasharray="20, 80"
                            initial={{ strokeDasharray: "0, 100" }}
                            whileInView={{ strokeDasharray: "20, 80" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: 1.5 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-bold text-[#15BEE2] text-lg">20%</span>
                          <span className="text-gray-500 text-center text-xs leading-tight px-4">stay</span>
                          <div className="mt-1 text-center">
                            <span className="font-bold text-gray-600 text-sm block">80%</span>
                            <span className="text-gray-500 text-center text-xs leading-tight block">fall away</span>
                            <span className="text-gray-500 text-center text-xs leading-tight block">in first year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Third Statistic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center">
                    <div className="w-3/5 pr-6">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        64% of young adults leave the Christian faith as they enter adulthood (equating to over 1M per year)
                      </p>
                    </div>
                    <div className="w-2/5 flex justify-center">
                      <div className="relative w-40 h-40">
                        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#15BEE2"
                            strokeWidth="3"
                            strokeDasharray="36, 64"
                            initial={{ strokeDasharray: "0, 100" }}
                            whileInView={{ strokeDasharray: "36, 64" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: 2 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-bold text-[#15BEE2] text-lg">36%</span>
                          <span className="text-gray-500 text-center text-xs leading-tight px-3">stay</span>
                          <div className="mt-1 text-center">
                            <span className="font-bold text-gray-600 text-sm block">64%</span>
                            <span className="text-gray-500 text-center text-xs leading-tight block">young adults</span>
                            <span className="text-gray-500 text-center text-xs leading-tight block">leave</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovative Solution Section */}
      <section className="pt-20 pb-16 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-secondary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1180px] mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">The Innovative Solution</h2>
                  <motion.div 
                    className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">Technology Platform</span>
                  </motion.div>
                </div>
                
                <p className="text-xl leading-relaxed text-foreground/80 max-w-xl mb-8" style={{ textWrap: 'balance', widows: '2', orphans: '2' }}>
                  eciple is the first comprehensive platform designed exclusively to enable large-scale one-to-one discipleship&nbsp;programs.
                </p>
                
                <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-2xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Core Functionalities:</h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#15BEE2] mt-2 flex-shrink-0"></div>
                      <span><strong>Automated Mentor/Mentee Matching:</strong> Leverages AI algorithms for compatible pairings.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#15BEE2] mt-2 flex-shrink-0"></div>
                      <span><strong>Customizable Discipleship Pathways:</strong> Churches can easily create unique, step-by-step programs tailored to specific needs and theological stances.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#15BEE2] mt-2 flex-shrink-0"></div>
                      <span><strong>CHMS Integration:</strong> Seamlessly integrates with Church Management Software for unified member data and reduced administrative burden.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#15BEE2] mt-2 flex-shrink-0"></div>
                      <span><strong>"Relationship-First" Enablement Philosophy:</strong> Radically departs from content-dictated approaches, empowering churches with flexibility and control.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-[#15BEE2]/10 to-[#223349]/10 rounded-2xl overflow-hidden border border-[#15BEE2]/20 shadow-lg">
                <img 
                  src={eCipleDashImage} 
                  alt="eciple platform dashboard" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <Code className="h-12 w-12 text-[#15BEE2] mb-3" />
                  <h3 className="text-xl font-bold mb-2 text-[#223349]">Tech-Enabled Mentoring</h3>
                  <p className="text-gray-600 text-sm">
                    Advanced platform technology facilitating meaningful one-to-one discipleship relationships with AI-powered matching and integrated communication tools.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-16 bg-gradient-to-br from-[#223349]/5 to-[#15BEE2]/5">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative overflow-hidden">
                {/* Animated Background Graph */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <motion.path
                      d="M0,180 Q100,160 200,120 T400,60"
                      stroke="#15BEE2"
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M0,180 Q100,160 200,120 T400,60 L400,200 L0,200 Z"
                      fill="url(#gradient)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.3 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#15BEE2" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#15BEE2" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <TrendingUp className="h-16 w-16 text-green-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-[#223349]">Market Growth</h3>
                  
                  {/* Animated Statistics */}
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                      className="flex items-center justify-between bg-gradient-to-r from-green-50 to-transparent p-3 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-700">Church Software Market</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                        className="text-lg font-bold text-green-600"
                      >
                        $1.3B
                      </motion.span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                      className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-transparent p-3 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-700">Available Churches</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2.0 }}
                        className="text-lg font-bold text-[#15BEE2]"
                      >
                        384K
                      </motion.span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.9 }}
                      className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-transparent p-3 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-700">Growth Opportunity</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2.2 }}
                        className="text-lg font-bold text-[#223349]"
                      >
                        $700M+
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
                Large, Uncontested Market Opportunity
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  eciple is defining a new category: one-to-one discipleship enablement technology (currently void of competitors), targeting the $170M U.S. church & $1.8B parachurch addressable markets providing a $700M+ obtainable revenue opportunity.
                </p>
                <p>
                  First-mover advantage positions us to quickly capture market share, establish brand dominance & hinder new entrants.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
                Methodical, Validated Development
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  <strong>Founder investments, nearing $200,000</strong> since early 2024, have enabled a meticulous, validated solution development process resulting in eciple engineering the first comprehensive platform designed exclusively to enable large-scale one-to-one discipleship programs.
                </p>
                <p>
                  A fully-functional platform is complete and has been launched. We are now engaging in pilot programs, with a commercial launch planned for Q4 2025.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pl-8"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={whiteboardImage} 
                  alt="Development planning whiteboard showing weekly design sprints" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#223349]/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:pr-8"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={prayerImage} 
                  alt="People studying and praying together with open Bibles" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#223349]/30 to-transparent"></div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
                Experienced, Proven Leadership Team
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  With extensive executive and startup experience in the faith-based technology sector, eciple's leadership team is driven to address the devastating consequences of ineffective discipleship. Our core team includes a full-time founder (25 years in SaaS learning and performance), a co-founder (20 years executive church leadership), and accomplished strategic advisors alongside our technology partner, distinguished for their expertise in faith-based software development.
                </p>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth Projections Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
                Positioned for Rapid, Profitable Growth
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  With high demand & established networks revenue generation is projected in Q4 2025 and sustained profitability within 18 months.
                </p>


              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-green-100 to-[#15BEE2]/20 rounded-2xl p-8 border border-green-200">
                <TrendingUp className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-[#223349]">Financial forecasts:</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-lg font-semibold">$4M ARR with $1.5M EBIT by 2028</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-lg font-semibold">$5-8M ARR with 30-40% EBIT margin by Year 5 and ongoing</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="font-semibold text-[#223349]">
                      Pricing Model: Tiered subscription based on church size ($99-$499/month).
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="py-16 bg-gradient-to-br from-[#15BEE2] via-[#15BEE2]/80 to-[#0368C1] text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-60 h-60 bg-[#0368C1]/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#0368C1]/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#15BEE2]/30 rounded-full blur-3xl opacity-70"></div>
        </div>
        
        <div className="max-w-[1180px] mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:pr-8"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={investmentImage} 
                  alt="Investment analysis charts showing growth and financial projections" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Investment Opportunity
              </h2>
              <div className="space-y-4 text-white/90">
                <p className="text-lg">
                  eciple offers an extraordinary investment opportunity that not only offers substantial potential returns but also ignites a discipleship movement impacting millions of lives globally.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Raising $400,000 in equity investment:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-white mr-2" />
                      <span>$200k for continued development</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-white mr-2" />
                      <span>$200k for growth initiatives</span>
                    </li>
                  </ul>
                  <p className="mt-4 font-semibold text-white">
                    This represents 20% of the cap table, imputing a pre-money value of $1.6M.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-8">
              <span className="text-[#15BEE2]">Transform Lives.</span> Drive Growth. Make History.
            </h2>
            <div className="space-y-6 text-gray-700 max-w-4xl mx-auto mb-12">
              <p className="text-xl">
                Your investment for eciple enables global spiritual transformation at a scale unimaginable until now, driving both financial success and eternal significance.
              </p>

            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleRequestDeck}
                size="lg"
                className="bg-[#223349] hover:bg-[#223349]/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-[#223349]/20"
              >
                <span className="flex items-center gap-2">
                  Download Investor Documents
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-8">
              Get In Touch
            </h2>
          </div>
          
          <div className="max-w-lg mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-[#223349]">Bobby Person</h3>
                    <p className="text-lg text-gray-600">Founder & CEO | eciple</p>
                    <p className="text-lg text-gray-600">813.400.9384</p>
                    <p className="text-lg text-gray-600">bobby@eciple.com</p>
                  </div>
                  
                  <div className="pt-4">
                    <a 
                      href="https://calendar.app.google/BcoqYkgNWx4gp7q87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-lg text-[#15BEE2] hover:text-[#223349] font-medium transition-colors duration-200 hover:underline"
                    >
                      Book a time to meet!
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Custom Footer Section */}
      <section className="py-16 bg-[#223349]">
        <div className="max-w-[1300px] mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={ecipleLogo} 
                alt="eciple logo" 
                className="h-12 w-auto object-contain" 
              />
              <p className="text-white/80 text-sm">
                Igniting Spiritual Growth, One Relationship at a Time
              </p>
            </div>
            
            <div>
              <Button 
                asChild
                size="lg" 
                className="bg-[#15BEE2] hover:bg-[#15BEE2]/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-[#15BEE2]/20"
              >
                <a href="/">
                  <span className="flex items-center gap-2">
                    Visit Homepage
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#15BEE2] hover:bg-[#15BEE2]/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}

      {/* Document Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#223349] mb-4">
              Investment Documents
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse text-gray-500">Loading documents...</div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No documents available yet.</p>
              </div>
            ) : (
              documents.filter(doc => doc.is_active).map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#15BEE2] transition-colors"
                >
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-[#223349] text-lg mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {doc.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => downloadDocument(doc.id, doc.filename)}
                    className="bg-[#15BEE2] hover:bg-[#15BEE2]/90 text-white px-6 py-2 rounded-full flex items-center gap-2 whitespace-nowrap"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </motion.div>
              ))
            )}
            
            {documents.filter(doc => doc.is_active).length === 0 && documents.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No active documents available.</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setShowDocumentModal(false)}
              variant="outline"
              className="px-8 py-2 rounded-full border-[#223349] text-[#223349] hover:bg-[#223349] hover:text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}