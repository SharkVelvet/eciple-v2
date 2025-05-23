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
        // Use a direct XML extraction approach for .docx files
        console.log("Processing Word document with direct XML parsing");
        
        const arrayBuffer = await file.arrayBuffer();
        
        try {
          // Create a simple zip reader to extract document.xml
          const uint8Array = new Uint8Array(arrayBuffer);
          const textDecoder = new TextDecoder();
          
          // Convert to string and look for readable text patterns
          const fileContent = textDecoder.decode(uint8Array);
          
          // Look for common patterns that indicate table content
          // This is a simplified approach that looks for repeated field patterns
          const lines = fileContent.split(/[\r\n]+/);
          
          console.log(`Scanning ${lines.length} lines for content patterns`);
          
          for (const line of lines) {
            // Look for lines that might contain field mappings
            if (line.includes('Main Heading') || line.includes('Hero Heading')) {
              // Try to extract the new content from this line
              const match = line.match(/Main Heading.*?([A-Za-z][^<>]*[A-Za-z])/);
              if (match && match[1] && match[1].length > 10) {
                updates['hero_heading'] = match[1].trim();
                console.log(`Found hero_heading update: "${match[1].trim()}"`);
              }
            }
            
            if (line.includes('Hero Subheading') || line.includes('Subheading')) {
              const match = line.match(/Subheading.*?([A-Za-z][^<>]*[A-Za-z])/);
              if (match && match[1] && match[1].length > 10) {
                updates['hero_subheading'] = match[1].trim();
                console.log(`Found hero_subheading update: "${match[1].trim()}"`);
              }
            }
            
            if (line.includes('Hero CTA') || line.includes('Call to Action')) {
              const match = line.match(/CTA.*?([A-Za-z][^<>]*[A-Za-z])/);
              if (match && match[1] && match[1].length > 3) {
                updates['hero_cta_text'] = match[1].trim();
                console.log(`Found hero_cta_text update: "${match[1].trim()}"`);
              }
            }
          }
          
          console.log(`Found ${Object.keys(updates).length} content updates`);
          
        } catch (zipError) {
          console.log("Direct XML parsing failed, trying fallback approach");
          
          // Fallback: Ask user to convert to .txt format
          throw new Error("Please save your Word document as a .txt file and upload that instead. The .docx parser is having technical issues.");
        }
        
      } else {
        // Handle .txt files - parse 3-column table structure
        const fileText = await file.text();
        console.log("Processing .txt file format");
        
        const lines = fileText.split(/[\r\n]+/).filter(line => line.trim().length > 0);
        console.log(`Found ${lines.length} lines to process`);
        
        // Debug: Show first 10 lines to understand the format
        console.log("Sample lines from your document:");
        for (let i = 0; i < Math.min(10, lines.length); i++) {
          console.log(`Line ${i + 1}: "${lines[i]}"`);
        }
        
        // Parse your specific document format which has field names on separate lines
        for (let i = 0; i < lines.length - 2; i++) {
          const currentLine = lines[i].trim();
          
          // Map all possible field labels to their keys
          const fieldMappings = [
            // Hero Section
            { labels: ['Main Heading'], key: 'hero_heading' },
            { labels: ['Subheading', 'Hero Subheading'], key: 'hero_subheading' },
            { labels: ['Button Text', 'Hero CTA'], key: 'hero_cta_text' },
            
            // Problem Section
            { labels: ['Problem Statement'], key: 'problem_text' },
            { labels: ['Bottom Line Title'], key: 'bottom_line_title' },
            { labels: ['Bottom Line Text'], key: 'bottom_line_text' },
            { labels: ['Mentorship Point'], key: 'mentorship_text' },
            { labels: ['Curriculum Point'], key: 'curriculum_text' },
            { labels: ['Growth Point'], key: 'growth_text' },
            { labels: ['Metrics Point'], key: 'metrics_text' },
            
            // Solution Section
            { labels: ['Solution Heading'], key: 'solution_heading' },
            { labels: ['Solution Main Text'], key: 'solution_main_text' },
            { labels: ['Solution Card 1 Title'], key: 'solution_card_1_title' },
            { labels: ['Solution Card 1 Text'], key: 'solution_card_1_text' },
            { labels: ['Solution Card 2 Title'], key: 'solution_card_2_title' },
            { labels: ['Solution Card 2 Text'], key: 'solution_card_2_text' },
            { labels: ['Solution Card 3 Title'], key: 'solution_card_3_title' },
            { labels: ['Solution Card 3 Text'], key: 'solution_card_3_text' },
            
            // Product Section
            { labels: ['Product Main Title'], key: 'product_main_title' },
            { labels: ['Product Main Text'], key: 'product_main_text' },
            { labels: ['Centralized Dashboard Title'], key: 'centralized_title' },
            { labels: ['Centralized Dashboard Text'], key: 'centralized_text' },
            { labels: ['Mobile Experience Title'], key: 'mobile_title' },
            { labels: ['Mobile Experience Text'], key: 'mobile_text' },
            { labels: ['Feature 1 Title'], key: 'feature_card_1_title' },
            { labels: ['Feature 1 Text'], key: 'feature_card_1_text' },
            { labels: ['Feature 2 Title'], key: 'feature_card_2_title' },
            { labels: ['Feature 2 Text'], key: 'feature_card_2_text' },
            { labels: ['Feature 3 Title'], key: 'feature_card_3_title' },
            { labels: ['Feature 3 Text'], key: 'feature_card_3_text' },
            { labels: ['Feature 4 Title'], key: 'feature_card_4_title' },
            { labels: ['Feature 4 Text'], key: 'feature_card_4_text' },
            { labels: ['Feature 5 Title'], key: 'feature_card_5_title' },
            { labels: ['Feature 5 Text'], key: 'feature_card_5_text' },
            { labels: ['Feature 6 Title'], key: 'feature_card_6_title' },
            { labels: ['Feature 6 Text'], key: 'feature_card_6_text' },
            
            // Competition Section
            { labels: ['Competition Heading'], key: 'competition_heading' },
            { labels: ['Competition Subheading'], key: 'competition_subheading' },
            
            // Pricing Section
            { labels: ['Pricing Heading'], key: 'pricing_heading' },
            { labels: ['Pricing Subheading'], key: 'pricing_subheading' },
            { labels: ['Starter Tier Title'], key: 'starter_title' },
            { labels: ['Starter Price'], key: 'starter_price' },
            { labels: ['Starter Features'], key: 'starter_features' },
            { labels: ['Pro Tier Title'], key: 'pro_title' },
            { labels: ['Pro Price'], key: 'pro_price' },
            { labels: ['Pro Features'], key: 'pro_features' },
            { labels: ['Enterprise Tier Title'], key: 'enterprise_title' },
            { labels: ['Enterprise Price'], key: 'enterprise_price' },
            { labels: ['Enterprise Features'], key: 'enterprise_features' },
            
            // Contact Section
            { labels: ['Contact Heading'], key: 'contact_heading' },
            { labels: ['Contact Subheading'], key: 'contact_subheading' },
            { labels: ['Email Label'], key: 'email_text' },
            { labels: ['Phone Label'], key: 'phone_text' },
            { labels: ['Submit Button Text'], key: 'submit_text' },
            
            // Additional Hero Section
            { labels: ['Hero Badge Text'], key: 'hero_badge_text' },
            
            // Statistics and Sources
            { labels: ['Statistic 1 Percentage'], key: 'stat_1_percentage' },
            { labels: ['Statistic 1 Description'], key: 'stat_1_description' },
            { labels: ['Statistic 1 Source'], key: 'stat_1_source' },
            { labels: ['Statistic 2 Percentage'], key: 'stat_2_percentage' },
            { labels: ['Statistic 2 Description'], key: 'stat_2_description' },
            { labels: ['Statistic 2 Source'], key: 'stat_2_source' },
            { labels: ['Statistic 3 Percentage'], key: 'stat_3_percentage' },
            { labels: ['Statistic 3 Description'], key: 'stat_3_description' },
            { labels: ['Statistic 3 Source'], key: 'stat_3_source' },
            { labels: ['Statistic 4 Percentage'], key: 'stat_4_percentage' },
            { labels: ['Statistic 4 Description'], key: 'stat_4_description' },
            { labels: ['Statistic 4 Source'], key: 'stat_4_source' },
            { labels: ['Statistic 5 Percentage'], key: 'stat_5_percentage' },
            { labels: ['Statistic 5 Description'], key: 'stat_5_description' },
            { labels: ['Statistic 5 Source'], key: 'stat_5_source' },
            { labels: ['Problem Section Heading'], key: 'problem_section_heading' },
            { labels: ['Key Finding Badge Text'], key: 'key_finding_badge' },
            { labels: ['Issue Badge Text'], key: 'issue_badge_text' },
            { labels: ['See Solution Button Text'], key: 'see_solution_button' }
          ];
          
          // Check if current line matches any field label
          for (const mapping of fieldMappings) {
            if (mapping.labels.some(label => currentLine.includes(label))) {
              const newContent = findNewContentAfterField(lines, i);
              if (newContent) {
                updates[mapping.key] = newContent;
                console.log(`Applied ${mapping.key}: "${newContent}"`);
              }
              break;
            }
          }
        }
        
        // Helper function to find new content after a field name
        function findNewContentAfterField(lines: string[], startIndex: number): string | null {
          // Look for the pattern: Field Name -> (key: xxx) -> Current Content -> New Content
          let foundKey = false;
          let foundCurrentContent = false;
          
          for (let j = startIndex + 1; j < lines.length && j < startIndex + 6; j++) {
            const checkLine = lines[j].trim();
            
            // Skip the (key: xxx) line
            if (checkLine.includes('(key:')) {
              foundKey = true;
              continue;
            }
            
            // If we found the key line, the next non-empty line should be current content
            if (foundKey && !foundCurrentContent && checkLine.length > 5) {
              foundCurrentContent = true;
              
              // The line after current content should be new content
              const nextLine = lines[j + 1] ? lines[j + 1].trim() : '';
              if (nextLine && nextLine.length > 5 && 
                  nextLine !== checkLine &&
                  !nextLine.includes('(key:') &&
                  !nextLine.includes('SECTION') &&
                  !nextLine.includes('Statistic') &&
                  !nextLine.includes('Title') &&
                  !nextLine.includes('Label') &&
                  !nextLine.includes('Point') &&
                  !nextLine.includes('Features') &&
                  !nextLine.includes('Heading') &&
                  !nextLine.includes('Badge') &&
                  !nextLine.includes('Button')) {
                
                // Extra check: if the new content has numbers at the end (your test markers)
                // or is significantly different from the current content, use it
                if (nextLine.match(/\d+$/) || Math.abs(nextLine.length - checkLine.length) > 5) {
                  return nextLine;
                }
              }
            }
          }
          return null;
        }
        
        // Also try the old approach as backup
        for (const line of lines) {
          let parts: string[] = [];
          parts = line.split(/\t+/).map(part => part.trim()).filter(part => part.length > 0);
          
          if (parts.length >= 3) {
            const fieldName = parts[0].toLowerCase();
            const currentContent = parts[1];
            const newContent = parts[2];
            
            console.log(`Found table row: [${parts.join(' | ')}]`);
            
            // Skip header rows
            if (fieldName.includes('content section') || 
                fieldName.includes('current content') ||
                fieldName.includes('new content') ||
                fieldName.includes('field name')) {
              continue;
            }
            
            // Only update if new content exists and is meaningful
            if (newContent && 
                newContent.length > 3 &&
                newContent !== currentContent &&
                !newContent.toLowerCase().includes('edit here') &&
                !newContent.toLowerCase().includes('new content here')) {
              
              // Map field names to content keys
              if (fieldName.includes('main heading') || fieldName.includes('hero heading')) {
                updates['hero_heading'] = newContent;
                console.log(`Applied hero_heading: "${newContent}"`);
              } else if (fieldName.includes('hero subheading') || fieldName.includes('subheading')) {
                updates['hero_subheading'] = newContent;
                console.log(`Applied hero_subheading: "${newContent}"`);
              } else if (fieldName.includes('hero cta') || fieldName.includes('call to action')) {
                updates['hero_cta_text'] = newContent;
                console.log(`Applied hero_cta_text: "${newContent}"`);
              } else if (fieldName.includes('problem text')) {
                updates['problem_text'] = newContent;
                console.log(`Applied problem_text: "${newContent}"`);
              }
            }
          }
        }
        
        console.log(`Applied ${Object.keys(updates).length} content updates from .txt file`);
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