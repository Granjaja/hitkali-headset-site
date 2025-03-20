"use client"
import { useEffect, useState } from 'react'
import Navbar from './Nav'
import HeaderClient from './HeaderClient';
import axios from 'axios';





 export default function Header () {
  const [userRole, setUserRole] =  useState<string>('Guest');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        console.log('User:', response);
        if (response) {
          const user = await response.data;
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
    <div className="flex items-center justify-between p-4">
  {/* Logo & Title */}
  <div className="flex items-center space-x-3">
    <h1 className="font-semibold font-meaculpa text-5xl px-4 py-2 bg-sky-900 text-orange-500 rounded-2xl shadow-lg inline-flex items-baseline">
      Apical
      <span className="text-purple-500 text-2xl ml-1">h</span>
      <span className="text-green-500 text-2xl">z</span>
    </h1>      
  </div>

  {/* Navigation & User Role */}
  <div className="flex items-center space-x-4">
    <Navbar />
    <HeaderClient userRole={userRole} />
  </div>
</div>

  );
}

