'use client'

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"


export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="w-[60%] sm:w-sm min-w-[180px]">
      <div className="relative bg-background">
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        {/* Input */}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9 pr-9 text-sm sm:text-base"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
