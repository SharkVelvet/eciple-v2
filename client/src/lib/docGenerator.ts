// Instead of using docx for Word documents, we'll create a simple text-based CSV format
// that's much more robust and can be easily edited in Excel or any text editor

export interface ContentSection {
  title: string;
  contentKeys: string[];
  contentLabels: string[];
}

export const generateContentTemplate = async (
  content: Record<string, string>,
  sections: ContentSection[]
): Promise<Blob> => {
  let csvContent = "CONTENT KEY,CONTENT LABEL,CURRENT VALUE,NEW VALUE\n";
  
  // Add instructions as commented lines
  csvContent += "# ECIPLE WEBSITE CONTENT EDITOR\n";
  csvContent += "# Instructions:\n";
  csvContent += "# 1. This CSV file contains all the editable content on the website\n";
  csvContent += "# 2. DO NOT modify values in the first two columns (CONTENT KEY and CONTENT LABEL)\n";
  csvContent += "# 3. The CURRENT VALUE column shows what's currently on the site\n";
  csvContent += "# 4. Edit values in the NEW VALUE column only to update content\n";
  csvContent += "# 5. Save this file when you're done editing\n";
  csvContent += "# 6. Upload the saved CSV file back to the admin panel\n";
  csvContent += "#\n";
  csvContent += "# TIP: Open this file in Excel, Google Sheets, or any spreadsheet program for best results\n";
  csvContent += "\n";
  
  // Add separator for cleaner visual organization
  csvContent += "# ====================================================================\n\n";
  
  // Process each section
  sections.forEach(section => {
    // Add section header as a comment
    csvContent += `# ${section.title.toUpperCase()}\n`;
    
    // Add each content field
    section.contentKeys.forEach((key, index) => {
      const label = section.contentLabels[index];
      const value = content[key] || "";
      
      // Format: key,label,current value,new value
      csvContent += `${key},${escapeCSV(label)},${escapeCSV(value)},${escapeCSV(value)}\n`;
    });
    
    // Add a blank line between sections
    csvContent += "\n";
  });
  
  // Convert to blob
  return new Blob([csvContent], { type: 'text/csv' });
};

// Helper function to escape CSV values
function escapeCSV(value: string): string {
  // If the value contains a comma, quote, or newline, wrap it in quotes and escape internal quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export const downloadDocx = async (
  content: Record<string, string>,
  sections: ContentSection[]
): Promise<void> => {
  const blob = await generateContentTemplate(content, sections);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "eciple_content_template.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Parse CSV file content and extract updates
export const parseDocx = async (file: File): Promise<Record<string, string>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const updatedContent: Record<string, string> = {};
        
        if (!content) {
          throw new Error("Could not read file content");
        }
        
        // Split into lines and process each line
        const lines = content.split('\n');
        
        // Skip header and comments
        for (const line of lines) {
          // Skip empty lines, comments, and the header row
          if (!line.trim() || line.trim().startsWith('#') || line.trim().startsWith('CONTENT KEY')) {
            continue;
          }
          
          // Parse the CSV line
          const columns = parseCSVLine(line);
          
          if (columns.length >= 4) {
            const [key, , , newValue] = columns;
            
            // Only include if the key is valid and there's a new value
            if (key && newValue && newValue.trim()) {
              updatedContent[key] = newValue;
            }
          }
        }
        
        resolve(updatedContent);
      } catch (error) {
        console.error("Error parsing CSV file:", error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read the file"));
    };
    
    // Read the file as text
    reader.readAsText(file);
  });
};

// Helper function to parse a CSV line handling quoted values
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // Check if this is an escaped quote (double quote)
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote status
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of column
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last column
  result.push(current);
  
  return result;
}