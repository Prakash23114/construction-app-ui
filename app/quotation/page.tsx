import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { QuotationGenerator } from "@/components/quotation/quotation-generator"

export default function QuotationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Auto Quotation Generator</h1>
            <p className="text-muted-foreground">Create and manage quotations for your projects</p>
          </div>

          <QuotationGenerator />
        </main>
      </div>
    </div>
  )
}
