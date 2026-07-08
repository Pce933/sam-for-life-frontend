const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

try {
  const docPath = path.join('C:', 'Users', 'kunal', '.gemini', 'antigravity', 'brain', '27f701fe-0db4-49b2-8eba-c3be0c1da7ad', 'sdlc_tech_stack_documentation.md');
  const markdown = fs.readFileSync(docPath, 'utf8');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxLineWidth = pageWidth - (margin * 2);
  const lineHeight = 6;

  let y = margin + 10;
  let pageCount = 1;

  // Split markdown into lines
  const rawLines = markdown.split('\n');

  // Helper to draw headers and footers
  const drawPageDecorations = (docRef, pageNum) => {
    // Header
    docRef.setFont("helvetica", "normal");
    docRef.setFontSize(8);
    docRef.setTextColor(100, 100, 100);
    docRef.text("SAM for Life | SDLC & Technical Stack Documentation", margin, margin - 5);
    docRef.setDrawColor(200, 200, 200);
    docRef.setLineWidth(0.2);
    docRef.line(margin, margin - 3, pageWidth - margin, margin - 3);

    // Footer
    docRef.line(margin, pageHeight - margin + 3, pageWidth - margin, pageHeight - margin + 3);
    docRef.text(`Page ${pageNum}`, pageWidth - margin - 15, pageHeight - margin + 8);
    docRef.text("CONFIDENTIAL - FOR INTERNAL USE ONLY", margin, pageHeight - margin + 8);
  };

  // Draw first page headers/footers
  drawPageDecorations(doc, pageCount);

  rawLines.forEach((line) => {
    let isHeading1 = false;
    let isHeading2 = false;
    let isHeading3 = false;
    let text = line.trim();

    if (line.startsWith('# ')) {
      isHeading1 = true;
      text = line.substring(2).trim();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
    } else if (line.startsWith('## ')) {
      isHeading2 = true;
      text = line.substring(3).trim();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
    } else if (line.startsWith('### ')) {
      isHeading3 = true;
      text = line.substring(4).trim();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
    } else if (line.trim().startsWith('* ')) {
      text = "• " + line.trim().substring(2).trim();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
    } else if (line.trim().startsWith('- ')) {
      text = "  - " + line.trim().substring(2).trim();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
    }

    // Wrap lines
    const wrappedLines = doc.splitTextToSize(text, maxLineWidth);

    wrappedLines.forEach((wLine) => {
      // Check for page overflow
      if (y + lineHeight > pageHeight - margin - 5) {
        doc.addPage();
        pageCount++;
        y = margin + 10;
        // Draw headers and footers on new page
        drawPageDecorations(doc, pageCount);
      }
      
      // Draw text
      doc.text(wLine, margin, y);
      y += isHeading1 ? 9 : (isHeading2 ? 8 : (isHeading3 ? 7 : lineHeight));
    });

    if (line.trim() === '') {
      y += 3;
    }
  });

  const pdfData = doc.output();
  const outputPath = path.join(__dirname, 'SAM_for_Life_SDLC_Tech_Stack_Documentation.pdf');
  fs.writeFileSync(outputPath, pdfData, 'binary');
  console.log('PDF generated successfully at:', outputPath);
} catch (err) {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
}
