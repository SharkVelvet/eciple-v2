import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

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
  const [formData, setFormData] = useState({
    hero_heading: currentContent.hero_heading || "Discipleship Reimagined",
    hero_subheading: currentContent.hero_subheading || 
      "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.",
    hero_cta_text: currentContent.hero_cta_text || "Learn More",
    problem_text: currentContent.problem_text || 
      "Despite 82% of pastors saying discipleship is a priority, only 29% think their church does it effectively.",
    solution_title: currentContent.solution_title || "Transforming Church Communities",
    product_title: currentContent.product_title || "Our Product",
  });

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
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Website Content</DialogTitle>
          <DialogDescription>
            Edit the content below to update your website. Fields left unchanged will keep their current values.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="hero_heading" className="text-base font-semibold">
              Hero Heading
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
              Hero Subheading
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
              Hero Button Text
            </Label>
            <Input
              id="hero_cta_text"
              name="hero_cta_text"
              value={formData.hero_cta_text}
              onChange={handleChange}
            />
          </div>
          
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
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}