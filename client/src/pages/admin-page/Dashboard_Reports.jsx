import ActivityLogs from '@/components/admin-components/AdminActivityLogs'
import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar'
import React from 'react'

export default function Dashboard_Reports() {
  return (
    <div className="flex min-h-screen">
        <MultiLevelSidebar />
        <div className='flex-1 p-10'>
            <ActivityLogs />
        </div>   
    </div>
  )
}