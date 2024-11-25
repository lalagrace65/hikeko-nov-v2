import React, { useState, useEffect } from 'react';
import { Input, Typography, Drawer, Button, IconButton } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import  emailjs  from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/Url';
import { Spinner } from '@material-tailwind/react';
import { FiUpload } from 'react-icons/fi';

export default function BusDets() {
    const [isOpenImg, setIsOpenImg] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: "",
        email: "",
        businessBranch: "",
        businessAddress: "",
        businessType: "Select an option",
        birCertificateDocu: { link: '', name: '' },
        dtiPermitDocu: { link: '', name: '' },
        businessPermitDocu: { link: '', name: '' },
        mayorsPermitDocu: { link: '', name: '' }
    });
    {/*enlarge img*/}
    const openModalImg = () => setIsOpenImg(true);
    const closeModalImg = () => setIsOpenImg(false);

    const form = React.useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [businessContactNo, setBusinessContactNo] = useState("");

    const [isUploading, setIsUploading] = useState({
        birCertificateDocu: false,
        dtiPermitDocu: false,
        businessPermitDocu: false,
        mayorsPermitDocu: false
    });

    const [errors, setErrors] = useState({
        businessName: '',
        email: '',
        businessContactNo: '',
        businessBranch: '',
        businessAddress: '',
        businessType: '',
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("formData"));
        if (savedData) {
            setFormData(prev => ({
                ...prev,
                ...savedData,
            }));
        }
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check if e.target exists (regular input)
        if (name) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const handlePhoneChange = (value) => {
        const phoneValue = value ? value.toString() : '';  // Ensure it's a string
    
        // Check for empty input and don't trigger validation if it's empty
        if (phoneValue.trim() === "") {
            setBusinessContactNo("");
            setErrors((prevErrors) => ({
                ...prevErrors,
                businessContactNo: "",
            }));
            return;
        }
        setBusinessContactNo(phoneValue);

        if (isValidPhoneNumber(phoneValue)) {
            setErrors((prevErrors) => {
                const { businessContactNo, ...rest } = prevErrors;
                return rest;
            });
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                businessContactNo: "Invalid phone number format for the selected country.",
            }));
        }
    };
    

    const handleFileChange = async (ev, type) => {
      const files = ev.target.files;
        if (files?.length === 1) {
          const file = files[0]; // Get the selected file
          const data = new FormData();
          data.append('file', file);

            // Set uploading state for the specific file type
            setIsUploading(prev => ({
            ...prev,
            [type]: true
            }));

          try {
              const response = await axios.post('/api/upload', data, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });

              // Update the appropriate state based on the type
              const link = response.data.links;
              const fileName = file.name; // Get the file name
            setFormData(prev => ({
                ...prev,
                [type]: { link, name: fileName }
            }));

              // Show success toast
              toast.success('Upload complete');
          } catch (error) {
              console.error('Upload failed:', error);
              toast.error('Upload failed');
          } finally {
              // Reset uploading state after completion
                setIsUploading(prev => ({
                ...prev,
                [type]: false
                }));
          }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');
        let validationErrors = {};


        // Retrieve subscriptionId and other data from localStorage
        const subscriptionId = localStorage.getItem('subscriptionId');
        const savedFormData = JSON.parse(localStorage.getItem('formData'));
        const firstName = savedFormData?.firstName || ''; 
        const lastName = savedFormData?.lastName || '';   
        const contactNo = savedFormData?.contactNo || ''; 

        console.log('Subscription ID:', subscriptionId);
        console.log('First Name:', firstName);

        if (!subscriptionId) {
            toast.error('Subscription ID is missing!');
            return;
         }

        // Validate form fields
        const requiredFields = [
            'businessName',
            'email',
            'businessBranch',
            'businessAddress',
            'businessType'
        ];

        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                validationErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
            }
        });

        setErrors(validationErrors);
        setIsSubmitting(true);

        // Validate business contact number
        if (!businessContactNo.trim()) {
            validationErrors.businessContactNo = "Business contact number is required.";
        } else if (!isValidPhoneNumber(businessContactNo)) {
            validationErrors.businessContactNo = "Invalid phone number format for the selected country.";
        }
        // Validate required document uploads
        if (!formData.birCertificateDocu.link) {
            validationErrors.birCertificateDocu = "BIR Certificate is required.";
        }
        if (!formData.dtiPermitDocu.link) {
            validationErrors.dtiPermitDocu = "DTI Permit is required.";
        }
        if (!formData.businessPermitDocu.link) {
            validationErrors.businessPermitDocu = "Business Permit is required.";
        }
        if (!formData.mayorsPermitDocu.link) {
            validationErrors.mayorsPermitDocu = "Mayor's Permit is required.";
        }

    setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setIsSubmitting(false);
            return; // Stop submission if there are validation errors
        }

        const submissionData = {
            ...formData,
            businessContactNo,
        };
        console.log("Preparing to submit:", submissionData);
        
        try {

            try {
                const signupResult = await axios.post(`${baseUrl}/api/admin-register`, {
                    ...submissionData,
                    subscriptionId
                });
                console.log('Signup successful:', signupResult.data);
            } catch (error) {
                // Handle the error and log it
                console.error('Signup error:', error);
            
                // If it's an AxiosError, log additional details
                if (axios.isAxiosError(error)) {
                    console.error('Error response:', error.response?.data);
                    console.error('Error status:', error.response?.status);
                } else {
                    console.error('Unexpected error:', error);
                }
            }

            const emailData = {
                to_businessName: formData.businessName, 
                to_email: formData.email,
                to_businessBranch: formData.businessBranch,
                to_businessAddress: formData.businessAddress,
                to_businessType: formData.businessType,
                to_businessContactNo: businessContactNo,
                to_birCertificateDocu: formData.birCertificateDocu.name,
                to_dtiPermitDocu: formData.dtiPermitDocu.name,
                to_businessPermitDocu: formData.businessPermitDocu.name,
                to_mayorsPermitDocu: formData.mayorsPermitDocu.name,
                to_firstName: firstName,
                to_lastName: lastName,
                to_contactNo: contactNo    
            };

            console.log("Preparing to send email with the following data:", emailData);
            //await emailjs.send('service_ehzzg2c', 'template_xc2nmxt', emailData, 'XczVijVc-NaoUCGic');
            await emailjs.send('service_s3s9aed', 'template_wlxkrec', emailData, 'cqdhoCjeyjfyvdqDy');

            // Clear the form data from localStorage after successful submission
            localStorage.removeItem("formData");
            localStorage.removeItem("subscriptionId");
            localStorage.removeItem("firstName"); // Clear first name
            localStorage.removeItem("lastName"); 
            localStorage.removeItem("contactNo");

            // Clear the form data
            setFormData({
                businessName: "",
                email: "",
                businessBranch: "",
                businessAddress: "",
                businessType: "Select an option",
                birCertificateDocu: { link: '', name: '' },
                dtiPermitDocu: { link: '', name: '' },
                businessPermitDocu: { link: '', name: '' },
                mayorsPermitDocu: { link: '', name: '' }
            });
            setBusinessContactNo("");
            // Navigate to the next page
            navigate('/travelAgencySignUp/credentialsProcess');

        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Submission failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <React.Fragment>
                <div className="flex">
                    {/* Left Side - Background Color/Image */}
                    <div className="flex-1 bg-gray-200 relative">
                        {/* Optional: Add a background image */}
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/scenery3.png')" }} />
                    </div>

                    {/* Right Side - Form Container */}
                    <div className="flex-1 p-8">
                        <h1 className="text-2xl font-bold mb-2">Tell us about your business</h1>
                        <h3 className="mb-4">
                            This information will be shown on the app so that customers can search and contact you if they have any questions.
                        </h3>
                    <form onSubmit={handleSubmit} ref={form}>
                        <div className="space-y-4">
                            {/* Business Name */}
                            <div>
                                <label>Business Name:</label>
                                <input 
                                    name='businessName'
                                    label="Business Name"
                                    type="text"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.businessName && <Typography className="text-red-500 text-sm">{errors.businessName}</Typography>}
                            </div>

                            {/* Business Email */}
                            <div>
                                <label>Business Email:</label>
                                <input
                                    name='email'
                                    label="Business Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && <Typography className="text-red-500 text-sm">{errors.email}</Typography>}
                            </div>

                            {/* Business Type and Number of Branches */}
                            <div className="flex flex-row gap-4 items-center">
                                {/* Business Type Dropdown */}
                                <div className="flex flex-col w-1/2">
                                    <label>Business Type:</label>
                                    <Menu
                                        animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                        }}
                                    >
                                        <MenuHandler>
                                            <Button >{formData.businessType}</Button>
                                        </MenuHandler>
                                        <MenuList >
                                            <MenuItem 
                                                className= "mb-2"
                                                onClick={() => setFormData(prev => ({ ...prev, businessType: "Product" }))}
                                            >
                                                Product
                                            </MenuItem>
                                            <MenuItem 
                                                onClick={() => setFormData(prev => ({ ...prev, businessType: "Service" }))}                                        
                                            >
                                                Service
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    {errors.businessType && <Typography className="text-red-500 text-sm">{errors.businessType}</Typography>}
                                </div>

                                {/* Number of Branches Input */}
                                <div className="flex flex-col w-1/2 mt-4">
                                    <Input
                                        label='Number of Branches'
                                        name="businessBranch"
                                        id="number_of_branches"
                                        value={formData.businessBranch}
                                        onChange={handleChange}
                                    />
                                    {errors.businessBranch && <Typography className="text-red-500 text-sm">{errors.businessBranch}</Typography>}
                                </div>
                            </div>

                            {/* Business Complete Address */}
                            <div>
                                <Input
                                    name="businessAddress"
                                    label='Business Complete Address'
                                    id="business_complete_address"
                                    className="mb-4"
                                    value={formData.businessAddress}
                                    onChange={handleChange}
                                />
                                {errors.businessAddress && <Typography className="text-red-500 text-sm">{errors.businessAddress}</Typography>}
                            </div>

                            {/* Contact Number */}
                            <div>
                                <Typography className="mb-2 block">Business Contact Number:</Typography>
                                <PhoneInput
                                    className="phone-input-container mt-2 mb-4 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry="PH"
                                    placeholder="Enter phone number"
                                    value={businessContactNo}
                                    onChange={handlePhoneChange}
                                    name="businessContactNo"
                                />
                                {errors.businessContactNo && <Typography className="text-red-500 text-sm">{errors.businessContactNo}</Typography>}
                            </div>

                            {/* Business Documents */}
                            <h1 className="text-2xl font-bold mt-6 mb-2">Business Documents</h1>
                            <div>
                                <p className="text-gray-600 mb-2">
                                    *Note: Only document-type files are accepted. If you have a picture, kindly convert it to a document format.
                                </p>
                                <Typography 
                                    as="a"
                                    href="#"
                                    color="white"
                                    className="font-medium !text-red-500 transition-colors hover:!text-red-300"
                                    onClick={openModalImg}>
                                    See Sample BIR Form
                                </Typography>
                                {/* Modal for Enlarged Image */}
                                {isOpenImg && (
                                    <div
                                        className="fixed inset-0 flex items-center justify-center bg-black/75 z-50"
                                        onClick={closeModalImg} // Close modal when clicking on the background
                                    >
                                        <div
                                            className="relative flex justify-center items-center" // Ensure center alignment for the image container
                                            onClick={(e) => e.stopPropagation()} // Prevent the click event from reaching the background
                                        >
                                            {/* Enlarged Image */}
                                            <img
                                                src="/BIR_PH.jpg"
                                                alt="Enlarged Sample BIR Form"
                                                className="max-w-[55%] max-h-[55%] rounded z-50" // Adjust width/height percentage for responsiveness
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upload files */}
                        <div className="space-y-6">
                            {/* BIR Certificate */}
                            <div>
                            <Typography className="mb-2">BIR Certificate:</Typography>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e, 'birCertificateDocu')}
                                id="bir-certificate-upload"
                                className="hidden" // Hide the actual file input
                            />
                            <label
                                htmlFor="bir-certificate-upload"
                                className="flex items-center w-1/2 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer"
                            >
                                <FiUpload className="w-5 h-5 mr-4" />
                                <span>
                                {isUploading.birCertificateDocu ? (
                                    <Spinner size="sm"/>
                                    ) : (
                                    'Upload BIR Certificate'
                                    )}
                                </span>
                            </label>
                            {formData.birCertificateDocu.name && (
                                <Typography className="text-green-500 text-sm">
                                Uploaded: {formData.birCertificateDocu.name}
                                </Typography>
                            )}
                            {errors.birCertificateDocu && (
                                <Typography className="text-red-500 text-sm">{errors.birCertificateDocu}</Typography>
                            )}
                            </div>
                            {/* DTI Permit */}
                            <div>
                            <Typography className="mb-2">DTI Permit:</Typography>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e, 'dtiPermitDocu')} 
                                id="dti-permit-upload"
                                className="hidden" // Hide the actual file input
                            />
                            <label
                                htmlFor="dti-permit-upload"
                                className="flex items-center w-1/2 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer"
                            >
                                <FiUpload className="w-5 h-5 mr-4" />
                                <span>
                                {isUploading.dtiPermitDocu ? (
                                    <Spinner size="sm"/>
                                ) : (
                                    'Upload DTI Permit'
                                )}
                                
                                </span>
                            </label>
                            {formData.dtiPermitDocu.name && (
                                <Typography className="text-green-500 text-sm">
                                Uploaded: {formData.dtiPermitDocu.name}
                                </Typography>
                            )}
                            {errors.dtiPermitDocu && (
                                <Typography className="text-red-500 text-sm">{errors.dtiPermitDocu}</Typography>
                            )}
                            </div>
                            {/* Business Permit */}
                            <div>
                            <Typography className="mb-2">Business Permit:</Typography>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e, 'businessPermitDocu')} 
                                id="business-permit-upload"
                                className="hidden" // Hide the actual file input
                            />
                            <label
                                htmlFor="business-permit-upload"
                                className="flex items-center w-1/2 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer"
                            >
                                <FiUpload className="w-5 h-5 mr-4" />
                                <span>
                                {isUploading.businessPermitDocu ? (
                                    <Spinner size="sm"/>
                                ) : (
                                    'Upload Business Permit'
                                )}
                                
                                </span>
                            </label>
                            {formData.businessPermitDocu.name && (
                                <Typography className="text-green-500 text-sm">
                                Uploaded: {formData.businessPermitDocu.name}
                                </Typography>
                            )}  
                            {errors.businessPermitDocu && (
                                <Typography className="text-red-500 text-sm">{errors.businessPermitDocu}</Typography>
                            )}
                            </div>
                            {/* Mayor's Permit */}
                            <div>
                            <Typography className="mb-2">Mayor's Permit:</Typography>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e, 'mayorsPermitDocu')} 
                                id="mayors-permit-upload"
                                className="hidden" // Hide the actual file input
                            />
                            <label
                                htmlFor="mayors-permit-upload"
                                className="flex items-center w-1/2 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer"
                            >
                                <FiUpload className="w-5 h-5 mr-4" />
                                <span>
                                {isUploading.mayorsPermitDocu ? (
                                    <Spinner size="sm"/>
                                ) : (
                                    'Upload Mayor\'s Permit'
                                )}
                                </span>
                            </label>
                            {formData.mayorsPermitDocu.name && (
                                <Typography className="text-green-500 text-sm">
                                Uploaded: {formData.mayorsPermitDocu.name}
                                </Typography>
                            )}  
                            {errors.mayorsPermitDocu && (
                                <Typography className="text-red-500 text-sm">{errors.mayorsPermitDocu}</Typography>
                            )}
                            </div>

                        </div>
                        {/* Submit Button */}
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-primary hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Submit
                        </Button>
                    </form>
                    
                    </div>
                </div>
            
        </React.Fragment>
    );
    
}
