import React from 'react'
import TableComponent from './ui/tablecomponent'
import BarComponent from './ui/barcomponent'
import PieChartComponent from './piechart'
import Link from 'next/link'
import { Button } from './ui/button'

export default function AdminDashboard() {
  return (
    <div className='grid grid-col-2 gap-8 p-6'>
      <h1 className='flex text-green-400 font-semibold justify-center text-2xl col-span-2'>Admin Dashboard</h1>
      {/* Left Grid */}
      <div className='flex flex-col items-center gap-10'>
        
        <div>
        <Link href='/admin/newproduct'>
        <Button>Add New Products</Button>
        </Link>
        </div>
        <div>
        <Link href='/admin/deleteproduct'>
        <Button>Delete Product</Button>
        </Link>
        </div>
        <div>
      <TableComponent/>
      </div>
      </div>
      {/* Right Grid */}
      <div className='flex flex-col items-center gap-10'>
      <div>
      <BarComponent/>
      </div>
      <div>
      <PieChartComponent/>
      </div>
      </div>
    </div>
  )
}
