import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Save, Edit, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function QuickHeroEditor() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState("Discipleship Reimagined");
  const [subheading, setSubheading] = useState(
    "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships."
  );
  const [buttonText, setButtonText] = useState("Learn More");

  // Load content on mount
  useEffect(() => {
    try {
      const headingEl = document.querySelector('.hero-heading');
      const subheadingEl = document.querySelector('.hero-subheading');
      const buttonEl = document.querySelector('.hero-button-text');

      // Get current values from DOM
      if (headingEl) setHeading(headingEl.textContent || "Discipleship Reimagined");
      if (subheadingEl) setSubheading(subheadingEl.textContent || "Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.");
      if (buttonEl) setButtonText(buttonEl.textContent || "Learn More");
    } catch (error) {
      console.error("Error loading initial content:", error);
    }
  }, []);

  // Function to save changes directly to the DOM
  const saveChanges = () => {
    try {
      // Find elements directly
      const headingElements = document.querySelectorAll('h1');
      const subheadingElements = document.querySelectorAll('.hero-section p');
      const buttonElements = document.querySelectorAll('.hero-section button span');

      // Update heading
      headingElements.forEach(el => {
        if (el.textContent?.includes("Discipleship") || el.classList.contains('hero-heading')) {
          el.textContent = heading;
        }
      });

      // Update subheading
      subheadingElements.forEach(el => {
        if (el.textContent?.includes("Revolutionizing") || el.classList.contains('hero-subheading')) {
          el.textContent = subheading;
        }
      });

      // Update button text
      buttonElements.forEach(el => {
        if (el.textContent?.includes("Learn") || el.parentElement?.classList.contains('hero-cta-button')) {
          el.textContent = buttonText;
        }
      });

      // Also save to localStorage
      localStorage.setItem('heroContent', JSON.stringify({
        heading,
        subheading,
        buttonText,
        timestamp: Date.now()
      }));

      // Show success message
      toast({
        title: "Content Updated",
        description: "Your changes have been applied to the page.",
      });

      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the content.",
        variant: "destructive",
      });
    }
  };

  if (!isEditing) {
    return (
      <Button
        onClick={() => setIsEditing(true)}
        className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
      >
        <Edit className="h-4 w-4 mr-2" /> Quick Edit Hero
      </Button>
    );
  }

  return (
    <div className="space-y-4 bg-white/10 p-4 rounded-md">
      <h3 className="font-semibold text-white mb-2">Quick Edit Hero Content</h3>
      
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
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setIsEditing(false)}
          className="border-white/30 text-white hover:bg-white/10"
        >
          <X className="h-4 w-4 mr-2" /> Cancel
        </Button>
        <Button
          onClick={saveChanges}
          className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
        >
          <Save className="h-4 w-4 mr-2" /> Apply Changes
        </Button>
      </div>
    </div>
  );
}