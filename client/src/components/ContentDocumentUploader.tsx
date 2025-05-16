import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileUp, FileDown, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadDocx, parseDocx } from '@/lib/docGenerator';

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
        description: "Edit this document and upload it to update your website content.",
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Simulate file processing progress
      setUploadProgress(30);
      setTimeout(() => setUploadProgress(50), 500);
      
      // Parse the docx file
      const parsedContent = await parseDocx(file);
      setUploadProgress(80);
      
      // Update the content if we have any changes
      if (parsedContent && Object.keys(parsedContent).length > 0) {
        onContentUpdate({
          ...currentContent,
          ...parsedContent
        });
        
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          toast({
            title: "Content Updated",
            description: "Your website content has been updated successfully.",
          });
        }, 500);
      } else {
        throw new Error("No content changes found in the document");
      }
    } catch (error) {
      console.error("Error processing document:", error);
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Upload Failed",
        description: "There was an error processing your document. Make sure you're using the correct template.",
        variant: "destructive",
      });
    }

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleDownloadTemplate}
          className="bg-[#15BEE2] text-white hover:bg-[#0368C1]"
        >
          <FileDown className="h-4 w-4 mr-2" /> Download CSV Template
        </Button>
        
        <Button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          variant="outline"
          className="border-[#15BEE2] text-[#15BEE2] hover:bg-[#15BEE2]/10"
        >
          {isUploading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Processing...
            </>
          ) : (
            <>
              <FileUp className="h-4 w-4 mr-2" /> Upload CSV File
            </>
          )}
        </Button>
        
        <input 
          type="file" 
          accept=".csv" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
      </div>
      
      {isUploading && (
        <div className="flex flex-col gap-1">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {uploadProgress < 100 
              ? "Processing document... Please wait" 
              : "Document processed successfully!"}
          </p>
        </div>
      )}
    </div>
  );
}