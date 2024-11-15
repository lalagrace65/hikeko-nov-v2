import React from 'react';

// Color mapping for difficulty levels (1 to 9)
const difficultyColors = [
  'bg-green-500',  // Difficulty Level 1
  'bg-green-600',  // Difficulty Level 2
  'bg-yellow-500', // Difficulty Level 3
  'bg-yellow-600', // Difficulty Level 4
  'bg-orange-500', // Difficulty Level 5
  'bg-orange-600', // Difficulty Level 6
  'bg-red-500',    // Difficulty Level 7
  'bg-red-600',    // Difficulty Level 8
  'bg-purple-500', // Difficulty Level 9
];

// Color mapping for trail classes
const trailClassColors = [
  'bg-green-500',   // 1 – Walking (easy stroll)
  'bg-yellow-500',  // 2 – Hiking along a path/rugged terrain
  'bg-orange-500',  // 3 – Scrambling (using hands for balance)
  'bg-blue-500',     // 4 – Climbing easy cliffs but with enough drop off- beginners should be roped.
  'bg-purple-500',  // 5 – Using free hands as climbing method
  'bg-red-500',    // 6 – very difficult and need to use artificial method
];

const Legend = ({ trailClass, difficultyLevel }) => {
  // Ensure difficultyLevel is within 1-9, else fallback to gray
  const difficultyColor = difficultyColors[difficultyLevel - 1] || 'bg-gray-500'; 

  // Get the color based on the trail class
  const trailClassColor = trailClassColors[trailClass - 1] || 'bg-gray-500';

  return (
    <div className="flex items-center gap-2 mt-2">
      <span className={`${trailClassColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
        Trail Class: {trailClass}
      </span>
      <span className={`${difficultyColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
        Difficulty Level: {difficultyLevel}/9
      </span>
    </div>
  );
};

export default Legend;
