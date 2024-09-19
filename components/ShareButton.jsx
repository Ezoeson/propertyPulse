'use client';

import React from 'react';
import { FaShare } from 'react-icons/fa';

const ShareButton = () => {
  return (
    <div>
      <button className='bg-gradient-to-r from-gray-700 to-orange-600 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
        <FaShare className='mr-2' /> Share Property
      </button>
    </div>
  );
};

export default ShareButton;
