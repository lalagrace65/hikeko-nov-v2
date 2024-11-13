import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar'
import React from 'react'

export default function Dashboard_Projects() {
  return (
    <div className="flex min-h-screen">
        <MultiLevelSidebar />
        <div className='flex-1 p-10'>
            <div>Dashboard_Reports</div>
        </div>   
    </div>
  )
}
