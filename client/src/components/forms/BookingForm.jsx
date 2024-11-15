import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ packageId }) => {
    const [formData, setFormData] = useState({
        joinerName: '',
        email: '',
        contactNumber: '',
        pickupLocation: '',
        age: '',
        sex: '',
        homeAddress: '',
        emergencyContactPerson: '',
        emergencyContactNumber: '',
        medicalCondition: '',
        conditionDetails: '',
        proofOfPayment: '',
        paymentType: '',
        termsAccepted: false
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.termsAccepted) {
            setError('You must accept the terms and conditions');
            return;
        }

        const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage

        try {
            const response = await axios.post(
                '/api/booking', // Your backend API endpoint
                { ...formData, packageId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setSuccess(true);
            setError(null);
            setFormData({
                joinerName: '',
                email: '',
                contactNumber: '',
                pickupLocation: '',
                age: '',
                sex: '',
                homeAddress: '',
                emergencyContactPerson: '',
                emergencyContactNumber: '',
                medicalCondition: '',
                conditionDetails: '',
                proofOfPayment: '',
                paymentType: '',
                termsAccepted: false
            });
        } catch (err) {
            setError('Failed to submit booking. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Booking Form</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Booking Successful!</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Joiner Name:</label>
                    <input
                        type="text"
                        name="joinerName"
                        value={formData.joinerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Pickup Location:</label>
                    <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Sex:</label>
                    <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Home Address:</label>
                    <textarea
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Emergency Contact Person:</label>
                    <input
                        type="text"
                        name="emergencyContactPerson"
                        value={formData.emergencyContactPerson}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Emergency Contact Number:</label>
                    <input
                        type="text"
                        name="emergencyContactNumber"
                        value={formData.emergencyContactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Medical Condition:</label>
                    <input
                        type="text"
                        name="medicalCondition"
                        value={formData.medicalCondition}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Condition Details:</label>
                    <textarea
                        name="conditionDetails"
                        value={formData.conditionDetails}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Proof of Payment:</label>
                    <input
                        type="file"
                        name="proofOfPayment"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div>
                    <label>Payment Type:</label>
                    <select
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Payment Type</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleCheckboxChange}
                        />
                        I accept the terms and conditions
                    </label>
                </div>
                <button type="submit">Submit Booking</button>
            </form>
        </div>
    );
};

export default BookingForm;
