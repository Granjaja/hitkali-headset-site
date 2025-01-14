import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import prisma from '@/db/db'
import { cache } from 'react'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    return { isAuth: false, userId: null };
  }
 
  return { isAuth: true, userId: session.userId }
})


export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session || !session.userId) return null

    const userId = parseInt(session.userId, 10)
    if (isNaN(userId)) return null;

   
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

  