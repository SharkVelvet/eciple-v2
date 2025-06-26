import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { EcipleDocument } from "@shared/schema";

export default function EcipleMatch() {
  const [selectedDoc, setSelectedDoc] = useState<EcipleDocument | null>(null);

  const { data: documents, isLoading } = useQuery({
    queryKey: ["/api/eciple-documents"],
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-blue-600">EcipleMatch</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Intelligent Mentor-Mentee Matching
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced algorithm pairs mentors with mentees based on compatibility, 
            experience, and spiritual growth goals for meaningful discipleship relationships.
          </p>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Resources</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading documents...</p>
            </div>
          ) : documents && documents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc: EcipleDocument) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {doc.description}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setSelectedDoc(doc)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{selectedDoc?.title}</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-gray-600 mb-4">
                              {selectedDoc?.description}
                            </p>
                            <div className="space-y-2 text-sm text-gray-500">
                              {selectedDoc?.filename && (
                                <p>Filename: {selectedDoc.filename}</p>
                              )}
                              <p>Order: {selectedDoc?.displayOrder}</p>
                              <p>Status: {selectedDoc?.isActive ? 'Active' : 'Inactive'}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No documents available yet.</p>
            </div>
          )}
        </div>

        {/* Coming Soon Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Matching Algorithm Coming Soon
          </h2>
          <p className="text-gray-600 mb-6">
            Our intelligent matching system is currently in development. 
            It will analyze personality traits, spiritual experience, and growth goals 
            to create perfect mentor-mentee pairs.
          </p>
          <Button variant="outline" size="lg" disabled>
            Beta Access Available Soon
          </Button>
        </div>
      </div>
    </div>
  );
}