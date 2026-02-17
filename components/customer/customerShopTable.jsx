"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress"
import ShopDetailsDialog from "./shopDetailsDialog";
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

export default function CustomerShopsTable({ shops }) {
    const [selectedShop, setSelectedShop] = useState(null);
    const [search, setSearch] = useState('')

    const filteredShops = shops.filter((item) =>
        item.shop.shopName.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <>
            {/* search bar  */}
            <div className="sticky top-0 z-50 bg-custom-gradient py-2">
                <div className="relative bg-background">
                    {/* Search Icon */}
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    {/* Input */}
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={'Search by shop name'}
                        className="pl-9 pr-9 text-sm sm:text-base"
                    />

                    {/* Clear Button */}
                    {search.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Shop List */}
            {!filteredShops || filteredShops.length === 0 ? <Card className="rounded-2xl">
                <CardContent className="p-6 text-center text-sm text-muted-foreground">
                    No shop found.
                </CardContent>
            </Card>
                :
                <div className="space-y-3">
                    {filteredShops.map((item) => {
                        const percentage = Math.round(
                            (item.stampCount / item.shop.targetStamps) * 100
                        );

                        return (
                            <Card
                                key={item.id}
                                onClick={() => setSelectedShop(item)}
                                className="card p-2">
                                <CardContent className="px-3 space-y-2">

                                    {/* Top Row */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="font-semibold text-base text-primary">
                                                {item.shop.shopName}
                                            </h2>

                                            <p className="text-xs text-muted-foreground mt-1">
                                                {item.stampCount} / {item.shop.targetStamps} stamps collected
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                                                {percentage==100? '🎉 ' + percentage : percentage}%
                                            </div>

                                            <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Progress Section */}
                                    <div className="space-y-1">
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <Progress value={percentage} />
                                        </div>

                                        {/* Reward Hint */}
                                        <p className="text-[11px] text-muted-foreground">
                                            {item.shop.targetStamps - item.stampCount > 0
                                                ? `${item.shop.targetStamps - item.stampCount} stamps to reward`
                                                : "🎉 Reward unlocked!"}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>}

            {/* Dialog with Detailed Card */}
            <ShopDetailsDialog selectedShop={selectedShop} setSelectedShop={setSelectedShop} />
        </>
    );
}
