// API configuration for development and production
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://eciple-kin-05g9p.kinsta.app' 
  : '';

export const API_ENDPOINTS = {
  documents: `${API_BASE_URL}/api/eciple-documents`,
  adminDocuments: `${API_BASE_URL}/api/admin/eciple-documents`,
  adminLogin: `${API_BASE_URL}/api/admin/login`,
  adminVerify: `${API_BASE_URL}/api/admin/verify`,
  adminLogout: `${API_BASE_URL}/api/admin/logout`,
  uploadDocument: `${API_BASE_URL}/api/admin/upload-document`,
} as const;

// Helper function to get auth headers
export const getAuthHeaders = (includeContentType = true) => {
  const token = localStorage.getItem('adminToken');
  const headers: Record<string, string> = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};