import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },

  callbacks: {
    authorized({auth, request: { nextUrl }}: { auth: any, request: { nextUrl: URL } }){
        const isLoggedIn = !!auth?.user;
        const isOnAdmin = nextUrl.pathname.startsWith('/dashboard')

        if (isOnAdmin) {
            if (isLoggedIn) return true
                return false 
            } else if (isLoggedIn){
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        
    }
  },
  providers:[]

  };

  authConfig satisfies NextAuthConfig;