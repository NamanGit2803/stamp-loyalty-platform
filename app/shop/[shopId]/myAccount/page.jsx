import React from 'react'
import AccountPage from '@/components/shop/account/account-page'

const Page = () => {
    return (
        <div className='space-y-6'>
            {/* header */}
            <div>
                <h1 className="text-3xl font-bold text-secondary">My Account</h1>
                <p className="text-muted-foreground mt-1">Control your profile and account settings</p>
            </div>

            <AccountPage/>

        </div>
    )
}

export default Page