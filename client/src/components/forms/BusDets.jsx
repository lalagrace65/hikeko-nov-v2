import React, { useState, useEffect } from 'react';
import { Input, Typography, Drawer, Button, IconButton } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import  emailjs  from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '@/Url';

export default function BusDets() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: "",
        businessEmail: "",
        businessBranch: "",
        businessAddress: "",
        businessType: "Select an option",
        birCertificateDocu: { link: '', name: '' },
        dtiPermitDocu: { link: '', name: '' },
        businessPermitDocu: { link: '', name: '' },
        mayorsPermitDocu: { link: '', name: '' }
    });
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const form = React.useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [businessContactNo, setBusinessContactNo] = useState("");


    const [errors, setErrors] = useState({
        businessName: '',
        businessEmail: '',
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

    const handleFileChange = async (ev, type) => {
      const files = ev.target.files;
        if (files?.length === 1) {
          const file = files[0]; // Get the selected file
          const data = new FormData();
          data.append('file', file);

          setIsUploading(true);
          try {
              const response = await axios.post(`${baseUrl}/api/upload`, data, {
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
              setIsUploading(false);
          }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let validationErrors = {};

        // Validate form fields
        const requiredFields = [
            'businessName',
            'businessEmail',
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
        }

        if (Object.keys(validationErrors).length > 0) {
            setIsSubmitting(false);
            return; // Stop submission if there are validation errors
        }

        const submissionData = {
            ...formData,
            businessContactNo,
        };
        console.log("Preparing to submit:", submissionData);
        
        
        const emailData = {
            to_name: formData.businessName, // Name for EmailJS
            to_email: formData.businessEmail, // Email for EmailJS
            // Add other data you want to send
        };
        try {
            console.log("Preparing to send email...");
            await emailjs.send('service_ehzzg2c', 'template_xc2nmxt', emailData, 'XczVijVc-NaoUCGic');

             // Here, you can also send submissionData to your server if needed
            const signupResult = await axios.post(`${baseUrl}/api/signup`, submissionData);
            console.log("Signup successful:", signupResult.data);
            toast.success("Signup Credentials submitted successfully.");

            // Clear the form data
            setFormData({
                businessName: "",
                businessEmail: "",
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
                    {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }} /> */}
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
                                name='businessEmail'
                                label="Business Email"
                                type="email"
                                value={formData.businessEmail}
                                onChange={handleChange}
                                className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.businessEmail && <Typography className="text-red-500 text-sm">{errors.businessEmail}</Typography>}
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
                                    type="text"
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
                                type="text"
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
                                onChange={e => setBusinessContactNo(e)}
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
                                onClick={openDrawer}>
                                See Sample BIR Form
                            </Typography>
                            <Drawer open={open} onClose={closeDrawer} placement="right" className="p-4">
                                <div className="mb-6 flex items-center justify-between">
                                    <Typography variant="h5" color="blue-gray">
                                        Material Tailwind
                                    </Typography>
                                    <IconButton color="blue-gray" className='h-6 w-6 rounded-full flex items-center justify-center' onClick={closeDrawer}>
                                        <IoCloseCircleOutline className="h-5 w-5 "/>
                                    </IconButton>
                                </div>
                                <Typography color="gray" className="mb-8 pr-4 font-normal">
                                    Material Tailwind features multiple React and HTML components, all written with Tailwind CSS classes and Material Design guidelines.
                                </Typography>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outlined">
                                        Documentation
                                    </Button>
                                    <Button size="sm">Get Started</Button>
                                </div>
                            </Drawer>
                        </div>
                      </div>

                         {/* Upload files */}
                         <div className="space-y-6">
                        {/* BIR Certificate */}
                        <div>
                            <Typography className="mb-2">BIR Certificate:</Typography>
                            <input type="file" accept=".pdf,.doc,.docx,.txt " 
                                    onChange={(e) => handleFileChange(e, 'birCertificateDocu')} 
                            />
                             {formData.birCertificateDocu.name && 
                            <Typography className="text-green-500 text-sm">
                                Uploaded: {formData.birCertificateDocu.name}
                            </Typography>}
                        </div>

                        {/* DTI Permit */}
                        <div>
                            <Typography className="mb-2">DTI Permit:</Typography>
                            <input type="file" accept=".pdf,.doc,.docx,.txt" 
                                    onChange={(e) => handleFileChange(e, 'dtiPermitDocu')} 
                            />
                            {formData.dtiPermitDocu.name && 
                            <Typography className="text-green-500 text-sm">
                                Uploaded: {formData.dtiPermitDocu.name}
                            </Typography>}
                        </div>

                        {/* Business Permit */}
                        <div>
                            <Typography className="mb-2">Business Permit:</Typography>
                            <input type="file" accept=".pdf,.doc,.docx,.txt" 
                                    onChange={(e) => handleFileChange(e, 'businessPermitDocu')} 
                            />
                            {formData.businessPermitDocu.name && 
                             <Typography className="text-green-500 text-sm">
                                Uploaded: {formData.businessPermitDocu.name}
                            </Typography>}
                        </div>

                        {/* Mayor's Permit */}
                        <div>
                            <Typography className="mb-2">Mayor's Permit:</Typography>
                            <input type="file" accept=".pdf,.doc,.docx,.txt" 
                                    onChange={(e) => handleFileChange(e, 'mayorsPermitDocu')}  
                            />
                            {formData.mayorsPermitDocu.name && 
                            <Typography className="text-green-500 text-sm">
                                 Uploaded: {formData.mayorsPermitDocu.name}
                            </Typography>}
                        </div>
                    </div>
                    {isUploading && <p>Uploading...</p>}
                    {/* Submit Button */}
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </Button>

                    
                  </form>
                </div>
            </div>
        </React.Fragment>
    );
    
}
