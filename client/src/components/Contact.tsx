import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminContext } from "@/pages/Home";

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
  const getContactTitle = () => editableContent[contactTitle] || "Get in Touch";
  const getContactSubtitle = () => editableContent[contactSubtitle] || 
    "Have questions or interested in a demo? Fill out the form below.";
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
            
            <motion.div 
              className="bg-white bg-opacity-10 p-6 rounded-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold font-sans mb-4">Why Join Our Pilot?</h3>
              <ul className="space-y-3">
                {pilotBenefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                  >
                    <span className="text-accent mr-2">
                      <i className="fas fa-star"></i>
                    </span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center mt-6"
              >
                <div className="flex-shrink-0">
                  <img 
                    src={bobbyPersonImage} 
                    alt="Bobby Person, Founder of eciple" 
                    className="rounded-full object-cover w-[100px] h-[100px] border-2 border-white/20 shadow-md"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white text-lg">Bobby Person</p>
                  <p className="text-white/80">Founder of eciple</p>
                  <p className="text-white/80 mt-1">Call / Text: 813.400.9384</p>
                  <p className="text-white/80">Email: bobby@eciple.com</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-sans text-primary mb-6">Request More Information</h3>
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
                    <Label htmlFor="churchName">Church Name</Label>
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
                    <Label htmlFor="churchSize">Church Size</Label>
                    <Select 
                      onValueChange={handleSelectChange}
                      value={formData.churchSize}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (Less than 100)</SelectItem>
                        <SelectItem value="medium">Medium (100-500)</SelectItem>
                        <SelectItem value="large">Large (500-2,000)</SelectItem>
                        <SelectItem value="mega">Mega (2,000+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-6 space-y-2">
                    <Label htmlFor="message">What interests you most about eciple?</Label>
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
