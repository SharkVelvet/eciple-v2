import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentUpdateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Record<string, string>) => void;
  currentContent: Record<string, string>;
}

export default function ContentUpdateForm({
  isOpen,
  onClose,
  onSave,
  currentContent,
}: ContentUpdateFormProps) {
  const { toast } = useToast();
  
  // Initialize form state
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Load the form data whenever the dialog is opened
  useEffect(() => {
    if (isOpen) {
      console.log("Content form opened, loading latest data");
      
      // Start with current content from website
      const initialData: Record<string, string> = {
        // Hero Section
        hero_heading: "Discipleship Reimagined",
        hero_subheading: "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.",
        hero_cta_text: "Learn More",
        
        // Problem Section
        problem_text: "Despite 82% of pastors saying discipleship is a priority, only 29% think their church does it effectively.",
        bottom_line_title: "The Bottom Line",
        bottom_line_text: "Churches lack an effective system to connect, track, and grow disciples.",
        mentorship_text: "Mentorship",
        curriculum_text: "Curriculum",
        growth_text: "Growth",
        metrics_text: "Metrics",
        
        // Solution Section
        solution_title: "The Discipleship Solution",
        solution_text: "Our platform provides everything needed for effective discipleship.",
        solution_point1: "Smart Matching",
        solution_point2: "Progress Tracking",
        solution_point3: "Resource Library",
        
        // Product Section
        product_title: "The Eciple Platform",
        product_text: "Our comprehensive solution for church discipleship.",
        connect_title: "Connect",
        connect_text: "Smart pairing of disciples with mentors.",
        track_title: "Track",
        track_text: "Monitor spiritual growth and progress.",
        grow_title: "Grow",
        grow_text: "Resources that foster spiritual maturity.",
        
        // Competition Section
        competition_title: "The Competition",
        competition_text: "How eciple stands apart from other platforms.",
        
        // Pricing Section
        pricing_title: "Simple Pricing",
        pricing_text: "Affordable options for churches of all sizes.",
        starter_title: "Starter",
        starter_price: "$199/mo",
        starter_features: "Up to 200 members, Basic features, Email support",
        pro_title: "Professional",
        pro_price: "$399/mo",
        pro_features: "Up to 1,000 members, All features, Priority support",
        enterprise_title: "Enterprise",
        enterprise_price: "Custom",
        enterprise_features: "Unlimited members, Custom integrations, Dedicated support",
        
        // Contact Section
        contact_title: "Get in Touch",
        contact_text: "Have questions? Contact us today.",
        email_text: "Email",
        phone_text: "Phone",
        submit_text: "Submit"
      };
      
      // Then override with any saved content
      let mergedData = { ...initialData };
      
      // Add current content from props
      if (currentContent) {
        console.log("Adding current content from props:", Object.keys(currentContent).length, "items");
        mergedData = { ...mergedData, ...currentContent };
      }
      
      // Try to get most recent content from localStorage
      try {
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          console.log("Adding saved content from localStorage:", Object.keys(parsedContent).length, "items");
          
          // Merge with higher priority to localStorage content
          mergedData = { ...mergedData, ...parsedContent };
        }
      } catch (error) {
        console.error("Error loading content from localStorage:", error);
      }
      
      // Set the form data
      console.log("Form initialized with", Object.keys(mergedData).length, "items");
      setFormData(mergedData);
    }
  }, [isOpen, currentContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only include fields that have changed from current content
    const updates: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      // If the value has changed or doesn't exist in current content
      if (!currentContent[key] || currentContent[key] !== value) {
        updates[key] = value;
      }
    });
    
    if (Object.keys(updates).length === 0) {
      toast({
        title: "No Changes",
        description: "You haven't made any changes to the content.",
      });
      return;
    }
    
    onSave(updates);
    toast({
      title: "Content Updated",
      description: `Updated ${Object.keys(updates).length} content items successfully.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Update Website Content</DialogTitle>
          <DialogDescription>
            Edit the content below to update your website. Changes will be saved when you click Save.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="py-4">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid grid-cols-7 mb-4">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="competition">Competition</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[400px] pr-4">
              {/* Hero Section */}
              <TabsContent value="hero" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_heading" className="text-base font-semibold">
                    Main Heading
                  </Label>
                  <Input
                    id="hero_heading"
                    name="hero_heading"
                    value={formData.hero_heading}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hero_subheading" className="text-base font-semibold">
                    Subheading
                  </Label>
                  <Textarea
                    id="hero_subheading"
                    name="hero_subheading"
                    value={formData.hero_subheading}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hero_cta_text" className="text-base font-semibold">
                    Button Text
                  </Label>
                  <Input
                    id="hero_cta_text"
                    name="hero_cta_text"
                    value={formData.hero_cta_text}
                    onChange={handleChange}
                  />
                </div>
              </TabsContent>
              
              {/* Problem Section */}
              <TabsContent value="problem" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="problem_text" className="text-base font-semibold">
                    Problem Statement
                  </Label>
                  <Textarea
                    id="problem_text"
                    name="problem_text"
                    value={formData.problem_text}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bottom_line_title" className="text-base font-semibold">
                    Bottom Line Title
                  </Label>
                  <Input
                    id="bottom_line_title"
                    name="bottom_line_title"
                    value={formData.bottom_line_title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bottom_line_text" className="text-base font-semibold">
                    Bottom Line Text
                  </Label>
                  <Textarea
                    id="bottom_line_text"
                    name="bottom_line_text"
                    value={formData.bottom_line_text}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mentorship_text" className="text-base font-semibold">
                      Mentorship Label
                    </Label>
                    <Input
                      id="mentorship_text"
                      name="mentorship_text"
                      value={formData.mentorship_text}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="curriculum_text" className="text-base font-semibold">
                      Curriculum Label
                    </Label>
                    <Input
                      id="curriculum_text"
                      name="curriculum_text"
                      value={formData.curriculum_text}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="growth_text" className="text-base font-semibold">
                      Growth Label
                    </Label>
                    <Input
                      id="growth_text"
                      name="growth_text"
                      value={formData.growth_text}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metrics_text" className="text-base font-semibold">
                      Metrics Label
                    </Label>
                    <Input
                      id="metrics_text"
                      name="metrics_text"
                      value={formData.metrics_text}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Solution Section */}
              <TabsContent value="solution" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="solution_title" className="text-base font-semibold">
                    Solution Title
                  </Label>
                  <Input
                    id="solution_title"
                    name="solution_title"
                    value={formData.solution_title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="solution_text" className="text-base font-semibold">
                    Solution Description
                  </Label>
                  <Textarea
                    id="solution_text"
                    name="solution_text"
                    value={formData.solution_text}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="solution_point1" className="text-base font-semibold">
                      Solution Point 1
                    </Label>
                    <Input
                      id="solution_point1"
                      name="solution_point1"
                      value={formData.solution_point1}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="solution_point2" className="text-base font-semibold">
                      Solution Point 2
                    </Label>
                    <Input
                      id="solution_point2"
                      name="solution_point2"
                      value={formData.solution_point2}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="solution_point3" className="text-base font-semibold">
                      Solution Point 3
                    </Label>
                    <Input
                      id="solution_point3"
                      name="solution_point3"
                      value={formData.solution_point3}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Product Section */}
              <TabsContent value="product" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product_title" className="text-base font-semibold">
                    Product Title
                  </Label>
                  <Input
                    id="product_title"
                    name="product_title"
                    value={formData.product_title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product_text" className="text-base font-semibold">
                    Product Description
                  </Label>
                  <Textarea
                    id="product_text"
                    name="product_text"
                    value={formData.product_text}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="connect_title" className="text-base font-semibold">
                      Connect Feature Title
                    </Label>
                    <Input
                      id="connect_title"
                      name="connect_title"
                      value={formData.connect_title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="connect_text" className="text-base font-semibold">
                      Connect Feature Text
                    </Label>
                    <Input
                      id="connect_text"
                      name="connect_text"
                      value={formData.connect_text}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="track_title" className="text-base font-semibold">
                      Track Feature Title
                    </Label>
                    <Input
                      id="track_title"
                      name="track_title"
                      value={formData.track_title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="track_text" className="text-base font-semibold">
                      Track Feature Text
                    </Label>
                    <Input
                      id="track_text"
                      name="track_text"
                      value={formData.track_text}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="grow_title" className="text-base font-semibold">
                      Grow Feature Title
                    </Label>
                    <Input
                      id="grow_title"
                      name="grow_title"
                      value={formData.grow_title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="grow_text" className="text-base font-semibold">
                      Grow Feature Text
                    </Label>
                    <Input
                      id="grow_text"
                      name="grow_text"
                      value={formData.grow_text}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Competition Section */}
              <TabsContent value="competition" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="competition_title" className="text-base font-semibold">
                    Competition Title
                  </Label>
                  <Input
                    id="competition_title"
                    name="competition_title"
                    value={formData.competition_title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="competition_text" className="text-base font-semibold">
                    Competition Description
                  </Label>
                  <Textarea
                    id="competition_text"
                    name="competition_text"
                    value={formData.competition_text}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </TabsContent>
              
              {/* Pricing Section */}
              <TabsContent value="pricing" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pricing_title" className="text-base font-semibold">
                    Pricing Title
                  </Label>
                  <Input
                    id="pricing_title"
                    name="pricing_title"
                    value={formData.pricing_title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pricing_text" className="text-base font-semibold">
                    Pricing Description
                  </Label>
                  <Textarea
                    id="pricing_text"
                    name="pricing_text"
                    value={formData.pricing_text}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="starter_title" className="text-base font-semibold">
                      Starter Tier Title
                    </Label>
                    <Input
                      id="starter_title"
                      name="starter_title"
                      value={formData.starter_title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="starter_price" className="text-base font-semibold">
                      Starter Price
                    </Label>
                    <Input
                      id="starter_price"
                      name="starter_price"
                      value={formData.starter_price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="starter_features" className="text-base font-semibold">
                      Starter Features
                    </Label>
                    <Textarea
                      id="starter_features"
                      name="starter_features"
                      value={formData.starter_features}
                      onChange={handleChange}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pro_title" className="text-base font-semibold">
                      Pro Tier Title
                    </Label>
                    <Input
                      id="pro_title"
                      name="pro_title"
                      value={formData.pro_title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pro_price" className="text-base font-semibold">
                      Pro Price
                    </Label>
                    <Input
                      id="pro_price"
                      name="pro_price"
                      value={formData.pro_price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pro_features" className="text-base font-semibold">
                      Pro Features
                    </Label>
                    <Textarea
                      id="pro_features"
                      name="pro_features"
                      value={formData.pro_features}
                      onChange={handleChange}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enterprise_title" className="text-base font-semibold">
                      Enterprise Tier Title
                    </Label>
                    <Input
                      id="enterprise_title"
                      name="enterprise_title"
                      value={formData.enterprise_title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enterprise_price" className="text-base font-semibold">
                      Enterprise Price
                    </Label>
                    <Input
                      id="enterprise_price"
                      name="enterprise_price"
                      value={formData.enterprise_price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enterprise_features" className="text-base font-semibold">
                      Enterprise Features
                    </Label>
                    <Textarea
                      id="enterprise_features"
                      name="enterprise_features"
                      value={formData.enterprise_features}
                      onChange={handleChange}
                      rows={2}
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Contact Section */}
              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_title" className="text-base font-semibold">
                    Contact Title
                  </Label>
                  <Input
                    id="contact_title"
                    name="contact_title"
                    value={formData.contact_title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact_text" className="text-base font-semibold">
                    Contact Description
                  </Label>
                  <Textarea
                    id="contact_text"
                    name="contact_text"
                    value={formData.contact_text}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email_text" className="text-base font-semibold">
                      Email Label
                    </Label>
                    <Input
                      id="email_text"
                      name="email_text"
                      value={formData.email_text}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone_text" className="text-base font-semibold">
                      Phone Label
                    </Label>
                    <Input
                      id="phone_text"
                      name="phone_text"
                      value={formData.phone_text}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="submit_text" className="text-base font-semibold">
                      Submit Button Text
                    </Label>
                    <Input
                      id="submit_text"
                      name="submit_text"
                      value={formData.submit_text}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
          
          <DialogFooter className="pt-4 mt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save All Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}