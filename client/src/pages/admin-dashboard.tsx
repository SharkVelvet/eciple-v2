import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Save, LogOut, Edit3, FileText, Upload } from "lucide-react";
import { useLocation } from "wouter";

interface Document {
  id: string;
  title: string;
  subtitle?: string;
  filename: string;
  linkUrl?: string;
  description: string;
  displayOrder?: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [pageTitle, setPageTitle] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
      setLocation('/admin-login');
      return;
    }

    // Load existing data from localStorage
    const savedDocuments = localStorage.getItem('eciplematch-documents');
    const savedTitle = localStorage.getItem('eciplematch-title');
    
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    } else {
      // Initialize with default documents
      const defaultDocs = [
        {
          id: "1",
          title: "Executive Summary",
          filename: "eciple-executive-summary.pdf",
          description: "Comprehensive overview of eciple's mission and market opportunity"
        },
        {
          id: "2",
          title: "Pitch Deck",
          filename: "eciple-pitch-deck.pdf", 
          description: "Detailed presentation of our discipleship platform solution"
        },
        {
          id: "3",
          title: "Financial Projections",
          filename: "eciple-financial-projections.pdf",
          description: "Revenue forecasts and investment return analysis"
        },
        {
          id: "4",
          title: "Market Analysis",
          filename: "eciple-market-analysis.pdf",
          description: "In-depth analysis of the discipleship technology market"
        },
        {
          id: "5",
          title: "Product Demo Guide",
          filename: "eciple-product-demo.pdf",
          description: "Step-by-step guide to eciple platform features"
        },
        {
          id: "6",
          title: "Technical Specifications",
          filename: "eciple-technical-specs.pdf",
          description: "Platform architecture and technology overview"
        }
      ];
      setDocuments(defaultDocs);
    }

    if (savedTitle) {
      setPageTitle(savedTitle);
    } else {
      setPageTitle("Investment Documents");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    setLocation('/admin-login');
  };

  const saveChanges = () => {
    localStorage.setItem('eciplematch-documents', JSON.stringify(documents));
    localStorage.setItem('eciplematch-title', pageTitle);
    toast({
      title: "Changes saved",
      description: "All changes have been saved successfully",
    });
  };

  const addDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title: "New Document",
      subtitle: "",
      filename: "new-document.pdf",
      linkUrl: "",
      description: "Document description",
      displayOrder: documents.length
    };
    setDocuments([...documents, newDoc]);
    setIsEditing(newDoc.id);
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "Document has been removed from the list",
    });
  };

  const updateDocument = (id: string, field: keyof Document, value: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const handleFileUpload = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to a server
      // For now, we'll just update the filename
      updateDocument(docId, 'filename', file.name);
      toast({
        title: "File selected",
        description: `Selected file: ${file.name}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#223349]">EcipleMatch Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage documents and page content</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={saveChanges}
              className="bg-[#15BEE2] hover:bg-[#15BEE2]/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#223349] text-[#223349] hover:bg-[#223349] hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Page Title Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#223349] flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Page Title
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="pageTitle" className="text-sm font-medium">
                Modal Title (shown when users click "Download Investor Documents")
              </Label>
              <Input
                id="pageTitle"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="Enter modal title"
                className="max-w-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#223349] flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Manage Documents
              </CardTitle>
              <Button
                onClick={addDocument}
                className="bg-[#15BEE2] hover:bg-[#15BEE2]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-6 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      {/* First Row: Title and Filename */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Document Title</Label>
                          <Input
                            value={doc.title}
                            onChange={(e) => updateDocument(doc.id, 'title', e.target.value)}
                            placeholder="Document title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">File Name</Label>
                          <div className="flex gap-2">
                            <Input
                              value={doc.filename}
                              onChange={(e) => updateDocument(doc.id, 'filename', e.target.value)}
                              placeholder="filename.pdf"
                              className="flex-1"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileUpload(doc.id, e)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="whitespace-nowrap"
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Second Row: Subtitle and Link */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Subtitle (Optional)</Label>
                          <Input
                            value={doc.subtitle || ''}
                            onChange={(e) => updateDocument(doc.id, 'subtitle', e.target.value)}
                            placeholder="Brief description or tagline"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Link URL (Optional)</Label>
                          <Input
                            value={doc.linkUrl || ''}
                            onChange={(e) => updateDocument(doc.id, 'linkUrl', e.target.value)}
                            placeholder="https://example.com"
                            type="url"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                      onClick={() => deleteDocument(doc.id)}
                      variant="outline"
                      size="sm"
                      className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description</Label>
                    <Textarea
                      value={doc.description}
                      onChange={(e) => updateDocument(doc.id, 'description', e.target.value)}
                      placeholder="Document description"
                      rows={2}
                    />
                  </div>
                </motion.div>
              ))}

              {documents.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No documents yet. Click "Add Document" to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#15BEE2] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-[#223349]">Instructions</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Changes are saved locally and will persist across sessions</li>
                  <li>• Upload files to replace document downloads (files should be placed in /documents/ folder)</li>
                  <li>• The page title appears at the top of the document modal</li>
                  <li>• Document order can be changed by deleting and re-adding documents</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}