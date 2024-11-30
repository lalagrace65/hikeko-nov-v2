import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar'
import Reports_BookingList from '@/components/admin-components/Reports_BookingList'
import Reports_Events from '@/components/admin-components/Reports_Events';
import Reports_Staff from '@/components/admin-components/Reports_Staff'
import Reports_Transactions from '@/components/admin-components/Reports_Transactions';
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
            className={`bg-transparent px-6 py-2 text-lg ${activeTab === 'bookings' ? 'border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Customer Reports
          </button>
          <button
            className={`bg-transparent px-6 py-2 text-lg ${activeTab === 'staff' ? 'border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('staff')}
          >
            Staff Report
          </button>
          <button
            className={`bg-transparent px-6 py-2 text-lg ${activeTab === 'events' ? 'border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('events')}
          >
            Events Report
          </button>
          <button
            className={`bg-transparent px-6 py-2 text-lg ${activeTab === 'transactions' ? 'border-b-4 border-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions Report
          </button>
        </div>

        {/* Render the active component based on the selected tab */}
        {activeTab === 'bookings' ? (
          <Reports_BookingList />
        ) : activeTab === 'staff' ? (
          <Reports_Staff />
        ) : activeTab === 'events' ? (
          <Reports_Events />
        ) :activeTab === 'transactions' ? (
          <Reports_Transactions />
        ) : null}
      </div>
    </div>
  )
}
