import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar'
import Reports_BookingList from '@/components/admin-components/Reports_BookingList'
import Reports_Staff from '@/components/admin-components/Reports_Staff'
import React, { useState } from 'react'

export default function Dashboard_Reports() {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="flex min-h-screen">
      <MultiLevelSidebar />
      <div className='flex-1 p-10'>
        {/* Tabs for switching between components */}
        <div className="flex border-b-2 mb-6">
          <button
            className={`px-6 py-2 text-lg ${activeTab === 'bookings' ? 'border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Booking List
          </button>
          <button
            className={`px-6 py-2 text-lg ${activeTab === 'staff' ? 'border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('staff')}
          >
            Staff Report
          </button>
        </div>

        {/* Render the active component based on the selected tab */}
        {activeTab === 'bookings' ? (
          <Reports_BookingList />
        ) : activeTab === 'staff' ? (
          <Reports_Staff />
        ) : null}
      </div>
    </div>
  )
}
