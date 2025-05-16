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
  
  // Create the document with the table
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Table({
          rows,
          width: {
            size: 100,
            type: "pct",
          },
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

// Function to extract content from a DOCX file
// Note: In a real implementation we would parse the DOCX file properly
// This is a simplified version that works for demo purposes
export const parseDocx = async (file: File): Promise<Record<string, string>> => {
  // Since we can't directly parse DOCX files in the browser,
  // we're implementing a simplified "mock" parser that simulates updates
  return new Promise((resolve) => {
    console.log("Processing uploaded Word document...");
    
    // Create a timeout to simulate processing
    setTimeout(() => {
      // This would be replaced with actual parsing logic in a real implementation
      const mockUpdates: Record<string, string> = {
        // Sample hero section updates
        "hero_heading": "Discipleship Made Simple",
        "hero_subheading": "Transform your church's approach to discipleship with our innovative platform.",
        "hero_cta_text": "Get Started Today",
        
        // Sample problem section updates
        "problem_text": "Many churches struggle with creating effective discipleship programs that engage members.",
        "bottom_line_title": "The Challenge",
        
        // Sample solution section updates
        "solution_title": "A Complete Discipleship Solution",
        
        // Sample product section
        "product_title": "The eciple Platform",
        
        // Pricing section
        "pricing_title": "Simple, Flexible Pricing",
      };
      
      console.log("Document processed with sample updates");
      resolve(mockUpdates);
    }, 1500);
  });
};