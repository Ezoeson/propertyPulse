const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const dynamic = 'force-dynamic';
export const fetchCache = 'no-store';

// fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Gerer le cas quand le domaine n'est pas encore disponible
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch single property

async function fetchSingleProperty(id) {
  try {
    // Gerer le cas quand le domaine n'est pas encore disponible
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchSingleProperty };
