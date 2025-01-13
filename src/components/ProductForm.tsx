'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { addProduct } from '@/app/admin/_actions/products'
import { useFormStatus } from 'react-dom'

export function ProductForm() {
  // const[priceInCents, setpriceInCents] = useState<number>()
  const [error, action] = useActionState(addProduct, {})
  
  return (
    <form action={action}>
      <div className='flex flex-col gap-8'>
      <div className='justify-items-center '>
          <Label htmlFor='name'>Name</Label>
          <Input type='text' id='name' name='name'/>
          {error.name && <div className='text-destructive'>{error.name}</div>}
        </div>
        <div className='justify-items-center'>
          <Label htmlFor='price'>Price</Label>
          <Input type='number' id='price' name='price' required
          //  value={priceInCents} onChange ={ e=>setpriceInCents(Number(e.target.value) || undefined)} 
           />
          {error.price && <div className='text-destructive'>{error.price}</div>}
        </div>
        <div className='justify-items-center'>
          <Label htmlFor='description'>Description</Label>
          <Textarea id='description' name='description'/>
          {error.description && <div className='text-destructive'>{error.description}</div>}
        </div>
        <div className='justify-items-center'>
          <Label htmlFor='image'>Image</Label>
          <Input type='file' id='image' name='image'/>
          {error.image && <div className='text-destructive'>{error.image}</div>}
        </div>
        <div><SubmitButton/></div>
      </div>
    </form>
  )
}

function SubmitButton(){
  const {pending} = useFormStatus()
  return <Button type='submit' disabled={pending}>{pending? "Saving...": "Save"}</Button>

}