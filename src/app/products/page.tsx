
import prisma from '@/db/db'
import React from 'react'
import ProductCard from '@/components/ProductsCard'


export default async function Products() {
  const products = await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imagePath: true,
    },
  })

  if (products.length === 0) return <p>No products</p>

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
    
  )
}

