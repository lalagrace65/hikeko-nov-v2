import React from 'react';
import { useNavigate } from 'react-router-dom';

function TrailItem({ trail }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trails/${trail._id}`); // Navigate to the trail detail page
  };

  return (
    <div 
      className="w-[180px] flex-shrink-0 p-2 rounded-lg shadow-md mb-1 
                 bg-white hover:scale-110 transition-all cursor-pointer"
      onClick={handleClick} // Attach the click handler here
    >
      <img
        src={trail.trailImages[0]} 
        alt={trail.title} 
        width={200} 
        height={150} 
        className='rounded-lg object-cover h-[90px]' 
      />
      <h2 className="text-lg font-bold mt-1">{trail.title}</h2>
      <p className="text-sm">Trail Class: {trail.trailClass}</p>
      <p className="text-sm">Difficulty Level: {trail.difficultyLevel}/9</p>
      <p className="text-sm">Elevation: {trail.elevation} MASL</p>
    </div>
  );
}

export default TrailItem;