import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Check, X, ArrowRight, CheckCircle, AlertCircle, AlertTriangle, XCircle, Ban, StopCircle, ChevronUp, Sparkles } from "lucide-react";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Product from "@/components/Product";
import eCipleDashImage from "@assets/eciple-dash.jpg";

export default function ComparisonPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate price with annual discount
  const getPrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12 * 0.85; // 15% discount
      return `$${Math.round(annualPrice)}`;
    }
    return `$${monthlyPrice}`;
  };
  
  // Get the pricing period text
  const getPricingPeriod = () => {
    return isAnnual ? "/annual" : "/month";
  };

  const plans = [
    {
      name: "Small Churches",
      monthlyPrice: 99,
      description: "Under 250 members",
      features: [
        { label: "One-Time Setup Fee", value: "$250" },
        { label: "Free Trial", value: "30 Day" },
        { label: "Monthly Active Users", value: "Up to 50" },
        { label: "Media Storage", value: "5 GB" },
        { label: "All Inclusive Platform", value: "✓" },
        { label: "Unlimited System Admins", value: "✓" },
        { label: "Unlimited Program Creation", value: "✓" },
        { label: "Custom Content Creation", value: "✓" },
        { label: "Dedicated Training & Support", value: "✓" }
      ],
      popular: false,
      isLeftRight: true
    },
    {
      name: "Medium Churches",
      monthlyPrice: 299,
      description: "250-750 members",
      features: [
        "Everything in Small Churches plan",
        "Advanced matching algorithm",
        "Comprehensive analytics",
        "Full content library + customization",
        "Priority email & phone support",
        "ChMS integration"
      ],
      popular: true
    },
    {
      name: "Large Churches",
      monthlyPrice: 499,
      description: "750+ members",
      features: [
        "Everything in Medium Churches plan",
        "Premium matching & assessments",
        "Advanced analytics & reporting",
        "Custom content creation",
        "Dedicated support manager",
        "API access & custom integrations",
        "Multi-campus support"
      ],
      popular: false
    }
  ];

  const comparisonFactors = [
    {
      factor: "Focus",
      traditional: "Group-Focused (Curriculum Driven Discipleship)",
      eciple: "Relationship-Focused (One-to-One Mentorship)"
    },
    {
      factor: "Approach",
      traditional: "Content-Centric (Pre-packaged discipleship material)",
      eciple: "Person-Centric (Tailored growth paths)"
    },
    {
      factor: "Technology",
      traditional: "Limited to content delivery & attendance tracking",
      eciple: "Comprehensive mentorship enablement platform"
    },
    {
      factor: "Scalability",
      traditional: "Requires significant staff/volunteer management",
      eciple: "Automated matching and oversight systems"
    },
    {
      factor: "Customization",
      traditional: "Limited to publisher's available resources",
      eciple: "Fully customizable content and development paths"
    },
    {
      factor: "Metrics",
      traditional: "Basic attendance and completion statistics",
      eciple: "In-depth relationship analytics and growth indicators"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <div id="top"></div>
      <Header2 />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-40 bg-gradient-to-br from-[#15BEE2] via-[#15BEE2]/80 to-[#0368C1] text-white relative overflow-hidden min-h-[750px]">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-60 h-60 bg-[#0368C1]/30 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#0368C1]/20 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#15BEE2]/30 rounded-full blur-3xl opacity-70"></div>
          </div>
          
          {/* Content */}
          <div className="max-w-[1300px] mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
              {/* Left Column - Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Sparkles className="h-4 w-4 mr-2 text-secondary" />
                  <span>Igniting Spiritual Growth, One Relationship at a Time</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans leading-tight">
                  The Technology Platform for One-To-One Discipleship
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Finally - an all-in-one platform that opens up the most effective and desired discipleship model for everyone: One-To-One Discipleship
                </p>
                
                <div className="flex justify-start mt-8">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-accent/20"
                  >
                    <a 
                      href="#comparison" 
                      className="flex items-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Right Column - Visual Elements with Background Image */}
              <motion.div 
                className="relative mt-8 lg:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Container for Image and Floating Cards */}
                <div className="relative h-[300px] md:h-[450px]">
                  {/* Background Image Container - Smaller to allow badges to hang off */}
                  <div className="absolute top-4 left-4 right-4 bottom-4 md:top-8 md:left-8 md:right-8 md:bottom-8 rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <img 
                      src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                      alt="People engaged in spiritual mentorship" 
                      className="rounded-2xl w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-secondary/20 opacity-50 rounded-2xl"></div>
                  </div>

                  {/* Floating Cards - Now positioned relative to full container */}
                  <div className="relative h-full">
                    {/* Card 1 - Hangs off top left */}
                    <motion.div
                      className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm rounded-lg p-2 md:p-4 w-40 md:w-48 border border-white/30 shadow-lg text-xs md:text-sm"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary">Full Control</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Customized discipleship pathways & content
                      </div>
                    </motion.div>

                    {/* Card 2 - Hangs off top right */}
                    <motion.div
                      className="absolute top-8 md:top-12 right-0 bg-white/95 backdrop-blur-sm rounded-lg p-2 md:p-4 w-44 md:w-52 border border-white/30 shadow-lg text-xs md:text-sm"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary">Simplified Admin</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Smart matching, auto processes, templated workflows
                      </div>
                    </motion.div>

                    {/* Card 3 - Hangs off bottom left */}
                    <motion.div
                      className="absolute bottom-0 left-0 bg-white/95 backdrop-blur-sm rounded-lg p-2 md:p-4 w-36 md:w-44 border border-white/30 shadow-lg text-xs md:text-sm"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary">Clear Impact</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Feedback loops & ongoing spiritual growth indicators
                      </div>
                    </motion.div>

                    {/* Central connecting element */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-2 border-white/50 border-dashed animate-spin-slow"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="pt-20 pb-16 bg-white scroll-mt-48 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-[1180px] mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Problem Content from Page 1 */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-10"
                >
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">The Problem</h2>
                    <motion.div 
                      className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-secondary" />
                      <span>The Discipleship Crisis</span>
                    </motion.div>
                  </div>
                  
                  <p className="text-xl leading-relaxed text-foreground/80 max-w-xl mb-8">
                    Despite <span className="font-semibold text-primary">82% of pastors</span> saying discipleship is a priority, only <span className="font-semibold text-secondary">29% think</span> their church does it effectively.
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">What's Really Going On:</h3>
                    <ul className="space-y-3 text-foreground/80">
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span><strong>Discipleship Today:</strong> Content-centric, group "discipleship" (90% of efforts) is effective for knowledge but not personal growth & change</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                        <span><strong>The Answer:</strong> 77% of pastors and majority of Christians affirm 1:1 mentoring as the most effective, desired model for spiritual growth & change</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                        <span><strong>The Failure:</strong> Despite proven effectiveness, 83% of Christians have never participated in 1:1 discipleship due to absence of enabling technology</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-accent/20">
                      <a href="#solution" className="flex items-center gap-2">
                        See Our Solution
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Side - Problem Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="h-full"
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-r-3xl rounded-l-none h-full">
                  {/* Gradient left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#15BEE2] to-[#0EA5E9]"></div>
                  <CardContent className="p-6 pl-8 h-full flex flex-col justify-between min-h-[180px]">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-gray-800 mb-2">40<span className="text-3xl">%</span></div>
                      <div className="text-gray-700 text-lg font-medium">Bible Authority</div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      40% of evangelicals hold the entire Bible as the "actual word of God," 51% say only parts of the Bible are the "inspired word of God."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full"
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-r-3xl rounded-l-none h-full">
                  {/* Gradient left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#15BEE2] to-[#0EA5E9]"></div>
                  <CardContent className="p-6 pl-8 h-full flex flex-col justify-between min-h-[180px]">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-gray-800 mb-2">80<span className="text-3xl">%</span></div>
                      <div className="text-gray-700 text-lg font-medium">Fall Away</div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      80% of people who make a decision for Christ typically fall away from the faith within the first year
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-full"
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-r-3xl rounded-l-none h-full">
                  {/* Gradient left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#15BEE2] to-[#0EA5E9]"></div>
                  <CardContent className="p-6 pl-8 h-full flex flex-col justify-between min-h-[180px]">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-gray-800 mb-2">64<span className="text-3xl">%</span></div>
                      <div className="text-gray-700 text-lg font-medium">Young Adults</div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      64% of young adults leave the Christian faith as they enter adulthood (equating to over 1M per year)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2 lg:col-span-1 h-full"
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-r-3xl rounded-l-none h-full">
                  {/* Gradient left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#15BEE2] to-[#0EA5E9]"></div>
                  <CardContent className="p-6 pl-8 h-full flex flex-col justify-between min-h-[180px]">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-gray-800 mb-2">40M</div>
                      <div className="text-gray-700 text-lg font-medium">Church Exodus</div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      40 Million adult Christians left the church in the last 25 years (largest & fastest religious shift in U.S. history)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - Simple and Clean */}
        <section id="solution" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="max-w-[1180px] mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Solution
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A fundamentally different approach to discipleship
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Dashboard Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="relative">
                  <img 
                    src={eCipleDashImage} 
                    alt="eciple discipleship dashboard interface" 
                    className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-2xl"></div>
                </div>
              </motion.div>

              {/* Right side - Three bullet points */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2 space-y-8"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">One-to-One Focus</h3>
                    <p className="text-gray-600">Built specifically for personalized mentoring relationships, not group-based content delivery</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Enabling Technology</h3>
                    <p className="text-gray-600">Intuitive functionality providing full control over all program facets including topics, pathway steps and content</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Scalable Infrastructure</h3>
                    <p className="text-gray-600">Modern platform designed to support large-scale discipleship across diverse ministry contexts</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Product />

        {/* Comparison Chart Section */}
        <section id="comparison" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-[1180px] mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">Product Comparison</h2>
              <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
                See how the eciple One-To-One Discipleship Enablement Platform compares to traditional discipleship providers
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Card className="shadow-lg border-0">
                <CardContent className="p-0">
                  <h3 className="text-xl md:text-2xl font-semibold font-sans text-primary mb-6 text-center py-6 px-4">Current Discipleship Providers vs. eciple Discipleship Enablement Platform</h3>
                  
                  {/* Mobile-first responsive layout */}
                  <div className="block md:hidden px-4 pb-6">
                    {comparisonFactors.map((item, index) => (
                      <div key={index} className="mb-6 border-b border-gray-200 pb-4">
                        <h4 className="font-bold text-primary mb-3">{item.factor}</h4>
                        
                        <div className="mb-4">
                          <div className="font-semibold text-gray-600 mb-2 text-sm">Traditional Providers:</div>
                          <div className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item.traditional}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-white mb-2 text-sm bg-gradient-to-r from-[#15BEE2] to-[#0EA5E9] px-3 py-1 rounded-lg inline-flex items-center gap-1">
                            <span className="text-sm">★</span>
                            eciple Platform
                            <span className="text-sm">★</span>
                          </div>
                          <div className="flex items-start gap-2 mt-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="font-semibold text-primary text-sm">{item.eciple}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Desktop table layout */}
                  <div className="hidden md:block overflow-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-bold text-primary w-1/4">Factor</TableHead>
                          <TableHead className="font-bold text-gray-600 w-[37.5%]">Traditional Discipleship Providers</TableHead>
                          <TableHead className="font-bold text-white w-[37.5%] bg-gradient-to-br from-[#15BEE2] to-[#0EA5E9] relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#15BEE2]/20 to-[#0EA5E9]/20 animate-pulse"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <span className="text-lg text-white">★</span>
                              eciple Platform
                              <span className="text-lg text-white">★</span>
                            </span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                        <TableBody>
                        {comparisonFactors.map((item, index) => (
                          <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <TableCell className="font-bold text-primary">{item.factor}</TableCell>
                            <TableCell>
                              <div className="flex items-start gap-2">
                                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{item.traditional}</span>
                              </div>
                            </TableCell>
                            <TableCell className="bg-gradient-to-br from-accent/5 to-primary/5 relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-50"></div>
                              <div className="flex items-start gap-2 relative z-10">
                                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                                  <Check className="h-4 w-4 text-green-600" />
                                </div>
                                <span className="font-semibold text-primary">{item.eciple}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="max-w-[1180px] mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">Ministry-First Pricing</h2>
              <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
                Our goal is to empower life-changing discipleship above all, which is why we provide right-sized, transparent pricing that grows with your ministry and includes all core features with no hidden fees.
              </p>
              
              <div className="flex items-center justify-center mt-6 space-x-2">
                <span className={`text-sm ${!isAnnual ? 'font-semibold text-primary' : 'text-foreground text-opacity-70'}`}>Monthly</span>
                <Switch 
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                />
                <span className={`text-sm ${isAnnual ? 'font-semibold text-primary' : 'text-foreground text-opacity-70'}`}>
                  Annual <span className="ml-1 text-xs bg-accent text-white rounded-full px-2 py-0.5">Save 15%</span>
                </span>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan, index) => (
                <motion.div 
                  key={index}
                  className={`${plan.popular ? 'z-10' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    plan.popular ? 'border-2 border-[#15BEE2] shadow-lg scale-105 relative' : ''
                  }`}>
                    {plan.popular && (
                      <div className="absolute top-4 -right-2">
                        <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg transform rotate-3">POPULAR</div>
                      </div>
                    )}
                    <div className={`text-center p-6 ${plan.popular ? 'bg-gradient-to-br from-[#15BEE2] to-[#0EA5E9]' : 'bg-gray-50'}`}>
                      <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>{plan.name}</h3>
                      <div className="mt-4">
                        <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : ''}`}>{getPrice(plan.monthlyPrice)}</span>
                        <span className={`${plan.popular ? 'text-white text-opacity-90' : 'text-foreground text-opacity-70'}`}>{getPricingPeriod()}</span>
                      </div>
                      <p className={`mt-2 ${plan.popular ? 'text-white text-opacity-90' : 'text-foreground text-opacity-60'}`}>{plan.description}</p>
                    </div>
                    <CardContent className="p-6">
                      {plan.isLeftRight ? (
                        <div className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <span className="text-sm font-medium text-gray-700">{(feature as any).label}</span>
                              <span className="text-sm font-semibold text-primary">{(feature as any).value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                              <span>{typeof feature === 'string' ? feature : feature.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-6">
                        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-accent/20 w-full justify-center">
                          <a href="/contact" className="flex items-center gap-2">
                            Get Started
                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Pricing Features Card */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold font-sans text-primary mb-2">Church Size Based</h3>
                <p className="text-foreground text-opacity-80">Pricing scales with your congregation size</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold font-sans text-primary mb-2">All-Inclusive Features</h3>
                <p className="text-foreground text-opacity-80">No hidden fees or add-on costs for core features</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold font-sans text-primary mb-2">Annual Discounts</h3>
                <p className="text-foreground text-opacity-80">Save up to 15% with annual payment plans</p>
              </div>
            </motion.div>

          </div>
        </section>
        
      </main>
      <Contact />
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1180px] mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6">Ready to Transform Your Discipleship Strategy?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the growing community of churches and ministries revolutionizing their discipleship approach with eciple's platform.
            </p>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 rounded-full group relative overflow-hidden shadow-lg shadow-accent/20"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <span className="flex items-center gap-2">
                Contact Us Today
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-secondary to-blue-400 hover:from-blue-400 hover:to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}