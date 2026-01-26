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

  const isTrial = shopStore.subscriptionStatus === 'trialing';

  const daysLeft = () => {
    const days = shopStore.daysLeft ?? null;

    if (days === null || days === undefined) return "--";

    if (days < 0) return "Expired";

    if (days == 0) return "Today";

    if (days == 1) return "Tomorrow";

    return `${days} days`

  }

  return (
    <div className='text-sm text-dark-text'>
      {isTrial ? 'Free plan expires in: ' : 'Plan expires in: '}
      <span className='text-primary font-semibold'>{daysLeft()}</span>
    </div>
  );
});

export default ExpiryStatus;
