"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import RewardsTable from "./rewards-table"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { SearchBar } from "@/components/toolbar/SearchBar"
import { useDebounce } from "@/hooks/use-debounce"
import Pagination from "@/components/toolbar/pagination"
import { toast } from "sonner"


const RewardsList = () => {

    const { shopStore } = useStore()

    const [filterDate, setFilterDate] = useState("")
    const [search, setSearch] = useState("")
    const [rewardsData, setRewardsData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        shopStore.resetPagination()
    }, [])

    // debounce 
    const debouncedSearch = useDebounce(search, 500);


    //  FETCH rewards history
    useEffect(() => {
        const fetchRewards = async () => {
            setLoading(true);

            try {
                const res = await fetch("/api/shop/customers/rewardHistory", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        shopId: shopStore.shop?.id,
                        page,
                        limit: shopStore.pagination?.limit,
                        search: debouncedSearch,
                        date: filterDate,
                    }),
                });

                const data = await res.json();


                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch rewards");
                }

                setRewardsData(data.data);               // update table
                shopStore.updatePagination(data.pagination); // update MobX pagination state

            } catch (error) {
                console.error("FETCH rewards error:", error);
                toast.error(error.message);
            }

            setLoading(false);
        };

        fetchRewards();
    }, [page, shopStore.pagination?.limit, debouncedSearch, filterDate]);

    return (
        <div className="space-y-2">
            {/* Filter */}
            <div className="flex justify-between">
                <div className="flex gap-2">
                    {/* input search  */}
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by name or phone... "
                    />

                    {/* date  */}
                    <Input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="h-9 text-sm w-auto"
                        style={{ background: "linear-gradient(to bottom right, #faf5ff, #ffffff)" }}
                    />
                </div>
            </div>

            {/* Table */}
            <RewardsTable rewardsData={rewardsData} loading={loading} />

            {/* PAGINATION */}
            <Pagination page={page} setPage={setPage} />
        </div>
    )
}

export default observer(RewardsList)
