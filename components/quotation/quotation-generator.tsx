"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Save, FileText } from "lucide-react"

type QuotationItem = {
  id: string
  name: string
  quantity: number
  rate: number
  amount: number
}

export function QuotationGenerator() {
  const [items, setItems] = useState<QuotationItem[]>([
    { id: "1", name: "Cement (50kg bags)", quantity: 100, rate: 450, amount: 45000 },
    { id: "2", name: "Steel Rods (12mm)", quantity: 50, rate: 680, amount: 34000 },
  ])
  const [gstRate, setGstRate] = useState("18")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      name: "",
      quantity: 0,
      rate: 0,
      amount: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "rate") {
            updated.amount = updated.quantity * updated.rate
          }
          return updated
        }
        return item
      }),
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const gstAmount = subtotal * (Number.parseFloat(gstRate) / 100)
  const total = subtotal + gstAmount

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!clientDetails.name.trim()) {
      newErrors.clientName = "Client name is required"
    }
    if (!clientDetails.email.trim()) {
      newErrors.clientEmail = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientDetails.email)) {
      newErrors.clientEmail = "Invalid email format"
    }
    if (!clientDetails.phone.trim()) {
      newErrors.clientPhone = "Phone is required"
    } else if (!/^\d{10}$/.test(clientDetails.phone)) {
      newErrors.clientPhone = "Phone must be 10 digits"
    }

    items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`itemName${index}`] = "Item name is required"
      }
      if (item.quantity <= 0) {
        newErrors[`itemQty${index}`] = "Quantity must be greater than 0"
      }
      if (item.rate <= 0) {
        newErrors[`itemRate${index}`] = "Rate must be greater than 0"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = () => {
    console.log("Saving draft...")
  }

  const handleGenerate = () => {
    if (validateForm()) {
      console.log("Generating quotation...")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="gap-1.5">
          <FileText className="size-3" />
          Auto-generated for projects under ₹5 Lakhs
        </Badge>
      </div>

      {/* Project Info */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Project Name</Label>
            <Input value="Residential Complex A" readOnly className="bg-muted/30" />
          </div>
        </CardContent>
      </Card>

      {/* Client Details */}
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
          <CardDescription>Enter client information for the quotation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clientName">
                Client Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clientName"
                placeholder="Enter client name"
                value={clientDetails.name}
                onChange={(e) => {
                  setClientDetails({ ...clientDetails, name: e.target.value })
                  if (errors.clientName) {
                    setErrors({ ...errors, clientName: "" })
                  }
                }}
                aria-invalid={!!errors.clientName}
              />
              {errors.clientName && <p className="text-xs text-destructive mt-1">{errors.clientName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="client@example.com"
                value={clientDetails.email}
                onChange={(e) => {
                  setClientDetails({ ...clientDetails, email: e.target.value })
                  if (errors.clientEmail) {
                    setErrors({ ...errors, clientEmail: "" })
                  }
                }}
                aria-invalid={!!errors.clientEmail}
              />
              {errors.clientEmail && <p className="text-xs text-destructive mt-1">{errors.clientEmail}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clientPhone"
                placeholder="10-digit phone number"
                value={clientDetails.phone}
                onChange={(e) => {
                  setClientDetails({ ...clientDetails, phone: e.target.value })
                  if (errors.clientPhone) {
                    setErrors({ ...errors, clientPhone: "" })
                  }
                }}
                aria-invalid={!!errors.clientPhone}
              />
              {errors.clientPhone && <p className="text-xs text-destructive mt-1">{errors.clientPhone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientAddress">Address</Label>
              <Input
                id="clientAddress"
                placeholder="Enter address"
                value={clientDetails.address}
                onChange={(e) => setClientDetails({ ...clientDetails, address: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quotation Items</CardTitle>
              <CardDescription>Add items and quantities for the quotation</CardDescription>
            </div>
            <Button onClick={addItem} size="sm" className="gap-2">
              <Plus className="size-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Item Name</TableHead>
                  <TableHead className="w-[15%]">Quantity</TableHead>
                  <TableHead className="w-[15%]">Rate (₹)</TableHead>
                  <TableHead className="w-[20%]">Amount (₹)</TableHead>
                  <TableHead className="w-[10%] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        placeholder="Enter item name"
                        value={item.name}
                        onChange={(e) => {
                          updateItem(item.id, "name", e.target.value)
                          if (errors[`itemName${index}`]) {
                            const newErrors = { ...errors }
                            delete newErrors[`itemName${index}`]
                            setErrors(newErrors)
                          }
                        }}
                        aria-invalid={!!errors[`itemName${index}`]}
                        className="h-9"
                      />
                      {errors[`itemName${index}`] && (
                        <p className="text-xs text-destructive mt-1">{errors[`itemName${index}`]}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={item.quantity || ""}
                        onChange={(e) => {
                          updateItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)
                          if (errors[`itemQty${index}`]) {
                            const newErrors = { ...errors }
                            delete newErrors[`itemQty${index}`]
                            setErrors(newErrors)
                          }
                        }}
                        aria-invalid={!!errors[`itemQty${index}`]}
                        className="h-9"
                      />
                      {errors[`itemQty${index}`] && (
                        <p className="text-xs text-destructive mt-1">{errors[`itemQty${index}`]}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={item.rate || ""}
                        onChange={(e) => {
                          updateItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)
                          if (errors[`itemRate${index}`]) {
                            const newErrors = { ...errors }
                            delete newErrors[`itemRate${index}`]
                            setErrors(newErrors)
                          }
                        }}
                        aria-invalid={!!errors[`itemRate${index}`]}
                        className="h-9"
                      />
                      {errors[`itemRate${index}`] && (
                        <p className="text-xs text-destructive mt-1">{errors[`itemRate${index}`]}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">{item.amount.toLocaleString("en-IN")}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
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
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-t">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">GST</span>
                <Select value={gstRate} onValueChange={setGstRate}>
                  <SelectTrigger className="w-28 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="font-semibold text-lg">₹{gstAmount.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-t-2 border-primary/20">
              <span className="font-semibold text-lg">Total Amount</span>
              <span className="font-bold text-2xl text-primary">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleGenerate} size="lg" className="gap-2">
          <FileText className="size-4" />
          Generate Quotation
        </Button>
        <Button onClick={handleSaveDraft} variant="outline" size="lg" className="gap-2 bg-transparent">
          <Save className="size-4" />
          Save Draft
        </Button>
      </div>
    </div>
  )
}
