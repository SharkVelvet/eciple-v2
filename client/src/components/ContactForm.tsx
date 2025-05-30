import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className="shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold font-sans text-primary mb-3">Request More Information</h3>
          <p className="text-gray-600 mb-6">For questions, comments or to stay up to date, please complete the below form.</p>
          <form action="https://formspree.io/f/xqabzakl" method="POST" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  required 
                />
              </div>
            </div>
            
            <div className="mb-4 space-y-2">
              <Label htmlFor="churchName">Church/Organization Name</Label>
              <Input 
                id="churchName" 
                name="churchName"
                required 
              />
            </div>
            
            <div className="mb-4 space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email"
                required 
              />
            </div>
            
            <div className="mb-4 space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                type="tel" 
                id="phone" 
                name="phone"
              />
            </div>
            
            <div className="mb-4 space-y-2">
              <Label htmlFor="churchSize">Church/Organization Size</Label>
              <select 
                id="churchSize" 
                name="churchSize"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select Size</option>
                <option value="Under 250">Under 250</option>
                <option value="250-750">250-750</option>
                <option value="Over 750">Over 750</option>
                <option value="Over 2000">Over 2000</option>
              </select>
            </div>
            
            <div className="mb-6 space-y-2">
              <Label htmlFor="message">Questions/Comments - What interests you most about eciple?</Label>
              <Textarea 
                id="message" 
                name="message"
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
  );
}