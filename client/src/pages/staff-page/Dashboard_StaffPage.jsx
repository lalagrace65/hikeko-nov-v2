import React from 'react'
import { StaffSidebar } from './StaffSidebar'

export default function Dashboard_StaffPage() {
  return (
    <div className='flex min-h-screen'>
        <StaffSidebar className="min-h-screen" />
        <div className="flex-1 p-8 flex flex-col">
            <div>Dashboard_StaffPage</div>
        </div> 
    </div> 
  )
}
