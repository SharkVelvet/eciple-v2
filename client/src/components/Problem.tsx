import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Problem() {
  const stats = [
    { percentage: "55%", description: "cite lack of personal discipleship programs", source: "Barna, 2021" },
    { percentage: "45%", description: "say identifying and training mentors is a challenge", source: "Outreach Magazine, 2022" },
    { percentage: "38%", description: "want improved spiritual assessment tools", source: "Lifeway, 2020" },
    { percentage: "32%", description: "lack centralized systems and metrics for tracking", source: "Barna, 2021" },
    { percentage: "29%", description: "need more customizable curriculum", source: "Outreach Magazine, 2022" }
  ];

  return (
    <section id="problem" className="py-16 bg-light scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">The Problem</h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
            Despite 82% of pastors saying discipleship is a priority, only 29% think their church does it effectively.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold font-sans text-primary mb-2">{stat.percentage}</div>
                  <p className="text-foreground">{stat.description}</p>
                  <p className="text-sm text-foreground text-opacity-60 mt-2">{stat.source}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
              <CardContent className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground mb-1">The Bottom Line</p>
                  <p className="text-foreground text-opacity-80">There are gaps in mentorship programs, curriculum, structure and tracking.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
