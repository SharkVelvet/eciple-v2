import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import SimplifiedContentEditor from './SimplifiedContentEditor';

interface ContentDocumentUploaderProps {
  currentContent: Record<string, string>;
  onContentUpdate: (newContent: Record<string, string>) => void;
}

export default function ContentDocumentUploader({ 
  currentContent, 
  onContentUpdate 
}: ContentDocumentUploaderProps) {
  const [showContentForm, setShowContentForm] = useState(false);

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
      
      {/* Simplified Content Editor */}
      <SimplifiedContentEditor 
        isOpen={showContentForm}
        onClose={() => setShowContentForm(false)}
        onSave={onContentUpdate}
      />
    </div>
  );
}