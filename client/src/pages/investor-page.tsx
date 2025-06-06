import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Target, Code, DollarSign, Handshake, ChevronUp, Sparkles } from "lucide-react";
import ecipleLogo from "@assets/eciple-white.png";
import eCipleDashImage from "@assets/eciple-dashboard-trim.jpg";
import mentoringImage from "@assets/eciple-Two-guys-mentoring.jpg";
import Footer from "@/components/Footer";

export default function InvestorPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScheduleCall = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-60 h-60 bg-[#0368C1]/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#0368C1]/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#15BEE2]/30 rounded-full blur-3xl opacity-70"></div>
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
                <span className="text-[#223349]">The discipleship crisis is real:</span><br />
                Join eciple in transforming the future of spiritual&nbsp;growth.
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed" style={{ textWrap: 'balance', widows: '2', orphans: '2' }}>
                <span className="font-bold text-white">Your investment</span> in eciple will revolutionize discipleship, empowering believers globally and forever changing the face of the&nbsp;Church.
              </p>
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleRequestDeck}
                  size="lg" 
                  className="bg-[#223349] hover:bg-[#223349]/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-[#223349]/20"
                >
                  <span className="flex items-center gap-2">
                    Request Investor Deck
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
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
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Content-heavy, group discipleship, (90% of all efforts), is ineffective and a primary driver of alarming deterioration across The Church.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                      <span>The most effective model (80% Pastors) —relationship-driven, one-to-one mentoring—is inaccessible due to the absence of technology.</span>
                    </li>
                  </ul>
                </div>
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
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                      <span><strong>Automated Mentor/Mentee Matching:</strong> Leverages AI algorithms for compatible pairings.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span><strong>Customizable Discipleship Pathways:</strong> Churches can easily create unique, step-by-step programs tailored to specific needs and theological stances.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span><strong>CHMS Integration:</strong> Seamlessly integrates with Church Management Software for unified member data and reduced administrative burden.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
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
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <TrendingUp className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-[#223349]">Market Growth</h3>
                <p className="text-gray-600">
                  A stylized infographic-style photo showing an upward-pointing arrow on a digital dashboard, combined with a church steeple or cross in the corner.
                </p>
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
                  Founder investments, nearing $200,000 since early 2024, have enabled a meticulous, validated solution development process resulting in eciple engineering the first comprehensive platform designed exclusively to enable large-scale one-to-one discipleship programs.
                </p>
                <p>
                  A fully-functional platform has been completed and launched now entering pilot programs with a commercial launch planned for Q3 2025.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-[#223349]/10 to-[#15BEE2]/10 rounded-2xl p-8 border border-[#223349]/20">
                <Code className="h-16 w-16 text-[#223349] mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-[#223349]">Development Team</h3>
                <p className="text-gray-600">
                  Close-up of a development team in a brainstorming session with wireframes or a whiteboard marked up behind them—with a cross or spiritual symbol subtly in view.
                </p>
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
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <Users className="h-16 w-16 text-[#15BEE2] mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-[#223349]">Leadership Excellence</h3>
                <p className="text-gray-600">
                  A clean, well-lit team photo (or individual founder headshots) in a circular collage, with brief descriptors like "25+ Years SaaS," "Church Leadership," "Faith Tech."
                </p>
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
                  eciple is led by a high-caliber team with extensive executive-leadership experience in SaaS, church leadership, and the faith-based technology sector.
                </p>
                <p>
                  eciple's leadership team, unified by a mission to transform discipleship, is led full-time by its founder, and comprises repeat founders and proven tech executives with extensive experience in SaaS, church leadership, and the faith-based technology market.
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
                  With high demand & established networks revenue generation is projected in Q3 2025 and sustained profitability within 12-18 months.
                </p>
                <div className="bg-gradient-to-r from-[#15BEE2]/10 to-[#223349]/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#223349] mb-4">Financial forecasts:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                      <span>$4M ARR with $1.5M EBIT by 2028</span>
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                      <span>$5-8M ARR with 30-40% EBIT margin by Year 5 and ongoing</span>
                    </li>
                  </ul>
                </div>
                <p className="font-semibold">
                  Pricing Model: Tiered subscription based on church size ($99-$499/month).
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
                <h3 className="text-2xl font-bold mb-4 text-[#223349]">Financial Growth</h3>
                <p className="text-gray-600">
                  Dynamic digital dashboard mockup with financial metrics glowing on-screen, or a visual of coins/seedlings growing into trees combined with tech imagery.
                </p>
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
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <Handshake className="h-16 w-16 text-white mb-4" />
                <h3 className="text-2xl font-bold mb-4">Investment Impact</h3>
                <p className="text-white/90">
                  A hand extended with a glowing light or seed in the palm, representing investment, impact, and potential.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Ask: Investment Opportunity
              </h2>
              <div className="space-y-4 text-white/90">
                <p className="text-lg">
                  eciple offers an extraordinary investment opportunity that not only offers substantial potential returns but also ignites a discipleship movement impacting millions of lives globally.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Seeking $400,000 in equity investment:</h3>
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
              Transform Lives. Drive Growth. Make History.
            </h2>
            <div className="space-y-6 text-gray-700 max-w-4xl mx-auto mb-12">
              <p className="text-xl">
                Your investment for eciple enables global spiritual transformation at a scale unimaginable until now, driving both financial success and eternal significance.
              </p>
              <p className="text-lg">
                Partner with eciple to unleash unprecedented spiritual growth, a powerful wave that will sweep across the global Church and touch countless lives.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={handleRequestDeck}
                className="bg-[#223349] hover:bg-[#223349]/90 text-white px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                Request Investor Deck
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleScheduleCall}
                variant="outline"
                className="border-[#223349] text-[#223349] hover:bg-[#223349] hover:text-white px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Ready to discuss this investment opportunity? Contact us today.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form action="https://formspree.io/f/xdkznzer" method="POST" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization/Investment Firm
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                      placeholder="Your organization"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Level *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                    >
                      <option value="">Select your interest level</option>
                      <option value="investor-deck">Request Investor Deck</option>
                      <option value="schedule-call">Schedule a Call</option>
                      <option value="due-diligence">Due Diligence Information</option>
                      <option value="general-inquiry">General Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                      placeholder="Tell us about your investment interests and any specific questions you have..."
                    ></textarea>
                  </div>
                  
                  <input type="hidden" name="_subject" value="New Investor Inquiry - eciple" />
                  <input type="hidden" name="_next" value={`${window.location.origin}/investor-dashboard?success=true`} />
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#223349] hover:bg-[#223349]/90 text-white py-3 text-lg font-semibold"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

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
    </div>
  );
}