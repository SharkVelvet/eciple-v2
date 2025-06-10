import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Target, Code, DollarSign, Handshake, ChevronUp, Sparkles } from "lucide-react";
import ecipleLogo from "@assets/eciple-white.png";
import eCipleDashImage from "@assets/eciple-dashboard-trim.jpg";
import mentoringImage from "@assets/eciple-Two-guys-mentoring.jpg";
import whiteboardImage from "@assets/eciple-whiteboard_1749234969691.jpg";
import womenMentoringImage from "@assets/eciple-women-mentoring_1749235548005.jpg";
import prayerImage from "@assets/eciple-prayer_1749237169487.jpg";
import investmentImage from "@assets/eciple-investment_1749240889384.jpg";
import Footer from "@/components/Footer";

export default function InvestorsPage() {
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
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/eciple-investor-pack.zip';
    link.download = 'eciple-investor-pack.zip';
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={ecipleLogo}
                alt="Eciple"
                className="h-8 w-auto"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white hover:text-white/80 transition-colors">
                Home
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#223349] via-[#2a3f5f] to-[#15BEE2] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#15BEE2]/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              className="text-left space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
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
                    Download Investor Pack
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

            {/* Right Column - Dashboard Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#15BEE2]/20 to-transparent rounded-2xl blur-xl"></div>
                <img
                  src={eCipleDashImage}
                  alt="Eciple Dashboard"
                  className="relative rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                />
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
        
        <div className="relative z-10 max-w-[1180px] mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              The Discipleship Crisis Is Real
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Churches struggle to provide personalized discipleship at scale, leaving believers without the guidance they need for spiritual growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Crisis Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-8">
                {/* Crisis Chart 1 */}
                <div className="relative">
                  <motion.div
                    className="w-40 h-40 rounded-full border-8 border-gray-200 relative mx-auto"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border-8 border-red-500"
                      style={{
                        clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 40%, 50% 50%)"
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-red-500">40%</span>
                      <span className="text-xs text-gray-600 text-center leading-tight">
                        of Christians<br />
                        lack proper<br />
                        discipleship
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Crisis Chart 2 */}
                <div className="relative">
                  <motion.div
                    className="w-40 h-40 rounded-full border-8 border-gray-200 relative mx-auto"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border-8 border-orange-500"
                      style={{
                        clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%, 0% 70%, 50% 50%)"
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-orange-500">70%</span>
                      <span className="text-xs text-gray-600 text-center leading-tight">
                        of pastors<br />
                        feel unable to<br />
                        disciple well
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-700 font-medium">
                  Traditional discipleship methods can't scale to meet individual needs
                </p>
              </div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={mentoringImage}
                alt="Traditional mentoring"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        
        <div className="max-w-[1180px] mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              Eciple's Revolutionary Solution
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              AI-powered personalized discipleship that adapts to each believer's unique spiritual journey and growth needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Solution Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={whiteboardImage}
                alt="Eciple solution planning"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15BEE2]/10 to-transparent rounded-2xl"></div>
            </motion.div>

            {/* Solution Content */}
            <motion.div
              className="space-y-8 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#15BEE2] rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#223349] mb-2">Personalized Learning Paths</h3>
                    <p className="text-gray-600">AI creates custom discipleship journeys based on individual spiritual maturity and goals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#15BEE2] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#223349] mb-2">Scalable Mentorship</h3>
                    <p className="text-gray-600">Enable pastors and mentors to guide hundreds of disciples effectively with AI assistance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#15BEE2] rounded-full flex items-center justify-center flex-shrink-0">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#223349] mb-2">Adaptive Technology</h3>
                    <p className="text-gray-600">Smart algorithms adjust content and recommendations based on progress and engagement.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-[1180px] mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              Massive Market Opportunity
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The global Christian market represents an unprecedented opportunity for transformative technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-20 h-20 bg-[#15BEE2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#223349] mb-2">2.4B</h3>
              <p className="text-gray-600">Christians worldwide seeking spiritual growth</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-[#15BEE2] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#223349] mb-2">$50B</h3>
              <p className="text-gray-600">Annual religious software and services market</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-20 h-20 bg-[#15BEE2] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#223349] mb-2">15%</h3>
              <p className="text-gray-600">Annual growth in digital discipleship adoption</p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <img
                src={womenMentoringImage}
                alt="Women mentoring session"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#223349]">First-Mover Advantage</h3>
              <p className="text-gray-700">
                No existing platform offers AI-powered personalized discipleship at scale. Eciple is positioned to capture significant market share as the pioneer in this space.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#15BEE2] rounded-full"></div>
                  <span className="text-gray-700">Zero direct competitors in AI discipleship</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#15BEE2] rounded-full"></div>
                  <span className="text-gray-700">Strong IP position with early technology development</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#15BEE2] rounded-full"></div>
                  <span className="text-gray-700">Network effects create competitive moats</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Financial Projections Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-[1180px] mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              Strong Financial Projections
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conservative growth projections show substantial returns for early investors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">$500K</h3>
              <p className="text-gray-600 text-sm">Year 1 ARR Target</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">$2M</h3>
              <p className="text-gray-600 text-sm">Year 2 ARR Projection</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">$4M</h3>
              <p className="text-gray-600 text-sm">Year 3 ARR by 2028</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">$5-8M</h3>
              <p className="text-gray-600 text-sm">Year 5 ARR Range</p>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#223349]">Revenue Model</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-[#223349] mb-2">Subscription Tiers</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Basic: $10/month per user</li>
                    <li>• Premium: $25/month per user</li>
                    <li>• Enterprise: $50/month per user</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-[#223349] mb-2">Additional Revenue</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Custom content development</li>
                    <li>• Training and consultation</li>
                    <li>• API access for partners</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <img
                src={investmentImage}
                alt="Investment growth visualization"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-[1180px] mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              Proven Leadership Team
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our founders bring decades of combined experience in ministry, technology, and business.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <img
                src={prayerImage}
                alt="Prayer and reflection"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#223349]">Mission-Driven Innovation</h3>
              <p className="text-gray-700">
                Our leadership combines deep theological understanding with cutting-edge technology expertise to create solutions that truly serve the Church.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#15BEE2] rounded-full"></div>
                  <span className="text-gray-700">20+ years combined ministry experience</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#15BEE2] rounded-full"></div>
                  <span className="text-gray-700">15+ years technology leadership</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#15BEE2] rounded-full"></div>
                  <span className="text-gray-700">Multiple successful startup exits</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#15BEE2] rounded-full"></div>
                  <span className="text-gray-700">Deep relationships in Christian community</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Ask Section */}
      <section className="py-20 bg-[#223349] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#15BEE2]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-[1180px] mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Revolution
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Partner with us to transform how the global Church approaches discipleship and spiritual growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <DollarSign className="w-12 h-12 text-[#15BEE2] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seeking Investment</h3>
              <p className="text-white/80">Series A funding to accelerate growth and market expansion</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Target className="w-12 h-12 text-[#15BEE2] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Use of Funds</h3>
              <p className="text-white/80">Product development, team expansion, and market penetration</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Handshake className="w-12 h-12 text-[#15BEE2] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Partnership</h3>
              <p className="text-white/80">Strategic investors welcome to join our mission-driven journey</p>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={handleRequestDeck}
              size="lg"
              className="bg-[#15BEE2] hover:bg-[#15BEE2]/90 text-[#223349] px-8 mr-4 rounded-full font-semibold"
            >
              <span className="flex items-center gap-2">
                Download Investor Pack
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
            <Button 
              onClick={handleScheduleCall}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#223349] px-8 rounded-full"
            >
              Schedule a Call
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              Ready to Invest?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Contact our team to learn more about investment opportunities and partnership possibilities.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Interest</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent">
                    <option>Series A Investment</option>
                    <option>Strategic Partnership</option>
                    <option>Advisory Role</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15BEE2] focus:border-transparent"
                    placeholder="Tell us about your investment goals and timeline..."
                  ></textarea>
                </div>
                <Button 
                  className="w-full bg-[#223349] hover:bg-[#223349]/90 text-white py-3 rounded-lg"
                  size="lg"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </motion.div>
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
                  Download Investor Pack
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#223349] hover:bg-[#223349]/90 text-white rounded-full flex items-center justify-center shadow-lg shadow-[#223349]/20 transition-all duration-200 hover:scale-110"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}