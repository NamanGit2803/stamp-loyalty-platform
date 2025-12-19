"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, CheckCircle, AlertCircle } from "lucide-react"
import TransactionsTable from "./transactions-table"


export default function TransactionsList() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Transactions</h1>
          <p className="text-muted-foreground mt-1">Payment history and details</p>
        </div>
      </div>

      {/* table  */}
      <TransactionsTable/>
    </div>
  )
}
