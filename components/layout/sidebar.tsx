"use client"

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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col border-r border-border bg-card">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          <span className="font-semibold text-lg">ConstructPro</span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-y-2 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
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
  )
}
