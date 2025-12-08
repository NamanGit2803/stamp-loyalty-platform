'use client'

import React from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'

const ExpiryStatus = () => {

    const { shopStore } = useStore();

    return (
        <div className='text-sm text-dark-text'>
           {shopStore.shop?.subscription?.status === 'trialing' ? 'Free plan expires in: ' : 'Plan expires in: '}  <span className='text-primary font-semibold'>{shopStore.daysLeft ?? "--"} days</span>
        </div>
    )
}

export default observer(ExpiryStatus)