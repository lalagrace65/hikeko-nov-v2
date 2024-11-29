import axios from "axios";
import React, { useState, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { MultiLevelSidebar } from "../admin-components/AdminSidebar";
import { baseUrl } from "@/Url";
import toast from "react-hot-toast";
import { Typography } from "@material-tailwind/react";
import emailjs from "@emailjs/browser";

export default function CreateStaffAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [role] = useState('staff');
    const [error, setError] = useState('');  
    const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const form = React.useRef();
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }  
    // fetch this for email
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin-details`);
                setAdminData(response.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdminData();
    }, []);

    // Generate secure temporary password
    const generatePassword = () => {
        const generateRandomPassword = () => {
            const length = 18;
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
            let password = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const tempPassword = generateRandomPassword();
        setPassword(tempPassword);
        setIsPasswordGenerated(true);
    };

    const validateForm = () => {
        if (!firstName || !lastName || !address || !email || !contactNo || !password) {
            toast.error("Please fill in all the fields.");
            return false;
        }
    
        if (!isValidPhoneNumber(contactNo)) {
            toast.error("Invalid phone number.");
            return false;
        }
    
        // You can add more validation checks if necessary
        return true;
    };
    // Function for sending registration data to API
    async function addNewStaff(ev) {
        ev.preventDefault();

        if (!validateForm()) return;

        const createStaffData = {
                firstName,
                lastName,
                address,
                email,
                password,
                contactNo,
                suspended: false,
                role 
        };

        try {
            const response = await axios.post(`${baseUrl}/create-staff`, createStaffData);
            console.log(response.data);
            // Prepare the email data
            const emailData = {
                to_staffEmail: email,
                to_staffFirstName: firstName,
                to_staffLastName: lastName,
                to_staffAddress: address,
                to_staffPassword: password,
                to_businessName: adminData.businessName,
                to_agencyContact: adminData.businessContactNo,
                to_businessEmail: adminData.email,
            };    
            console.log('Sending email with the following data:', emailData);
            const result  = await emailjs.send('service_yjbwkqk', 'template_a0hez62', emailData, 'Dm5FV3SaKG6JVjSyM');
            console.log('Email sent successfully', result);
            
            setFirstName('');
            setLastName('');
            setPassword('');
            setAddress('');
            setEmail('');
            setContactNo('');  
            toast.success('Staff Account Created Successfully!'); 
        } catch (e) {
            // Handle errors and provide feedback
            if (e.response && e.response.data) {
                toast.error(`Error: ${e.response.data.message}`);
            } else {
                toast.error('Staff Account Creation failed.');
            }
        }
    }

    const handlePhoneNumberChange = (value) => {
        setContactNo(value);
        
        // Validate the phone number based on the country
        if (value && !isValidPhoneNumber(value)) {
            setError("Invalid phone number format for the selected country.");
        } else {
            setError('');
        }
    };

    return (
        <form ref={form}>
        <div className="flex min-h-screen">
            <MultiLevelSidebar className="min-h-screen" />
            <div className="flex-1 p-8">
                <div className="border bg-white shadow-lg rounded-xl p-6 flex gap-8 w-1/2">
                    <div className="flex flex-col w-full">
                        <Typography variant="h4" className="mb-4 text-gray-900">
                            Create Staff Account
                        </Typography>
                        <div className="flex w-full ">
                            <div className="flex flex-col w-1/2 pr-2">
                            {preInput('First Name', 'Input staff First Name')}
                            <input
                                name="firstName"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="First Name"
                                value={firstName}
                                onChange={ev => setFirstName(ev.target.value)}
                            />
                            </div>
                            <div className="flex flex-col w-1/2 pr-2">
                            {preInput('Last Name', 'Input staff Last Name')}
                            <input
                                type="text"
                                name="lastName"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={ev => setLastName(ev.target.value)}
                            />
                            </div>
                        </div>

                        {preInput('Address', 'Input staff address')}
                        <input
                            type="address"
                            name="address"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Address"
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                        />

                        {preInput('Phone number', 'Input staff phone number')}
                        <PhoneInput
                            className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="PH" 
                            placeholder="Enter phone number"
                            value={contactNo}
                            onChange={handlePhoneNumberChange}
                            name="contactNo"
                        />{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        {preInput('Email', 'Input staff email')}
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="staff@email.com"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                       {/* Temporary Password Field with Button Inside */}
                        {preInput('Password', 'Generated temporary password')}
                        <div className="relative">
                            <input
                                type="text"
                                name="password"
                                className="w-full p-2 border border-gray-300 rounded pr-16" // Add padding-right for button
                                placeholder="Generated Password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                disabled={isPasswordGenerated} // Disable if generated
                            />
                            <button 
                                type="button"
                                onClick={generatePassword}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-primary bg-transparent  p-0"
                            >
                                Generate
                            </button>
                        </div>
                        
                        <button onClick={addNewStaff} className="w-full mt-4 p-2 bg-primary text-white rounded-2xl"> Create Account </button>
                    </div>
                </div>
            </div>
        </div>
        </form>
    );    
}
