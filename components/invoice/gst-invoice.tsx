"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, CheckCircle2 } from "lucide-react"

export function GSTInvoice() {
  const [isPaid, setIsPaid] = useState(false)
  const [invoiceDetails, setInvoiceDetails] = useState({
    companyGSTIN: "27AABCU9603R1ZM",
    companyName: "ConstructPro Pvt. Ltd.",
    companyAddress: "123 Builder Street, Mumbai, Maharashtra - 400001",
    clientName: "ABC Developers Ltd.",
    clientGSTIN: "29GGGGG1314R9Z6",
    clientAddress: "456 Client Avenue, Bangalore, Karnataka - 560001",
  })

  const invoiceItems = [
    { description: "Construction Services - Block A", hsnSac: "995415", quantity: 1, rate: 250000, amount: 250000 },
    { description: "Material Supply - Premium Grade", hsnSac: "681019", quantity: 1, rate: 150000, amount: 150000 },
  ]

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0)
  const cgst = subtotal * 0.09
  const sgst = subtotal * 0.09
  const igst = 0
  const total = subtotal + cgst + sgst + igst

  const handleGenerate = () => {
    console.log("Generating GST Invoice...")
  }

  const handleDownload = () => {
    console.log("Downloading PDF...")
  }

  const handleMarkPaid = () => {
    setIsPaid(true)
    console.log("Marked as paid")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="gap-1.5">
          <FileText className="size-3" />
          GST Compliant Invoice
        </Badge>
        {isPaid && (
          <Badge className="gap-1.5 bg-success text-success-foreground">
            <CheckCircle2 className="size-3" />
            Payment Received
          </Badge>
        )}
      </div>

      {/* Company & Client Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>Your company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" value={invoiceDetails.companyName} readOnly className="bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyGSTIN">GSTIN</Label>
              <Input id="companyGSTIN" value={invoiceDetails.companyGSTIN} readOnly className="bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Address</Label>
              <Input id="companyAddress" value={invoiceDetails.companyAddress} readOnly className="bg-muted/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Details</CardTitle>
            <CardDescription>Bill to information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" value={invoiceDetails.clientName} readOnly className="bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientGSTIN">GSTIN</Label>
              <Input id="clientGSTIN" value={invoiceDetails.clientGSTIN} readOnly className="bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientAddress">Address</Label>
              <Input id="clientAddress" value={invoiceDetails.clientAddress} readOnly className="bg-muted/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoice Information</CardTitle>
              <CardDescription>Invoice number and date details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input id="invoiceNumber" value="INV-2024-090" readOnly className="bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={new Date().toISOString().split("T")[0]}
                readOnly
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                readOnly
                className="bg-muted/30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
          <CardDescription>Services and products billed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Description</TableHead>
                  <TableHead>HSN/SAC</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Rate (₹)</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell className="text-muted-foreground">{item.hsnSac}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">₹{item.rate.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right font-semibold">₹{item.amount.toLocaleString("en-IN")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tax Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Breakdown & Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="space-y-2 py-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">CGST (9%)</span>
                <span className="font-medium">₹{cgst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">SGST (9%)</span>
                <span className="font-medium">₹{sgst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">IGST (0%)</span>
                <span className="font-medium">₹{igst.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t-2 border-primary/20">
              <span className="font-semibold text-lg">Total Invoice Amount</span>
              <span className="font-bold text-2xl text-primary">₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <span className="font-medium">Payment Status</span>
              <Badge
                variant={isPaid ? "default" : "outline"}
                className={isPaid ? "bg-success text-success-foreground" : ""}
              >
                {isPaid ? "Paid" : "Unpaid"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleGenerate} size="lg" className="gap-2">
          <FileText className="size-4" />
          Generate Invoice
        </Button>
        <Button onClick={handleDownload} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="size-4" />
          Download PDF
        </Button>
        {!isPaid && (
          <Button onClick={handleMarkPaid} variant="outline" size="lg" className="gap-2 bg-transparent">
            <CheckCircle2 className="size-4" />
            Mark as Paid
          </Button>
        )}
      </div>
    </div>
  )
}
