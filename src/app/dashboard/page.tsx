import { getUser } from '@/app/lib/dal'
import AdminDashboard from '@/components/AdminDashboard'
import UserDashboard from '@/components/UserDashboard'
import { redirect } from 'next/navigation'
 
export default async function Dashboard() {
  const user = await getUser()
  const userRole = user?.role 
  console.log("userRole:", userRole)
 
  if (userRole === 'ADMIN') {

    return <AdminDashboard />
  } else if (userRole === 'USER') {
    return <UserDashboard />
  } else {
    redirect('/signin')
  }
}