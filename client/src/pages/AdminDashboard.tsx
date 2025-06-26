import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Plus, Edit, Trash2, LogOut, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { EcipleDocument } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [editingDoc, setEditingDoc] = useState<EcipleDocument | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  const { data: documents, isLoading } = useQuery({
    queryKey: ["/api/admin/eciple-documents"],
    meta: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/admin/eciple-documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create document");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/eciple-documents"] });
      toast({ title: "Success", description: "Document created successfully" });
      setIsDialogOpen(false);
      setEditingDoc(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const response = await fetch(`/api/admin/eciple-documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update document");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/eciple-documents"] });
      toast({ title: "Success", description: "Document updated successfully" });
      setIsDialogOpen(false);
      setEditingDoc(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/eciple-documents/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete document");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/eciple-documents"] });
      toast({ title: "Success", description: "Document deleted successfully" });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLocation("/admin-login");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      filename: formData.get("filename") as string,
      displayOrder: parseInt(formData.get("displayOrder") as string) || 1,
      isActive: formData.get("isActive") === "on",
    };

    if (editingDoc) {
      updateMutation.mutate({ id: editingDoc.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">EcipleMatch Documents</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingDoc(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingDoc ? "Edit Document" : "Add New Document"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingDoc?.title || ""}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingDoc?.description || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="filename">Filename</Label>
                  <Input
                    id="filename"
                    name="filename"
                    defaultValue={editingDoc?.filename || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    name="displayOrder"
                    type="number"
                    defaultValue={editingDoc?.displayOrder || 1}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked={editingDoc?.isActive !== false}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingDoc ? "Update" : "Create"} Document
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : documents && Array.isArray(documents) && documents.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc: EcipleDocument) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {doc.title}
                          </div>
                          {doc.filename && (
                            <div className="text-sm text-gray-500">{doc.filename}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{doc.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          doc.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doc.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingDoc(doc);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMutation.mutate(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
}