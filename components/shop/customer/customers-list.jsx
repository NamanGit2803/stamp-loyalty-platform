"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/toolbar/SearchBar"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import CustomersTable from "./customerList/customersTable"
import { toast } from "sonner"
import { useDebounce } from "@/hooks/use-debounce"
import Pagination from "@/components/toolbar/pagination"



const CustomersList = () => {

  const { shopStore } = useStore()

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    shopStore.resetPagination()
  }, [])


  // debounce 
  const debouncedSearch = useDebounce(search, 500); // 500ms delay

  //  FETCH CUSTOMERS
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true)

      if (shopStore.shop) {

        await shopStore.fetchCustomers({
          page,
          search: debouncedSearch
        });


        setLoading(false)
      }

      if (shopStore.error) {
        if (shopStore.error === 'shopId') return
        toast.error(shopStore.error);
        return;
      }
    };

    fetchCustomers();
  }, [page, shopStore.pagination?.limit, debouncedSearch, shopStore.shop]);

  return (
    <div className="space-y-2">

      {/* SEARCH BAR */}
      <SearchBar
        value={search}
        onChange={(value) => setSearch(value)}
        placeholder="Search by name or phone..."
      />

      {/* TABLE */}
      <CustomersTable customers={shopStore.customers} loading={loading} />

      {/* PAGINATION */}
      <Pagination page={page} setPage={setPage} />
    </div>
  )
}

export default observer(CustomersList)
