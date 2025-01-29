"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function SearchBar() {

const [searchQuery, setsearchQuery] = useState("")
const router = useRouter()

const handleSearch = async (e:React.FormEvent) => {
  e.preventDefault()


  if (searchQuery.trim()){
    router.push(`/results?query=${encodeURIComponent(searchQuery.trim())}`)
  }
}




  return (
    <div className=' flex w-auto'>
      <form onSubmit={handleSearch} className='flex items-center space-x-1'>
        <div className='relative'>
        <Input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e)=> setsearchQuery(e.target.value)}
          />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> 
        </div>
        <div>
          <Button>Search</Button>
        </div>
        
      </form>   
    </div>
  )
}
