import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Users, LineChart, Gauge, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Problem() {
  const stats = [
    { 
      percentage: "55%", 
      description: "cite lack of personal discipleship programs", 
      source: "Barna, 2021",
      icon: Users,
      color: "bg-red-100 text-red-600"
    },
    { 
      percentage: "45%", 
      description: "say identifying and training mentors is a challenge", 
      source: "Outreach Magazine, 2022",
      icon: Users,
      color: "bg-orange-100 text-orange-600"
    },
    { 
      percentage: "38%", 
      description: "want improved spiritual assessment tools", 
      source: "Lifeway, 2020",
      icon: Gauge,
      color: "bg-amber-100 text-amber-600"
    },
    { 
      percentage: "32%", 
      description: "lack centralized systems and metrics for tracking", 
      source: "Barna, 2021",
      icon: LineChart,
      color: "bg-emerald-100 text-emerald-600"
    },
    { 
      percentage: "29%", 
      description: "need more customizable curriculum", 
      source: "Outreach Magazine, 2022",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-white to-blue-50 scroll-mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              
              <p className="text-xl leading-relaxed text-foreground/80 max-w-xl">
                Despite <span className="font-semibold text-primary">82% of pastors</span> saying discipleship is a priority, only <span className="font-semibold text-secondary">29% think</span> their church does it effectively.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative mt-12 p-8 rounded-xl bg-gradient-to-br from-white to-blue-50 border border-primary/10 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-secondary to-primary text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg">
                Key Finding
              </div>
              <h3 className="text-xl font-bold mb-4">The Bottom Line</h3>
              <p className="text-foreground/80 mb-4">There are critical gaps in:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  <span>Mentorship programs and mentor training</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  <span>Customizable, engaging curriculum</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  <span>Structured growth pathways</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-secondary" />
                  </div>
                  <span>Metrics and progress tracking</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <Button asChild variant="outline" className="gap-1 rounded-full">
                  <a href="#solution">
                    See Our Solution
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border-primary/5 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`h-2 ${stat.color.split(' ')[0]}`}></div>
                  <CardContent className="p-6 pt-5">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2.5 ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <div className="text-3xl font-bold font-sans text-primary">{stat.percentage}</div>
                          <div className="text-xs font-medium text-secondary rounded-full px-2 py-0.5 bg-secondary/10">
                            Issue
                          </div>
                        </div>
                        <p className="text-foreground mt-1 font-medium">{stat.description}</p>
                        <p className="text-sm text-muted-foreground mt-2">{stat.source}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
