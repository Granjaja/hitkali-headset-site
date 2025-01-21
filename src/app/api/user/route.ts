import { getUser, verifySession } from '@/app/lib/dal'
import { NextResponse } from 'next/server';
 
export async function GET() {
  // User authentication and role verification
  const session = await verifySession()
  const user = await getUser()
  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    console.log('No session found')
    return new Response(null, { status: 401 })
  }

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: 'User not found or not authenticated' }, { status: 404 });
  }
 
  }
 
  // Continue for authorized users
