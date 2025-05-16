import { useState } from 'react';
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

interface ContentDocumentUploaderProps {
  currentContent: Record<string, string>;
  onContentUpdate: (newContent: Record<string, string>) => void;
}

export default function ContentDocumentUploader({ 
  currentContent, 
  onContentUpdate 
}: ContentDocumentUploaderProps) {
  const { toast } = useToast();
  const [showEditor, setShowEditor] = useState(false);
  
  // Create a simple editor form directly in this component
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  
  // Load current values when the editor is opened
  const handleOpenEditor = () => {
    // Get the current values (either from props or defaults)
    setHeroHeading(currentContent.hero_heading || "Discipleship Reimagined");
    setHeroSubheading(currentContent.hero_subheading || "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.");
    setHeroCtaText(currentContent.hero_cta_text || "Learn More");
    
    // Show the editor
    setShowEditor(true);
  };
  
  // Handle saving changes
  const handleSaveChanges = () => {
    // Create a new content object with changes
    const newContent = {
      ...currentContent,
      hero_heading: heroHeading,
      hero_subheading: heroSubheading,
      hero_cta_text: heroCtaText,
      _updated: new Date().toISOString()
    };
    
    // Update localStorage (direct approach)
    localStorage.setItem('siteContent', JSON.stringify(newContent));
    
    // Call the parent component's update function
    onContentUpdate(newContent);
    
    // Show a success message
    toast({
      title: "Content Updated",
      description: "Your changes have been saved. The page will reload to reflect changes.",
    });
    
    // Close the editor
    setShowEditor(false);
    
    // Force a page reload to ensure changes take effect
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleOpenEditor}
          className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
        >
          <Edit className="h-4 w-4 mr-2" /> Edit Website Content
        </Button>
      </div>
      
      {/* Simple inline dialog for content editing */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Website Content</DialogTitle>
            <DialogDescription>
              Make changes to your website content below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_heading" className="font-medium">
                Hero Heading
              </Label>
              <Input
                id="hero_heading"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero_subheading" className="font-medium">
                Hero Subheading
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
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}