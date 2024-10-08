'use client';

import { useSession } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import profilDefault from '@/assets/images/profile.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

/**
 * Profile page component
 *
 * Displays user's profile information and their listings
 *
 * @returns {JSX.Element} The profile page component
 */
const profilePage = () => {
  const { data: session, status } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return null;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // fetch user properties when session is avaible
    if (session?.user?.id) {
      fetchUserProperties(session?.user?.id);
    }
  }, [session]);

  const handlePropertyDelete = async (propertyId) => {
    const confirmed = window.confirm(
      'Are you sure  want to delete this property?'
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        // remove  the property from state
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );

        setProperties(updatedProperties);
        toast.success('Property deleted successfully');
      } else {
        toast.error('Oops something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failder to delete property');
    }
  };

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                {status === 'loading' ? (
                  <Skeleton width={200} height={200} circle />
                ) : (
                  <Image
                    className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                    src={profileImage || profilDefault}
                    alt='User'
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <h2 className='text-2xl mb-4'>
                {status === 'loading' ? (
                  <Skeleton />
                ) : (
                  <span className='font-bold block'>Name:{profileName} </span>
                )}{' '}
              </h2>
              <h2 className='text-2xl'>
                {status === 'loading' ? (
                  <Skeleton />
                ) : (
                  <span className='font-bold block'>Email: {profileEmail}</span>
                )}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              {!loading && properties.length === 0 && <p>No listings found.</p>}
              {loading ? (
                <Skeleton width={500} height={100} />
              ) : (
                properties?.map((property) => (
                  <div key={property._id} className='mb-10'>
                    <Link href={`/property/${property._id}`}>
                      <img
                        className='h-32 w-full rounded-md object-cover'
                        src={property.images[0]}
                        alt=''
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className='mt-2'>
                      {loading ? (
                        <Skeleton width={200} height={20} />
                      ) : (
                        <p className='text-lg font-semibold'>{property.name}</p>
                      )}

                      <p className='text-gray-600'>
                        Adress: {property.location.street}{' '}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className='mt-2'>
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handlePropertyDelete(property._id)}
                        className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                        type='button'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default profilePage;
