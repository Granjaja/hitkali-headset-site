"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
  {name:"home", 
    path:"/"
  },
  {name:"Brands", 
    path:"/brands"
  },
  {name:"Products", 
    path:"/products"
  },
  
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='flex gap-8 justify-center'>{
      links.map((link, index) => {
        return <Link href={link.path} key={index} className='capitalize'>{link.name}</Link>
      })
      
      }

    </nav>
  )
}

export default Navbar
