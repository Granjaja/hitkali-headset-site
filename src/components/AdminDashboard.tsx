import React from 'react'
import TableComponent from './ui/tablecomponent'
import BarComponent from './ui/barcomponent'
import PieChartComponent from './piechart'

export default function AdminDashboard() {
  return (
    <div className='flex items-center gap-5'>
      <div>
      <TableComponent/>
      </div>
      <div>
      <BarComponent/>
      </div>
      <div>
      <PieChartComponent/>
      </div>
      
      
    </div>
  )
}
