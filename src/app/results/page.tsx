"use client"

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Product= {
    id: number; 
    name:string;
    description:string;
    price:number;
    imagepath:string 
    
}

export default function page() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query")
    const [products, setProducts] = useState<Product[]>([])

   useEffect(() =>{
    if(query){
        const fetchProducts = async () =>{
            const response = await fetch(`/api/search?query=${query}`)
            const data = await response.json()
            setProducts(data)
        }
        fetchProducts()
    }
   }, [query])

  return (
    <div>
        <h1>Results</h1>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  )
}
