'use client'

import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => {
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full bg-skeleton-color" />
            ))}
        </div>
    );
}
