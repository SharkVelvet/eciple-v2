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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Document {
  id: number;
  title: string;
  filename: string;
  description: string | null;
  fileData: string | null;
  contentType: string | null;
  fileSize: number | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [pageTitle, setPageTitle] = useState("Investment Documents");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const queryClient = useQueryClient();

  // Get admin session token
  const getAuthHeaders = (includeContentType = true) => {
    const token = localStorage.getItem('adminSessionToken');
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`
    };
    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  };

  // Fetch documents from database
  const { data: documentsData, isLoading } = useQuery({
    queryKey: ['/api/admin/eciple-documents'],
    queryFn: async () => {
      const response = await fetch('/api/admin/eciple-documents', {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminSessionToken');
          setLocation('/admin-login');
          throw new Error('Session expired');
        }
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      return data.documents as Document[];
    },
  });

  // Update local state when data changes
  useEffect(() => {
    if (documentsData) {
      setDocuments(documentsData);
    }
  }, [documentsData]);

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
      setLocation('/admin-login');
      return;
    }
  }, [setLocation]);

  // Update document mutation
  const updateDocumentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Document> }) => {
      const response = await fetch(`/api/admin/eciple-documents/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update document');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/eciple-documents'] });
      toast({
        title: "Document updated",
        description: "Document has been saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update document",
        variant: "destructive",
      });
    },
  });

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: async (newDoc: { title: string; filename: string; description: string; displayOrder: number }) => {
      console.log('Creating document with token:', localStorage.getItem('adminSessionToken'));
      const response = await fetch('/api/admin/eciple-documents', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newDoc),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Document creation failed:', response.status, errorText);
        throw new Error(`Failed to create document: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/eciple-documents'] });
      toast({
        title: "Document created",
        description: "New document has been added successfully",
      });
    },
    onError: (error) => {
      console.error('Create document error:', error);
      toast({
        title: "Creation failed",
        description: `Failed to create document: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/eciple-documents/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to delete document');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/eciple-documents'] });
      toast({
        title: "Document deleted",
        description: "Document has been removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Deletion failed",
        description: "Failed to delete document",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminSessionToken');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    setLocation('/admin-login');
  };

  const addDocument = () => {
    console.log('Add Document button clicked');
    const token = localStorage.getItem('adminSessionToken');
    console.log('Current session token:', token);
    
    const newDoc = {
      title: "New Document",
      filename: "new-document.pdf",
      description: "Document description",
      displayOrder: documents.length
    };
    console.log('Creating document:', newDoc);
    createDocumentMutation.mutate(newDoc);
  };

  const deleteDocument = (id: number) => {
    deleteDocumentMutation.mutate(id);
  };

  const updateDocument = (id: number, field: keyof Document, value: string | boolean) => {
    // Update local state immediately for responsive UI
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id ? { 
          ...doc, 
          [field]: field === 'isActive' ? (value === 'true' || value === true) : value 
        } : doc
      )
    );

    // Save to database
    const updates = {
      [field]: field === 'isActive' ? (value === 'true' || value === true) : value
    };
    
    updateDocumentMutation.mutate({
      id,
      updates
    });
  };

  const handleFileUpload = async (docId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', documents.find(doc => doc.id === docId)?.title || file.name);
        formData.append('description', documents.find(doc => doc.id === docId)?.description || '');

        const response = await fetch('/api/admin/upload-document', {
          method: 'POST',
          headers: getAuthHeaders(false),
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');
        
        const data = await response.json();
        
        // Update the document with the new file data
        updateDocumentMutation.mutate({
          id: docId,
          updates: {
            filename: file.name,
            fileData: data.document.fileData,
            contentType: data.document.contentType,
            fileSize: data.document.fileSize
          }
        });

        // Update local state immediately to show the new filename
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === docId ? {
              ...doc,
              filename: file.name,
              fileData: data.document.fileData,
              contentType: data.document.contentType,
              fileSize: data.document.fileSize
            } : doc
          )
        );

        // Clear the file input to allow re-uploading
        event.target.value = '';

        // Refresh the documents list to show updated filename
        queryClient.invalidateQueries({ queryKey: ['/api/admin/eciple-documents'] });

        toast({
          title: "File uploaded",
          description: "File has been uploaded successfully",
        });
      } catch (error) {
        console.error('File upload error:', error);
        // Clear the file input even on error
        event.target.value = '';
        toast({
          title: "Upload failed",
          description: "Failed to upload file",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#223349]">Eciple Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage documents and page content</p>
          </div>
          <div className="flex gap-4">
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
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15BEE2] mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading documents...</p>
                </div>
              </div>
            ) : (
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

                  {/* Description and Active Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium">Description</Label>
                      <Textarea
                        value={doc.description || ''}
                        onChange={(e) => updateDocument(doc.id, 'description', e.target.value)}
                        placeholder="Document description"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Visibility</Label>
                      <div className="flex items-center space-x-2 h-20 bg-gray-50 rounded-md px-3">
                        <input
                          type="checkbox"
                          id={`active-${doc.id}`}
                          checked={doc.isActive}
                          onChange={(e) => updateDocument(doc.id, 'isActive', e.target.checked)}
                          className="h-4 w-4 text-[#15BEE2] focus:ring-[#15BEE2] border-gray-300 rounded"
                        />
                        <label htmlFor={`active-${doc.id}`} className="text-sm text-gray-700">
                          Show in EcipleMatch modal
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => {
                        // Manual save action - provides user feedback for explicit save
                        updateDocumentMutation.mutate({
                          id: doc.id,
                          updates: {
                            title: doc.title,
                            filename: doc.filename,
                            description: doc.description,
                            isActive: doc.isActive
                          }
                        });
                      }}
                      disabled={updateDocumentMutation.isPending}
                      className="bg-[#15BEE2] hover:bg-[#15BEE2]/90 text-white"
                    >
                      {updateDocumentMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
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
            )}
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