'use client';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { data } from '@/utils/data';

const PropertySearchForm = () => {
  const router = useRouter();

  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [suggestions, setSuggestions] = useState([]);
  

  const handleInputChange = (e) => {
    setLocation(e.target.value);

    if (location) {
      const filtredSuggestions = data.filter((item) =>
        item.toLowerCase().startsWith(location.toLowerCase())
      );

    

      // Afficher les suggestions que si il y en a
      if (filtredSuggestions.length > 0) {
        setSuggestions(filtredSuggestions.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === '' && propertyType === 'All') {
      router.push('/properties');
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]); // Masquer les suggestions après sélection
  };

 

  return (
   
      <div className='relative mt-3 mx-auto max-w-2xl w-full grid grid-cols-1 md:flex-row items-center'>
        <form
          onSubmit={handleSubmit}
          className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
        >
          <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
            <label htmlFor='location' className='sr-only'>
              Location
            </label>
            <input
              type='text'
              id='location'
              placeholder='Enter Location or Keywords'
              className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
              value={location}
              onChange={handleInputChange}
            />
          </div>
          <div className='w-full md:w-2/5 md:pl-2'>
            <label htmlFor='property-type' className='sr-only'>
              Property Type
            </label>
            <select
              id='property-type'
              className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-red-500'
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value='All'>All</option>
              <option value='Apartment'>Apartment</option>
              <option value='Studio'>Studio</option>
              <option value='Condo'>Condo</option>
              <option value='House'>House</option>
              <option value='Cabin Or Cottage'>Cabin or Cottage</option>
              <option value='Loft'>Loft</option>
              <option value='Room'>Room</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <button
            type='submit'
            className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-gradient-to-tr from-black to-red-700 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
          >
            Search
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className='mt-4 bg-slate-100 rounded-lg shadow '>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className='px-4 py-2 border-b border-gray-300 '
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    
  );
};

export default PropertySearchForm;
