"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle, AlertTriangle, Package } from "lucide-react"

type MaterialRequest = {
  id: string
  material: string
  requestedQty: number
  approvedQty: number
  siteLocation: string
  status: "Pending" | "Approved" | "Rejected"
  requestedBy: string
  usage: number
  threshold: number
}

export function MaterialOrders() {
  const [requests, setRequests] = useState<MaterialRequest[]>([
    {
      id: "MR-001",
      material: "Cement (50kg bags)",
      requestedQty: 150,
      approvedQty: 0,
      siteLocation: "Block A - Foundation",
      status: "Pending",
      requestedBy: "Site Engineer - Rajesh",
      usage: 85,
      threshold: 100,
    },
    {
      id: "MR-002",
      material: "Steel Rods (12mm)",
      requestedQty: 75,
      approvedQty: 75,
      siteLocation: "Block B - Structure",
      status: "Approved",
      requestedBy: "Site Engineer - Priya",
      usage: 95,
      threshold: 100,
    },
    {
      id: "MR-003",
      material: "Sand (Cubic meters)",
      requestedQty: 20,
      approvedQty: 15,
      siteLocation: "Block A - Plastering",
      status: "Approved",
      requestedBy: "Site Engineer - Amit",
      usage: 78,
      threshold: 100,
    },
    {
      id: "MR-004",
      material: "Paint (White - 20L)",
      requestedQty: 30,
      approvedQty: 0,
      siteLocation: "Block C - Finishing",
      status: "Pending",
      requestedBy: "Site Engineer - Sunita",
      usage: 112,
      threshold: 100,
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempQty, setTempQty] = useState<number>(0)

  const handleApprove = (id: string, qty: number) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, approvedQty: qty, status: "Approved" as const } : req)),
    )
    setEditingId(null)
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: "Rejected" as const } : req)))
  }

  const startEditing = (id: string, currentQty: number) => {
    setEditingId(id)
    setTempQty(currentQty)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Package className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Over Budget Items</CardTitle>
            <AlertTriangle className="size-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {requests.filter((r) => r.usage > r.threshold).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Exceeding planned usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle2 className="size-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {requests.filter((r) => r.status === "Approved").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Materials cleared</p>
          </CardContent>
        </Card>
      </div>

      {/* Material Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Material Requests</CardTitle>
          <CardDescription>Review and approve material orders from site engineers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead className="min-w-[180px]">Material</TableHead>
                  <TableHead className="hidden lg:table-cell">Requested By</TableHead>
                  <TableHead className="hidden md:table-cell">Site Location</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead className="hidden xl:table-cell">Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => {
                  const isOverBudget = request.usage > request.threshold
                  return (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{request.material}</span>
                          {isOverBudget && (
                            <Badge variant="outline" className="w-fit mt-1 text-warning border-warning">
                              <AlertTriangle className="size-3 mr-1" />
                              Over budget
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                        {request.requestedBy}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{request.siteLocation}</TableCell>
                      <TableCell className="font-semibold">{request.requestedQty}</TableCell>
                      <TableCell>
                        {editingId === request.id ? (
                          <Input
                            type="number"
                            min="0"
                            max={request.requestedQty}
                            value={tempQty}
                            onChange={(e) => setTempQty(Number.parseInt(e.target.value) || 0)}
                            className="w-20 h-8"
                            autoFocus
                          />
                        ) : (
                          <span className="font-semibold">{request.approvedQty || "-"}</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="space-y-1 min-w-[120px]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Usage</span>
                            <span className={isOverBudget ? "text-destructive font-semibold" : "font-medium"}>
                              {request.usage}%
                            </span>
                          </div>
                          <Progress value={request.usage} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "default"
                              : request.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            request.status === "Approved"
                              ? "bg-success text-success-foreground"
                              : request.status === "Rejected"
                                ? "bg-destructive text-destructive-foreground"
                                : ""
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "Pending" && (
                          <div className="flex items-center justify-end gap-1">
                            {editingId === request.id ? (
                              <Button
                                size="sm"
                                onClick={() => handleApprove(request.id, tempQty)}
                                className="h-8 px-2 text-xs"
                              >
                                <CheckCircle2 className="size-3 mr-1" />
                                Confirm
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditing(request.id, request.requestedQty)}
                                className="h-8 px-2 text-xs bg-transparent"
                              >
                                <CheckCircle2 className="size-3 mr-1" />
                                Approve
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(request.id)}
                              className="h-8 px-2 text-xs text-destructive hover:text-destructive bg-transparent"
                            >
                              <XCircle className="size-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
