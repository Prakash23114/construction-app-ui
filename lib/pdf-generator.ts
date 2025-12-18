import jsPDF from "jspdf"

export function generateQuotationPDF(data: {
  quotationNumber: string
  clientName: string
  projectName: string
  date: string
  items: Array<{ name: string; quantity: number; rate: number; amount: number }>
  subtotal: number
  gstAmount: number
  total: number
  gstType: string
}) {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(234, 88, 12)
  doc.rect(0, 0, 210, 30, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("QUOTATION", 105, 18, { align: "center" })

  // Company Details
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("ConstructPro Pvt. Ltd.", 14, 40)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("123 Builder Street, Mumbai, Maharashtra - 400001", 14, 45)
  doc.text("GSTIN: 27AABCU9603R1ZM | Phone: +91 9876543210", 14, 50)

  // Quotation Details Box
  doc.setDrawColor(234, 88, 12)
  doc.setLineWidth(0.5)
  doc.rect(140, 38, 56, 18)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text(`Quote #: ${data.quotationNumber}`, 143, 43)
  doc.setFont("helvetica", "normal")
  doc.text(`Date: ${data.date}`, 143, 48)

  // Client Details
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text("Bill To:", 14, 65)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(data.clientName, 14, 70)
  doc.text(`Project: ${data.projectName}`, 14, 75)

  // Items Table Header
  let yPos = 90
  doc.setFillColor(234, 88, 12)
  doc.rect(14, yPos - 5, 182, 8, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("Item Description", 16, yPos)
  doc.text("Qty", 120, yPos)
  doc.text("Rate (₹)", 140, yPos)
  doc.text("Amount (₹)", 170, yPos)

  // Items Table Body
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  yPos += 8
  data.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(14, yPos - 5, 182, 7, "F")
    }
    doc.text(item.name.substring(0, 40), 16, yPos)
    doc.text(item.quantity.toString(), 120, yPos)
    doc.text(item.rate.toLocaleString("en-IN"), 140, yPos)
    doc.text(item.amount.toLocaleString("en-IN"), 170, yPos)
    yPos += 7
  })

  // Border for table
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.1)
  doc.rect(14, 85, 182, yPos - 85)

  // Summary
  yPos += 10
  doc.setFontSize(10)
  doc.text("Subtotal:", 140, yPos)
  doc.text(`₹${data.subtotal.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 6
  doc.text(`GST (${data.gstType}):`, 140, yPos)
  doc.text(`₹${data.gstAmount.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 8
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Total:", 140, yPos)
  doc.text(`₹${data.total.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.setTextColor(100, 100, 100)
  doc.text("Thank you for your business!", 105, 280, { align: "center" })
  doc.text("Terms & Conditions: Payment within 30 days | Subject to Mumbai jurisdiction", 105, 285, { align: "center" })

  doc.save(`quotation-${data.clientName.replace(/\s+/g, "-")}.pdf`)
}

export function generatePurchaseOrderPDF(data: {
  poNumber: string
  vendor: string
  issueDate: string
  deliveryDate: string
  items: Array<{ name: string; quantity: number; rate: number; amount: number }>
  subtotal: number
  gstAmount: number
  total: number
  isApproved: boolean
}) {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(234, 88, 12)
  doc.rect(0, 0, 210, 30, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("PURCHASE ORDER", 105, 18, { align: "center" })

  // Approval Stamp
  if (data.isApproved) {
    doc.setFontSize(16)
    doc.setTextColor(22, 163, 74)
    doc.setFont("helvetica", "bold")
    doc.text("✓ APPROVED", 170, 40)
  }

  // Company Details
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("ConstructPro Pvt. Ltd.", 14, 40)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("123 Builder Street, Mumbai, Maharashtra - 400001", 14, 45)
  doc.text("Phone: +91 9876543210", 14, 50)

  // PO Details Box
  doc.setDrawColor(234, 88, 12)
  doc.setLineWidth(0.5)
  doc.rect(14, 58, 90, 22)
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.text(`PO Number: ${data.poNumber}`, 17, 63)
  doc.setFont("helvetica", "normal")
  doc.text(`Issue Date: ${data.issueDate}`, 17, 68)
  doc.text(`Delivery Date: ${data.deliveryDate}`, 17, 73)

  // Vendor Details
  doc.rect(110, 58, 86, 22)
  doc.setFont("helvetica", "bold")
  doc.text("Vendor:", 113, 63)
  doc.setFont("helvetica", "normal")
  doc.text(data.vendor, 113, 68)

  // Items Table Header
  let yPos = 95
  doc.setFillColor(234, 88, 12)
  doc.rect(14, yPos - 5, 182, 8, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("Item Description", 16, yPos)
  doc.text("Qty", 120, yPos)
  doc.text("Rate (₹)", 140, yPos)
  doc.text("Amount (₹)", 170, yPos)

  // Items Table Body
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  yPos += 8
  data.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(14, yPos - 5, 182, 7, "F")
    }
    doc.text(item.name.substring(0, 40), 16, yPos)
    doc.text(item.quantity.toString(), 120, yPos)
    doc.text(item.rate.toLocaleString("en-IN"), 140, yPos)
    doc.text(item.amount.toLocaleString("en-IN"), 170, yPos)
    yPos += 7
  })

  // Border for table
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.1)
  doc.rect(14, 90, 182, yPos - 90)

  // Summary
  yPos += 10
  doc.setFontSize(10)
  doc.text("Subtotal:", 140, yPos)
  doc.text(`₹${data.subtotal.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 6
  doc.text("GST (18%):", 140, yPos)
  doc.text(`₹${data.gstAmount.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 8
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Total PO Value:", 140, yPos)
  doc.text(`₹${data.total.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.setTextColor(100, 100, 100)
  doc.text("This is a system generated purchase order", 105, 280, { align: "center" })
  doc.text("Terms: Delivery as per schedule | Quality as per specifications", 105, 285, { align: "center" })

  doc.save(`po-${data.poNumber}.pdf`)
}

export function generateInvoicePDF(data: {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  companyName: string
  companyGSTIN: string
  companyAddress: string
  clientName: string
  clientGSTIN: string
  clientAddress: string
  items: Array<{ description: string; hsnSac: string; quantity: number; rate: number; amount: number }>
  subtotal: number
  cgst: number
  sgst: number
  igst: number
  total: number
  isPaid: boolean
}) {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(234, 88, 12)
  doc.rect(0, 0, 210, 30, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(26)
  doc.setFont("helvetica", "bold")
  doc.text("TAX INVOICE", 105, 18, { align: "center" })

  // Payment Stamp
  if (data.isPaid) {
    doc.setFontSize(18)
    doc.setTextColor(22, 163, 74)
    doc.setFont("helvetica", "bold")
    doc.text("✓ PAID", 175, 38)
  }

  // Company Details
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(data.companyName, 14, 40)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text(data.companyAddress, 14, 45)
  doc.text(`GSTIN: ${data.companyGSTIN}`, 14, 50)

  // Invoice Details Box
  doc.setDrawColor(234, 88, 12)
  doc.setLineWidth(0.5)
  doc.rect(140, 38, 56, 20)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text(`Invoice #: ${data.invoiceNumber}`, 143, 43)
  doc.setFont("helvetica", "normal")
  doc.text(`Date: ${data.invoiceDate}`, 143, 48)
  doc.text(`Due: ${data.dueDate}`, 143, 53)

  // Client Details
  doc.rect(14, 58, 92, 22)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text("Bill To:", 17, 63)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(data.clientName, 17, 68)
  doc.text(data.clientAddress.substring(0, 35), 17, 73)
  doc.text(`GSTIN: ${data.clientGSTIN}`, 17, 78)

  // Items Table Header
  let yPos = 95
  doc.setFillColor(234, 88, 12)
  doc.rect(14, yPos - 5, 182, 8, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("Description", 16, yPos)
  doc.text("HSN/SAC", 95, yPos)
  doc.text("Qty", 120, yPos)
  doc.text("Rate (₹)", 140, yPos)
  doc.text("Amount (₹)", 170, yPos)

  // Items Table Body
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  yPos += 8
  data.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(14, yPos - 5, 182, 7, "F")
    }
    doc.text(item.description.substring(0, 30), 16, yPos)
    doc.text(item.hsnSac, 95, yPos)
    doc.text(item.quantity.toString(), 120, yPos)
    doc.text(item.rate.toLocaleString("en-IN"), 140, yPos)
    doc.text(item.amount.toLocaleString("en-IN"), 170, yPos)
    yPos += 7
  })

  // Border for table
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.1)
  doc.rect(14, 90, 182, yPos - 90)

  // Tax Summary
  yPos += 10
  doc.setFontSize(10)
  doc.text("Subtotal:", 140, yPos)
  doc.text(`₹${data.subtotal.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 6
  doc.text("CGST (9%):", 140, yPos)
  doc.text(`₹${data.cgst.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 6
  doc.text("SGST (9%):", 140, yPos)
  doc.text(`₹${data.sgst.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 6
  doc.text("IGST (0%):", 140, yPos)
  doc.text(`₹${data.igst.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  yPos += 10
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.setDrawColor(234, 88, 12)
  doc.setLineWidth(0.5)
  doc.line(140, yPos - 2, 185, yPos - 2)
  doc.text("Total Amount:", 140, yPos)
  doc.text(`₹${data.total.toLocaleString("en-IN")}`, 185, yPos, { align: "right" })

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.setTextColor(100, 100, 100)
  doc.text("This is a computer generated invoice and does not require signature", 105, 280, { align: "center" })
  doc.text("Payment Terms: Net 30 days | Bank: HDFC Bank | A/c: 50200012345678", 105, 285, { align: "center" })

  doc.save(`invoice-${data.invoiceNumber}-${data.clientName.replace(/\s+/g, "-")}.pdf`)
}

export function generateSampleDocumentPDF(documentNumber: string, documentType: string) {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(234, 88, 12)
  doc.rect(0, 0, 210, 30, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.text(documentType.toUpperCase(), 105, 18, { align: "center" })

  // Document Details
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(`Document Number: ${documentNumber}`, 14, 50)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text(`Generated Date: ${new Date().toLocaleDateString("en-IN")}`, 14, 60)
  doc.text(`Generated Time: ${new Date().toLocaleTimeString("en-IN")}`, 14, 67)

  // Company Info
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("ConstructPro Pvt. Ltd.", 14, 85)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text("123 Builder Street, Mumbai, Maharashtra - 400001", 14, 92)
  doc.text("GSTIN: 27AABCU9603R1ZM", 14, 99)
  doc.text("Phone: +91 9876543210 | Email: info@constructpro.com", 14, 106)

  // Sample Content Box
  doc.setDrawColor(234, 88, 12)
  doc.setLineWidth(0.5)
  doc.rect(14, 120, 182, 40)
  doc.setFontSize(10)
  doc.text("This is a sample document for demonstration purposes.", 20, 130)
  doc.text("Document Type: " + documentType, 20, 140)
  doc.text("Status: Active", 20, 150)

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.setTextColor(100, 100, 100)
  doc.text("Sample Document - For Reference Only", 105, 280, { align: "center" })
  doc.text("© 2025 ConstructPro Pvt. Ltd. All rights reserved.", 105, 285, { align: "center" })

  doc.save(`${documentNumber}.pdf`)
}
