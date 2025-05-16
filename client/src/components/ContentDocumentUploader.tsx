import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const [showContentForm, setShowContentForm] = useState(false);
  
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