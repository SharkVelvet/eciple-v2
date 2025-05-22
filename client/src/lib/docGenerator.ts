// Use docx to create a proper Word document with a two-column table
import { 
  Document, 
  Packer, 
  Paragraph, 
  Table, 
  TableRow, 
  TableCell, 
  BorderStyle, 
  TextRun, 
  HeadingLevel, 
  AlignmentType, 
  ShadingType,
  TableLayoutType
} from 'docx';

export interface ContentSection {
  title: string;
  contentKeys: string[];
  contentLabels: string[];
}

export const generateContentTemplate = async (
  content: Record<string, string>,
  sections: ContentSection[]
): Promise<Blob> => {
  // Create a single table for the entire document
  const rows: TableRow[] = [];
  
  // Title row
  rows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "ECIPLE WEBSITE CONTENT EDITOR",
                  size: 36,
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          columnSpan: 3,
        }),
      ],
    })
  );
  
  // Instructions row
  rows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Instructions: Edit content in the right column only. The left columns shows the content section and current value.",
                  italics: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          columnSpan: 3,
        }),
      ],
    })
  );
  
  // Header row
  rows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "CONTENT SECTION",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          width: {
            size: 25,
            type: "pct",
          },
          shading: {
            fill: "C4D3E3",
            type: ShadingType.CLEAR,
          },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "CURRENT CONTENT",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          width: {
            size: 35,
            type: "pct",
          },
          shading: {
            fill: "C4D3E3",
            type: ShadingType.CLEAR,
          },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "NEW CONTENT (EDIT HERE)",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          width: {
            size: 40,
            type: "pct",
          },
          shading: {
            fill: "D5EBD4",
            type: ShadingType.CLEAR,
          },
        }),
      ],
    })
  );
  
  // Process each section
  sections.forEach(section => {
    // Add a section separator row
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: section.title.toUpperCase(),
                    bold: true,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            columnSpan: 3,
            shading: {
              fill: "DDEBF7",
              type: ShadingType.CLEAR,
            },
          }),
        ],
      })
    );
    
    // Add rows for each content field
    section.contentKeys.forEach((key, index) => {
      const label = section.contentLabels[index];
      const value = content[key] || "";
      
      rows.push(
        new TableRow({
          children: [
            // Label column
            new TableCell({
              children: [
                new Paragraph({
                  text: label,
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `(key: ${key})`,
                      color: "808080",
                      size: 16,
                    }),
                  ],
                }),
              ],
              shading: {
                fill: "F2F2F2",
                type: ShadingType.CLEAR,
              },
            }),
            // Current content column
            new TableCell({
              children: [
                new Paragraph({
                  text: value || "(empty)",
                }),
              ],
              shading: {
                fill: "F9F9F9",
                type: ShadingType.CLEAR,
              },
            }),
            // New content column (editable)
            new TableCell({
              children: [
                new Paragraph({
                  text: value || "",
                }),
              ],
            }),
          ],
        })
      );
    });
  });
  
  // Create the document with the table in landscape orientation
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            orientation: "landscape",
          },
          margin: {
            top: 720, // 0.5 inch
            right: 720, // 0.5 inch
            bottom: 720, // 0.5 inch
            left: 720, // 0.5 inch
          },
        },
      },
      children: [
        new Table({
          rows,
          width: {
            size: 100,
            type: "pct",
          },
          columnWidths: [3000, 5000, 5000], // Explicitly set column widths for better spacing
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" },
          },
        }),
      ],
    }],
  });

  // Generate the Word document
  return await Packer.toBlob(doc);
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
  try {
    const blob = await generateContentTemplate(content, sections);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eciple_content_template.docx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating Word document:", error);
    throw error;
  }
};

// Parse uploaded docx file and extract content changes from rightmost table column
export const parseDocx = async (file: File): Promise<Record<string, string>> => {
  return new Promise(async (resolve, reject) => {
    console.log("Processing document:", file.name);
    
    try {
      const updates: Record<string, string> = {};
      
      if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        // Parse .docx files using the existing PizZip and Docxtemplater setup
        console.log("Processing .docx file with table structure");
        
        const arrayBuffer = await file.arrayBuffer();
        const zip = new PizZip(arrayBuffer);
        
        // Use Docxtemplater to extract text content
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        
        const fullText = doc.getFullText();
        console.log("Successfully extracted .docx text content");
        
        // Parse the text content looking for table structure
        // Split by common delimiters that Word might use when extracting text
        const lines = fullText.split(/[\n\r\t]+/).filter(line => line.trim().length > 0);
        
        // Look for 3-column table pattern in the extracted text
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Try to find lines that contain multiple pieces of information
          // This could be tab-separated or space-separated content
          const parts = line.split(/\t+|\s{3,}/).map(part => part.trim()).filter(part => part.length > 0);
          
          if (parts.length >= 3) {
            const fieldName = parts[0].toLowerCase();
            const currentContent = parts[1];
            const newContent = parts[2];
            
            console.log(`Found potential table row: [${parts.join(' | ')}]`);
            
            // Skip headers
            if (fieldName.includes('content section') || 
                fieldName.includes('current content') ||
                fieldName.includes('new content') ||
                fieldName.includes('instructions')) {
              continue;
            }
            
            // Check if new content is meaningful and different
            if (newContent && 
                newContent.length > 3 &&
                newContent !== currentContent &&
                !newContent.toLowerCase().includes('edit here')) {
              
              // Map to content keys
              if (fieldName.includes('main heading') || fieldName.includes('hero heading')) {
                updates['hero_heading'] = newContent;
                console.log(`Found hero_heading update: "${newContent}"`);
              } else if (fieldName.includes('hero subheading') || fieldName.includes('subheading')) {
                updates['hero_subheading'] = newContent;
                console.log(`Found hero_subheading update: "${newContent}"`);
              } else if (fieldName.includes('hero cta') || fieldName.includes('call to action')) {
                updates['hero_cta_text'] = newContent;
                console.log(`Found hero_cta_text update: "${newContent}"`);
              } else if (fieldName.includes('problem text')) {
                updates['problem_text'] = newContent;
                console.log(`Found problem_text update: "${newContent}"`);
              }
            }
          }
        }
        
      } else {
        // Handle .txt files (keep existing logic for backwards compatibility)
        const fileText = await file.text();
        console.log("Processing .txt file format");
        
        // Keep existing txt parsing logic here if needed
        // For now, suggest using .docx format
        throw new Error("Please use .docx format for best results with table structure");
      }
      
      console.log("Extracted updates from your document:", updates);
      
      // Add a small delay to show the progress bar working
      await new Promise(resolve => setTimeout(resolve, 500));
      
      resolve(updates);
      
    } catch (error) {
      console.error("Error parsing docx file:", error);
      reject(new Error("Failed to parse document. Please ensure it's a valid .docx file."));
    }
  });
};