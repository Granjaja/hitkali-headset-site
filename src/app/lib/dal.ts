import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import prisma from '@/db/db'
import { cache } from 'react'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  console.log('cookie', cookie)
  console.log('session', session)

  if (!cookie){
    console.log('No cookie found', cookie)
  }
 
  if (!session?.userId) {
    console.log('No session found')
    return { isAuth: false, userId: null };
  }
 
  return { isAuth: true, userId: session.userId }
})


export const getUser = cache(async () => {
    const session = await verifySession()
    console.log('session', session)
    if (!session) {
      console.log('Invalid session or missing userId');
      return null;
    }
    
    const userId = Number(session.userId);
    if (isNaN(userId)) {
      console.log('userId is not a valid number:', session.userId);
      return null;
    }

   
    try {
      const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })
   
   
      return user
    } catch (error) {
      console.log('Failed to fetch user', error)
      return null
    }
  })

  