'use server'
import 'server-only'
import { EncryptJWT, compactDecrypt, decodeProtectedHeader } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'




const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  throw new Error('SESSION_SECRET is not set')
}
const encodedKey = Buffer.from(secretKey, 'base64')
console.log('Encoded key:', encodedKey, encodedKey.length);

export async function encrypt(payload: SessionPayload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error("Invalid payload: It must be an object.");
  }
  console.log("Encrypting payload:", payload);

  return new EncryptJWT(payload)
  .setProtectedHeader({ alg: 'dir', enc: "A256GCM" })
  .setIssuedAt()
  .setExpirationTime('7d')
  .encrypt(encodedKey)
}

export async function decrypt(session: string| undefined = '') {
  if (!session) {
    console.log('No session data found. Redirecting to login.');
    await deleteSession(); // Clean up any lingering invalid data
    // redirect('/login');
    return null;
  }
  
    try{
      console.log('Decrypting session:', session);

        const header = decodeProtectedHeader(session);
        console.log('JWE Header:', header);
        console.log('Decrypting session:', session);
        const {plaintext, protectedHeader} = await compactDecrypt(session, encodedKey,)
        const payload = JSON.parse(new TextDecoder().decode(plaintext));
        console.log('Session decrypted:', payload);
        console.log('Protected header:', protectedHeader);
        return payload;
    } catch (error) {
        console.log('Failed to decrypt session:', error)
        return null;    
    }   
}

export async function createSession(userId: string) {
  if (!userId) {
    console.log('User ID is required to create a session.')
    throw new Error("User ID is required to create a session.");
  }
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime();
    const session = await encrypt({ userId, expiresAt });
    console.log('Session created:', session);
    const cookieStore = await cookies();
   
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })


    console.log('Session created:', session);
    return session;

  }

  export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    console.log('updateSession', session)
   
    if (!session ) {
      console.log('No session data found.')
      return null
    }

    if (!payload) {
      console.log('Invalid session data found.')
      return null
    }
   
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime();
   
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
      httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
    })
  }

  export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session');
    console.log('Session deleted successfully.');
  }

  export async function logout() {
   await deleteSession()
    redirect('/signin')
  }