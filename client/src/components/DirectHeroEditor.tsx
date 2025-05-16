import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * A simplified content editor that specifically targets the hero section
 * and forces a direct reload of the page to ensure changes are applied.
 */
export default function DirectHeroEditor() {
  const { toast } = useToast();
  const [showEditor, setShowEditor] = useState(false);
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  
  // Load current values when the editor is opened
  const handleOpenEditor = () => {
    // Load from localStorage
    try {
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setHeroHeading(parsed.hero_heading || "Discipleship Reimagined");
        setHeroSubheading(parsed.hero_subheading || "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.");
        setHeroCtaText(parsed.hero_cta_text || "Learn More");
      } else {
        // Defaults
        setHeroHeading("Discipleship Reimagined");
        setHeroSubheading("Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.");
        setHeroCtaText("Learn More");
      }
    } catch (error) {
      console.error("Error loading content:", error);
      // Defaults
      setHeroHeading("Discipleship Reimagined");
      setHeroSubheading("Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.");
      setHeroCtaText("Learn More");
    }
    
    // Show the editor
    setShowEditor(true);
  };
  
  // Handle saving changes
  const handleSaveChanges = () => {
    try {
      // Get existing content first
      const existingContent = {};
      try {
        const saved = localStorage.getItem('siteContent');
        if (saved) {
          Object.assign(existingContent, JSON.parse(saved));
        }
      } catch (e) {
        console.error("Error loading existing content:", e);
      }
      
      // Create the updated content
      const updatedContent = {
        ...existingContent,
        hero_heading: heroHeading,
        hero_subheading: heroSubheading,
        hero_cta_text: heroCtaText,
        _updated: Date.now() // Add timestamp to force recognition as new content
      };
      
      // Save to localStorage
      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      console.log("Saved content to localStorage:", updatedContent);
      
      // Show a success message
      toast({
        title: "Content Updated",
        description: "Your changes have been saved. The page will reload to show changes.",
      });
      
      // Close the editor
      setShowEditor(false);
      
      // Force a hard page reload to ensure changes take effect
      setTimeout(() => {
        window.location.href = window.location.href + '?updated=' + Date.now();
      }, 1000);
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Save Failed",
        description: "Could not save your changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button 
        onClick={handleOpenEditor}
        className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
      >
        <Edit className="h-4 w-4 mr-2" /> Edit Hero Content
      </Button>
      
      {/* Simple inline dialog for content editing */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Hero Section</DialogTitle>
            <DialogDescription>
              Update the main hero section content of your website.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_heading" className="font-medium">
                Main Heading
              </Label>
              <Input
                id="hero_heading"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Current headline: {heroHeading}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero_subheading" className="font-medium">
                Subheading
              </Label>
              <Textarea
                id="hero_subheading"
                value={heroSubheading}
                onChange={(e) => setHeroSubheading(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero_cta_text" className="font-medium">
                Button Text
              </Label>
              <Input
                id="hero_cta_text"
                value={heroCtaText}
                onChange={(e) => setHeroCtaText(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <div className="mr-auto text-sm text-gray-500">
              Page will reload after saving to show changes.
            </div>
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}