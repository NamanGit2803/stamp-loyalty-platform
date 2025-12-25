import React from 'react'
import BillingPage from '@/components/shop/billing/billing-page'

const Page = () => {
  return (
    <div className='space-y-6'>
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and payments</p>
      </div>

      <BillingPage />

    </div>
  )
}

export default Page