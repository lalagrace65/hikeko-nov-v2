// components/ui/InputField.js
import React from 'react';
import { Input } from "@material-tailwind/react";

const InputField = ({ label, name, value, onChange, type = "text", className = "" }) => {
    return (
        <Input
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            color="black"
            className={`bg-gray-100 focus:bg-gray-50 text-black border-gray-300 ${className}`}
        />
    );
};

export default InputField;
