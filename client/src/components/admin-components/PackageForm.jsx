import axios from "axios";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import dayjs from "dayjs"; 
import Packages from "../admin-components/Packages";
import { MultiLevelSidebar } from "../admin-components/AdminSidebar";
import toast from "react-hot-toast";

export default function PackageForm() {
    const [trails, setTrails] = useState([]);
    const [selectedTrail, setSelectedTrail] = useState(''); 
    const [packages, setPackages] = useState([]);
    const [additionalPackages, setAdditionalPackages] = useState();
    const [price, setPrice] = useState('');
    const [paymentOptions, setPaymentOptions] = useState('');
    const [exclusions, setExclusions] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [coordinatorName, setCoordinatorName] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [dpPolicy, setDpPolicy] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); 

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

    async function addNewPackage(ev) {
        ev.preventDefault();
        try {
            const checkInTime = timeStringToObject(checkIn);
            const checkOutTime = timeStringToObject(checkOut);

            if (!selectedDate) {
                toast.error('Select event date!');
                return;
            }

            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            const dateCreated = new Date();

            await axios.post('http://localhost:4000/packages', {
                trailId: selectedTrail,
                packages,
                additionalPackages,
                price,
                paymentOptions,
                exclusions,
                pickupLocation,
                extraInfo,
                coordinatorName,
                checkIn: checkInTime,
                checkOut: checkOutTime,
                maxGuests,
                dpPolicy,
                date: formattedDate,
                dateCreated: dateCreated
            }, { withCredentials: true });

            toast.success('New package posted successfully!');   

            // Clear form fields
            setPackages([]);
            setAdditionalPackages('');
            setPrice('');
            setPaymentOptions('');
            setExclusions('');
            setPickupLocation('');
            setExtraInfo('');
            setCoordinatorName('');
            setCheckIn('');
            setCheckOut('');
            setMaxGuests('');
            setDpPolicy('');
            setSelectedDate(null);
            setSelectedTrail(''); 
        } catch (err) {
            toast.error('Failed to post package.');
            console.error('Error posting package:', err);     
        }
    }

    // Fetch trails data when component mounts
    useEffect(() => {
        async function fetchTrails() {
            try {
                const response = await axios.get('http://localhost:4000/api/trails'); // Adjust the endpoint if necessary
                setTrails(response.data);
            } catch (err) {
                console.error('Error fetching trails:', err);
            }
        }
        fetchTrails();
    }, []);

    return (
        <div className="flex">
            <MultiLevelSidebar />
            <div className="flex-1 p-8">
                <div className="flex justify-between">
                    <div className="w-full md:w-8/12">
                        <form onSubmit={addNewPackage}>
                            {preInput('Select Trail', 'Choose the trail for this package')}
                            <select 
                                value={selectedTrail}
                                onChange={(ev) => setSelectedTrail(ev.target.value)}
                                required
                            >
                                <option value="" disabled>Select a trail</option>
                                {trails.map((trail) => (
                                    <option key={trail._id} value={trail._id}>{trail.title}</option>
                                ))}
                            </select>

                            {preInput('Packages Inclusions', 'Select all packages available')}
                            <div className="mt-2">
                                <Packages selected={packages} onChange={setPackages} />
                            </div>

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

                            {preInput('Downpayment Policy')}
                            <textarea
                                value={dpPolicy}
                                onChange={ev => setDpPolicy(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded"
                                rows={5}
                            />

                            {preInput('Extra Info', 'Add here hiking rules & regulations, reminders, iterinary, etc. (Optional)')}
                            <textarea
                                value={extraInfo}
                                onChange={ev => setExtraInfo(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded"
                                rows={5}
                            />
                            <button className="primary my-4 w-full p-2 bg-blue-500 text-white rounded">Save</button>
                        </form>
                    </div>

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
                        {preInput('Event Time', 'Select the event time for this package')}
                            <div className="grid gap-1 sm:grid-cols-2">
                                <div>
                                    <h3 className="mt-2 -mb-1">Start</h3>
                                    <input type="time"
                                        value={checkIn}
                                        onChange={ev => setCheckIn(ev.target.value)}
                                        placeholder="14:00"
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">End</h3>
                                    <input type="time"
                                        value={checkOut}
                                        onChange={ev => setCheckOut(ev.target.value)}
                                        placeholder="11:00"
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
                        </div> 
                        <div>
                            {preInput('Pickup Location', 'Enter the pickup location address')}
                            <input type="text"
                                value={pickupLocation}
                                onChange={ev => setPickupLocation(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded"
                            />
                        </div>
                        <div>
                            {preInput('Coordinator Name')}
                            <input type="text"
                                value={coordinatorName}
                                onChange={ev => setCoordinatorName(ev.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            {preInput('Price', 'Enter tour price')}
                            <input type="text"
                                value={price}
                                onChange={ev => setPrice(ev.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            {preInput('Payment Method', 'Input payment method and details')}
                            <textarea
                                value={paymentOptions}
                                onChange={ev => setPaymentOptions(ev.target.value)}
                                className="w-full border mt-2 p-2 rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
}
