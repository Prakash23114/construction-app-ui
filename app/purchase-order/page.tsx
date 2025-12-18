import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { POCreation } from "@/components/purchase-order/po-creation"

export default function PurchaseOrderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create Purchase Order</h1>
            <p className="text-muted-foreground">Generate PO from approved quotations</p>
          </div>

          <POCreation />
        </main>
      </div>
    </div>
  )
}
