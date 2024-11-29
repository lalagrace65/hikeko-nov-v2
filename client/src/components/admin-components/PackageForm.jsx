import axios from "axios";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import dayjs from "dayjs"; 
import Packages from "../admin-components/Packages";
import { MultiLevelSidebar } from "../admin-components/AdminSidebar";
import toast from "react-hot-toast";
import { baseUrl } from "@/Url";
import { Typography, Spinner, Button } from "@material-tailwind/react";
import { FiUpload } from "react-icons/fi";
import { ReactSortable } from 'react-sortablejs';
import { FaPlus } from "react-icons/fa6";


export default function PackageForm() {
    const [trails, setTrails] = useState([]);
    const [selectedTrail, setSelectedTrail] = useState(''); 
    const [showDropdown, setShowDropdown] = useState(false);
    const [packages, setPackages] = useState([]);
    const [additionalPackages, setAdditionalPackages] = useState();
    const [price, setPrice] = useState('');
    const [paymentOptions, setPaymentOptions] = useState('');
    const [exclusions, setExclusions] = useState('');
    const [pickupLocations, setPickupLocations] = useState('');
    const [pickupLocationInput, setPickupLocationInput] = useState("");
    const [extraInfo, setExtraInfo] = useState('');
    const [coordinatorName, setCoordinatorName] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [dpPolicy, setDpPolicy] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); 
    const [packageImages, setPackageImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // Error states
    const [errors, setErrors] = useState({
        selectedTrail: "",
        packages: "",
        price: "",
        dpPolicy: "",
        pickupLocation: "",
        coordinatorName: "",
        checkIn: "",
        checkOut: "",
        selectedDate: "",
        maxGuests: "",
    });

    // Validate fields function
    const validate = () => {
        const newErrors = {};
        if (!selectedTrail) newErrors.selectedTrail = "Trail is required";
        if (!packages) newErrors.packages = "Packages is required";
        if (!price || isNaN(parseFloat(price.replace(/[₱,]/g, "")))) newErrors.price = "Valid price is required";
        if (!dpPolicy || isNaN(parseFloat(dpPolicy.replace(/[₱,]/g, "")))) newErrors.dpPolicy = "Valid downpayment policy is required";
        if (!exclusions) newErrors.exclusions = "Package exclusions is required";
        if (!paymentOptions) newErrors.paymentOptions = "Payment details is required";
        if (!coordinatorName) newErrors.coordinatorName = "Coordinator name is required";
        if (!checkIn) newErrors.checkIn = "Check-in time is required";
        if (!checkOut) newErrors.checkOut = "Check-out time is required";
        if (!selectedDate) newErrors.selectedDate = "Event Date is required";
        if (!maxGuests || isNaN(maxGuests)) newErrors.maxGuests = "Valid max guests number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function formatToPHP(value) {
        const num = parseFloat(value);
        return isNaN(num) ? '' : new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(num);
    }

    const addPickupLocation = () => {
        if (pickupLocationInput.trim() !== "") {
            setPickupLocations([...pickupLocations, pickupLocationInput.trim()]);
            setPickupLocationInput(""); // Clear the input field after adding
        }
    };

    const removePickupLocation = (index) => {
        const updatedLocations = [...pickupLocations];
        updatedLocations.splice(index, 1);
        setPickupLocations(updatedLocations);
    };

    // Format price to always show the PHP currency symbol
    function formatPrice(value) {
        const rawValue = value.replace(/[^0-9.]/g, ''); // Remove any non-numeric characters
        return formatToPHP(rawValue); // Convert the cleaned value to PHP format
    }
    function handlePriceChange(ev) {
        const inputValue = ev.target.value.replace(/[^0-9.]/g, ''); 
        setPrice(inputValue); 
    }
    
    function handleDpPolicyChange(ev) {
        const input = ev.target.value.replace(/[^0-9.]/g, '');
        setDpPolicy(input);
    }
    
    function handleBlurPrice() {
        setPrice(formatToPHP(price));
    }
    
    function handleBlurDpPolicy() {
        setDpPolicy(formatToPHP(dpPolicy));
    }

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

    // Helper function to convert 'HH:MM' to an object { hours, minutes }
    function timeStringToObject(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return { hours, minutes };
    }

    function isEndTimeValid(startTime, endTime) {
        const start = timeStringToObject(startTime);
        const end = timeStringToObject(endTime);
    
        // Compare hours and minutes
        if (end.hours > start.hours) return true;
        if (end.hours === start.hours && end.minutes >= start.minutes) return true;
    
        return false;
    }

    const handleEndTimeChange = (ev) => {
        const newEndTime = ev.target.value;
        if (isEndTimeValid(checkIn, newEndTime)) {
            setCheckOut(newEndTime);
        } else {
            toast.error("End time cannot be earlier than start time.");
        }
    };

    async function addNewPackage(ev) {
        ev.preventDefault();
        if (!validate()) {
            toast.error("Please fix the required fields.");
            return;
        }

        try {
            // Sanitize the price input to remove currency symbol and commas
            const sanitizedPrice = parseFloat(price.replace(/[₱,]/g, ''));
            const parsedDpPolicy = parseFloat(dpPolicy.replace(/[₱,]/g, ''));

            if (isNaN(sanitizedPrice)) {
                toast.error('Please enter a valid price.');
                console.log("Error: Price is not a valid number:", price);
                return;
            }

            if (isNaN(parsedDpPolicy)) {
                toast.error('Please enter a valid downpayment policy.');
                console.log("Error: Downpayment policy is not a valid number:", dpPolicy);
                return;
            }

            const checkInTime = timeStringToObject(checkIn);
            const checkOutTime = timeStringToObject(checkOut);

            if (!selectedDate) {
                toast.error('Select event date.');
                return;
            }

            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            const dateCreated = new Date();

            console.log("Submitting package data..."); 
            const response = await axios.post(`${baseUrl}/packages`, {
                trailId: selectedTrail,
                packages,
                additionalPackages,
                price: sanitizedPrice,
                paymentOptions,
                exclusions,
                pickupLocations,
                extraInfo,
                coordinatorName,
                checkIn: checkInTime,
                checkOut: checkOutTime,
                maxGuests,
                dpPolicy: parsedDpPolicy,
                date: formattedDate,
                dateCreated: dateCreated,
                packageImages: packageImages,
            }, { withCredentials: true });

            console.log("Package creation response:", response);
            toast.success('New package posted successfully!');   

            // Clear form fields
            setPackages([]);
            setAdditionalPackages('');
            setPrice('');
            setPaymentOptions('');
            setExclusions('');
            setPickupLocations('');
            setExtraInfo('');
            setCoordinatorName('');
            setCheckIn('');
            setCheckOut('');
            setMaxGuests('');
            setDpPolicy('');
            setSelectedDate(null);
            setSelectedTrail(''); 
            setPackageImages([]);
        } catch (err) {
            toast.error('Failed to post package.');
            console.error('Error posting package:', err);     
        }
    }

    // Fetch trails data when component mounts
    useEffect(() => {
        async function fetchTrails() {
            try {
                const response = await axios.get(`${baseUrl}/api/trails`); // Adjust the endpoint if necessary
                setTrails(response.data);
            } catch (err) {
                console.error('Error fetching trails:', err);
            }
        }
        fetchTrails();
    }, []);

    //Sortable image upload
    async function uploadPackageImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            console.log("Files selected for upload:", files);
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
            try {
                console.log("Sending files to the server...");
                const res = await axios.post('/api/upload', data);
                console.log("Upload response:", res);
                setPackageImages(oldImages => {
                    return [...oldImages, ...res.data.links];
                });
            } catch (error) {
                toast.error("Failed to upload image.");

            } finally {
                setIsUploading(false);
            }
        }
    }
    function updatePackageImagesOrder(packageImages) {
        setPackageImages(packageImages);
    }

    return (
        <div className="flex">
            <MultiLevelSidebar />
            <div className="flex-1 p-8">
                <div className="flex sm:flex-row flex-col justify-between">
                    <div className="w-full sm:w-4/8 md:w-8/12">
                        <form >
                            {preInput('Select Trail', 'Choose the trail for this package')}
                            <div className="relative">
                                <div
                                    className="w-full p-2 border mt-2 rounded"
                                    onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown visibility
                                >
                                    {selectedTrail ? trails.find((trail) => trail._id === selectedTrail)?.title : "Select a trail"}
                                </div>
                                {/* Dropdown container with scrollable list */}
                                {showDropdown && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto border bg-white z-10 rounded mt-1">
                                        <ul>
                                            <li 
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => { setSelectedTrail(""); setShowDropdown(false); }}
                                            >
                                            Select a trail
                                            </li>
                                            {trails.map((trail) => (
                                            <li
                                                key={trail._id}
                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => { setSelectedTrail(trail._id); setShowDropdown(false); }}
                                            >
                                                {trail.title}
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {errors.selectedTrail && <p className="text-red-500 text-sm">{errors.selectedTrail}</p>}
                            </div>

                            {/* Package Inclusions */}
                            {preInput('Packages Inclusions', 'Select all packages available')}
                            <div className="mt-2">
                                <Packages selected={packages} onChange={setPackages} />
                            </div>
                            {errors.packages && <p className="text-red-500 text-sm">{errors.packages}</p>}

                            {preInput('', 'Additional packages (Optional)')}
                            <textarea
                                value={additionalPackages}
                                onChange={ev => setAdditionalPackages(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded text-sm "
                                placeholder="Travel Agency may add additional packages here that are not listed above."
                                rows={5}
                            />

                            {preInput('Package Exclusions', 'Enter the package exclusions')}
                            <textarea
                                value={exclusions}
                                onChange={ev => setExclusions(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded"
                            />
                            {errors.exclusions && <p className="text-red-500 text-sm">{errors.exclusions}</p>}

                            {preInput('Downpayment Policy Price')}
                            <input
                                type="text"
                                value={dpPolicy}
                                onChange={handleDpPolicyChange}
                                onBlur={handleBlurDpPolicy}
                                className="w-full border mt-2 p-2 rounded"
                                
                            />
                            {errors.dpPolicy && <p className="text-red-500 text-sm">{errors.dpPolicy}</p>}

                            {preInput('Extra Info', 'Add here hiking rules & regulations, reminders, iterinary, etc. (Optional)')}
                            <textarea
                                value={extraInfo}
                                onChange={ev => setExtraInfo(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded"
                                rows={5}
                            />
                            {/* Pickup Locations */}
                            <div>
                            {preInput('Pickup Locations', 'Enter the pickup locations for this package')}
                                <div className="flex items-center space-x-2 mt-2">
                                    <input
                                        type="text"
                                        value={pickupLocationInput}
                                        onChange={(e) => setPickupLocationInput(e.target.value)}
                                        placeholder="Enter pickup location"
                                        className="w-[500px] border p-2 rounded"
                                    />
                                    <Button
                                        type="button"
                                        onClick={addPickupLocation}
                                        className="bg-blue-500 w-[200px] text-white p-3 rounded-lg flex items-center justify-center space-x-2"
                                    >
                                        <FaPlus />
                                        <span>Add Pickup Location</span>
                                    </Button>
                                </div>


                                <div className="mt-4">
                                    {pickupLocations.length > 0 ? (
                                        <ul>
                                            {pickupLocations.map((location, index) => (
                                                <li key={index} className="flex items-center w-[500px] justify-between border p-2 my-2 rounded">
                                                    <span>{location}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removePickupLocation(index)}
                                                        className="text-red-500 bg-transparent"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No pickup locations added yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Upload Photo */}
                            <div>
                                <Typography variant="h4" className="my-2">
                                    Upload Photo
                                </Typography>
                                <Typography variant="h6" className="my-2 font-normal text-gray-500">
                                    * Will be display on the package
                                </Typography>
                                <input
                                    type="file" 
                                    onChange={uploadPackageImages}
                                    accept="image/*"  
                                    id="file-upload"
                                    className="hidden " // Hide the actual file input
                                />
                                <label htmlFor="file-upload" className="flex items-center w-1/2 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer">
                                    <FiUpload className='w-5 h-5 mr-4' />
                                    <span>{isUploading ? <Spinner size="sm" /> : "Upload Package Images"}</span>
                                </label>

                                <ReactSortable
                                    list={packageImages}
                                    className="flex flex-relative w-full"
                                    setList={updatePackageImagesOrder}>
                                    {!!packageImages?.length && packageImages.map(link => {
                                        return(
                                            <div key={link} className=" w-36 h-36 mr-2 mt-2">
                                                <img src ={link} alt="" className="w-full h-full object-cover rounded-lg"/>
                                            </div>
                                        );
                                    })}
                                </ReactSortable>
                            </div>
                        </form>
                    </div>
                    
                    {/*Right column*/}   
                    <div className="flex flex-col self-start max-w-sm mt-6">
                        <div className="p-4 border rounded-2xl w-auto">
                            {preInput('Event Date', 'Select event date')}
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate} 
                                disabled={{ before: new Date() }} 
                            />
                        </div>
                        {errors.selectedDate && <p className="text-red-500 text-sm">{errors.selectedDate}</p>}            

                        {preInput('Event Time', 'Select the event time for this package')}
                            <div className="grid gap-1 sm:grid-cols-2">
                                <div>
                                    <h3 className="mt-2 -mb-1">Start</h3>
                                    <input type="time"
                                        value={checkIn}
                                        onChange={ev => setCheckIn(ev.target.value)}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">End</h3>
                                    <input type="time"
                                        value={checkOut}
                                        onChange={handleEndTimeChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            </div>
                        <div>
                        {preInput('Max number of joiners')}
                            <input type="text"
                                value={maxGuests}
                                onChange={ev => setMaxGuests(ev.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.maxGuests && <p className="text-red-500 text-sm">{errors.maxGuests}</p>}
                        </div> 
                        <div>
                            {preInput('Coordinator Name')}
                            <input type="text"
                                value={coordinatorName}
                                onChange={ev => setCoordinatorName(ev.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.coordinatorName && <p className="text-red-500 text-sm">{errors.coordinatorName}</p>}
                        </div>
                        <div>
                            {preInput('Price', 'Enter tour price')}
                            <input type="text"
                                value={price}
                                onChange={handlePriceChange} // Use the handlePriceChange function for onChange
                                onBlur={handleBlurPrice} 
                                className="w-full border p-2 rounded"
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>
                        <div>
                            {preInput('Payment Details', 'Input available payment methods and details')}
                            <textarea
                                value={paymentOptions}
                                onChange={ev => setPaymentOptions(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded"
                                rows={6}
                            />
                            {errors.paymentOptions && <p className="text-red-500 text-sm">{errors.paymentOptions}</p>}
                        </div>
                    </div>
                </div>
                <button className="bg-orange-300 w-full lg:w-[1000px] p-3  mt-4 text-white rounded-full hover:shadow-xl transition-all duration-300 ease-in-out" onClick={addNewPackage}>Save</button>
            </div>
        </div>
    );    
}
