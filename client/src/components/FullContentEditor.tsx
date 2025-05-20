import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Save, X, RefreshCw, Minimize, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contentDefaults, getContentSections } from '@/lib/contentDefaults';

export default function FullContentEditor() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [content, setContent] = useState<Record<string, string>>({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState<'left'|'right'>('right');
  const editorRef = useRef<HTMLDivElement>(null);
  
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
  
  // Toggle minimized state
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };
  
  // Toggle editor position (left/right)
  const togglePosition = () => {
    setPosition(position === 'right' ? 'left' : 'right');
  };
  
  // Apply changes to preview without saving or closing
  const previewChanges = () => {
    updateDOM();
    toast({
      title: "Changes Applied",
      description: "Content changes have been previewed on the page.",
    });
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
    <div 
      ref={editorRef}
      className={`fixed z-50 transition-all duration-300 ${position === 'right' ? 'right-0' : 'left-0'} top-0 h-screen ${
        minimized 
          ? position === 'right' ? 'translate-x-[calc(100%-40px)]' : 'translate-x-[calc(-100%+40px)]' 
          : 'translate-x-0'
      }`}
    >
      {/* Minimized mode indicator */}
      {minimized && (
        <div 
          className={`absolute top-1/2 ${position === 'right' ? 'left-0' : 'right-0'} -translate-y-1/2 bg-[#15BEE2] text-white p-2 ${position === 'right' ? 'rounded-l-md' : 'rounded-r-md'} cursor-pointer shadow-lg`}
          onClick={toggleMinimized}
        >
          {position === 'right' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
      )}
      
      <div className={`h-full w-[400px] max-w-[95vw] bg-[#223349]/95 shadow-xl backdrop-blur-sm overflow-y-auto flex flex-col ${position === 'right' ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
        <div className="flex items-center justify-between sticky top-0 z-10 bg-[#223349] p-3 border-b border-white/10">
          <h3 className="font-semibold text-white text-lg">Website Content Editor</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={previewChanges}
              className="h-8 text-white/70 hover:text-white hover:bg-white/10"
              title="Preview changes"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Preview
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePosition}
              className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
              title={`Move to ${position === 'right' ? 'left' : 'right'} side`}
            >
              {position === 'right' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimized}
              className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
              title="Minimize editor"
            >
              <Minimize className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
      </div>
    </div>
  );
}