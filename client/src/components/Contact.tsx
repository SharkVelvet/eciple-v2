import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminContext } from "@/pages/ComparisonPage";
import bobbyPersonImage from "@assets/Bobby-Person-2021-scaled.jpg";

export default function Contact() {
  const { isAdmin, editMode, editableContent, updateContent } = useContext(AdminContext);
  
  const contactTitle = "contact_title";
  const contactSubtitle = "contact_subtitle";
  const founderTitle = "founder_title";
  const founderText = "founder_text";
  
  const getContactTitle = () => editableContent[contactTitle] || "Ready to Transform Your Discipleship Strategy?";
  const getContactSubtitle = () => editableContent[contactSubtitle] || 
    "Join the growing community of churches and ministries revolutionizing their discipleship approach with eciple's platform.";
  const getFounderTitle = () => editableContent[founderTitle] || "Meet the Founder";
  const getFounderText = () => editableContent[founderText] || 
    "Bobby Bemis brings over 25 years of ministry experience as a pastor and discipleship leader.";

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xqabzakl', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('Thank you for your interest! We will be in touch soon.');
        form.reset();
      } else {
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pilotBenefits = [
    "Early access to innovative features",
    "Influence product development",
    "Discounted pricing for early adopters",
    "Dedicated onboarding support",
    "Be part of shaping the future of discipleship"
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#15BEE2] to-[#1E88E5]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold font-sans text-white mb-4">
                {getContactTitle()}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {getContactSubtitle()}
              </p>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="shadow-xl bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold font-sans text-[#223349] mb-3">Request More Information</h3>
                  <p className="text-gray-600 mb-6">For questions, comments or to stay up to date, please complete the below form.</p>
                  <form action="https://formspree.io/f/xqabzakl" method="POST" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15BEE2]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15BEE2]"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      <Label htmlFor="churchName" className="text-sm font-medium text-gray-700">Church/Organization Name</Label>
                      <Input 
                        id="churchName" 
                        name="churchName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15BEE2]"
                        required 
                      />
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15BEE2]"
                        required 
                      />
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                      <Input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15BEE2]"
                      />
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      <Label htmlFor="churchSize" className="text-sm font-medium text-gray-700">Church/Organization Size</Label>
                      <select 
                        id="churchSize" 
                        name="churchSize"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15BEE2] bg-white"
                      >
                        <option value="">Select Size</option>
                        <option value="Under 250">Under 250</option>
                        <option value="250-750">250-750</option>
                        <option value="Over 750">Over 750</option>
                        <option value="Over 2000">Over 2000</option>
                      </select>
                    </div>
                    
                    <div className="mb-6 space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">Questions/Comments - What interests you most about eciple?</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15BEE2] resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-[#223349] hover:bg-[#223349]/90 text-white py-3 px-4 rounded-md font-medium transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Request More Information"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}