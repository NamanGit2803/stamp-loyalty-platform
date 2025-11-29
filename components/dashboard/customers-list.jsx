"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, MoreVertical } from "lucide-react"

const mockCustomers = [
  { id: 1, name: "Amit Kumar", upiId: "amit@upi", stamps: 12, visits: 15, lastVisit: "2 days ago" },
  { id: 2, name: "Priya Singh", upiId: "priya@upi", stamps: 8, visits: 10, lastVisit: "1 day ago" },
  { id: 3, name: "Vikram Patel", upiId: "vikram@upi", stamps: 5, visits: 6, lastVisit: "3 days ago" },
  { id: 4, name: "Neha Sharma", upiId: "neha@upi", stamps: 20, visits: 25, lastVisit: "Today" },
]

export default function CustomersList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers, setCustomers] = useState(mockCustomers)

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.upiId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted mt-1">Manage your loyal customers</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted" size={20} />
          <Input
            placeholder="Search by name or UPI ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted-bg border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">UPI ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stamps</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Visits</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Visit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted-bg transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{customer.name}</td>
                  <td className="px-6 py-4 text-muted">{customer.upiId}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">
                      {customer.stamps}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{customer.visits}</td>
                  <td className="px-6 py-4 text-muted">{customer.lastVisit}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-muted-bg rounded-lg transition-colors">
                      <MoreVertical size={18} className="text-muted" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredCustomers.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted">No customers found</p>
        </Card>
      )}
    </div>
  )
}
