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
  AlignmentType 
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
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title
        new Paragraph({
          text: "Website Content Editor",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        
        // Instructions
        new Paragraph({
          children: [
            new TextRun({
              text: "Edit the content in the right column only. Download this file, make your changes, then upload it back to the admin panel to update your website.",
              color: "808080",
              italics: true,
            }),
          ],
        }),
        
        // Instructions heading
        new Paragraph({
          text: "Instructions:",
          heading: HeadingLevel.HEADING_2,
        }),
        
        // Instruction steps
        new Paragraph({
          children: [
            new TextRun("1. "),
            new TextRun({ text: "Do not", bold: true }),
            new TextRun(" modify the content in the left column or the section titles."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun("2. Only edit the content in the right column."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun("3. Save this document when you're done editing."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun("4. Upload the saved document back to the admin panel."),
          ],
        }),
        new Paragraph({ text: "" }),
        
        // Content sections
        ...sections.flatMap(section => {
          // Section heading
          const sectionElements: (Paragraph | Table)[] = [
            new Paragraph({
              text: section.title,
              heading: HeadingLevel.HEADING_2,
            })
          ];
          
          // Create table rows
          const rows: TableRow[] = [
            // Header row
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Content Field", bold: true })
                      ]
                    })
                  ],
                  shading: { fill: "D8ECF3" },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Current Content", bold: true })
                      ]
                    })
                  ],
                  shading: { fill: "D8ECF3" },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Updated Content (Edit Here)", bold: true })
                      ]
                    })
                  ],
                  shading: { fill: "E3F2FD" },
                })
              ]
            }),
            
            // Content rows
            ...section.contentKeys.map((key, index) => {
              const label = section.contentLabels[index];
              const value = content[key] || "";
              
              return new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ text: label })
                    ],
                    shading: { fill: "F9F9F9" },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: value })
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: value })
                    ],
                    shading: { fill: "FFFFFF" },
                  })
                ]
              });
            })
          ];
          
          // Create the table
          const contentTable = new Table({
            rows,
            width: {
              size: 100,
              type: "pct",
            },
            borders: {
              top: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "CCCCCC",
              },
              bottom: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "CCCCCC",
              },
              left: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "CCCCCC",
              },
              right: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "CCCCCC",
              },
              insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "CCCCCC",
              },
              insideVertical: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "CCCCCC",
              },
            },
          });
          
          sectionElements.push(contentTable);
          sectionElements.push(new Paragraph({ text: "" })); // Spacing
          
          return sectionElements;
        })
      ]
    }]
  });

  return await Packer.toBlob(doc);
};

export const downloadDocx = async (
  content: Record<string, string>,
  sections: ContentSection[]
): Promise<void> => {
  const blob = await generateContentTemplate(content, sections);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "eciple_content_template.docx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// This is a mock function because actual DOCX parsing in the browser
// is complex and would require additional dependencies.
// In a production environment, you would use a proper parser
export const parseDocx = async (file: File): Promise<Record<string, string>> => {
  // In a real implementation, you would parse the DOCX file
  // and extract content from it.
  
  // For now, we'll return a promise that resolves after a delay
  // to simulate processing
  return new Promise(resolve => {
    setTimeout(() => {
      // This would be replaced with actual parsing logic
      resolve({
        // Sample content updates
        heroHeading: "Updated from Word Document",
        heroSubheading: "This content was updated via the Word document template",
        heroCtaText: "Learn More",
      });
    }, 1500);
  });
};