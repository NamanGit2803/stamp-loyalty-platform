'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Gauge } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"


export function CloseToRewardCard({ closeToReward, targetStamps, loading }) {
    return (
        <Card className="w-full card">
            <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2 text-primary">
                    <Gauge className="size-5 text-primary " />
                    Close to Reward
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {/* skeleton  */}
                {loading && (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4 p-2 bg-muted-foreground/5 rounded-md">
                                <Skeleton className="h-12 w-12 rounded-full bg-skeleton-color" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px] bg-skeleton-color" />
                                    <Skeleton className="h-4 w-[200px] bg-skeleton-color" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ✅ Empty State */}
                {!loading && (!closeToReward || closeToReward.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                        No customers yet
                    </p>
                )}

                {/* Existing List */}
                {!loading && closeToReward?.map((c) => {
                    const left = targetStamps - c.stampCount

                    return (
                        <div
                            key={c.id}
                            className="flex items-center justify-between shadow-sm rounded-lg border border-primary/20 p-3 bg-background/40 hover:bg-muted/40 transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                                    {c.name ? c.name[0] : ''}
                                </div>

                                <div>
                                    <p className="font-medium">{c.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {c.stampCount} / {targetStamps} stamps ·{" "}
                                        {left === 1 ? "1 stamp left" : `${left} stamps left`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
