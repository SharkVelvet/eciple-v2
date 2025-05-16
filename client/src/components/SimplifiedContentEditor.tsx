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

interface ContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: Record<string, string>) => void;
}

export default function SimplifiedContentEditor({
  isOpen,
  onClose,
  onSave,
}: ContentEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Load the current content when the form is opened
  useEffect(() => {
    if (isOpen) {
      try {
        // Try to get content from localStorage
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          const parsed = JSON.parse(savedContent);
          console.log("Loading content into editor from localStorage:", Object.keys(parsed).length, "items");
          setFormData(parsed);
        } else {
          console.log("No saved content found in localStorage");
          
          // Use default values
          setFormData({
            // Hero Section
            hero_heading: "Discipleship Reimagined",
            hero_subheading: "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.",
            hero_cta_text: "Learn More",
            
            // Other sections with defaults...
          });
        }
      } catch (error) {
        console.error("Error loading content:", error);
        // If error, use empty object (will show placeholders)
        setFormData({});
      }
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("Saving content with keys:", Object.keys(formData));
      
      // First, clear localStorage to ensure no old data persists
      localStorage.removeItem('siteContent');
      
      // Force a brief delay before setting new content
      setTimeout(() => {
        // Add a timestamp to force the content to be recognized as new
        const contentWithTimestamp = {
          ...formData,
          _lastUpdated: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('siteContent', JSON.stringify(contentWithTimestamp));
        
        // Also save to a backup location
        localStorage.setItem('siteContent_backup', JSON.stringify(contentWithTimestamp));
        
        console.log("Content saved to localStorage:", Object.keys(contentWithTimestamp).length, "items");
        
        // Call the onSave callback
        onSave(contentWithTimestamp);
        
        // Notify success
        toast({
          title: "Content Updated",
          description: "Your changes have been saved. The page will reload to show updates.",
        });
        
        // Close the dialog
        onClose();
        
        // Force hard reload to ensure all components re-render with new content
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 1000);
      }, 100);
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Save Failed",
        description: "An error occurred while saving content. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Website Content</DialogTitle>
          <DialogDescription>
            Update the content on your website. Changes will be saved when you click Save.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="py-4">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="problem">Problem Section</TabsTrigger>
              <TabsTrigger value="solution">Solution Section</TabsTrigger>
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
                    value={formData.hero_heading || "Discipleship Reimagined"}
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
                    value={formData.hero_subheading || "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships."}
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
                    value={formData.hero_cta_text || "Learn More"}
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
                    value={formData.problem_text || "Despite 82% of pastors saying discipleship is a priority, only 29% think their church does it effectively."}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mentorship_text" className="text-base font-semibold">
                    Mentorship Text
                  </Label>
                  <Input
                    id="mentorship_text"
                    name="mentorship_text"
                    value={formData.mentorship_text || "Mentorship"}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="growth_text" className="text-base font-semibold">
                    Growth Text
                  </Label>
                  <Input
                    id="growth_text"
                    name="growth_text"
                    value={formData.growth_text || "Growth"}
                    onChange={handleChange}
                  />
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
                    value={formData.solution_title || "The Discipleship Solution"}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product_title" className="text-base font-semibold">
                    Product Title
                  </Label>
                  <Input
                    id="product_title"
                    name="product_title"
                    value={formData.product_title || "The Eciple Platform"}
                    onChange={handleChange}
                  />
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
          
          <DialogFooter className="pt-4 mt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}