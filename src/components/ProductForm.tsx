'use client'
import { useActionState, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { addProduct } from '@/app/admin/_actions/products'
import { useFormStatus } from 'react-dom'


interface Category{
  id: number,
  name: string
}

export function ProductForm() {
  // const[priceInCents, setpriceInCents] = useState<number>()
  const [error, action] = useActionState(addProduct, {})
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch ('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories'); 
        }
        const categories = await response.json();
        setCategories(categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);
  
  return (
    <form action={action}>
      <div className='flex flex-col gap-8'>

        {/* Name */}
      <div className='justify-items-center '>
          <Label htmlFor='name'>Name</Label>
          <Input type='text' id='name' name='name'/>
          {error.name && <div className='text-destructive'>{error.name}</div>}
        </div>

        {/* Label */}
        <div className='justify-items-center'>
          <Label htmlFor='price'>Price</Label>
          <Input type='number'  step="any" id='price' name='price' required
          //  value={priceInCents} onChange ={ e=>setpriceInCents(Number(e.target.value) || undefined)} 
           />
          {error.price && <div className='text-destructive'>{error.price}</div>}
        </div>

        {/* Category */}
        <div className='justify-items-center '>
          <Label htmlFor='categoryId'>Category</Label>
          <select name="categoryId" id="categoryId">
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {error.categoryId && <div className='text-destructive'>{error.categoryId}</div>}
        </div>

        {/* Description */}
        <div className='justify-items-center'>
          <Label htmlFor='description'>Description</Label>
          <Textarea id='description' name='description'/>
          {error.description && <div className='text-destructive'>{error.description}</div>}
        </div>

        {/* Description */}
        <div className='justify-items-center'>
          <Label htmlFor='description'>Brand</Label>
          <Textarea id='brand' name='brand'/>
          {error.brand && <div className='text-destructive'>{error.brand}</div>}
        </div>

        {/* Image */}
        <div className='justify-items-center'>
          <Label htmlFor='image'>Image</Label>
          <Input type='file' id='image' name='image'/>
        </div>
        <div>
          <Label htmlFor='saleLink'>Sale Link</Label>
          <Input type='url' id='saleLink' name='saleLink'/>
          {error.saleLink && <div className='text-destructive'>{error.saleLink}</div>}
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