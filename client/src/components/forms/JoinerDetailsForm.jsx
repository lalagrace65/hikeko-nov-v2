import React , { useState, useEffect } from 'react';
import { 
    Input, 
    Select, 
    Option, 
    Button, 
    Checkbox, 
    Typography,
    Spinner
} from "@material-tailwind/react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiUpload } from "react-icons/fi";
import { ReactSortable } from 'react-sortablejs';
import InputField from '../icons/InputField';
import axios from 'axios';
import toast from "react-hot-toast";
import JoinerTermsService from '@/context/JoinerTermsService';
import FloatingLabelInput from '../icons/FloatingLabelInput';
import { baseUrl } from '@/Url';


function JoinerDetailsForm({packageId}) {
    const [proofPaymentImages, setProofPaymentImages] = useState([]);
    const [joinerContactNo, setJoinerContactNo] = useState("");
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [autofillChecked, setAutofillChecked] = useState(false);
     // Fetch user profile data if autofill checkbox is checked
  useEffect(() => {
    if (autofillChecked) {
      // Assuming you have a function to fetch user data from the backend
      axios.get('/profile')
        .then(response => {
          const user = response.data;
          setFormData({
            joinerName: user.firstName + ' ' + user.lastName,
            email: user.email,
            pickupLocation: "",  // You can add defaults if necessary
            age: "",              // You may have to calculate or leave it blank
            homeAddress: user.address,
            emergencyContactPerson: "", // Set defaults if necessary
            medicalCondition: "No",  // Default to 'No' if no data available
            conditionDetails: "",
            paymentType: "Downpayment",
            termsAccepted: false
          });
          setJoinerContactNo(user.contactNo);
          setEmergencyContactNumber(user.emergencyContactNo);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data.");
        });
    } else {
        // Reset form when checkbox is unchecked
        setFormData({
          joinerName: "",
          email: "",
          pickupLocation: "",
          age: "",
          homeAddress: "",
          emergencyContactPerson: "",
          medicalCondition: "",
          conditionDetails: "",
          paymentType: "Downpayment",
          termsAccepted: false,
        });
        setJoinerContactNo("");
        setEmergencyContactNumber("");
      }
  }, [autofillChecked]);

    const toggleModal = () => {
        setOpenModal(!openModal);
    };

    const initialFormData = {
        joinerName: "",
        email: "",
        pickupLocation: "",
        age: "",
        homeAddress: "",
        emergencyContactPerson: "",
        medicalCondition: "",
        conditionDetails: "",
        paymentType: "Downpayment",
        termsAccepted: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value.trimStart()
        }));
    };
    // Handle the checkbox for terms acceptance
    const handleTermsChange = () => {
        setFormData(prevState => ({
            ...prevState,
            termsAccepted: !prevState.termsAccepted
        }));
    };
    //validate form
    const fieldLabels = {
        joinerName: "Joiner Name(s)",
        email: "Email",
        pickupLocation: "Pick-up Location",
        age: "Age",
        homeAddress: "Home Address",
        emergencyContactPerson: "Emergency Contact Person",
        emergencyContactNumber: "Emergency Contact Number",
        medicalCondition: "Have medical condition?",
        conditionDetails: "If yes, please state...",
        paymentType: "Type Payment",
    };
    const validateForm = () => {
        for (const [key, value] of Object.entries(formData)) {
            // Skip validation for 'conditionDetails' if medicalCondition is not 'Yes'
            if (key === "conditionDetails" && formData.medicalCondition !== "Yes") continue;
    
            if (!value) {  // Check if the field is empty
                const fieldLabel = fieldLabels[key] || key;
                toast.error(`"${fieldLabel}" is required.`);
                return false;
            }
        }
        // Check if proof of payment images are uploaded
        if (proofPaymentImages.length === 0) {
            toast.error("Proof of Payment is required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
            // Prepare the booking data
            const bookingData = {
                ...formData,
                proofOfPayment: proofPaymentImages,
                contactNumber: joinerContactNo,
                emergencyContactNumber: emergencyContactNumber,
                packageId,
            };
        try {
            // Retrieve the token
            const token = localStorage.getItem('token'); // or however you store the token
            if (!token) {
                toast.error("User is not authenticated.");
                return;
            }
             // Add the Authorization header
             await axios.post(`${baseUrl}/api/booking`, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Booking successfully submitted!");
            // Reset the form data
            setFormData(initialFormData);
            setProofPaymentImages([]);
            setJoinerContactNo("");
            setEmergencyContactNumber("");
        } catch (error) {
            console.error('Error submitting booking:', error);
            toast.error("Failed to submit booking.");
        }
    };


    //Sortable image upload
    async function uploadProofPayment(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
            try {
                const res = await axios.post(`${baseUrl}/api/upload`, data);
                setProofPaymentImages(oldImages => {
                    return [...oldImages, ...res.data.links];
                });
            } catch (error) {
                toast.error("Failed to upload image.");

            } finally {
                setIsUploading(false);
            }
        }
    }
    function updateProofImagesOrder(proofPaymentImages) {
        setProofPaymentImages(proofPaymentImages);
    }

    return (
        <div className="bg-cardPrice p-8 text-primary">
            <div className="relative w-full">
            <Checkbox
                checked={autofillChecked}
                onChange={() => setAutofillChecked(prev => !prev)}
                label="Use my profile data"
            />
            </div>
             {/* Form Fields */}
            <h2 className="text-2xl font-bold mb-6">JOINER DETAILS:</h2>
            <div className="grid grid-cols-3 gap-6 mb-4 items-center">
                <div className="relative w-full">
                    <Input
                        label="Joiner Name(s)"
                        name="joinerName"
                        value={formData.joinerName}
                        onChange={handleInputChange}
                        className="w-full"
                    />
                </div>
                <div className="w-full items-center">
                    <FloatingLabelInput
                        type="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className=" w-full"
                    />
                </div>
                <div className="relative w-full">
                    <Select variant="outlined" 
                        label="Sex"
                        onChange={(value) => setFormData({...formData, sex: value})}
                    >
                        <Option className='text-black' value='Male'>Male</Option>
                        <Option className='text-black' value='Female'>Female</Option>
                        <Option className='text-black' value='Prefer not to say'>Prefer not to say</Option>
                    </Select>
                </div>
                <div className="relative w-full">
                    <label className="block mb-2 text-sm font-medium
                     text-gray-900 dark:text-white">
                        Contact Number
                    </label>
                    <PhoneInput
                        className="phone-input-container mt-2 mb-4 w-full px-3 py-2 border border-gray-300 text-black rounded-2xl "
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PH"
                        placeholder="Enter phone number"
                        value={joinerContactNo}
                        onChange={setJoinerContactNo}
                        
                    />  
                </div>
                <div className="relative w-full">
                    <Input
                        label="Pick-up Location"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        className="w-full"
                    />
                </div>
                <div className="relative w-full">
                    <Input
                        label="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative w-full">
                    <Input
                        label="Home Address"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative w-full">
                    <Select 
                        label="Have medical condition?" 
                        color="black" 
                        onChange={(value) => setFormData({...formData, medicalCondition: value})}
                    >
                        <Option className='text-black' value='Yes'>Yes</Option>
                        <Option className='text-black' value='No'>No</Option>
                    </Select>
                </div>
                 {/* Conditionally render the conditionDetails input if medicalCondition is 'Yes' */}
                {formData.medicalCondition === 'Yes' && (
                    <div className="relative w-full">
                        <Input
                            label="If yes, please state..."
                            name="conditionDetails"
                            value={formData.conditionDetails}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className="relative w-full">
                    <Input
                        label="Emergency Contact Person"
                        name="emergencyContactPerson"
                        value={formData.emergencyContactPerson}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative w-full">
                    <label className="block mb-2 text-sm font-medium text-black">Emergency Contact Number</label>
                    <PhoneInput
                        className="phone-input-container mt-2 mb-4 w-full px-3 py-2 border border-gray-300 text-black rounded-2xl"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PH"
                        placeholder="Enter phone number"
                        value={emergencyContactNumber}
                        onChange={setEmergencyContactNumber}
                    />  
                </div>
                <div className="relative w-full">
                    <Select 
                        label="Relationship" 
                        color="black" 
                        onChange={(value) => setFormData({...formData, relationship: value})}
                    >
                        <Option className='text-black' value='Self'>Self</Option>
                        <Option className='text-black' value='Sibling'>Sibling</Option>
                        <Option className='text-black' value='Guardian'>Guardian</Option>
                        <Option className='text-black' value='Partner'>Partner</Option>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-4 items-center">
                <div className="flex items-center">
                    <p className="text-lg mr-4">PAYMENT:</p>
                    <input
                        type="file" 
                        onChange={uploadProofPayment}
                        accept="image/*"  
                        id="file-upload"
                        className="hidden " // Hide the actual file input
                    />
                    <label htmlFor="file-upload" className="flex items-center w-1/3 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer">
                    <FiUpload className='w-5 h-5 mr-4' />
                    <span>{isUploading ? <Spinner size="sm" /> : "Upload Proof of Payment"}</span>
                </label>
                </div>
                    
                <Select label="Type Payment" color="black" >
                    <Option className='text-black'>Downpayment</Option>
                    <Option className='text-black'>Full Payment</Option>
                </Select>
            </div>
            <ReactSortable
                list={proofPaymentImages}
                className="flex flex-relative w-full"
                setList={updateProofImagesOrder}>
                {!!proofPaymentImages?.length && proofPaymentImages.map(link => {
                    return(
                        <div key={link} className=" w-36 h-36">
                            <img src ={link} alt="" className="w-full h-full object-cover rounded-lg"/>
                        </div>
                    );
                })}
                
            </ReactSortable>

            {/*Voucher*/}
            <Input
                label="Voucher (Optional)">
            </Input>

            {/* Checkbox */}
                <Checkbox
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal "
                    >
                    I agree the
                    <a
                        onClick={toggleModal}
                        className="font-medium text-primary transition-colors hover:text-gray-900"
                    >
                        &nbsp;Terms of Service and Conditions
                    </a>
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                onChange={handleTermsChange}
                />
            
            {/* Book Button */}
            <div className="flex justify-end">
                <Button 
                    color="red"
                    onClick={handleSubmit} 
                disabled={!formData.termsAccepted}
                >
                    Book
                </Button>
            </div>

            {/* Terms and Conditions Modal */}
            <JoinerTermsService open={openModal} onClose={toggleModal} />
        </div>
    );
}

export default JoinerDetailsForm;
