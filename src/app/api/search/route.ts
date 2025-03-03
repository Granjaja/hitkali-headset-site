import prisma from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET(req:Request) {
    const {searchParams} = new URL(req.url);
    const query = searchParams.get('query');

    if (!query){
        return NextResponse.json({error: "query is required"})
    }

const products = await prisma.product.findMany({
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

