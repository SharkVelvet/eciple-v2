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
      // Read the file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      
      // Extract document.xml which contains the text content
      const documentXml = zip.files["word/document.xml"];
      if (!documentXml) {
        throw new Error("Invalid docx file format");
      }
      
      const xmlContent = documentXml.asText();
      console.log("Document XML extracted successfully");
      
      // Simple text extraction - find all text content
      const textMatches = xmlContent.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
      const allText = textMatches.map(match => {
        const content = match.replace(/<[^>]*>/g, '');
        return content;
      }).join(' ');
      
      console.log("Extracted text:", allText);
      
      const updates: Record<string, string> = {};
      
      // Define field patterns that match your document structure
      const fieldPatterns = [
        { pattern: /hero.*heading/i, key: 'hero_heading' },
        { pattern: /hero.*subheading/i, key: 'hero_subheading' },
        { pattern: /hero.*cta.*text/i, key: 'hero_cta_text' },
        { pattern: /problem.*text/i, key: 'problem_text' },
        { pattern: /growth.*text/i, key: 'growth_text' },
        { pattern: /solution.*title/i, key: 'solution_title' },
        { pattern: /product.*title/i, key: 'product_title' },
        { pattern: /market.*size/i, key: 'market_size' },
        { pattern: /pricing.*title/i, key: 'pricing_title' },
        { pattern: /contact.*title/i, key: 'contact_title' },
      ];
      
      // Split by common separators and look for table structure
      const lines = allText.split(/[\n\r\t]+/).filter(line => line.trim().length > 0);
      
      // Process each line looking for field name followed by new content
      for (let i = 0; i < lines.length - 1; i++) {
        const currentLine = lines[i].trim();
        
        // Check if this line matches a field pattern
        for (const { pattern, key } of fieldPatterns) {
          if (pattern.test(currentLine)) {
            // Look for content in subsequent lines (table right column)
            for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
              const potentialContent = lines[j].trim();
              
              // Skip if it's another field name or empty/short content
              const isAnotherField = fieldPatterns.some(fp => fp.pattern.test(potentialContent));
              const hasValidContent = potentialContent.length > 5 && 
                                    !potentialContent.toLowerCase().includes('current content') &&
                                    !isAnotherField;
              
              if (hasValidContent) {
                updates[key] = potentialContent;
                console.log(`Found update: ${key} = ${potentialContent}`);
                break;
              }
            }
            break;
          }
        }
      }
      
      console.log("Final extracted updates:", updates);
      resolve(updates);
      
    } catch (error) {
      console.error("Error parsing docx file:", error);
      reject(new Error("Failed to parse document. Please ensure it's a valid .docx file."));
    }
  });
};