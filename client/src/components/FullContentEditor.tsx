import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Save, X, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contentDefaults, getContentSections } from '@/lib/contentDefaults';

export default function FullContentEditor() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [content, setContent] = useState<Record<string, string>>({});
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Get content sections
  const contentSections = getContentSections();
  
  // Load content from localStorage on mount
  useEffect(() => {
    if (initialLoad) {
      try {
        // First, populate with defaults
        const defaultContent: Record<string, string> = {};
        contentDefaults.forEach(field => {
          defaultContent[field.key] = field.defaultValue;
        });
        
        // Then check localStorage for saved content
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          const parsed = JSON.parse(savedContent);
          // Merge with defaults
          setContent({ ...defaultContent, ...parsed });
        } else {
          setContent(defaultContent);
        }
        
        setInitialLoad(false);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    }
  }, [initialLoad]);
  
  // Function to handle input changes
  const handleInputChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };
  
  // Save changes and update the DOM directly
  const saveChanges = () => {
    try {
      // Save to localStorage
      localStorage.setItem('siteContent', JSON.stringify({ 
        ...content,
        timestamp: Date.now()
      }));
      
      // Update DOM directly for immediate feedback
      updateDOM();
      
      // Show success message
      toast({
        title: "Content Saved",
        description: "Your changes have been applied to the page.",
      });
      
      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your content.",
        variant: "destructive",
      });
    }
  };
  
  // Function to update DOM elements directly
  const updateDOM = () => {
    try {
      // Update Hero section
      if (content.hero_heading) {
        document.querySelectorAll('.hero-heading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.hero_heading;
        });
      }
      
      if (content.hero_subheading) {
        document.querySelectorAll('.hero-subheading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.hero_subheading;
        });
      }
      
      if (content.hero_cta_text) {
        document.querySelectorAll('.hero-button-text').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.hero_cta_text;
        });
      }
      
      // Update Problem section
      if (content.problem_heading) {
        document.querySelectorAll('.problem-heading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.problem_heading;
        });
      }
      
      if (content.problem_subheading) {
        document.querySelectorAll('.problem-subheading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.problem_subheading;
        });
      }
      
      // Update Solution section
      if (content.solution_heading) {
        document.querySelectorAll('.solution-heading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.solution_heading;
        });
      }
      
      if (content.solution_subheading) {
        document.querySelectorAll('.solution-subheading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.solution_subheading;
        });
      }
      
      // Update Product section
      if (content.product_heading) {
        document.querySelectorAll('.product-heading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.product_heading;
        });
      }
      
      if (content.product_subheading) {
        document.querySelectorAll('.product-subheading').forEach(el => {
          if (el instanceof HTMLElement) el.innerText = content.product_subheading;
        });
      }
      
      // We would continue for all the other sections...
      // The pattern is the same - find elements with specific classes and update their text
      
    } catch (error) {
      console.error("Error updating DOM:", error);
    }
  };
  
  // For refreshing the page to get the latest content
  const refreshPage = () => {
    window.location.reload();
  };
  
  if (!isEditing) {
    return (
      <Button
        onClick={() => setIsEditing(true)}
        className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
      >
        <Edit className="h-4 w-4 mr-2" /> Edit Website Content
      </Button>
    );
  }
  
  return (
    <div className="space-y-4 bg-[#1A2640]/80 p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white mb-0">Website Content Editor</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshPage}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh Content
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-[#223349] mb-4 flex flex-wrap h-auto py-1 gap-1">
          {Object.keys(contentSections).map(section => (
            <TabsTrigger 
              key={section}
              value={section}
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-[#15BEE2]"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.entries(contentSections).map(([section, fields]) => (
          <TabsContent key={section} value={section} className="bg-[#223349]/30 p-4 rounded-md">
            <div className="space-y-4">
              {fields.map(field => (
                <div key={field.key} className="space-y-2">
                  <label className="text-white text-sm font-medium">{field.label}</label>
                  {field.key.includes('subheading') || field.key.includes('description') ? (
                    <Textarea
                      value={content[field.key] || field.defaultValue}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      rows={3}
                      className="bg-white/10 text-white border-white/20"
                    />
                  ) : (
                    <Input
                      value={content[field.key] || field.defaultValue}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="bg-white/10 text-white border-white/20"
                    />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex gap-2 justify-end">
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