import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminContext } from "@/pages/ComparisonPage";

import { apiRequest } from "@/lib/queryClient";
import bobbyPersonImage from "@assets/Bobby-Person-2021-scaled.jpg";

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

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    churchName: "",
    email: "",
    phone: "",
    churchSize: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, churchSize: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.churchName) {
      // Form validation without toast
      return;
    }

    setLoading(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      // Reset form without toast notification
      setFormData({
        firstName: "",
        lastName: "",
        churchName: "",
        email: "",
        phone: "",
        churchSize: "",
        message: ""
      });
    } catch (error) {
      console.error("Form submission error:", error);
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
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-sans text-primary mb-3">Request More Information</h3>
                <p className="text-gray-600 mb-6">For questions, comments or to stay up to date, please complete the below form.</p>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange} 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 space-y-2">
                    <Label htmlFor="churchName">Church/Organization Name</Label>
                    <Input 
                      id="churchName" 
                      name="churchName"
                      value={formData.churchName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-4 space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-4 space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="mb-4 space-y-2">
                    <Label htmlFor="churchSize">Church/Organization Size</Label>
                    <Select 
                      onValueChange={handleSelectChange}
                      value={formData.churchSize}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Under 250</SelectItem>
                        <SelectItem value="medium">250-750</SelectItem>
                        <SelectItem value="large">Over 750</SelectItem>
                        <SelectItem value="xlarge">Over 2000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-6 space-y-2">
                    <Label htmlFor="message">Questions/Comments - What interests you most about eciple?</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4} 
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
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
    </section>
  );
}
