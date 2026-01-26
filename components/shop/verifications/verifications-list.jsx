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

            await shopStore.fetchPaymentVerifications({
                page,
                search: debouncedSearch,
                date: filterDate,
                status
            })

            setLoading(false);

            if (shopStore.error) {
                toast.error(shopStore.error);
                return;
            }
        };

        fetchRewards();
    }, [page, shopStore.pagination?.limit, debouncedSearch, filterDate, status]);


    return (
        <div className="space-y-2">
            {/* Filter */}
            <div className="flex justify-between">
                <div className="flex gap-2">
                    {/* input search  */}
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by name, phone or transaction ID"
                    />

                    {/* date  */}
                    <Input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="h-9 text-sm w-auto"
                        style={{ background: "linear-gradient(to bottom right, #faf5ff, #ffffff)" }}
                    />

                    {/* status  */}
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="bg-background">
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

                <Button className="gap-2 hover:cursor-pointer">
                    <Download size={20} />
                    Export
                </Button>
            </div>

            {/* Table */}

            <VerificationsTable loading={loading} data={shopStore.scanVerifications} />

            {/* PAGINATION */}
            <Pagination page={page} setPage={setPage} />
        </div>
    )
}

export default observer(VerificationsList)
