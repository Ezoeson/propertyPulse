'use client';

import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const HomeProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        const res = await fetch('/api/properties');

        if (!res.ok) {
          console.log('Failed to fetch');
        }
        const data = await res.json();

        setProperties(data.properties);
      } catch (error) {
        console.log('failed');
      } finally {
        setLoading(false);
      }
    };
    fetchRecentProperties();
  }, []);
  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  if (loading) return <Spinner loading={loading} />;

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold uppercase tracking-widest text-indigo-500 mb-6 text-center'>
            <span className='tracking-widest'>Recent</span> Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties?.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-gradient-to-tr from-black to-red-900 text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
