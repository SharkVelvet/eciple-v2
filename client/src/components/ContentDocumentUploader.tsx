import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileUp, FileDown, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadDocx, parseDocx } from '@/lib/docGenerator';
import { contentDefaults, getContentSections } from '@/lib/contentDefaults';

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

  const handleDownloadTemplate = async () => {
    try {
      // Create a format that the docGenerator can use from our content defaults
      const sections = Object.entries(getContentSections()).map(([sectionName, fields]) => ({
        title: sectionName,
        contentKeys: fields.map(field => field.key),
        contentLabels: fields.map(field => field.label)
      }));
      
      await downloadDocx(currentContent, sections);
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