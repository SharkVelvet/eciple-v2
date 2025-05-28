import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Check, X, ArrowRight, CheckCircle, AlertCircle, AlertTriangle, XCircle, Ban, StopCircle } from "lucide-react";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Product from "@/components/Product";

export default function ComparisonPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  
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
        "Complete one-to-one discipleship platform",
        "Core matching capabilities",
        "Basic analytics dashboard",
        "Standard content library",
        "Email support"
      ],
      popular: false
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
    },
    {
      factor: "Integration",
      traditional: "Limited connection to church systems",
      eciple: "Seamless integration with existing church tech"
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans leading-tight">
                  The One-To-One Discipleship Enablement Platform
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Existing discipleship solutions are overwhelmingly designed for group content delivery, offering no technology to address the unique needs of one-to-one mentoring at scale. The eciple platform provides a fundamentally different approach.
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
                      View Comparison
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Right Column - Visual Elements with Background Image */}
              <motion.div 
                className="relative hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Container for Image and Floating Cards */}
                <div className="relative h-[450px]">
                  {/* Background Image Container - Smaller to allow badges to hang off */}
                  <div className="absolute top-8 left-8 right-8 bottom-8 rounded-2xl overflow-hidden">
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
                      className="absolute top-0 left-0 bg-white/95 backdrop-blur-sm rounded-lg p-4 w-48 border border-white/30 shadow-lg"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary">One-to-One Matching</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        AI-powered mentor-disciple pairing
                      </div>
                    </motion.div>

                    {/* Card 2 - Hangs off top right */}
                    <motion.div
                      className="absolute top-12 right-0 bg-white/95 backdrop-blur-sm rounded-lg p-4 w-52 border border-white/30 shadow-lg"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary">Personalized Growth</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Adaptive content for individual journeys
                      </div>
                    </motion.div>

                    {/* Card 3 - Hangs off bottom left */}
                    <motion.div
                      className="absolute bottom-0 left-0 bg-white/95 backdrop-blur-sm rounded-lg p-4 w-44 border border-white/30 shadow-lg"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary">Scalable Platform</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Technology-enabled discipleship
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
        <section id="problem" className="pt-40 pb-24 bg-white scroll-mt-40 relative overflow-hidden">
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
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-100">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">The Problem</h2>
                  </div>
                  
                  <p className="text-xl leading-relaxed text-foreground/80 max-w-xl mb-8">
                    Despite <span className="font-semibold text-primary">82% of pastors</span> saying discipleship is a priority, only <span className="font-semibold text-secondary">29% think</span> their church does it effectively.
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">The Bottom Line:</h3>
                    <ul className="space-y-3 text-foreground/80">
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>The dominant discipleship model isn't working and is having a disastrous impact</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                        <span>The most effective, desired model isn't available due to the absence of enabling technology…</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                        <span className="font-semibold">Until now, with our launch of the eciple 1:1 Discipleship Enablement Platform</span>
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
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-3xl">
                  <CardContent className="p-6">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-slate-700 mb-2">40<span className="text-3xl">%</span></div>
                      <div className="text-slate-600 text-lg font-medium">Bible Authority</div>
                    </div>
                    
                    <p className="text-slate-500 text-sm leading-relaxed">
                      40% of evangelicals hold the entire Bible as the "actual word of God," 51% say only parts of the Bible are the "inspired word of God."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-3xl">
                  <CardContent className="p-6">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-orange-500 mb-2">80<span className="text-3xl">%</span></div>
                      <div className="text-orange-600 text-lg font-medium">Fall Away</div>
                    </div>
                    
                    <p className="text-orange-400 text-sm leading-relaxed">
                      80% of people who make a decision for Christ typically fall away from the faith within the first year
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-3xl">
                  <CardContent className="p-6">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-purple-500 mb-2">64<span className="text-3xl">%</span></div>
                      <div className="text-purple-600 text-lg font-medium">Young Adults</div>
                    </div>
                    
                    <p className="text-purple-400 text-sm leading-relaxed">
                      64% of young adults leave the Christian faith as they enter adulthood (equating to over 1M per year)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2 lg:col-span-1"
              >
                <Card className="relative overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 rounded-3xl">
                  <CardContent className="p-6">
                    
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-indigo-500 mb-2">40M</div>
                      <div className="text-indigo-600 text-lg font-medium">Church Exodus</div>
                    </div>
                    
                    <p className="text-indigo-400 text-sm leading-relaxed">
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
        <section id="solution" className="py-16 bg-blue-50 scroll-mt-20">
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

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">One-to-One Focus</h3>
                <p className="text-gray-600">Built specifically for personalized mentoring relationships, not group-based content delivery</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Adaptive Technology</h3>
                <p className="text-gray-600">Dynamic content creation that adapts to each unique spiritual journey and relationship</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Scalable Infrastructure</h3>
                <p className="text-gray-600">Modern platform designed to support large-scale discipleship across diverse ministry contexts</p>
              </div>
            </motion.div>
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
                <CardContent className="p-0 overflow-auto">
                  <h3 className="text-2xl font-semibold font-sans text-primary mb-6 text-center py-6">Current Discipleship Providers vs. eciple Discipleship Enablement Platform</h3>
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-bold text-primary w-1/4">Factor</TableHead>
                        <TableHead className="font-bold text-gray-600 w-[37.5%]">Traditional Discipleship Providers</TableHead>
                        <TableHead className="font-bold text-white w-[37.5%] bg-gradient-to-r from-accent to-primary relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 animate-pulse"></div>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="text-lg">✨</span>
                            eciple Platform
                            <span className="text-lg">✨</span>
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
              <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">Pricing and Business Models</h2>
              <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
                eciple employs a tiered subscription model designed for accessibility across organizations of varying sizes.
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
                      <div className="absolute top-0 right-0">
                        <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
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
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
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
      <section className="py-16 bg-blue-50">
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
            >
              <a href="/contact" className="flex items-center gap-2">
                Contact Us Today
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}