"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Filter } from "lucide-react"

type Document = {
  id: string
  number: string
  project: string
  date: string
  amount: string
  status: "Draft" | "Approved" | "Paid" | "Pending" | "Rejected"
}

const quotations: Document[] = [
  {
    id: "1",
    number: "QT-2024-001",
    project: "Residential Complex A",
    date: "2024-01-15",
    amount: "₹4,50,000",
    status: "Approved",
  },
  {
    id: "2",
    number: "QT-2024-002",
    project: "Commercial Tower B",
    date: "2024-01-14",
    amount: "₹7,25,000",
    status: "Draft",
  },
  {
    id: "3",
    number: "QT-2024-003",
    project: "Highway Bridge",
    date: "2024-01-12",
    amount: "₹12,80,000",
    status: "Approved",
  },
  {
    id: "4",
    number: "QT-2024-004",
    project: "Residential Complex A",
    date: "2024-01-10",
    amount: "₹3,20,000",
    status: "Pending",
  },
]

const purchaseOrders: Document[] = [
  {
    id: "1",
    number: "PO-2024-045",
    project: "Commercial Tower B",
    date: "2024-01-14",
    amount: "₹7,25,000",
    status: "Approved",
  },
  {
    id: "2",
    number: "PO-2024-046",
    project: "Highway Bridge",
    date: "2024-01-12",
    amount: "₹5,60,000",
    status: "Pending",
  },
  {
    id: "3",
    number: "PO-2024-047",
    project: "Residential Complex A",
    date: "2024-01-10",
    amount: "₹11,90,000",
    status: "Approved",
  },
]

const materialOrders: Document[] = [
  {
    id: "1",
    number: "MO-2024-089",
    project: "Block A - Foundation",
    date: "2024-01-15",
    amount: "₹2,45,000",
    status: "Approved",
  },
  {
    id: "2",
    number: "MO-2024-090",
    project: "Block B - Structure",
    date: "2024-01-13",
    amount: "₹5,10,000",
    status: "Pending",
  },
  {
    id: "3",
    number: "MO-2024-091",
    project: "Block C - Finishing",
    date: "2024-01-11",
    amount: "₹1,75,000",
    status: "Rejected",
  },
]

const gstInvoices: Document[] = [
  {
    id: "1",
    number: "INV-2024-089",
    project: "Highway Bridge",
    date: "2024-01-12",
    amount: "₹12,80,000",
    status: "Paid",
  },
  {
    id: "2",
    number: "INV-2024-090",
    project: "Commercial Tower B",
    date: "2024-01-10",
    amount: "₹4,72,000",
    status: "Paid",
  },
  {
    id: "3",
    number: "INV-2024-091",
    project: "Residential Complex A",
    date: "2024-01-08",
    amount: "₹5,31,000",
    status: "Pending",
  },
]

export function DocumentHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  const renderDocumentTable = (documents: Document[]) => {
    const filteredDocs = documents.filter((doc) => {
      const matchesSearch =
        doc.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.project.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || doc.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })

    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Number</TableHead>
              <TableHead className="hidden md:table-cell">Project</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              filteredDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.number}</TableCell>
                  <TableCell className="hidden md:table-cell">{doc.project}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{doc.date}</TableCell>
                  <TableCell className="font-semibold">{doc.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doc.status === "Paid" || doc.status === "Approved"
                          ? "default"
                          : doc.status === "Pending" || doc.status === "Draft"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        doc.status === "Paid" || doc.status === "Approved"
                          ? "bg-success text-success-foreground"
                          : doc.status === "Pending"
                            ? "bg-warning text-warning-foreground"
                            : doc.status === "Rejected"
                              ? "bg-destructive text-destructive-foreground"
                              : ""
                      }
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="size-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Document History</CardTitle>
          <CardDescription>View and download all your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quotations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="quotations">Quotations</TabsTrigger>
              <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
              <TabsTrigger value="material-orders">Material Orders</TabsTrigger>
              <TabsTrigger value="gst-invoices">GST Invoices</TabsTrigger>
            </TabsList>

            <TabsContent value="quotations" className="space-y-4">
              {renderDocumentTable(quotations)}
            </TabsContent>

            <TabsContent value="purchase-orders" className="space-y-4">
              {renderDocumentTable(purchaseOrders)}
            </TabsContent>

            <TabsContent value="material-orders" className="space-y-4">
              {renderDocumentTable(materialOrders)}
            </TabsContent>

            <TabsContent value="gst-invoices" className="space-y-4">
              {renderDocumentTable(gstInvoices)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
