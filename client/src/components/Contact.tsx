import { useContext } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AdminContext } from "@/pages/ComparisonPage";
import bobbyPersonImage from "@assets/Bobby-Person-2021-scaled.jpg";
import ContactForm from "./ContactForm";

export default function Contact() {
  // Access admin context
  const { isAdmin, editMode, editableContent, updateContent } = useContext(AdminContext);
  
  // Define editable text content keys
  const contactTitle = "contact_title";
  const contactSubtitle = "contact_subtitle";
  const founderTitle = "founder_title";
  const founderText = "founder_text";
  
  // Helper functions to get content or default values
  const getContactTitle = () => editableContent[contactTitle] || "Ready to Transform Your Discipleship Strategy?";
  const getContactSubtitle = () => editableContent[contactSubtitle] || 
    "Join the growing community of churches and ministries revolutionizing their discipleship approach with eciple's platform.";
  const getFounderTitle = () => editableContent[founderTitle] || "Meet the Founder";
  const getFounderText = () => editableContent[founderText] || 
    "Bobby Bemis brings over 25 years of ministry experience as a pastor and discipleship leader.";



  const pilotBenefits = [
    "Early access to innovative features",
    "Influence product development",
    "Discounted pricing for early adopters",
    "Dedicated onboarding support",
    "Be part of shaping the future of discipleship"
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-[#15BEE2] to-[#0368C1] text-white scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6">
              {editMode && isAdmin ? (
                <Input
                  type="text"
                  value={getContactTitle()}
                  onChange={(e) => updateContent(contactTitle, e.target.value)}
                  className="text-white bg-transparent border-white/20"
                />
              ) : (
                getContactTitle()
              )}
            </h2>
            {editMode && isAdmin ? (
              <Textarea
                value={getContactSubtitle()}
                onChange={(e) => updateContent(contactSubtitle, e.target.value)}
                className="text-lg text-white text-opacity-90 mb-8 resize-y bg-transparent border-white/20 w-full"
              />
            ) : (
              <p className="text-lg text-white text-opacity-90 mb-8">
                {getContactSubtitle()}
              </p>
            )}
          </motion.div>
          
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
