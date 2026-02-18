"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle, Download, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import VerificationsTable from "./verification-table"
import { SearchBar } from "@/components/toolbar/SearchBar"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import Pagination from "@/components/toolbar/pagination"
import { useDebounce } from "@/hooks/use-debounce"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const VerificationsList = () => {

    const { shopStore } = useStore()

    const [filterDate, setFilterDate] = useState("")
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("all")
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shopStore.resetPagination()
    }, [])

    // debounce 
    const debouncedSearch = useDebounce(search, 500);


    //  FETCH verification history
    useEffect(() => {
        const fetchRewards = async () => {
            setLoading(true);

            if (shopStore.shop) {

                await shopStore.fetchPaymentVerifications({
                    page,
                    search: debouncedSearch,
                    date: filterDate,
                    status
                })

                setLoading(false);
            }

            if (shopStore.error) {
                toast.error(shopStore.error);
                return;
            }
        };

        fetchRewards();
    }, [page, shopStore.pagination?.limit, debouncedSearch, filterDate, status, shopStore.shop]);


    return (
        <div className="space-y-2">
            {/* Filter */}
            <div className="flex flex-col sm:flex-row gap-2">
                {/* input search  */}
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search by name, phone or transaction ID"
                />

                <div className="grid grid-cols-2 gap-2">
                    {/* date  */}
                    <div className="relative w-full">
                        <Input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="h-9 text-sm w-full pr-10"
                            style={{ background: "linear-gradient(to bottom right, #faf5ff, #ffffff)" }}
                        />

                        {filterDate && (
                            <button
                                type="button"
                                onClick={() => setFilterDate("")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                ✕
                            </button>
                        )}
                    </div>


                    {/* status  */}
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="bg-background w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="success">Verified</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}

            <VerificationsTable loading={loading} data={shopStore.scanVerifications} />

            {/* PAGINATION */}
            <Pagination page={page} setPage={setPage} />
        </div>
    )
}

export default observer(VerificationsList)
