import React from 'react';

export const MedicalCondiToolTip = ({ conditionDetails }) => {
    return (
        <div className="relative group">
            <span className="text-blue-600 underline cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
            </span>
            <div className="absolute bottom-0 left-0 hidden group-hover:block bg-white text-gray-700 text-xs rounded p-2 w-64 shadow-lg z-10">
                <p>{conditionDetails ? conditionDetails : "No additional details provided."}</p>
            </div>
        </div>
    );
};
