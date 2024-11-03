import { MultiLevelSidebar } from "@/components/admin-components/AdminSidebar";
import React from "react"; // Ensure you import useContext

export default function AdminPage() {

    return (
        <div className='flex h-screen'>
            <MultiLevelSidebar />
            <div className='flex-1 p-10'>
                <p className="text-3xl font-bold mb-4">Admin Page</p>
            </div>
        </div>
    );
}
