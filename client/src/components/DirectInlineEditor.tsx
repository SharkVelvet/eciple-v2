import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DirectInlineEditor() {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [buttonText, setButtonText] = useState("");
  
  // Load content when component mounts
  useEffect(() => {
    try {
      // Set defaults
      setHeading("Discipleship Reimagined");
      setSubheading("Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.");
      setButtonText("Learn More");
      
      // Try to get content from localStorage
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed.hero_heading) setHeading(parsed.hero_heading);
        if (parsed.hero_subheading) setSubheading(parsed.hero_subheading);
        if (parsed.hero_cta_text) setButtonText(parsed.hero_cta_text);
      }
    } catch (error) {
      console.error("Error loading content:", error);
    }
  }, []);
  
  // Save content
  const saveContent = () => {
    try {
      // Save content
      const content = {
        hero_heading: heading,
        hero_subheading: subheading,
        hero_cta_text: buttonText,
        timestamp: Date.now()
      };
      
      // Clear any existing content
      localStorage.removeItem('siteContent');
      localStorage.removeItem('editableContent');
      
      // Save to localStorage
      localStorage.setItem('siteContent', JSON.stringify(content));
      console.log("Content saved successfully:", content);
      
      // Show success message
      toast({
        title: "Content Saved",
        description: "Your changes have been saved. Reload the page to see them."
      });
      
      // Exit edit mode
      setEditing(false);
      
      // Reload the page after a brief delay
      setTimeout(() => {
        window.location.href = window.location.pathname + "?t=" + Date.now();
      }, 1500);
      
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your changes.",
        variant: "destructive",
      });
    }
  };
  
  // Direct elements to update content immediately
  const updateElements = () => {
    try {
      // Find the hero heading and update it directly
      const headingElements = document.querySelectorAll('.hero-heading');
      headingElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.innerText = heading;
        }
      });
      
      // Find the hero subheading and update it directly
      const subheadingElements = document.querySelectorAll('.hero-subheading');
      subheadingElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.innerText = subheading;
        }
      });
      
      // Find the CTA button and update it directly
      const buttonElements = document.querySelectorAll('.hero-cta-button');
      buttonElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.innerText = buttonText;
        }
      });
    } catch (error) {
      console.error("Error updating DOM elements:", error);
    }
  };
  
  return (
    <div className="mt-4">
      {!editing ? (
        <Button 
          onClick={() => setEditing(true)}
          className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
        >
          <Edit className="h-4 w-4 mr-2" /> Edit Hero Content
        </Button>
      ) : (
        <div className="space-y-4 bg-white/10 p-4 rounded-md">
          <h3 className="font-semibold text-white mb-2">Edit Hero Content</h3>
          
          <div className="space-y-2">
            <label className="text-white text-sm">Heading</label>
            <Input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="bg-white/10 text-white border-white/20"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-white text-sm">Subheading</label>
            <Textarea
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              rows={3}
              className="bg-white/10 text-white border-white/20"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-white text-sm">Button Text</label>
            <Input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="bg-white/10 text-white border-white/20"
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setEditing(false)}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button
              onClick={() => {
                saveContent();
                updateElements(); // Update DOM directly
              }}
              className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
            >
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}