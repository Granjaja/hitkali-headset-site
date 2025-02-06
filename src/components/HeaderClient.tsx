"use client"    
import React, {useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import SearchBar from './SearchBar'
import { Button } from './ui/button'
import { logout } from '@/app/lib/session'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Link from 'next/link'


export default function HeaderClient({ userRole }: { userRole: string }){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
   useEffect(() => {
    async function checkSession(){
      try {
        const response = await axios.get('/api/user');  
      console.log('User:', response.data);
      if (response.data) {
        setIsLoggedIn(true);
        
      }else { 
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('No session found', error);
      setIsLoggedIn(false);
      
     }
     } checkSession();
    }, []);

   const handleButtonClick = async() =>{
    if(isLoggedIn){
       await logout();
        setIsLoggedIn(false)
  
    } else {
      setIsLoggedIn(true);
      router.push("signin")

    }
    
   };
 
  return (
    <div className="flex items-center gap-4">
    {userRole === "ADMIN" && <Button variant="outline"> <Link href='/dashboard'>Admin Panel</Link></Button>}
    <SearchBar />
    <FaRegUser className={userRole === "ADMIN" ? "text-orange-500" : "text-blue-500"} />
    <Button variant="outline" onClick={handleButtonClick}>
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  </div>
 )}
      



