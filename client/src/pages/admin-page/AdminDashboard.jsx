import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar'
import React from 'react'

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
        <MultiLevelSidebar/>
        <div className="flex-1 p-8"> 
            AdminDashboard
        </div>
    </div>
  )
}
