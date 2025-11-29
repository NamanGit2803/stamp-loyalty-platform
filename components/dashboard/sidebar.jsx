"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Customers", href: "/dashboard/customers", icon: "👥" },
  { label: "Transactions", href: "/dashboard/transactions", icon: "💳" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-blue-100 rounded-lg text-blue-900"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-blue-100 transition-transform duration-300 lg:translate-x-0 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8 mt-8 lg:mt-0">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <h1 className="text-xl font-bold text-blue-900">Loyalty Pro</h1>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-blue-900 hover:bg-blue-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-100">
          <Link
            href="/logout"
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
