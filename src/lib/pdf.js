import { jsPDF } from "jspdf";

/**
 * Generates and downloads a PDF document (Receipt or Invoice) for a transaction.
 * @param {Object} tx - The transaction object.
 * @param {Object} settings - The site settings object.
 * @param {'receipt' | 'invoice'} type - The type of document to generate.
 */
export const downloadPdf = (tx, settings = {}, type = 'receipt') => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isReceipt = type === 'receipt';
  const titleText = isReceipt ? "DONATION RECEIPT" : "DONATION INVOICE";
  
  // Brand colors
  const primaryColor = [217, 90, 64];   // #d95a40 (Brand Red)
  const secondaryColor = [28, 43, 45];   // #1c2b2d (Dark Teal)
  const mutedColor = [120, 120, 120];

  // --- Header Background Accent ---
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 8, "F");

  // --- Title & Logo ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...secondaryColor);
  doc.text("SAM for Life", 20, 25);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...mutedColor);
  doc.text("A UK charity for ability, not labels", 20, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text(titleText, 190, 25, { align: "right" });

  // Divider Line
  doc.setDrawColor(230, 220, 210); // Subtle beige border
  doc.setLineWidth(0.5);
  doc.line(20, 37, 190, 37);

  // --- Document Info ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.text("Details:", 20, 47);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Reference ID: ${tx.id || tx.session_id || "N/A"}`, 20, 53);
  doc.text(`Date: ${tx.created_at ? tx.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10)}`, 20, 58);
  doc.text(`Frequency: ${tx.frequency === 'monthly' ? 'Monthly' : 'One-time'}`, 20, 63);
  doc.text(`Status: Paid`, 20, 68);

  // --- Donor Info ---
  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", 110, 47);

  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${tx.donor_name || "Anonymous Donor"}`, 110, 53);
  doc.text(`Email: ${tx.donor_email || "N/A"}`, 110, 58);

  // Divider Line
  doc.line(20, 75, 190, 75);

  // --- Item Table Header ---
  doc.setFillColor(244, 237, 224); // #f4ede0
  doc.rect(20, 82, 170, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...secondaryColor);
  doc.text("Description", 25, 87);
  doc.text("Qty", 120, 87, { align: "right" });
  doc.text("Unit Price", 150, 87, { align: "right" });
  doc.text("Total Amount", 185, 87, { align: "right" });

  // --- Table Rows ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  const desc = isReceipt
    ? `Donation Support - ${tx.frequency === 'monthly' ? 'Monthly Recurring' : 'One-time'}`
    : `Donation Commitment - ${tx.frequency === 'monthly' ? 'Monthly Recurring' : 'One-time'}`;
  
  const amountStr = `£${Number(tx.amount || 0).toFixed(2)}`;
  doc.text(desc, 25, 98);
  doc.text("1", 120, 98, { align: "right" });
  doc.text(amountStr, 150, 98, { align: "right" });
  doc.text(amountStr, 185, 98, { align: "right" });

  doc.line(20, 104, 190, 104);

  // --- Total Summary ---
  doc.setFont("helvetica", "bold");
  doc.text("Total:", 150, 112, { align: "right" });
  doc.text(amountStr, 185, 112, { align: "right" });

  // --- Charity details box ---
  doc.setFillColor(250, 248, 245); // #faf8f5
  doc.rect(20, 125, 170, 32, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Charity Information:", 25, 131);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Organization: SAM for Life`, 25, 137);
  doc.text(`Charity Reg No: ${settings.receipt_charity_number || "Pending"}`, 25, 142);
  doc.text(`Email: ${settings.footer_email || "hello@samforlife.org"}`, 25, 147);
  
  // Wrap address text to prevent overflow
  const rawAddress = settings.receipt_address || settings.footer_location || "United Kingdom";
  const addressLines = doc.splitTextToSize(rawAddress, 75);
  doc.text("Address:", 110, 137);
  doc.text(addressLines, 110, 142);

  // --- Custom Message Section ---
  const customMessage = isReceipt
    ? (settings.receipt_thank_you || "Thank you so much for your generosity! Your support empowers children with special needs to discover their abilities, build real-world skills, and step confidently into employment.")
    : (settings.invoice_terms || "Payment is processed securely by Stripe. Thank you for your support!");
  
  const messageLines = doc.splitTextToSize(customMessage, 170);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text(messageLines, 20, 172);

  // --- Footer Branding ---
  doc.line(20, 265, 190, 265);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text("SAM for Life is a registered UK charity (pending).", 20, 271);
  doc.text("www.samforlife.org", 190, 271, { align: "right" });

  // Save the document
  const fileName = `${type}_${tx.id || tx.session_id || "donation"}.pdf`;
  doc.save(fileName);
};
