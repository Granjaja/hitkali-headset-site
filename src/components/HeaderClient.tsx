"use client"    
import React, { use, useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import SearchBar from './SearchBar'
import { Button } from './ui/button'
import { logout } from '@/app/lib/session'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { signOut } from 'next-auth/react'


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
        router.push("/");
  
    } else {
      router.push("/signin");
    }
    
   };
 
  return (
    <div>
      <div>
       {userRole === 'ADMIN' ? (
        <div className="flex items-center gap-4">
          <Button variant="outline">Admin Panel</Button>
          <SearchBar />
          <FaRegUser className="text-orange-500"  />
          <Button variant="outline" onClick={handleButtonClick} className={`isLoggedIn? visible: invisible`} >{isLoggedIn? 'Logout': 'Login'}</Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <SearchBar />
          <FaRegUser className="text-blue-500" />
          <Button variant="outline" 
          onClick={handleButtonClick} 
          // className={`isLoggedIn? visible: invisible`}
          >{isLoggedIn? 'Logout': 'Login'}</Button>

        </div>
      )}
      
    </div>
    </div>
    
  )
}


