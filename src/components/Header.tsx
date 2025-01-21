"use client"
import { useEffect, useState } from 'react'
import Navbar from './Nav'
import HeaderClient from './HeaderClient';


 export default function Header () {
  const [userRole, setUserRole] =  useState<string>('Guest');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        console.log(response);
        if (response.ok) {
          const user = await response.json();
          setUserRole(user?.role ?? 'Guest');
        } else {
          console.error('User not found or not authenticated');
          setUserRole('Guest');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="flex items-center justify-between">
      <div className="font-semibold text-xl m-5 rounded text-orange-500">
        <h1>Hitkali</h1>
      </div>
      <div><Navbar /></div>
      <HeaderClient userRole={userRole} />
    </div>
  );
}

