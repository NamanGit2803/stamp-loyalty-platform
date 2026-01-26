'use client'

import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const Pagination = ({page, setPage}) => {

    const { shopStore } = useStore()

    return (
        <div className="flex justify-between items-center pt-2">

            <div className="text-sm text-muted-foreground">
                Page {page} of {shopStore.pagination?.totalPages} — {shopStore.pagination?.total} items
            </div>

            <div className="flex items-center gap-4">

                {/* ITEMS PER PAGE */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rows:</span>

                    <Select
                        value={String(shopStore.pagination?.limit || 10)}
                        onValueChange={(value) => {
                            shopStore.pagination.limit = Number(value)
                            setPage(1)
                        }}
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* PAGE BUTTONS */}
                <div className="flex items-center gap-2">
                    <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Prev
                    </Button>

                    <Button disabled={page === shopStore.pagination?.totalPages} onClick={() => setPage(page + 1)}>
                        Next
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default observer(Pagination)