"use client"    
import React, { use, useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import SearchBar from './SearchBar'
import { Button } from './ui/button'
import { logout, updateSession } from '@/app/lib/session'
import { useRouter } from 'next/navigation'

export default function HeaderClient({ userRole }: { userRole: string }){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
   useEffect(() => {
    async function checkSession(){
      const response = await fetch('/api/user');
      console.log(response);
      if (response.ok) {
        setIsLoggedIn(true);
        
      }else { 
        setIsLoggedIn(false);
      }
      
     } checkSession();
    }, []);

   const handleButtonClick = async() =>{
    if(isLoggedIn){
      setIsLoggedIn(false);
      await logout();
    } else {
      router.push('/login');
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


