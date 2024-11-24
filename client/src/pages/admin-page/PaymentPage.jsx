import { MultiLevelSidebar } from '@/components/admin-components/AdminSidebar'
import React from 'react'
import { Button } from '@material-tailwind/react'

export default function PaymentPage() {
  return (
    <div className="flex h-screen">
    <MultiLevelSidebar />
    <div className="flex-1 p-8">
        <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl mb-4">Transaction List</h2>
                <div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booking Reference No.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Joiner Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Proof of Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type of Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                            <React.Fragment >
                               
                                    <tr className="bg-gray-100">
                                        <td colSpan="4" className="px-6 py-4">
                                            <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                                                <span><strong>Joiner Name:</strong> </span>
                                                <span><strong>Email:</strong> </span>
                                                <span><strong>Contact Number:</strong> </span>
                                                <span><strong>Pickup Location:</strong> </span>
                                                <span><strong>Age:</strong> </span>
                                                <span><strong>Sex:</strong> </span>
                                                <span><strong>Home Address:</strong> </span>
                                                <span><strong>Emergency Contact Person:</strong> </span>
                                                <span className="flex items-center space-x-1">
                                                    <strong>Medical Condition:</strong> 
                                                </span>
                                                <span><strong>Terms Accepted:</strong> </span>
                                                <span><strong>Payment Type:</strong> </span>
                                                <span><strong>Proof of Payment:</strong> </span>
                                            </div>
                                        </td>
                                    </tr>
                               
                            </React.Fragment>
                     
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <Button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    >
                        Previous
                    </Button>
                    <span>
                    </span>
                    <Button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    >
                        Next
                    </Button>
                </div>
            </div>

           
        </div>
    </div>
</div>
  )
}