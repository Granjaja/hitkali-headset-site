import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient



export async function GET(req:Request) {
    const {searchParams} = new URL(req.url);
    const query = searchParams.get('query');

    if (!query){
        return NextResponse.json({error: "query is required"})
    }

const products = await prisma.products.findMany({
    where:{
        OR:[
            {name: {contains: query?.toString(), }},
            {description:{contains: query?.toString()}}
        ]
    }
})
console.log(products)

return NextResponse.json(products)

}

