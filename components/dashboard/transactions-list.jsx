"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle, AlertCircle } from "lucide-react"

const mockTransactions = [
  { id: 1, customer: "Amit Kumar", amount: 250, date: "2024-01-15", status: "success" },
  { id: 2, customer: "Priya Singh", amount: 180, date: "2024-01-14", status: "success" },
  { id: 3, customer: "Vikram Patel", amount: 99, date: "2024-01-13", status: "failed" },
  { id: 4, customer: "Neha Sharma", amount: 500, date: "2024-01-12", status: "success" },
]

export default function TransactionsList() {
  const [filterDate, setFilterDate] = useState("")
  const [transactions, setTransactions] = useState(mockTransactions)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted mt-1">Payment history and details</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download size={20} />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted-bg border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-muted-bg transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{tx.customer}</td>
                  <td className="px-6 py-4 text-foreground font-semibold">₹{tx.amount}</td>
                  <td className="px-6 py-4 text-muted">{tx.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {tx.status === "success" ? (
                        <>
                          <CheckCircle size={18} className="text-accent" />
                          <span className="text-accent font-medium">Success</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={18} className="text-danger" />
                          <span className="text-danger font-medium">Failed</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
