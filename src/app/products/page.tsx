
import prisma from '@/db/db'
import React from 'react'
import ProductCard from '@/components/ProductsCard'


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  brand: string;
  saleLink: string;
}


export default async function Products() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      categoryId:true,
      imagePath: true,
      brand: true,
      saleLink: true,
    },
  })

  if (products.length === 0) return <p>No products</p>

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
    
  )
}

