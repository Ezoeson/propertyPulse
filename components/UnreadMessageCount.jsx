'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import React, { useState, useEffect } from 'react';

const UnreadMessageCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;
    try {
      const fetchUnreadMessagesCount = async () => {
        const res = await fetch('/api/message/unread-count');
        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      };
      fetchUnreadMessagesCount();
    } catch (error) {
      console.error(error);
      setUnreadCount(0);
    }
  }, [session]);

  return (
    unreadCount > 0 && (
      <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
        {unreadCount}
        {/* <!-- Replace with the actual number of notifications --> */}
      </span>
    )
  );
};

export default UnreadMessageCount;
