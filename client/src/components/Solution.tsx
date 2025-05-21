import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useContext } from "react";
import { AdminContext } from "@/pages/Home";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Solution() {
  // Access the admin context
  const { isAdmin, editMode, editableContent, updateContent } = useContext(AdminContext);
  
  // Define editable text content keys
  const solutionMainText = "solution_main_text";
  
  // Get content or default values if not yet saved
  const getSolutionMainText = () => editableContent[solutionMainText] || 
    "eciple is a comprehensive discipleship enablement platform that empowers churches to build stronger faith communities through intentional relationships.";
  const solutionPoints = [
    {
      icon: "user-friends",
      title: "Matches mentors and mentees",
      description: "Connect people within churches and communities based on compatibility."
    },
    {
      icon: "road",
      title: "Provides structured pathways",
      description: "Offer robust tools and clear development paths for spiritual growth."
    },
    {
      icon: "seedling",
      title: "Empowers spiritual growth",
      description: "Support the journey toward spiritual maturity with measurable progress."
    }
  ];

  return (
    <section id="solution" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="People engaged in spiritual mentorship" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-6 solution-heading">The One-To-One Discipleship Enablement Platform</h2>
            {editMode && isAdmin ? (
              <Textarea
                value={getSolutionMainText()}
                onChange={(e) => updateContent(solutionMainText, e.target.value)}
                className="text-lg mb-8 text-foreground w-full min-h-[80px] resize-y"
              />
            ) : (
              <p className="text-lg mb-8 text-foreground solution-subheading">
                {getSolutionMainText()}
              </p>
            )}
            
            <div className="space-y-6">
              {solutionPoints.map((point, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="bg-primary text-white p-2 rounded-full mr-4 mt-1 flex items-center justify-center w-10 h-10">
                    <i className={`fas fa-${point.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-sans text-foreground mb-1">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
