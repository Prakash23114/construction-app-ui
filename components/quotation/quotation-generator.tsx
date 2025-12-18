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
import { useToast } from "@/hooks/use-toast"
import { generateQuotationPDF } from "@/lib/pdf-generator"

type QuotationItem = {
  id: string
  description: string
  area: number
  rate: number
  amount: number
}

export function QuotationGenerator() {
  const [items, setItems] = useState<QuotationItem[]>([
    {
      id: "1",
      description:
        "PATCH WORK EXTERNAL CEMENT PLASTER: Carefully breaking and removing in patches the existing external plaster of walls, etc in patches without damaging the plaster, brickwork in the vicinity including cutting a groove first to demarcate the exact area & coating away of the debris, cleaning etc. complete. Providing and applying 20-25 mm thk cement plaster in two coats with first coat in 12-15 mm thick in 1:5 C.M and second coat in 8-10 mm thick in C.M 1:3 finished in proper line and level including adding Dr. Fixit Pidiproof LW+ 200 ml per 50 kg bag of cement in both the coats of M/s Pidilite Industries Ltd.",
      area: 100,
      rate: 90,
      amount: 9000,
    },
    {
      id: "2",
      description:
        "Application Of Dr. Fixit Raincoat Classic System - Exterior Waterproof Coating: Providing & Apply one coats of Dr. Fixit Raincoat Waterproof Coating without any dilution Maintain the spreading rate of 4.20 - 4.70 Sq.mtr per litre / coat application to achieve about 100-120 microns DFT. Apply second coat of Dr. Fixit Raincoat Classic Top Coat with interval of 6-8 hours without any dilution spreading rate of 6.0 - 6.5 Sq.mtr / litre / coat to achieve DFT of 50 - 60 microns. The material having following technical properties: Attains hairline crack bridging up to 2 mm, Elongation of >100 % as per ASTMD 412; Tensile strength 2.50 Mpa per ASTM D 412, Complies to anti carbonation test as per EN 1062 part 6 the system comes with 7 years waterproofing & 10 years paint performance warranty from M/S Pidilite industries Ltd.",
      area: 3000,
      rate: 18,
      amount: 54000,
    },
  ])
  const [gstRate, setGstRate] = useState("18")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isGenerated, setIsGenerated] = useState(false)
  const { toast } = useToast()

  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: "",
      area: 0,
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
          if (field === "area" || field === "rate") {
            updated.amount = updated.area * updated.rate
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
      if (!item.description.trim()) {
        newErrors[`itemDesc${index}`] = "Item description is required"
      }
      if (item.area <= 0) {
        newErrors[`itemArea${index}`] = "Area must be greater than 0"
      }
      if (item.rate <= 0) {
        newErrors[`itemRate${index}`] = "Rate must be greater than 0"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = () => {
    if (validateForm()) {
      generateQuotationPDF({
        quotationNumber: `QT-2024-${Date.now().toString().slice(-3)}`,
        clientName: clientDetails.name,
        projectName: "Residential Complex A",
        date: new Date().toLocaleDateString("en-IN"),
        items: items.map((item) => ({
          name: item.description,
          quantity: item.area,
          rate: item.rate,
          amount: item.amount,
        })),
        subtotal,
        gstAmount,
        total,
        gstType: `${gstRate}%`,
      })
      toast({
        title: "Draft Saved",
        description: "Quotation PDF has been generated and downloaded.",
      })
    }
  }

  const handleGenerate = () => {
    if (validateForm()) {
      setIsGenerated(true)
      toast({
        title: "Quotation Generated",
        description: "Your quotation has been generated successfully.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="gap-1.5">
          <FileText className="size-3" />
          Auto-generated for projects under ₹5 Lakhs
        </Badge>
        {isGenerated && (
          <Badge className="gap-1.5 bg-success text-success-foreground">
            <FileText className="size-3" />
            Generated
          </Badge>
        )}
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
              <CardDescription>Add items and area for the quotation</CardDescription>
            </div>
            <Button onClick={addItem} size="sm" className="gap-2">
              <Plus className="size-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[300px]">Item Description</TableHead>
                  <TableHead className="w-[120px]">Area (Sft)</TableHead>
                  <TableHead className="w-[120px]">Rate (₹)</TableHead>
                  <TableHead className="w-[140px]">Amount (₹)</TableHead>
                  <TableHead className="w-[80px] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        placeholder="Enter item description"
                        value={item.description}
                        onChange={(e) => {
                          updateItem(item.id, "description", e.target.value)
                          if (errors[`itemDesc${index}`]) {
                            const newErrors = { ...errors }
                            delete newErrors[`itemDesc${index}`]
                            setErrors(newErrors)
                          }
                        }}
                        aria-invalid={!!errors[`itemDesc${index}`]}
                        className="h-9 min-w-[280px]"
                      />
                      {errors[`itemDesc${index}`] && (
                        <p className="text-xs text-destructive mt-1">{errors[`itemDesc${index}`]}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={item.area || ""}
                        onChange={(e) => {
                          updateItem(item.id, "area", Number.parseFloat(e.target.value) || 0)
                          if (errors[`itemArea${index}`]) {
                            const newErrors = { ...errors }
                            delete newErrors[`itemArea${index}`]
                            setErrors(newErrors)
                          }
                        }}
                        aria-invalid={!!errors[`itemArea${index}`]}
                        className="h-9"
                      />
                      {errors[`itemArea${index}`] && (
                        <p className="text-xs text-destructive mt-1">{errors[`itemArea${index}`]}</p>
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
                      <div className="font-semibold">₹{item.amount.toLocaleString("en-IN")}</div>
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
