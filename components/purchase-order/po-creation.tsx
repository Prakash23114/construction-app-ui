"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileCheck, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generatePurchaseOrderPDF } from "@/lib/pdf-generator"

const quotationItems = [
  { id: "1", name: "Cement (50kg bags)", quantity: 100, rate: 450, amount: 45000 },
  { id: "2", name: "Steel Rods (12mm)", quantity: 50, rate: 680, amount: 34000 },
  { id: "3", name: "Bricks (Standard)", quantity: 5000, rate: 8, amount: 40000 },
]

export function POCreation() {
  const [vendor, setVendor] = useState("")
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0])
  const [deliveryDate, setDeliveryDate] = useState("")
  const [isApproved, setIsApproved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const subtotal = quotationItems.reduce((sum, item) => sum + item.amount, 0)
  const gstAmount = subtotal * 0.18
  const total = subtotal + gstAmount

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!vendor) {
      newErrors.vendor = "Please select a vendor"
    }
    if (!deliveryDate) {
      newErrors.deliveryDate = "Delivery date is required"
    } else if (new Date(deliveryDate) <= new Date(issueDate)) {
      newErrors.deliveryDate = "Delivery date must be after issue date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleApprove = () => {
    if (validateForm()) {
      setIsApproved(true)
      toast({
        title: "Purchase Order Approved",
        description: "PO-2024-047 has been generated and approved successfully.",
      })
    }
  }

  const handleDownload = () => {
    const vendorNames: Record<string, string> = {
      "vendor-1": "ABC Building Materials Ltd.",
      "vendor-2": "XYZ Construction Supplies",
      "vendor-3": "Prime Materials Co.",
      "vendor-4": "BuildMart Suppliers",
    }

    generatePurchaseOrderPDF({
      poNumber: "PO-2024-047",
      vendor: vendorNames[vendor] || "Selected Vendor",
      issueDate,
      deliveryDate,
      items: quotationItems,
      subtotal,
      gstAmount,
      total,
      isApproved,
    })

    toast({
      title: "PDF Downloaded",
      description: "Purchase order PDF has been downloaded successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Badge variant="secondary" className="gap-1.5">
        <FileCheck className="size-3" />
        Generated from Quotation #QT-2024-001
      </Badge>

      {/* PO Details */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Details</CardTitle>
          <CardDescription>Enter vendor and delivery information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="poNumber">PO Number</Label>
              <Input id="poNumber" value="PO-2024-047" readOnly className="bg-muted/30" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendor">
                Vendor <span className="text-destructive">*</span>
              </Label>
              <Select
                value={vendor}
                onValueChange={(value) => {
                  setVendor(value)
                  if (errors.vendor) {
                    setErrors({ ...errors, vendor: "" })
                  }
                }}
              >
                <SelectTrigger id="vendor" className={errors.vendor ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendor-1">ABC Building Materials Ltd.</SelectItem>
                  <SelectItem value="vendor-2">XYZ Construction Supplies</SelectItem>
                  <SelectItem value="vendor-3">Prime Materials Co.</SelectItem>
                  <SelectItem value="vendor-4">BuildMart Suppliers</SelectItem>
                </SelectContent>
              </Select>
              {errors.vendor && <p className="text-xs text-destructive mt-1">{errors.vendor}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">
                Expected Delivery Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                value={deliveryDate}
                onChange={(e) => {
                  setDeliveryDate(e.target.value)
                  if (errors.deliveryDate) {
                    setErrors({ ...errors, deliveryDate: "" })
                  }
                }}
                aria-invalid={!!errors.deliveryDate}
              />
              {errors.deliveryDate && <p className="text-xs text-destructive mt-1">{errors.deliveryDate}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items from Quotation */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Items</CardTitle>
          <CardDescription>Items from approved quotation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[45%]">Item Name</TableHead>
                  <TableHead className="w-[15%]">Quantity</TableHead>
                  <TableHead className="w-[20%]">Rate (₹)</TableHead>
                  <TableHead className="w-[20%] text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotationItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>₹{item.rate.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right font-semibold">₹{item.amount.toLocaleString("en-IN")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Total Amount Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <span className="text-muted-foreground">GST (18%)</span>
              <span className="font-semibold text-lg">₹{gstAmount.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-t-2 border-primary/20">
              <span className="font-semibold text-lg">Total PO Value</span>
              <span className="font-bold text-2xl text-primary">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Section */}
      <Card>
        <CardHeader>
          <CardTitle>Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div>
                <p className="font-medium">Manager Approval</p>
                <p className="text-sm text-muted-foreground">John Doe - Project Manager</p>
              </div>
              {isApproved ? (
                <Badge className="bg-success text-success-foreground">
                  <FileCheck className="size-3 mr-1" />
                  Approved
                </Badge>
              ) : (
                <Badge variant="outline">Pending</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleApprove} size="lg" className="gap-2" disabled={isApproved}>
          <FileCheck className="size-4" />
          {isApproved ? "PO Generated" : "Approve & Generate PO"}
        </Button>
        {isApproved && (
          <Button onClick={handleDownload} variant="outline" size="lg" className="gap-2 bg-transparent">
            <Download className="size-4" />
            Download PDF
          </Button>
        )}
      </div>
    </div>
  )
}
