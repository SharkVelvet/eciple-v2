import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DirectContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DirectContentEditor({
  isOpen,
  onClose,
}: DirectContentEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Load content on dialog open
  useEffect(() => {
    if (isOpen) {
      // Load initial values either from localStorage or defaults
      const initialValues = {
        hero_heading: "Discipleship Reimagined",
        hero_subheading: "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.",
        hero_cta_text: "Learn More",
        
        problem_text: "Despite 82% of pastors saying discipleship is a priority, only 29% think their church does it effectively.",
        
        solution_title: "The Discipleship Solution"
      };
      
      // Override with any existing values
      try {
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          const parsed = JSON.parse(savedContent);
          setFormData({ ...initialValues, ...parsed });
        } else {
          setFormData(initialValues);
        }
      } catch (error) {
        console.error("Error loading content:", error);
        setFormData(initialValues);
      }
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Set flag to force reload
      localStorage.setItem('forceReload', 'true');
      
      // Save content
      localStorage.setItem('siteContent', JSON.stringify({
        ...formData,
        timestamp: Date.now()
      }));
      
      // Directly modify DOM elements for immediate feedback
      updateDomElements();
      
      // Show success message
      toast({
        title: "Content Updated",
        description: "Your changes have been saved and applied to the page.",
      });
      
      // Close dialog
      onClose();
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error Saving",
        description: "Could not save your changes. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to directly update DOM elements
  const updateDomElements = () => {
    try {
      // Update hero heading
      if (formData.hero_heading) {
        const heroHeadingElements = document.querySelectorAll('.hero-heading');
        heroHeadingElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.innerText = formData.hero_heading || '';
          }
        });
      }
      
      // Update hero subheading
      if (formData.hero_subheading) {
        const heroSubheadingElements = document.querySelectorAll('.hero-subheading');
        heroSubheadingElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.innerText = formData.hero_subheading || '';
          }
        });
      }
      
      // Update CTA button text
      if (formData.hero_cta_text) {
        const ctaButtons = document.querySelectorAll('.hero-cta-button');
        ctaButtons.forEach(el => {
          if (el instanceof HTMLElement) {
            el.innerText = formData.hero_cta_text || '';
          }
        });
      }
      
      console.log("DOM elements updated with new content");
    } catch (error) {
      console.error("Error updating DOM:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Website Content</DialogTitle>
          <DialogDescription>
            Make changes to your website content below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="py-4">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[400px] pr-4">
              <TabsContent value="hero" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_heading" className="text-base font-semibold">
                    Main Heading
                  </Label>
                  <Input
                    id="hero_heading"
                    name="hero_heading"
                    value={formData.hero_heading || ""}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500">Current value on page: {formData.hero_heading}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hero_subheading" className="text-base font-semibold">
                    Subheading
                  </Label>
                  <Textarea
                    id="hero_subheading"
                    name="hero_subheading"
                    value={formData.hero_subheading || ""}
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
                    value={formData.hero_cta_text || ""}
                    onChange={handleChange}
                  />
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
          
          <DialogFooter className="pt-4 mt-4 border-t">
            <div className="mr-auto text-sm text-gray-500">
              Changes will be applied immediately.
            </div>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save & Apply Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}