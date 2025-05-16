import { useEffect, useState, useRef, createContext } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Product from "@/components/Product";
import Competition from "@/components/Competition";
import Market from "@/components/Market";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContentDocumentUploader from "@/components/ContentDocumentUploader";
import { Button } from "@/components/ui/button";
import { ArrowUp, LogOut, Edit, Save, X, FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Create context to share admin state with all components
export const AdminContext = createContext({
  isAdmin: false,
  editMode: false, 
  toggleEditMode: () => {},
  saveContent: () => {},
  editableContent: {} as Record<string, string>,
  updateContent: (key: string, value: string) => {},
});


export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [showTemplateTools, setShowTemplateTools] = useState(false);
  const [editableContent, setEditableContent] = useState<Record<string, string>>({});
  const contentSnapshot = useRef<Record<string, string>>({});
  
  // Check if we should show the admin dialog based on URL hash
  useEffect(() => {
    const hashChangeHandler = () => {
      if (window.location.hash === '#admin') {
        setShowAdminDialog(true);
        window.location.hash = ''; // Clear the hash
      }
    };
    
    // Check on initial load
    hashChangeHandler();
    
    // Add listener for future changes
    window.addEventListener('hashchange', hashChangeHandler);
    return () => window.removeEventListener('hashchange', hashChangeHandler);
  }, []);
  
  // Function to handle admin login
  const handleAdminLogin = () => {
    if (adminPassword === "bobby") {
      setIsAdmin(true);
      setShowAdminDialog(false);
      setAdminPassword(""); // Clear password
      toast({
        title: "Admin Access Granted",
        description: "You can now edit content by clicking the edit button.",
      });
    } else {
      toast({
        title: "Invalid Password",
        description: "Please try again with the correct password.",
        variant: "destructive",
      });
    }
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (!editMode) {
      // Enter edit mode - save current content
      contentSnapshot.current = { ...editableContent };
    } else {
      // Exit edit mode without saving - restore content
      setEditableContent({ ...contentSnapshot.current });
    }
    setEditMode(!editMode);
  };
  
  // Save content changes
  const saveContent = () => {
    // In a real app, you would save this to a database
    localStorage.setItem('siteContent', JSON.stringify(editableContent));
    setEditMode(false);
    toast({
      title: "Content Saved",
      description: "Your changes have been saved successfully.",
    });
  };
  
  // Update specific content
  const updateContent = (key: string, value: string) => {
    setEditableContent(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Load saved content and check admin status on initial load
  useEffect(() => {
    // Load saved content
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        setEditableContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
    
    // Check for admin status
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  
  // Check if user is authenticated for main site
  useEffect(() => {
    const isMainSiteAuthenticated = localStorage.getItem("mainSiteAuthenticated");
    if (isMainSiteAuthenticated !== "true") {
      setLocation("/");
    }
  }, [setLocation]);
  
  // Handle main site logout
  const handleMainSiteLogout = () => {
    localStorage.removeItem("mainSiteAuthenticated");
    // No toast notification
    setLocation("/");
  };
  useEffect(() => {
    // Set up smooth scrolling behavior with animated transition
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId as string);
        if (targetElement) {
          // Calculate the distance to scroll
          const offsetTop = (targetElement as HTMLElement).offsetTop;
          const headerOffset = 80;
          const elementPosition = offsetTop - headerOffset;
          const startPosition = window.pageYOffset;
          const distance = elementPosition - startPosition;
          
          // Animate scroll with easing
          const duration = 800; // ms
          let start: number | null = null;
          
          // Easing function for smoother animation
          const easeInOutQuad = (t: number): number => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          };
          
          const animateScroll = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const timePercent = Math.min(progress / duration, 1);
            const easePercent = easeInOutQuad(timePercent);
            
            window.scrollTo({
              top: startPosition + distance * easePercent,
            });
            
            if (progress < duration) {
              window.requestAnimationFrame(animateScroll);
            }
          };
          
          window.requestAnimationFrame(animateScroll);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Add scroll to top button with animation
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Admin dialog for password entry
  const adminDialogContent = (
    <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
          <DialogDescription>
            Enter your password to access admin features.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdminLogin();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAdminDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdminLogin}>
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Admin control bar (shown when admin is logged in)
  const adminControls = isAdmin && (
    <div 
      className={`fixed left-0 right-0 bottom-0 z-50 bg-[#223349] text-white p-2 flex flex-col ${
        editMode || showTemplateTools ? 'border-t-2 border-[#15BEE2]' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          {editMode 
            ? 'Editing Mode: Click on text to edit' 
            : showTemplateTools 
              ? 'Template Tools: Download or upload a Word document to manage content' 
              : 'Admin Mode'
          }
        </div>
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={toggleEditMode}
                className="bg-transparent text-white border-white hover:bg-white/20"
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button 
                size="sm"
                onClick={saveContent}
                className="bg-[#15BEE2] text-white hover:bg-[#15BEE2]/80"
              >
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="sm" 
                onClick={toggleEditMode}
                className="bg-[#15BEE2] text-white hover:bg-[#15BEE2]/80"
              >
                <Edit className="h-4 w-4 mr-1" /> Edit Content
              </Button>
              
              {/* Word Document Template Toggle */}
              <Button
                size="sm"
                onClick={() => setShowTemplateTools(!showTemplateTools)}
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/20"
              >
                <FileDown className="h-4 w-4 mr-1" /> 
                {showTemplateTools ? "Hide Template Tools" : "Show Template Tools"}
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Template tools panel */}
      {showTemplateTools && !editMode && (
        <div className="mt-3 pb-1 border-t border-white/20 pt-3">
          <ContentDocumentUploader 
            currentContent={editableContent} 
            onContentUpdate={(newContent) => {
              setEditableContent(newContent);
              // Save to localStorage
              localStorage.setItem('siteContent', JSON.stringify(newContent));
              toast({
                title: "Content Updated",
                description: "Your website content has been updated from the document.",
              });
            }} 
          />
        </div>
      )}
    </div>
  );

  return (
    <AdminContext.Provider value={{
      isAdmin,
      editMode,
      toggleEditMode,
      saveContent,
      editableContent,
      updateContent,
    }}>
      <div className="flex flex-col min-h-screen">
        {adminDialogContent}
        <Header />
        <main className="flex-grow">
          <Hero />
          <Problem />
          <Solution />
          <Product />
          <Competition />
          {/* Market section moved to investor dashboard */}
          <Pricing />
          <Contact />
        </main>
        <Footer />
        
        {/* Admin controls */}
        {adminControls}
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed right-4 md:right-8 bottom-8 z-40 text-[#15BEE2] p-2 hover:text-[#0368C1] transition-all duration-300"
            aria-label="Scroll to top"
            style={{ bottom: isAdmin ? (showTemplateTools ? '95px' : '60px') : '2rem' }}
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </AdminContext.Provider>
  );
}


