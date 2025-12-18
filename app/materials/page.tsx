import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MaterialOrders } from "@/components/materials/material-orders"

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Material Order Management</h1>
            <p className="text-muted-foreground">Review and approve material requests from site engineers</p>
          </div>

          <MaterialOrders />
        </main>
      </div>
    </div>
  )
}
