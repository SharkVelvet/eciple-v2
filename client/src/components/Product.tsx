import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import ecipleWings from "@assets/eciple-wings.png";

export default function Product() {
  const features = [
    {
      icon: "clipboard-check",
      title: "Intelligent Assessments",
      description: "Automated matching based on spiritual gifts, personality, and growth needs for optimal mentor/mentee pairing."
    },
    {
      icon: "map-signs",
      title: "Flexible Content Pathways",
      description: "Structured yet customizable content journeys that adapt to individual spiritual growth needs."
    },
    {
      icon: "comments",
      title: "Integrated Communications",
      description: "Built-in messaging, reminders, and scheduling tools to maintain consistent discipleship relationships."
    },
    {
      icon: "chart-line",
      title: "Centralized Analytics",
      description: "Comprehensive dashboard for pastors with metrics on mentorship engagement, relationship duration, and content effectiveness."
    },
    {
      icon: "sync-alt",
      title: "Church Management Integration",
      description: "Seamless connection with existing church management systems for unified data and streamlined operations."
    },
    {
      icon: "mobile-alt",
      title: "Mobile-First Experience",
      description: "Fully responsive design that works seamlessly across all devices for access anywhere, anytime."
    }
  ];

  const analyticsFeatures = [
    "Number of active mentors in the congregation",
    "Average duration of discipleship relationships",
    "Meeting frequency between mentors and mentees",
    "Content engagement and completion rates",
    "Spiritual growth progress indicators"
  ];

  const mobileFeatures = [
    "Easy-to-use mobile interface for both mentors and mentees",
    "Push notifications for meetings and milestones",
    "Access to content resources anytime, anywhere",
    "Offline capability for uninterrupted access"
  ];

  return (
    <section id="product" className="py-16 bg-gray-50 scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">The Product</h2>
          <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80">
            A comprehensive platform designed to facilitate meaningful discipleship relationships.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-visible">
                <div className="absolute top-0 right-0 -mr-6 mt-2">
                  <img 
                    src={ecipleWings} 
                    alt="eciple wings" 
                    className="h-16 w-auto object-contain opacity-90"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="text-foreground text-4xl mb-4">
                    <i className={`fas fa-${feature.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold font-sans mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
              alt="Church discipleship analytics dashboard" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold font-sans text-primary mb-4">Powerful Analytics Dashboard</h3>
            <p className="text-foreground text-opacity-80 mb-6">
              Provides pastors with critical data points such as:
            </p>
            <ul className="space-y-3">
              {analyticsFeatures.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <CheckCircle className="h-5 w-5 text-foreground mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <div className="mt-16 flex flex-col-reverse md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold font-sans text-primary mb-4">Mobile Experience</h3>
            <p className="text-foreground text-opacity-80 mb-6">
              A seamless mobile experience that keeps discipleship accessible wherever members are.
            </p>
            <ul className="space-y-3">
              {mobileFeatures.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <CheckCircle className="h-5 w-5 text-foreground mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
              alt="eciple mobile app interface" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}