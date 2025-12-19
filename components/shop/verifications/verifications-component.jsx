
import React from 'react'
import VerificationsList from './verifications-list'

const VerificationComponent = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Payment Verifications</h1>
                    <p className="text-muted-foreground mt-1">Review and manage customer payment proofs</p>
                </div>
            </div>

            {/* table  */}
            <VerificationsList/>
        </div>
    )
}

export default VerificationComponent