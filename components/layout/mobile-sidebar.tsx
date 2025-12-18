"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, IndianRupee, Package, History } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Quotations", href: "/quotation", icon: FileText },
  { name: "Purchase Orders", href: "/purchase-order", icon: FileText },
  { name: "GST Invoices", href: "/invoice", icon: IndianRupee },
  { name: "Materials", href: "/materials", icon: Package },
  { name: "Documents", href: "/documents", icon: History },
]

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <Button variant="outline" size="icon" className="lg:hidden bg-transparent" onClick={() => setOpen(!open)}>
        <Menu className="size-5" />
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:hidden">
            <div className="flex h-16 items-center justify-between px-6 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">C</span>
                </div>
                <span className="font-semibold text-lg">ConstructPro</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-y-2 px-4 py-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </aside>
        </>
      )}
    </>
  )
}
