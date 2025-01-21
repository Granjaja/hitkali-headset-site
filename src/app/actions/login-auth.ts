'use server'

import AuthError from "next-auth"
import { redirect } from "next/navigation"
import { signIn } from "../auth";


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
                    return 'Something went wrong'
            }
        }
        // throw error;
    }
  



