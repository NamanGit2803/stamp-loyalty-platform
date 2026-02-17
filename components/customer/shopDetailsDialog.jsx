'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gift, Trophy } from "lucide-react";

const ShopDetailsDialog = ({ selectedShop, setSelectedShop }) => {
    if (!selectedShop) return null;

    const current = selectedShop.stampCount;
    const total = selectedShop.shop.targetStamps;
    const percentage = Math.round((current / total) * 100);
    const remaining = total - current;
    const unlocked = current >= total;

    return (
        <Dialog
            open={!!selectedShop}
            onOpenChange={() => setSelectedShop(null)}
        >
            <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden">

                {/* Top Gradient Header */}
                <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                            {selectedShop.shop.shopName}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-80">Completion</p>
                            <p className="text-2xl font-bold">{percentage}%</p>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                            {unlocked ? "🎉" : "⭐"}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <Card className="border-none shadow-none rounded-none p-0">
                    <CardContent className="space-y-6 p-5">
                        <div className="flex text-sm gap-2 text-muted-foreground">Customer Id: <span className="text-primary">{selectedShop.id}</span></div>
                        {/* Progress */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">
                                    {current} / {total} Stamps
                                </span>
                                <span className="text-muted-foreground">
                                    {remaining > 0
                                        ? `${remaining} remaining`
                                        : "Completed"}
                                </span>
                            </div>

                            <Progress value={percentage} className="h-3" />
                        </div>

                        {/* Reward Section */}
                        <div className="p-4 rounded-2xl bg-muted/40 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                {unlocked ? (
                                    <Trophy className="text-primary size-5" />
                                ) : (
                                    <Gift className="text-primary size-5" />
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    Reward
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {selectedShop.shop.reward || "Free Item"}
                                </p>
                            </div>
                        </div>

                        {/* Unlock State */}
                        {unlocked ? (
                            <div className="text-center text-green-600 font-semibold text-sm">
                                🎉 Congratulations! Your reward is ready to claim.
                            </div>
                        ) : (
                            <div className="text-center text-sm text-muted-foreground">
                                Collect {remaining} more stamps to unlock your reward.
                            </div>
                        )}

                    </CardContent>
                </Card>

            </DialogContent>
        </Dialog>
    );
};

export default ShopDetailsDialog;
