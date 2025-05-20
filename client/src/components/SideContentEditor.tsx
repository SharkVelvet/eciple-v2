import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Save, X, RefreshCw, Minimize, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contentDefaults, getContentSections } from '@/lib/contentDefaults';

export default function SideContentEditor() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [content, setContent] = useState<Record<string, string>>({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState<'left'|'right'>('right');
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Get content sections
  const contentSections = getContentSections();
  
  // Load content from localStorage on mount or when editor is opened
  useEffect(() => {
    if (initialLoad || isOpen) {
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
          console.log("Loading current content from localStorage:", Object.keys(parsed).length, "items");
          // Merge with defaults
          setContent({ ...defaultContent, ...parsed });
        } else {
          // If no saved content, try to extract content from the DOM
          const extractedContent = extractContentFromDOM();
          setContent({ ...defaultContent, ...extractedContent });
        }
        
        setInitialLoad(false);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    }
  }, [initialLoad, isOpen]);
  
  // Extract content from the DOM elements
  const extractContentFromDOM = (): Record<string, string> => {
    const extracted: Record<string, string> = {};
    
    try {
      // Get all content sections from our contentDefaults
      contentDefaults.forEach(field => {
        // Convert field.key (e.g., hero_heading) to CSS class (e.g., hero-heading)
        const className = `.${field.key.replace(/_/g, '-')}`;
        const element = document.querySelector(className);
        
        if (element instanceof HTMLElement && element.innerText.trim()) {
          extracted[field.key] = element.innerText.trim();
        }
      });
      
      // Some special cases that might not follow the pattern
      // Hero section
      if (!extracted.hero_heading) {
        const heroHeading = document.querySelector('h1.text-4xl');
        if (heroHeading instanceof HTMLElement) {
          extracted.hero_heading = heroHeading.innerText.trim();
        }
      }
      
      if (!extracted.hero_subheading) {
        const heroSubheading = document.querySelector('.hero-section p.text-xl, .hero-section p.text-2xl');
        if (heroSubheading instanceof HTMLElement) {
          extracted.hero_subheading = heroSubheading.innerText.trim();
        }
      }
      
      // Solution section
      if (!extracted.solution_heading) {
        const solutionHeading = document.querySelector('#solution h2');
        if (solutionHeading instanceof HTMLElement) {
          extracted.solution_heading = solutionHeading.innerText.trim();
        }
      }
      
      if (!extracted.solution_subheading) {
        const solutionSubheading = document.querySelector('#solution p.text-lg');
        if (solutionSubheading instanceof HTMLElement) {
          extracted.solution_subheading = solutionSubheading.innerText.trim();
        }
      }
      
      // Product section
      if (!extracted.product_heading) {
        const productHeading = document.querySelector('#product h2');
        if (productHeading instanceof HTMLElement) {
          extracted.product_heading = productHeading.innerText.trim();
        }
      }
      
      if (!extracted.product_subheading) {
        const productSubheading = document.querySelector('#product p.text-lg');
        if (productSubheading instanceof HTMLElement) {
          extracted.product_subheading = productSubheading.innerText.trim();
        }
      }
      
      // Competition section
      if (!extracted.competition_heading) {
        const competitionHeading = document.querySelector('#competition h2');
        if (competitionHeading instanceof HTMLElement) {
          extracted.competition_heading = competitionHeading.innerText.trim();
        }
      }
      
      if (!extracted.competition_subheading) {
        const competitionSubheading = document.querySelector('#competition p.text-lg');
        if (competitionSubheading instanceof HTMLElement) {
          extracted.competition_subheading = competitionSubheading.innerText.trim();
        }
      }
      
      // Pricing section
      if (!extracted.pricing_heading) {
        const pricingHeading = document.querySelector('#pricing h2');
        if (pricingHeading instanceof HTMLElement) {
          extracted.pricing_heading = pricingHeading.innerText.trim();
        }
      }
      
      if (!extracted.pricing_subheading) {
        const pricingSubheading = document.querySelector('#pricing p.text-lg');
        if (pricingSubheading instanceof HTMLElement) {
          extracted.pricing_subheading = pricingSubheading.innerText.trim();
        }
      }
      
      console.log("Extracted content from DOM:", Object.keys(extracted).length, "items");
    } catch (error) {
      console.error("Error extracting content from DOM:", error);
    }
    
    return extracted;
  };
  
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
      
      // Close the editor
      setIsOpen(false);
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
      // Update elements for each content key
      Object.entries(content).forEach(([key, value]) => {
        const elements = document.querySelectorAll(`.${key.replace(/_/g, '-')}`);
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.innerText = value;
          }
        });
      });
      
      // Also update specific elements by class
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
      
    } catch (error) {
      console.error("Error updating DOM:", error);
    }
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
      title: "Preview Applied",
      description: "Content changes have been previewed on the page.",
    });
  };
  
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
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
      
      <div className={`h-full w-[400px] max-w-[95vw] bg-[#223349]/95 shadow-xl backdrop-blur-sm flex flex-col ${position === 'right' ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
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
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
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
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-white/10 bg-[#223349]">
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
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