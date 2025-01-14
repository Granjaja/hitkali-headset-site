import 'server-only'
import { getUser } from '@/app/lib/dal'
import prisma from '@/db/db'

interface User {
  id: number;
  name: string | null;
  email: string;
  password: string;
  role: string;
  
}
 
function canSeeUsername(viewer: User) {
  return !! viewer;
}
 
 
export async function getProfileDTO(email: string) {
  const user = await prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });
 
  if (!user) {
    throw new Error('User not found');
  }

  const currentUser = await getUser() as User;

  if (!currentUser) {
    throw new Error('Current user not found');
  }
 
  return {
    username: canSeeUsername(currentUser) ? user.name : null,
   
  }
}