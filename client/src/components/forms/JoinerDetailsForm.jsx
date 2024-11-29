import React, { useState, useEffect } from 'react';
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
import  emailjs  from '@emailjs/browser';

function JoinerDetailsForm({packageId, packageDetail}) {
    const [proofPaymentImages, setProofPaymentImages] = useState([]);
    const [joinerContactNo, setJoinerContactNo] = useState("");
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
    const [rewardPoints, setRewardPoints] = useState(0);
    const [redeemPoints, setRedeemPoints] = useState(); // User input for redeem points
    const [bookingTotal, setBookingTotal] = useState(packageDetail.price); // Original package price
    const [usePoints, setUsePoints] = useState(false); // State to toggle redeem points
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [companions, setCompanions] = useState([{ name: '', age: '' }]);
    const form = React.useRef();

    const [autofillChecked, setAutofillChecked] = useState(false);

    const handleToggle = () => {
        setUsePoints(!usePoints); // Toggle the checkbox state
        if (!usePoints) setRedeemPoints(0); // Reset redeem points when unchecking
    };

    // Function to calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
            
        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
            return age;
    };  

    // Fetch user profile data if autofill checkbox is checked
    useEffect(() => {
        if (autofillChecked) {
        // Assuming you have a function to fetch user data from the backend
        axios.get('/profile')
            .then(response => {
            console.log(response.data);  
            const user = response.data;
            const age = calculateAge(user.dateOfBirth); 
            setFormData({
                joinerName: user.firstName + ' ' + user.lastName,
                email: user.email,
                pickupLocation: "",  // You can add defaults if necessary
                age: age,              // You may have to calculate or leave it blank
                homeAddress: user.address,
                emergencyContactPerson: "", // Set defaults if necessary
                medicalCondition: "No",  // Default to 'No' if no data available
                conditionDetails: "",
                paymentType: "",
                termsAccepted: false
            });
                setJoinerContactNo(user.contactNo);
                setEmergencyContactNumber(user.emergencyContactNo);
                setRewardPoints(user.rewardPoints || 0); 
            }).catch(error => {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load user data.");
            });
        } else {
            // Reset form when checkbox is unchecked
            setFormData(initialFormData);
            setJoinerContactNo("");
            setEmergencyContactNumber("");
            setRewardPoints(0);
        }
    }, [autofillChecked]);

    const toggleModal = () => {
        setOpenModal(!openModal);
    };

    //add new companion
    const addCompanion = () => {
        setCompanions([...companions, { name: '', age: '' }]);
    };
    
    const handleCompanionChange = (index, field, value) => {
        const updatedCompanions = [...companions];
        updatedCompanions[index][field] = value;
        setCompanions(updatedCompanions);
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
        paymentType: "",
        termsAccepted: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (packageDetail) {
            setLocations(packageDetail.pickupLocations || []);
            setFormData(prevState => ({
                ...prevState,
                pickupLocation: packageDetail.pickupLocations?.[0] || "" // Use the first location or an empty string
            }));
        }
    }, [packageDetail]);
    
    const handleSelectChange = (value) => {
        console.log('Selected pickup location:', value);
        setFormData(prevState => ({
            ...prevState,
            pickupLocation: value // Set the selected value
        }));
    };

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
         // Check if proof of payment images are uploaded
         if (redeemPoints < packageDetail.price && proofPaymentImages.length === 0) {
            toast.error("Proof of Payment is required unless redeem points fully cover the price.");
            return false;
        }
        return true;
        
    };

    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const options = { month: 'long', day: 'numeric', year: 'numeric' };
    //     return date.toLocaleDateString('en-US', options);
    // };

    // Helper function to format time (hours and minutes) to 12-hour format
    const formatTime = (hours, minutes) => {
        if (hours == null || minutes == null) return "N/A";
        
        // Convert hours to 12-hour format
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };
    // Function to format both checkIn and checkOut times
    const formatBookingTime = (checkIn, checkOut) => {
        const formattedCheckIn = formatTime(checkIn?.hours, checkIn?.minutes);
        const formattedCheckOut = formatTime(checkOut?.hours, checkOut?.minutes);
    
        return `${formattedCheckIn} - ${formattedCheckOut}`;
    };

    // Function to handle redeem points
    const handleRedeemPoints = (e) => {
        e.preventDefault();
        if (redeemPoints > rewardPoints) {
            alert("Not enough points");
            return;
        }
    
        const discountAmount = redeemPoints * 1; // Redeem 1 point = 1 Peso
        const newBookingTotal = packageDetail.price - discountAmount;
        if (newBookingTotal < 0) {
            alert("You cannot redeem more points than the booking total");
            return;
        }
    
        setBookingTotal(newBookingTotal); // Update booking total with the discount applied
        
        if (newBookingTotal === 0) {
            toast.success("Full payment is made with points. Proof of Payment is not required.");
        }
    };
    

    const handleSubmit = async () => {
        if (!validateForm() || !packageDetail) {
            toast.error("Package details are missing.");
            return;
        }
    
        // Convert 'medicalCondition' to a Boolean
        const medicalConditionBool = formData.medicalCondition === "Yes"; 
        // Prepare the booking data
        const bookingData = {
            ...formData,
            medicalCondition: medicalConditionBool,
            proofOfPayment: proofPaymentImages,
            contactNumber: joinerContactNo,
            emergencyContactNumber: emergencyContactNumber,
            rewardPointsRedeemed: redeemPoints,
            finalBookingAmount: bookingTotal,
            packageId,
            companions,
        };
        console.log("Form Data Before Sending Email:", formData);
        console.log("Package Details:", packageDetail);
    
        try {
            // Retrieve the token
            const token = localStorage.getItem('token'); // or however you store the token
            if (!token) {
                toast.error("User is not authenticated.");
                return;
            }
    
            // Submit booking data to the server
            const response = await axios.post(`${baseUrl}/api/booking`, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const { booking, message } = response.data;
    
            // Display the points earned message
            if (message) {
                toast.success(message); // Includes the points earned message from the server
            }
    
            // Prepare the email data
            const emailData = {
                to_joinerName: formData.joinerName, 
                to_email: formData.email,
                to_contactNum: joinerContactNo,
                to_pickupLocation: formData.pickupLocation,
                to_age: formData.age,
                to_address: formData.homeAddress,
                to_emergencyContactPerson: formData.emergencyContactPerson,
                to_emergencyContactNumber: emergencyContactNumber,
                to_medicalCondition: formData.medicalCondition,
                to_conditionDetails: formData.conditionDetails,
                to_paymentType: formData.paymentType,
                to_travelAgency: packageDetail?.travelAgency?.businessName,
                to_packagePrice: packageDetail?.price,
                to_dateTravel: packageDetail.date,
                to_time: formatBookingTime(packageDetail.checkIn, packageDetail.checkOut),
                to_coordinator: packageDetail?.coordinatorName,
                to_trail: packageDetail?.trailId?.title,
                to_referenceCode: booking.referenceCode
            };
    
            console.log("Email Data:", emailData);
            console.log("Preparing to send email...");
            await emailjs.send('service_s3s9aed', 'template_8gb3rki', emailData, 'cqdhoCjeyjfyvdqDy');
            
            // Reset the form data
            setFormData(prevState => ({
                ...prevState,
                termsAccepted: false // Reset termsAccepted to false
            }));            
            setProofPaymentImages([]);
            setJoinerContactNo("");
            setEmergencyContactNumber("");
            setRedeemPoints("");
            setAutofillChecked("");
        } catch (e) {
            if (e.response && e.response.status === 400) {
                toast.error('Sorry, Slot is already full.');
            } else {
                toast.error('Failed to book. Please try again.');
            }
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
                const res = await axios.post('/api/upload', data);
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
        <div className="py-8 px-4 md:px-6 lg:px-60 bg-cardPrice text-primary">
        <form ref={form}>
            <div className="relative w-full">
            <Checkbox
                checked={autofillChecked}
                onChange={() => setAutofillChecked(prev => !prev)}
                label="Use my profile data"
            />
            </div>
             {/* Form Fields */}
            <h2 className="text-2xl font-bold mb-6">JOINER DETAILS:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 items-center">
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
                        name="contactNumber"
                    />  
                </div>
                <div className="relative w-full">
                    <Select
                        label="Pick-up Location"
                        name="pickupLocation"
                        defaultValue={formData.pickupLocation || ""}
                        onChange={(value) => {
                            handleSelectChange(value);
                            setDropdownOpen(false); // Close dropdown after selection
                        }}
                        onOpen={() => setDropdownOpen(true)} // Open dropdown
                        onClose={() => setDropdownOpen(false)} // Close dropdown
                        open={dropdownOpen} // Control dropdown open state
                    >
                        {locations.length > 0 ? (
                            locations.map((location, index) => (
                                <Option key={index} value={location}>
                                    {location}
                                </Option>
                            ))
                        ) : (
                            <Option value="" disabled>Select a pick-up location</Option>
                        )}
                    </Select>
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
                        name="emergencyContactNumber"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 items-center">
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
                    
                <Select label="Type Payment" color="black" 
                onChange={(value) => setFormData({...formData, paymentType: value})}
                >
                    <Option className='text-black' value='Downpayment'>Downpayment</Option>
                    <Option className='text-black' value='Full Payment'>Full Payment</Option>
                </Select>
                {/* Add companion input fields */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Companions</h3>
                    {companions.map((companion, index) => (
                        <div key={index} className="flex gap-4 mb-4">
                            <Input
                                label="Companion Name"
                                value={companion.name}
                                onChange={(e) => handleCompanionChange(index, 'name', e.target.value)}
                                className="w-full"
                            />
                            <Input
                                label="Companion Age"
                                value={companion.age}
                                onChange={(e) => handleCompanionChange(index, 'age', e.target.value)}
                                className="w-full"
                            />
                        </div>
                    ))}
                    <Button onClick={addCompanion} className="bg-primary">
                        Add Companion
                    </Button>
                </div>
                
            </div>
            <ReactSortable
                list={proofPaymentImages}
                disabled={bookingTotal === 0}
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
            <Checkbox
            label={
                <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal "
                >
                Use Reward Points to Pay
                </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            checked={usePoints} 
            onChange={handleToggle}
            />
            
            <div className='ml-8'>
                {usePoints && (  
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Typography className='font-medium'>Points to redeem: </Typography>
                            <input
                                style={{ width: '100px', padding: '5px', border: '1px solid #ccc', borderRadius: '10px' }}
                                type="number"
                                value={redeemPoints}
                                onChange={(e) => setRedeemPoints(Number(e.target.value))}
                                max={rewardPoints}
                            />
                            <Button
                                type="button"
                                className='bg-primary'
                                onClick={handleRedeemPoints}
                                style={{ padding: '10px', height: '35px' }}
                            >
                                Redeem
                            </Button>
                        </div>
                        <Typography variant='small'>Booking Price: {bookingTotal}</Typography>
                        <Typography variant='small'>Reward Points: {rewardPoints} </Typography>
                    </div>
                )}  
            </div>    

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
            checked={formData.termsAccepted}
            onChange={handleTermsChange}
            />
            
            {/* Book Button */}
            <div className="flex justify-end">
                <Button 
                    className='bg-primary'
                    onClick={handleSubmit} 
                    disabled={!formData.termsAccepted}
                >
                    Book
                </Button>
            </div>

            {/* Terms and Conditions Modal */}
            <JoinerTermsService open={openModal} onClose={toggleModal} />

        </form>
        </div>
    );
}
export default JoinerDetailsForm;