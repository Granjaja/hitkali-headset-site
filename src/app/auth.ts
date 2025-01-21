import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();
async function getUser(email: string): Promise<User | undefined>{
  try{
    const user = await prisma.user.findUnique({
      where:{email}
    })
    return user || undefined
  } catch(error){
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}; 


export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
    },
      async authorize(credentials){
        const parsedCredentials = z
        .object({email:z.string().email(), password:z.string().min(6)})
        .safeParse(credentials)

        if (parsedCredentials.success){
          const {email, password} = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null

          const passwordMatch = await bcrypt.compareSync(password, user.password)
          if (passwordMatch) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              password: user.password,
            };

          }

        }
        console.log('Invalid credentials');
        return null
      }
      
  })],
  callbacks:{
    async redirect({url, baseUrl}) {
        return url.startsWith(baseUrl)
      ? url
      : baseUrl
      }
  },
  
});