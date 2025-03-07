import { useEffect, useState } from 'react';
import axios from 'axios';
import Packages from '../admin-components/Packages'; // Import the Packages component
import { baseUrl } from '@/Url';

export default function EditEvent({ updatedData, setUpdatedData, setEditMode, packageId }) {
    const [trails, setTrails] = useState([]); 

    useEffect(() => {
        const fetchPackageData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/packages/${packageId}`, { withCredentials: true });
                setUpdatedData(response.data);
            } catch (err) {
                console.error('Error fetching package data:', err);
                alert('Failed to fetch package data. Please try again.');
            }
        };

        // Fetch package data if packageId is defined
        if (packageId) {
            fetchPackageData();
        }
    }, [packageId, setUpdatedData]);

    // Fetch trails data for dropdown
    useEffect(() => {
        const fetchTrails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/trails`);
                setTrails(response.data);
            } catch (err) {
                console.error('Error fetching trails:', err);
            }
        };
        fetchTrails();
    }, []);

    const handleSave = async () => {
        try {
            // Ensure updatedData has the correct structure and all required fields
            if (!updatedData.packages || updatedData.packages.length === 0) {
                alert('Please select at least one package.');
                return;
            }
            // Make the API call to update the package
            const response = await axios.put(`${baseUrl}/packages/${packageId}`, updatedData, { withCredentials: true });
            if (response.status === 200) {
                alert('Package updated successfully!');
                setEditMode(false); // Exit edit mode after saving
            }
        } catch (err) {
            console.error('Error updating package:', err);
            if (err.response) {
                alert(`Failed to update package: ${err.response.data.message || 'Unknown error occurred.'}`);
            } else {
                alert('Failed to update package. Please try again later.');
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Edit Package</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Trail</label>
                <select
                    value={updatedData.trailId || ""} // Pre-select current trail if available
                    className="w-full px-3 py-2 border rounded-md"
                    required
                    disabled
                >
                    <option value="" disabled>Select a trail</option>
                    {trails.map((trail) => (
                        <option key={trail._id} value={trail._id}>{trail.title}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Packages</label>
                <Packages 
                    selected={updatedData.packages || []}
                    disabled
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Additional Package Inclusions</label>
                <input 
                    type="text" 
                    value={updatedData.additionalPackages || 'N/A'}
                    className="w-full px-3 py-2 border rounded-md" 
                    disabled
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Package Exclusions</label>
                <input 
                    type="text" 
                    value={updatedData.exclusions || ''} 
                    className="w-full px-3 py-2 border rounded-md" 
                    disabled 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Coordinator's Name</label>
                <input 
                    type="text" 
                    value={updatedData.coordinatorName || ''}
                    onChange={(e) => setUpdatedData({ ...updatedData, coordinatorName: e.target.value })} 
                    className="w-full px-3 py-2 border rounded-md" 
                />
            </div>
            <div className="grid gap-1 sm:grid-cols-3">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input 
                        type="number" 
                        value={updatedData.price || ''}
                        className="w-full px-3 py-2 border rounded-md"  
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Downpayment Policy</label>
                    <input 
                        type="number" 
                        value={updatedData.dpPolicy || ''} 
                        className="w-full px-3 py-2 border rounded-md"  
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Payment Options</label>
                    <input 
                        type="text" 
                        value={updatedData.paymentOptions || ''}
                        className="w-full px-3 py-2 border rounded-md" 
                        disabled 
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Extra Information</label>
                <textarea 
                    value={updatedData.extraInfo || 'N/A'}
                    className="w-full px-3 py-2 border rounded-md" 
                    placeholder="Enter extra information"
                    disabled 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Max Guests</label>
                <input 
                    type="text" 
                    value={updatedData.maxGuests || ''}
                    className="w-full px-3 py-2 border rounded-md" 
                    disabled 
                />
            </div>

            <button onClick={handleSave} className="bg-primary text-white p-2 rounded">Save</button>
            <button type="button" className="bg-gray-500 text-white p-2 rounded ml-4" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
    );
}
