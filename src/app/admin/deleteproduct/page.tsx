
import prisma from '@/db/db'
import React from 'react'
import ProductCard from '../_component/adminproductcard'


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath: string;
}

export default async function Products() {
  const products = await prisma.product.findMany({
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
      <div className='m-5 p-3'>
        {/* <Button> <Link href="/admin/newproduct">Add Products</Link> </Button> */}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
    
  )
}

