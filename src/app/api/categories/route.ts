import prisma from '@/db/db';
import { NextResponse } from 'next/server'


export async function GET() {
    try {
        const categories = await prisma.category.findMany({  
          select: { id: true, name: true }
        });
    
        return NextResponse.json(categories);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }

}
