"use client"


import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { deleteProduct } from '../_actions/products'
import Image from 'next/image'

interface ProductCardProps {
    product: {
      id: number
      name: string
      description: string
      price: number
      brand: string
      saleLink: string
      imagePath: string
    }
    
  }

const ProductCard = ({product} : ProductCardProps)=> {
  const router = useRouter()

  const handleDeleteProduct = async () => {
    await deleteProduct(product.id)
        
      router.refresh()
 }

  return (
    <Card key={product.id} className='flex flex-col h-full'>
          <CardHeader>
            <CardTitle className='text-lg'>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            <Image width={200} height={200}
              src={product.imagePath as string}
              alt={product.name}
              className='w-full h-40 object-cover rounded'
            />
          </CardContent>
          <CardContent>
            <p className='text-sm'>{product.description}</p>
          </CardContent>
          <CardFooter className='justify-center'>
            <Button onClick={handleDeleteProduct}>Delete Product</Button>
          </CardFooter>
        </Card>
  )
}

export default ProductCard
