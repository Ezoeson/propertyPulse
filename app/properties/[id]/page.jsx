'use client';

import BoookmarkButton from '@/components/BoookmarkButton';
import ContactForm from '@/components/ContactForm';

import PropertyDetails from '@/components/PropertyDetails';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyImages from '@/components/PropertyImages';
import ShareButton from '@/components/ShareButton';

import Spinner from '@/components/Spinner';
import { fetchSingleProperty } from '@/utils/requests';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { FaArrowLeft } from 'react-icons/fa';

const PropertyIdPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchSingleProperty(id);
        setProperty(property);
      } catch (error) {
        console.log('error fetching property', error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className='terxt-center font-bold text-2xl mt-10'>
        Propety Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property?.images[0]} />
          {/* <!-- Go Back --> */}
          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/properties'
                className='text-blue-500 hover:text-blue-600 flex items-center'
              >
                <FaArrowLeft className='mr-2' /> Back to Properties
              </Link>
            </div>
          </section>

          {/* <!-- Property Info --> */}
          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <PropertyDetails property={property} />

                <aside className='space-y-4'>
                  <BoookmarkButton property={property} />
                  <ShareButton property={property} />
                  {/* <!-- Contact Form --> */}
                  <ContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property?.images} />
        </>
      )}
    </>
  );
};

export default PropertyIdPage;
