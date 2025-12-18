"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

type PDFPreviewModalProps = {
  open: boolean
  onClose: () => void
  documentType: string
  documentNumber: string
  pdfUrl?: string
}

export function PDFPreviewModal({ open, onClose, documentType, documentNumber, pdfUrl }: PDFPreviewModalProps) {
  const handleDownload = () => {
    console.log("Downloading PDF:", documentNumber)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>
              {documentType} - {documentNumber}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button onClick={handleDownload} size="sm" className="gap-2">
                <Download className="size-4" />
                Download
              </Button>
              <Button onClick={onClose} variant="ghost" size="icon">
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 bg-muted/30 p-6 overflow-auto">
          {pdfUrl ? (
            <iframe src={pdfUrl} className="w-full h-full rounded-lg border bg-white" title="PDF Preview" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Download className="size-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">PDF Preview</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    This is a preview of your {documentType.toLowerCase()}. In a production environment, this would show
                    the actual PDF document.
                  </p>
                </div>
                <Button onClick={handleDownload} className="gap-2">
                  <Download className="size-4" />
                  Download {documentType}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
