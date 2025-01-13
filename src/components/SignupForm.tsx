"use client"

import { signup } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useActionState } from 'react';

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form action={action} className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input id="name" name="name" type="text" placeholder="Enter your name" className="mt-1" />
          </div>
          {state?.errors && 'name' in state.errors && <p>{state.errors.name}</p>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="Enter your email" className="mt-1" />
          </div>
          {state?.errors && 'email' in state.errors && <p>{state.errors.email}</p>}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1"
            />
          </div>
          {state?.errors && 'password' in state.errors && <p>{state.errors.password}</p>}
          
          {state?.errors && 'general' in state.errors && <p>{state.errors.general}</p>}
          
          <Button disabled={pending} type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

