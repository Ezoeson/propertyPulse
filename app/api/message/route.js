import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// Get /api/message

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify('user Id is required'), {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) //sort read messages in ascending order
      .populate('sender', 'userName')
      .populate('property', 'name');

    const unReadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) //sort read messages in ascending order
      .populate('sender', 'userName')
      .populate('property', 'name');

    const messages = [...readMessages, ...unReadMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('something went wrong ', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { email, name, property, recipient, message, phone } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: 'You must be logged to send a message ' }),
        {
          status: 401,
        }
      );
    }

    const { user } = sessionUser;

    // can not send message  to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'You can not send message to yourself' }),
        {
          status: 400,
        }
      );
    }

    const newMessage = await Message({
      sender: user.id,
      property,
      recipient,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({
        message: 'Message sent successfully',
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: 'Something went wrong',
      }),
      {
        status: 500,
      }
    );
  }
};
