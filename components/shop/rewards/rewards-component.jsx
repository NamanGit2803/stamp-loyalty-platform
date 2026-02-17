
import React from 'react'
import RewardsList from './rewards-list'

const RewardsComponent = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Customer Rewards</h1>
                    <p className="text-muted-foreground mt-1">Manage and redeem customer rewards</p>
                </div>
            </div>

            {/* table  */}
            <RewardsList />
        </div>
    )
}

export default RewardsComponent