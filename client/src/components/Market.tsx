import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Market() {
  const samPoints = [
    { icon: "church", stat: "335,000", description: "church congregations in the U.S. (Hartford Institute, 2020)" },
    { icon: "users", stat: "150M", description: "people (Pew Research, 2019)" },
    { icon: "hand-holding-usd", stat: "$75B", description: "in annual giving (Giving USA, 2021)" }
  ];

  const somPoints = [
    { icon: "church", stat: "115,000", description: "congregations (NAE, 2021)" },
    { icon: "users", stat: "40M", description: "weekly attendees (Barna, 2021)" },
    { icon: "hand-holding-usd", stat: "$40B", description: "in annual giving (ECFA, 2021)" }
  ];

  const trends = [
    "Declining weekly church attendance necessitates focus on existing members",
    "Younger demographics expect digital tools with data and metrics",
    "Churches are adopting monthly subscription models over large capital purchases",
    "Members expect mobile-friendly, user-centric experiences"
  ];

  return (
    <section id="market" className="py-16 bg-gray-50 scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">Market Opportunity</h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
            A significant untapped market exists for comprehensive discipleship solutions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold font-sans text-primary mb-4">Service Addressable Market (SAM)</h3>
                <ul className="space-y-4">
                  {samPoints.map((point, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                    >
                      <span className="text-primary mr-2 mt-1">
                        <i className={`fas fa-${point.icon}`}></i>
                      </span>
                      <span><strong>{point.stat}</strong> {point.description}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold font-sans text-primary mb-4">Service Obtainable Market (SOM)</h3>
                <ul className="space-y-4">
                  {somPoints.map((point, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                    >
                      <span className="text-primary mr-2 mt-1">
                        <i className={`fas fa-${point.icon}`}></i>
                      </span>
                      <span><strong>{point.stat}</strong> {point.description}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-primary text-white p-8 rounded-lg shadow-md text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold font-sans mb-4">Estimated Market Size</h3>
          <p className="text-3xl font-bold mb-2">$227.7 Million</p>
          <p className="text-white text-opacity-80">
            among 115,000 evangelical churches (Outreach 2022)
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold font-sans text-primary mb-4">Market Trends</h3>
                <ul className="space-y-3">
                  {trends.map((trend, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                    >
                      <span className="text-primary mr-2 mt-1">
                        <i className={`fas fa-chart-line`}></i>
                      </span>
                      <span>{trend}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold font-sans text-primary mb-4">Early Adopters</h3>
                <p className="text-foreground text-opacity-80 mb-4">
                  <strong>1,700 megachurches</strong> represent our initial focus, as they have the resources (large member bases and substantial annual budgets) to be early adopters of new technology like eciple.
                </p>
                <p className="text-foreground text-opacity-80">
                  The Combined Annual Growth Rate (CAGR) for discipleship technology over the next 5 years is estimated to be <strong>12%</strong> (Outreach Magazine, 2022).
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
