import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileUp, FileDown, RefreshCw, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadDocx } from '@/lib/docGenerator';
import ContentUpdateForm from './ContentUpdateForm';

interface ContentDocumentUploaderProps {
  currentContent: Record<string, string>;
  onContentUpdate: (newContent: Record<string, string>) => void;
}

export default function ContentDocumentUploader({ 
  currentContent, 
  onContentUpdate 
}: ContentDocumentUploaderProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showContentForm, setShowContentForm] = useState(false);

  // Define all content sections directly
  const contentSections = [
    {
      title: "Hero Section",
      contentKeys: ["hero_heading", "hero_subheading", "hero_cta_text"],
      contentLabels: ["Main Heading", "Subheading Text", "Button Text"],
    },
    {
      title: "Problem Section",
      contentKeys: ["problem_text", "bottom_line_title", "bottom_line_text", "mentorship_text", "curriculum_text", "growth_text", "metrics_text"],
      contentLabels: ["Problem Statement", "Bottom Line Title", "Bottom Line Text", "Mentorship Point", "Curriculum Point", "Growth Point", "Metrics Point"],
    },
    {
      title: "Solution Section",
      contentKeys: ["solution_title", "solution_text", "solution_point1", "solution_point2", "solution_point3"],
      contentLabels: ["Solution Title", "Solution Description", "Solution Point 1", "Solution Point 2", "Solution Point 3"],
    },
    {
      title: "Product Section",
      contentKeys: ["product_title", "product_text", "connect_title", "connect_text", "track_title", "track_text", "grow_title", "grow_text"],
      contentLabels: ["Product Title", "Product Description", "Connect Feature Title", "Connect Feature Text", "Track Feature Title", "Track Feature Text", "Grow Feature Title", "Grow Feature Text"],
    },
    {
      title: "Competition Section",
      contentKeys: ["competition_title", "competition_text"],
      contentLabels: ["Competition Title", "Competition Description"],
    },
    {
      title: "Pricing Section",
      contentKeys: ["pricing_title", "pricing_text", "starter_title", "starter_price", "starter_features", "pro_title", "pro_price", "pro_features", "enterprise_title", "enterprise_price", "enterprise_features"],
      contentLabels: ["Pricing Title", "Pricing Description", "Starter Tier Title", "Starter Price", "Starter Features", "Pro Tier Title", "Pro Price", "Pro Features", "Enterprise Tier Title", "Enterprise Price", "Enterprise Features"],
    },
    {
      title: "Contact Section",
      contentKeys: ["contact_title", "contact_text", "email_text", "phone_text", "submit_text"],
      contentLabels: ["Contact Title", "Contact Description", "Email Label", "Phone Label", "Submit Button Text"],
    },
  ];

  const handleDownloadTemplate = async () => {
    try {
      await downloadDocx(currentContent, contentSections);
      toast({
        title: "Template Downloaded",
        description: "This is a Word document showing current website content in a formatted table.",
      });
    } catch (error) {
      console.error("Error downloading template:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the template document.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    // Instead of parsing the document (which is hard to do in the browser),
    // show a form that lets the user directly edit content
    setShowContentForm(true);
    
    toast({
      title: "Edit Content Directly",
      description: "Update website content using the form that appears below.",
    });
  };
  
  const handleContentUpdate = (updates: Record<string, string>) => {
    // Merge with existing content
    const newContent = {
      ...currentContent,
      ...updates
    };
    
    // Save to localStorage
    localStorage.setItem('siteContent', JSON.stringify(newContent));
    
    // Update state
    onContentUpdate(newContent);
    
    // Force page reload to ensure changes are visible
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleDownloadTemplate}
          className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
        >
          <FileDown className="h-4 w-4 mr-2" /> Download Content Reference
        </Button>
        
        <Button 
          onClick={() => setShowContentForm(true)}
          className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
        >
          <Edit className="h-4 w-4 mr-2" /> Edit Website Content
        </Button>
      </div>
      
      {/* Content Update Form Dialog */}
      <ContentUpdateForm 
        isOpen={showContentForm}
        onClose={() => setShowContentForm(false)}
        onSave={handleContentUpdate}
        currentContent={currentContent}
      />
    </div>
  );
}