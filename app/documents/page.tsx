import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DocumentHistory } from "@/components/documents/document-history"

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Document History</h1>
            <p className="text-muted-foreground">View, search, and download all your construction documents</p>
          </div>

          <DocumentHistory />
        </main>
      </div>
    </div>
  )
}
