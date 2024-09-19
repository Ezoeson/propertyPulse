import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth/next';

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session || !session.user) {
      return null;
    }
    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
