'use server'
import { getUser, verifySession } from '@/app/lib/dal'
import { AuthError } from 'next-auth';
import { signIn } from '../api/auth/[...nextauth]';

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
 
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}