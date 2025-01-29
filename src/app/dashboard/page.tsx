import { getUser } from '@/app/lib/dal'
import AdminDashboard from '@/components/AdminDashboard'
import UserDashboard from '@/components/UserDashboard'
import { redirect } from 'next/navigation'
 
export default async function Dashboard() {
  const user = await getUser()
  const userRole = user?.role 
 
  if (userRole === 'admin') {
    return <AdminDashboard />
  } else if (userRole === 'user') {
    return <UserDashboard />
  } else {
    redirect('/login')
  }
}