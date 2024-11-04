import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Main FeaturePage Component
export default function FeaturePage() {
  const [feature, setFeature] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const response = await fetch('https://hikeko-nov-v2.onrender.com/api/features');
        if (!response.ok) throw new Error("Failed to fetch feature data");
        const data = await response.json();
        setFeature(data);
        console.log("Feature Data:", data);
      } catch (error) {
        console.error('Error fetching feature:', error);
      } finally {
        setLoading(false); // End loading regardless of fetch outcome
      }
    };

    fetchFeature();
  }, []);  

  if (loading) {
    return (
      <section className="bg-gray-200 text-white py-12">
        <Skeleton height={32} width="80%" className="mb-4" />
        <Skeleton height={20} width="60%" className="mb-6" />
        <Skeleton height={40} width={150} className="rounded-full" />
      </section>
    );
  }

  return (
    <section className="bg-gray-200 text-white py-12">
      <div className="container mx-auto grid grid-cols-2 gap-12 items-center">
        <div>
          {feature ? (
            <div className='py-6 px-20'>
              <h1 className="text-4xl font-semibold text-black">
                {feature.titleText_1}
              </h1>
              <p className="text-gray-700 text-sm mb-6">
                {feature.description_1}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/travelAgencySignUp')}
                  className="flex items-center bg-primary-500 px-4 py-2 rounded-full text-sm gap-2">
                  Partner with us
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">No feature data available</p>
          )}
        </div>

        <div className="relative h-64">
          {feature && feature.bannerImage_1 && feature.bannerImage_1.length ? (
            <img
              src={feature.bannerImage_1[0]}
              alt={feature.titleText_1}
              className="object-contain h-full w-full"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>
    </section>
  );
}
