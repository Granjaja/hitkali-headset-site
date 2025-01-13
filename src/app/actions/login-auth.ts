'use server'

import { AuthError } from "next-auth"
import { signIn } from "../api/auth/[...nextauth]"
import { redirect } from "next/navigation"


export default async function authenticate(
    prevState: string | undefined,
    formData: FormData
) : Promise<string | undefined> {
    try{
        const result = await signIn('credentials', {
            redirect: false,
            callbackUrl: '/dashboard',
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          });
          if (result?.ok) {
            redirect('/'); 
        } else {
            return 'Invalid credentials';
        }
          
    } catch(error){
        if (error instanceof AuthError){
            switch (error.type){
                case 'CredentialsSignin':
                    return 'Invalid credentials'
                default:
                    return 'Something went wrong'
            }
        }
        // throw error;
    }
  
}


