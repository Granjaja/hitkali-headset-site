"use client"    
import React, {useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import SearchBar from './SearchBar'
import { Button } from './ui/button'
import { logout } from '@/app/lib/session'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios';
import Link from 'next/link'


export default function HeaderClient({ userRole }: { userRole: string }){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const checkSession = async() => {
    try {
      const response = await axios.get('/api/user');  
    // console.log('User:', response.data);
    setIsLoggedIn(!!response.data);
  } catch (error) {
    console.log('No session found', error);
    setIsLoggedIn(false);
    
   }
   } 

    useEffect(() => {
      checkSession();
    }, [pathname]);

   

   const handleButtonClick = async() =>{
    try {
    if(isLoggedIn){
     
        await logout()
        setIsLoggedIn(false)
        router.push("/signin");
      } 
   }catch (error) {
      console.log('Error logging out', error);
    }
   }
 
  return (
    <div className="flex items-center gap-4">
    {userRole === "ADMIN" && <Link href='/dashboard'> <Button variant="outline"> Admin Panel</Button></Link>}
    <SearchBar />
    <FaRegUser className={userRole === "ADMIN" ? "text-orange-500" : "text-blue-500"} />
    <span>{isLoggedIn ? "Welcome" : "Guest"}</span>    
    {isLoggedIn ? (
        <Button variant="outline" onClick={handleButtonClick}>Logout</Button>
      ) : (
        <Link href="/signin">
          <Button variant="outline">Login</Button>
        </Link>
      )}
    
  </div>
 )}


