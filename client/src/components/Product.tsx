import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import ecipleWings from "@assets/eciple-wing-blue-grad.png";
import { useContext } from "react";
import { AdminContext } from "@/pages/Home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Product() {
  // Access admin context
  const { isAdmin, editMode, editableContent, updateContent } = useContext(AdminContext);
  
  // Define editable text content keys
  const productMainTitle = "product_main_title";
  const productMainText = "product_main_text";
  const centralizedTitle = "centralized_title";
  const centralizedText = "centralized_text";
  const mobileTitle = "mobile_title";
  const mobileText = "mobile_text";
  
  // Helper functions to get content or default values
  const getProductMainTitle = () => editableContent[productMainTitle] || "Product Features";
  const getProductMainText = () => editableContent[productMainText] || 
    "eciple provides a comprehensive set of tools for effective discipleship management and growth.";
  const getCentralizedTitle = () => editableContent[centralizedTitle] || "Centralized Dashboard";
  const getCentralizedText = () => editableContent[centralizedText] || 
    "A robust backend for pastors and leaders to track discipleship relationships and growth.";
  const getMobileTitle = () => editableContent[mobileTitle] || "Mobile Experience";
  const getMobileText = () => editableContent[mobileText] || 
    "A seamless mobile experience that keeps discipleship accessible wherever members are.";
  const features = [
    {
      icon: "clipboard-check",
      title: "Intelligent Assessments",
      description: "Automated matching based on spiritual gifts, personality, and growth needs for optimal mentor/mentee pairing."
    },
    {
      icon: "map-signs",
      title: "Flexible Program Design",
      description: "Templated, stepped workflows enable easy custom program creation aligning to theological positions and audience needs"
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
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4 product-heading">
            {editMode && isAdmin ? (
              <Input
                type="text"
                value={getProductMainTitle()}
                onChange={(e) => updateContent(productMainTitle, e.target.value)}
                className="text-center"
              />
            ) : (
              getProductMainTitle()
            )}
          </h2>
          {editMode && isAdmin ? (
            <Textarea
              value={getProductMainText()}
              onChange={(e) => updateContent(productMainText, e.target.value)}
              className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80 resize-y"
            />
          ) : (
            <p className="text-lg max-w-3xl mx-auto text-foreground text-opacity-80 product-subheading">
              {getProductMainText()}
            </p>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative">
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
            <h3 className="text-2xl font-bold font-sans text-primary mb-4">
              {editMode && isAdmin ? (
                <Input
                  type="text"
                  value={getCentralizedTitle()}
                  onChange={(e) => updateContent(centralizedTitle, e.target.value)}
                />
              ) : (
                getCentralizedTitle()
              )}
            </h3>
            {editMode && isAdmin ? (
              <Textarea
                value={getCentralizedText()}
                onChange={(e) => updateContent(centralizedText, e.target.value)}
                className="text-foreground mb-6 resize-y w-full"
              />
            ) : (
              <p className="text-foreground text-opacity-80 mb-6">
                {getCentralizedText()}
              </p>
            )}
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
            <h3 className="text-2xl font-bold font-sans text-primary mb-4">
              {editMode && isAdmin ? (
                <Input
                  type="text"
                  value={getMobileTitle()}
                  onChange={(e) => updateContent(mobileTitle, e.target.value)}
                />
              ) : (
                getMobileTitle()
              )}
            </h3>
            {editMode && isAdmin ? (
              <Textarea
                value={getMobileText()}
                onChange={(e) => updateContent(mobileText, e.target.value)}
                className="text-foreground mb-6 resize-y w-full"
              />
            ) : (
              <p className="text-foreground text-opacity-80 mb-6">
                {getMobileText()}
              </p>
            )}
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