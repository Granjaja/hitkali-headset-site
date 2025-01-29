'use server'

import AuthError from "next-auth"
import { signIn, signOut } from "next-auth/react";


export default async function authenticate(
    prevState: string | undefined,
    formData: FormData
) : Promise<string | undefined> {
    try{
        console.log('Authenticating user...', formData);

        const result = await signIn('credentials', {
            redirect: false,
            callbackUrl: '/',
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          });

          console.log('Authentication result:', result);

          if (result?.ok) {
            return undefined;
        } else {
            return 'Invalid credentials';
        }
          
    } catch(error){
        if (error instanceof AuthError){
                    return 'Something went wrong'
            }
        return 'Something went wrong';
        }
    }
  
    export async function authSignOut(): Promise<{ ok: boolean; message: string }> {
        try {
          await signOut({ redirect: false }); // Ensure no auto-redirect
          console.log("User signed out successfully");
          return { ok: true, message: "Sign out successful" };
        } catch (error) {
          console.error("Error during sign-out:", error);
          return { ok: false, message: "Sign out failed" };
        }
      }


