import React from 'react';
import './FloatingLabelInput.css';

const FloatingLabelInput = ({ label, name, type = "text", value, onChange }) => {
    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                placeholder=" "
                value={value}
                onChange={onChange}
                className="floating-input bg-gray-100 focus:bg-gray-50 text-black 
                rounded-2xl w-full px-3 py-2 border border-gray-300"
            />
            <label className="floating-label">{label}</label>
        </div>
    );
};

export default FloatingLabelInput;
