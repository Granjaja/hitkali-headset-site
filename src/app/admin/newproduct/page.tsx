import { ProductForm } from '@/components/ProductForm'
import React from 'react'

export default function page() {

  return (
    <div className='flex items-center flex-col gap-10'>
      <div >
        <h1>Create New Form</h1>
      </div>
      <div>
        <ProductForm/>
      </div>
    </div>
  )
}
