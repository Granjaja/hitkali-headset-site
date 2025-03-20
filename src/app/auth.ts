import NextAuth, { NextAuthOptions, Session as NextAuthSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { createSession } from './lib/session';
import { JWT } from 'next-auth/jwt';
import { signInSchema } from './lib/zod';
import prisma from '@/db/db';


interface Session extends NextAuthSession {
  user: {
    id: number;
    role: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

interface AdapterUser {
  id: string;
  email: string;
  image?: string | null;
  name?: string | null;
  role: string;
}

export const authOptions: NextAuthOptions = {

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }



        const { email, password } = await signInSchema.parseAsync(credentials)


        // Fetch user from the database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // console.log('Fetched user:', user)
        if (!user) {
          throw new Error('No account found with this email. Please sign up.');
        }

        // Compare password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return null;
        }

        // Create a session
        await createSession(user.id.toString());

        // Return user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, user }: { session: Session; user: AdapterUser }) {
      if (user ) {
        session.user.id = Number(user.id);
        session.user.role = user.role as string;
      }
        return session;
      },

      async jwt({token, session,}: {token: JWT; session?: Session;}): Promise<JWT> {
        if (session) {
          token.id = Number(session.user.id);
          token.role = session.user.role;
        }
        return token;
      },
      
    },
    
  }

export const { signIn, signOut, handler } = NextAuth(authOptions)

