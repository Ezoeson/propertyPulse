import connectDB from '@/config/database';
import Property from '@/models/Property';


/**
 * Get all properties for the user with the given id
 *
 * @param {Request} request - The incoming request
 * @param {Object} params - The route params
 * @param {string} params.userId - The id of the user to get properties for
 *
 * @returns {Response} - A response with JSON data of the properties
 */
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const userId = params.userId;

    if (!userId) {
      return new Response('user ID is required', { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('something went wrong ', { status: 500 });
  }
};




