const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

try {
  const docPath = path.join('C:', 'Users', 'kunal', '.gemini', 'antigravity', 'brain', '27f701fe-0db4-49b2-8eba-c3be0c1da7ad', 'project_documentation.md');
  const markdown = fs.readFileSync(docPath, 'utf8');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxLineWidth = pageWidth - (margin * 2);
  const lineHeight = 6;

  let y = margin;

  const rawLines = markdown.split('\n');

  rawLines.forEach((line) => {
    let isHeading1 = false;
    let isHeading2 = false;
    let isHeading3 = false;
    let text = line.trim();

    if (line.startsWith('# ')) {
      isHeading1 = true;
      text = line.substring(2).trim();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
    } else if (line.startsWith('## ')) {
      isHeading2 = true;
      text = line.substring(3).trim();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
    } else if (line.startsWith('### ')) {
      isHeading3 = true;
      text = line.substring(4).trim();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    }

    // Wrap lines
    const wrappedLines = doc.splitTextToSize(text, maxLineWidth);

    wrappedLines.forEach((wLine) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(wLine, margin, y);
      y += isHeading1 ? 9 : (isHeading2 ? 8 : (isHeading3 ? 7 : lineHeight));
    });

    if (line.trim() === '') {
      y += 3;
    }
  });

  const pdfData = doc.output();
  const outputPath = path.join(__dirname, 'SAM_for_Life_Project_Documentation.pdf');
  fs.writeFileSync(outputPath, pdfData, 'binary');
  console.log('PDF generated successfully at:', outputPath);
} catch (err) {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
}
