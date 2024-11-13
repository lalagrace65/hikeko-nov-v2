import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar'
import React from 'react'

export default function Dashboard_StaffPage() {
  return (
    <div className='flex min-h-screen'>
        <MultiLevelSidebar className="min-h-screen" />
        <div className="flex-1 p-8 flex flex-col">
            <div>Dashboard_StaffPage</div>
        </div> 
    </div> 
  )
}
