import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { SessionInterface, UserProfile } from '../../common.types';
import { createUser, getUser } from '@/lib/actions';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
 /* jwt: {
    encode: async ({ secret, token }) => {

    },
    decode: async ({ secret, token }) => {

    }
  },*/
  theme: {
    colorScheme: 'light',
    logo: '/logo.png'
  },
  callbacks: {
    async session({ session }){
      const email = session?.user?.email || '';

      try {
        const data = await getUser(email) as { user?: UserProfile }

        return {
          ...session,
          user: {
            ...session.user,
            ...data?.user
          }
        }
      } catch (error) {
        console.log('Error retrieving user data', error);
        return session;
      }
    },
    async singIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = await getUser(user?.email!) as { user?: UserProfile }

        if (!userExists.user) {
          await createUser(
            user.name || '',
            user.email || '',
            user.image || ''
          );
        }

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    }
  }
}

export async function getCurrentUser() {
  return await getServerSession(authOptions) as SessionInterface;
}
