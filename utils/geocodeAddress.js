'use server';

export const geocodeAddress = async ({ street, city, state, zipcode }) => {
  const query = `${city}, ${state}, ${zipcode}`;
  const url =
    'https://nominatim.openstreetmap.org/search?format=json&q=' +
    encodeURIComponent(state);

  const res = await fetch(url, {
    method: 'GET',
    // headers: {
    //   Accept: 'application/json',
    //   // Ajoute un User-Agent conforme aux politiques de Nominatim
    //   'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
    // },
  });

  if (!res.ok) {
    console.log('error');
    throw new Error('Network response was not ok');
  }

  const data = await res.json();
  if (data.length === 0) {
    throw new Error('Address not found');
  }

  const { lat, lon } = data[0];
  return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
};
