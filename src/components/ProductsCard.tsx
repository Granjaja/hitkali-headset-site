"use client"


import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    product: {
      id: number
      name: string
      description: string
      price: number
      imagePath: string
      saleLink: string
      brand: string
    }
    
  }

const ProductCard = ({product} : ProductCardProps)=> {
  const router = useRouter()

  const handleAddtoCard = async () => {
        
      router.refresh()
 }

  return (
    <Card key={product.id} className='flex flex-col h-full'>
          <CardHeader>
            <CardTitle className='text-lg'>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            <Image
              src={product.imagePath as string}
              alt={product.name}
              width={200}
              height={200}
              className='w-full h-40 object-cover rounded'
            />
          </CardContent>
          <CardContent>
            <p className='text-sm'>{product.description}</p>
          </CardContent>
          <CardContent>
            <p className='text-sm'>{product.brand}</p>
          </CardContent>
          <CardFooter className='justify-center'>
            <Button >
              <Link href={product.saleLink}>Purchase</Link>
              
              </Button>
          </CardFooter>
        </Card>
  )
}

export default ProductCard
