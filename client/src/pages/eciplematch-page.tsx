import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, TrendingUp, Users, Target, Globe, Zap, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import images
import heroImage from "@assets/eciple-prayer_1749237169487.jpg";
import mentoringImage from "@assets/eciple-women-mentoring_1749235548005.jpg";
import dashboardImage from "@assets/eciple-dashboard-trim.jpg";
import investmentImage from "@assets/eciple-investment_1749240889384.jpg";
import whiteboardImage from "@assets/eciple-whiteboard_1749234969691.jpg";

export default function EcipleMatchPage() {
  const [downloadAttempts, setDownloadAttempts] = useState(0);

  const handleRequestDeck = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/eciple-investor-pack.zip';
    link.download = 'eciple-investor-pack.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloadAttempts(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#15BEE2] via-[#15BEE2]/80 to-[#0368C1] text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-60 h-60 bg-[#0368C1]/30 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#0368C1]/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#15BEE2]/30 rounded-full blur-3xl opacity-70"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="max-w-[1180px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans" style={{ lineHeight: '1.28', textWrap: 'balance', widows: '2', orphans: '2' }}>
                  <span className="text-[#223349]">The discipleship crisis is real:</span><br />
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1180px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              The Reality of Modern Discipleship
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Current discipleship approaches are failing believers at an alarming rate. The data reveals a crisis that demands innovative solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Statistic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-blue-100"
            >
              <div className="text-center">
                <div className="text-5xl font-bold text-[#15BEE2] mb-2">83%</div>
                <div className="text-gray-700 text-lg font-medium mb-4">Never Participated</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  83% of Christians have never participated in one-to-one discipleship despite its proven effectiveness
                </p>
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
              <div className="text-center">
                <div className="text-5xl font-bold text-[#15BEE2] mb-2">77%</div>
                <div className="text-gray-700 text-lg font-medium mb-4">Prefer 1:1</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  77% of pastors and majority of Christians affirm one-to-one mentoring as most effective for spiritual growth
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-8">
                The Core Problem
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#15BEE2] mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Lack of Technology</h3>
                    <p className="text-gray-600">Despite proven effectiveness, there's an absence of enabling technology for one-to-one discipleship programs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#15BEE2] mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Scaling Challenges</h3>
                    <p className="text-gray-600">Churches struggle to implement and manage one-to-one relationships at scale without proper systems.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#15BEE2] mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Resource Limitations</h3>
                    <p className="text-gray-600">Limited resources and structured pathways prevent churches from building effective discipleship programs.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src={mentoringImage} 
                  alt="People engaged in mentorship discussion"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-[1180px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#223349] mb-6">
              eciple: The Complete Solution
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              The first comprehensive platform designed exclusively to enable large-scale one-to-one discipleship programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img 
                  src={dashboardImage} 
                  alt="eciple platform dashboard showing mentorship management interface"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#15BEE2] flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Matching</h3>
                    <p className="text-gray-600">AI-powered mentor-mentee matching based on compatibility, availability, and spiritual maturity.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#15BEE2] flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Structured Pathways</h3>
                    <p className="text-gray-600">Customizable discipleship pathways with progress tracking and milestone achievements.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#15BEE2] flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Integrated Communications</h3>
                    <p className="text-gray-600">Built-in messaging, video calls, and resource sharing to facilitate meaningful connections.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#15BEE2] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics & Insights</h3>
                    <p className="text-gray-600">Comprehensive analytics to measure program effectiveness and individual spiritual growth.</p>
                  </div>
                </div>
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
              <div className="relative">
                <img 
                  src={whiteboardImage} 
                  alt="Development planning session with team collaboration"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
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
                    This represents 20% of the cap table, imputing a pre-money value of $1.6M
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
                  Download Investor Pack
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}