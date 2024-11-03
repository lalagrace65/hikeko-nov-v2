import React, { useState, useEffect } from 'react';
import Data from '@/Shared/Data';
function SelectRating({ onRatingChange }) {
  const [selectedRating, setSelectedRating] = useState([]);

  const onSelectRating = (isChecked, value) => {
    if (isChecked) {
      setSelectedRating([...selectedRating, value]);
    } else {
      setSelectedRating(selectedRating.filter((n) => n !== value));
    }
    console.log(selectedRating);
  };

  useEffect(() => {
    if (typeof onRatingChange === 'function') {
      onRatingChange(selectedRating); // Call only if onRatingChange is a function
    } else {
      console.error('onRatingChange is not a function');
    }
  }, [selectedRating]);

  return (
    <div className='px-2 mt-5'>
      <h2 className='font-bold'>Select Rating</h2>
      <div>
        {Data.ratingList.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <label>{item.icon}</label>
            <input
              type='checkbox'
              onChange={(e) => onSelectRating(e.target.checked, item.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectRating;