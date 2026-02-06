'use client';

import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from '@/stores/StoreProvider';

const ExpiryStatus = observer(() => {
  const { shopStore } = useStore();
  const [hydrated, setHydrated] = useState(false);

  // Stop SSR mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className='text-sm text-dark-text'>
        Plan expires in: <span className='text-primary font-semibold'>-- days</span>
      </div>
    );
  }

  const isTrial = shopStore.subscriptionStatus === 'trialing' || shopStore.subscriptionStatus === 'trial_end';

  const daysLeft = () => {
    const days = shopStore.daysLeft ?? null;


    if (days === null || days === undefined) return "--";

    if (days < 0) return <span className=' font-semibold text-error-text-1'>Expired</span>

    if (days == 0) return <span className=' font-semibold text-warning-text-2'>Today</span>

    if (days == 1) return <span className=' font-semibold text-warning-text-1'>Tomorrow</span>

    return <span className=' font-semibold text-primary'>{days} days</span>

  }

  return (
    <div className='text-sm text-dark-text'>
      {isTrial ? 'Free plan expires in: ' : 'Plan expires in: '}
      {daysLeft()}
    </div>
  );
});

export default ExpiryStatus;
