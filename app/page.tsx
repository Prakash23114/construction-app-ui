"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { FileText, Plus, Download, IndianRupee, TrendingUp, FileCheck } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { generateSampleDocumentPDF } from "@/lib/pdf-generator"

const documents = [
  {
    id: "QT-2024-001",
    type: "Quotation",
    project: "Residential Complex A",
    amount: "₹4,50,000",
    status: "Approved",
    date: "2024-01-15",
  },
  {
    id: "PO-2024-045",
    type: "Purchase Order",
    project: "Commercial Tower B",
    amount: "₹7,25,000",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: "INV-2024-089",
    type: "GST Invoice",
    project: "Highway Bridge",
    amount: "₹12,80,000",
    status: "Paid",
    date: "2024-01-12",
  },
  {
    id: "QT-2024-002",
    type: "Quotation",
    project: "Residential Complex A",
    amount: "₹3,20,000",
    status: "Draft",
    date: "2024-01-10",
  },
  {
    id: "PO-2024-046",
    type: "Purchase Order",
    project: "Commercial Tower B",
    amount: "₹5,60,000",
    status: "Approved",
    date: "2024-01-08",
  },
]

export default function DashboardPage() {
  const { toast } = useToast()

  const handleDownload = (doc: { id: string; type: string }) => {
    generateSampleDocumentPDF(doc.id, doc.type)
    toast({
      title: "PDF Downloaded",
      description: `${doc.id}.pdf has been downloaded successfully.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Billing & Finance Dashboard</h1>
            <p className="text-muted-foreground">Manage quotations, purchase orders, and invoices</p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quotations</CardTitle>
                <FileText className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45.2L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success font-medium">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total PO Value</CardTitle>
                <FileCheck className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹38.6L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success font-medium">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Material Cost</CardTitle>
                <TrendingUp className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹28.4L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-warning font-medium">+3.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GST Invoices</CardTitle>
                <IndianRupee className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹52.8L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success font-medium">+15.3%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link href="/quotation">
              <Button className="gap-2">
                <Plus className="size-4" />
                Create Quotation
              </Button>
            </Link>
            <Link href="/purchase-order">
              <Button variant="outline" className="gap-2 bg-transparent">
                <FileCheck className="size-4" />
                Generate PO
              </Button>
            </Link>
            <Link href="/invoice">
              <Button variant="outline" className="gap-2 bg-transparent">
                <IndianRupee className="size-4" />
                Create GST Invoice
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Overview of latest quotations, POs, and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.id}</TableCell>
                      <TableCell className="text-muted-foreground">{doc.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{doc.project}</TableCell>
                      <TableCell className="font-semibold">{doc.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            doc.status === "Paid" || doc.status === "Approved"
                              ? "default"
                              : doc.status === "Pending"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            doc.status === "Paid" || doc.status === "Approved"
                              ? "bg-success text-success-foreground"
                              : doc.status === "Pending"
                                ? "bg-warning text-warning-foreground"
                                : ""
                          }
                        >
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{doc.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDownload(doc)}>
                          <Download className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
