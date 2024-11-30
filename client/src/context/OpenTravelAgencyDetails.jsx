import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '@/Url';

const OpenTravelAgencyDetails = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { packageId } = useParams(); // Get package ID from the URL
  const [packageDetail, setPackageDetail] = useState(null);

  useEffect(() => {
    const fetchPackageDetail = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/packages/${packageId}`);
            setPackageDetail(response.data);
        } catch (error) {
            console.error('Error fetching package details:', error);
        }
    };
    fetchPackageDetail();
    }, [packageId,]);

    if (!packageDetail) return <p>Loading...</p>;

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto shadow-lg">
        <h2 className="text-xl font-semibold">Travel Agency Details</h2>
        <div className="mt-4 text-sm space-y-6 max-h-96 overflow-y-auto">
            <div className='flex flex-col-2 space-x-2 mt-2'>
                <div className='flex'>
                    {packageDetail.travelAgency?.avatar ? (
                        <img
                        src={packageDetail.travelAgency.avatar}
                        alt={`${packageDetail.travelAgency.name} Logo`}
                        className="w-12 h-12 object-cover rounded-full"
                        />
                    ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full" /> // Placeholder for logo if none exists
                    )}
                </div>
                <div className='flex'>
                    <p className="mt-4 text-sm"><strong>{packageDetail.travelAgency.businessName}</strong></p>
                </div> 
            </div>
            
            <div className="mt-4 text-sm max-h-96 overflow-y-auto">
            <h3 className="font-semibold mt-4">Business Owner Name</h3>
                <p>{packageDetail.travelAgency.firstName} {packageDetail.travelAgency.lastName}</p>
            <h3 className="font-semibold mt-4">Business Email</h3>
                <p>{packageDetail.travelAgency.email}</p>
            <h3 className="font-semibold mt-4">Business Address</h3>
                <p>{packageDetail.travelAgency.businessAddress}</p>
            <h3 className="font-semibold mt-4">Business Contact No.</h3>
                <p>{packageDetail.travelAgency.businessContactNo}</p>

            </div>

            <div className="flex justify-end mt-6">
            <Button color="gray" onClick={onClose} className="ml-2">
                Close
            </Button>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default OpenTravelAgencyDetails;
