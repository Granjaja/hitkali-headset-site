"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';


export default function LoginForm() {
  const [error, setError] = useState('');
  const router = useRouter()

  // const router = useRouter();
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate, 
  //   undefined
  // )
  return (
    <form 
    action={async (formData) => {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: '/',
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      })

      if (result?.error) {
        setError(result.error); // Display error message
      } else {
        if (result?.url) {
          router.push(result.url); // Redirect to the callback URL
        } else {
          router.refresh(); // Redirect to home page
        }
      }
    }
    
}
  className="space-y-3 w-3/4 mt-12 mx-auto">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 ">
        <h1 className={`mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button type='submit' className="mt-4 w-full flex items-center justify-center" 
        // aria-disabled={isPending}
        > 
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

