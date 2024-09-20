'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import { geocodeAddress } from '@/utils/geocodeAddress';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coords = await geocodeAddress({
          street: property.street,
          city: property.city,
          state: property.state,
          zipcode: property.zipcode,
        });

        // Affiche les coordonnées
        setPosition([coords.latitude, coords.longitude]);
      } catch (error) {
        console.log('Failed to fetch coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [property]);

  console.log(position);

  return (
    <div>
      {position ? (
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' // Utilisation des tuiles OpenStreetMap
          />

          <Image src={pin} width={40} height={40} alt='location' />

          {/* <Popup>{`${property.street}, ${property.city}`}</Popup> */}
        </MapContainer>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PropertyMap;
