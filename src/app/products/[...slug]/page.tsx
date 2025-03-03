import prisma from '@/db/db';
import React from 'react'


export const revalidate = 60;

export const dynamicParams = true;

export const generateStaticParams = async () => {

  const categories = await prisma.category.findMany({  
    select: { id: true, name: true }})

  return categories.map((category : {name: string}) => ({
    slug: [category.name.toLowerCase()],
  }))

}


export default async function CategoryPage({params}: {params: Promise<{ slug: string[] }>}) {

  const slugArray = (await params).slug || [];
  const slug = await slugArray[0]
  
  const categories = await prisma.category.findMany({  
    select: { id: true, name: true }})

  console.log(categories)

  const category = categories.find((cat : {name: string}) => cat.name.toLowerCase() == slug)
  console.log(category)
  return (
    <div>
      {category ? (
        <div>
          <h1>Category: {category.name}</h1>
        </div>
      ) : (
        <div>
          <h1>Category not found</h1>
        </div>
      )}
    </div>
  )
}
