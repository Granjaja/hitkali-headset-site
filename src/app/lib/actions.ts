'use server'
import { getUser } from '@/app/lib/dal'

type Role = 'USER' | 'ADMIN';

// Function to validate the role
function validateRole(role: string): role is Role {
  return role === 'USER' || role === 'ADMIN';
}
 
export async function serverAction(formData: FormData) {
  const user = await getUser();
  if (!user) {
    return { error: 'User not found' };
  }



  const userRole = user.role;
 
  if (!validateRole(userRole)) {
    return { error: 'Invalid role' };
  }
  // Return early if user is not authorized to perform the action
  if (userRole !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }
 console.log(formData) 
}

