import React from 'react'
import Navbar from './Nav'
import { FaRegUser } from 'react-icons/fa'
import SearchBar from './SearchBar';


const Header = () => {
  return (
  
  <div className="flex items-center justify-between">
      <div className="font-semibold text-xl m-5 rounded text-orange-500" >
          <h1>Hitkali</h1>
      </div>
      <div><Navbar/></div>
      <div className="flex items-center relative gap-2 w-auto">
        <div>
          <FaRegUser/>
        </div>
        <div>
          <SearchBar/>
        </div>
        
      </div>
    </div>
       
    )}

export default Header
