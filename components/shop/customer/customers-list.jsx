"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Plus } from "lucide-react"
import { SearchBar } from "@/components/toolbar/SearchBar"

const mockCustomers = [
  { id: 1, name: "Amit Kumar", upiId: "amit@upi", stamps: 12, visits: 15, lastVisit: "2 days ago" },
  { id: 2, name: "Priya Singh", upiId: "priya@upi", stamps: 8, visits: 10, lastVisit: "1 day ago" },
  { id: 3, name: "Vikram Patel", upiId: "vikram@upi", stamps: 5, visits: 6, lastVisit: "3 days ago" },
  { id: 4, name: "Neha Sharma", upiId: "neha@upi", stamps: 20, visits: 25, lastVisit: "Today" },
]

export default function CustomersList() {
  const [search, setSearch] = useState("")

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.upiId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-2">
      <div className=" flex justify-between">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name or phone..."
        />

        {/* add button  */}
        <Button className="gap-2 hover:cursor-pointer">
          <Plus size={20} />
          Add Customer
        </Button>

      </div>

      {/* Table */}
      <Card className="overflow-hidden card">
        <Table>
          <TableHeader className="bg-muted/40 sticky top-0 z-10">
            <TableRow >
              <TableHead className="text-primary">Customer</TableHead>
              <TableHead className="text-primary">Mobile</TableHead>
              <TableHead className="text-center text-primary">Stamps</TableHead>
              <TableHead className="text-center text-primary">Visits</TableHead>
              <TableHead className="text-primary">Last Visit</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((c) => (
              <TableRow
                key={c.id}
                className="hover:bg-muted/30 transition-colors"
              >
                {/* Customer */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                      {c.name[0]}
                    </div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </TableCell>

                {/* UPI */}
                <TableCell className="text-muted-foreground py-3">
                  {c.upiId}
                </TableCell>

                {/* Stamps */}
                <TableCell className="text-center py-3">
                  <Badge variant="default" className="rounded-full px-2 py-0.5">
                    {c.stamps}
                  </Badge>
                </TableCell>

                {/* Visits */}
                <TableCell className="text-center py-3">
                  {c.visits}
                </TableCell>

                {/* Last Visit */}
                <TableCell className="text-muted-foreground py-3">
                  {c.lastVisit}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right py-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <MoreHorizontal size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No customers found
          </div>
        )}
      </Card>
    </div>
  )
}
