'use server'
import { verifySession } from '@/app/lib/dal'
import { AuthError } from 'next-auth';
import { signIn } from '../../../auth';
 
export async function serverAction(formData: FormData) {
  const session = await verifySession()
  const userRole = session?.user?.role
 
  // Return early if user is not authorized to perform the action
  if (userRole !== 'admin') {
    return null
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