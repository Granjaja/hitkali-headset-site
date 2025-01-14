"use server"

import { z } from 'zod'
import fs from  "fs/promises"
import prisma from '@/db/db'
import { redirect } from 'next/navigation'

const fileSchema = z.instanceof(File, {message:"Required"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().int().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required")
})


export async function addProduct(prevState:unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false){
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("public/products", {recursive: true})
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

  console.log("imagePath", imagePath)

  const addedProduct = await prisma.products.create({
    data:{
      name:data.name,
      description:data.description,
      price:data.price,
      imagePath:imagePath
    }
  })

  return addedProduct

}
redirect("/admin/products-list")



export async function deleteProduct(id:number){
  try {
    const deletedProduct = await prisma.products.delete({
      where: {
        id: id,
      }
    });
    return deletedProduct;
  } catch (error) {
    console.error("Error during product deletion:", error);
    return { errors: { general: ["An unexpected error occurred. Please try again."] } };
  }
}