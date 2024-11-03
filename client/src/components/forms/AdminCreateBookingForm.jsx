import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function JoinerForm() {
  const [formData, setFormData] = useState({
    joinerName: '',
    email: '',
    contactNumber: '',
    pickupLocation: '',
    age: '',
    sex: 'Male',
    homeAddress: '',
    emergencyContactPerson: '',
    emergencyContactNumber: '',
    medicalCondition: false,
    conditionDetails: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const inputHeader = (text) => (
    <h2 className="text-2xl mt-4">{text}</h2>
  );

  const inputDescription = (text) => (
    <p className="text-gray-500 text-sm">{text}</p>
  );

  const preInput = (header, description) => (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/bookings', formData);
      alert(response.data.message);
      setFormData({
        joinerName: '',
        email: '',
        contactNumber: '',
        pickupLocation: '',
        age: '',
        sex: 'Male',
        homeAddress: '',
        emergencyContactPerson: '',
        emergencyContactNumber: '',
        medicalCondition: false,
        conditionDetails: ''
      });
    } catch (error) {
      console.error('Error:', error.response);
      const errorMessage = error.response?.data?.message || 'Failed to submit booking';
      alert(errorMessage);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="border bg-white shadow-lg rounded-xl p-6 flex gap-8">
        <div className="flex flex-col w-1/2">
          {preInput('Joiner Name')}
          <input
            type="text"
            name="joinerName"
            placeholder="Name"
            value={formData.joinerName}
            onChange={handleChange}
            required
          />

          {preInput('Email')}
          <input
            type="email"
            name="email"
            placeholder="joiner@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {preInput('Contact Number')}
          <PhoneInput
            className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
            international
            countryCallingCodeEditable={false}
            defaultCountry="PH"
            value={formData.contactNumber}
            onChange={(value) => setFormData({ ...formData, contactNumber: value })}
            required
          />

          {preInput('Pickup Location')}
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
          />

          {preInput('Age')}
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />

          {preInput('Sex', 'Select gender')}
          <select
            name="sex"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col w-1/2">
          {preInput('Home Address')}
          <input
            type="text"
            name="homeAddress"
            placeholder="(Street, City, Province)"
            value={formData.homeAddress}
            onChange={handleChange}
          />

          {preInput('Emergency Contact Person')}
          <input
            type="text"
            name="emergencyContactPerson"
            value={formData.emergencyContactPerson}
            onChange={handleChange}
          />

          {preInput('Emergency Contact Number')}
          <PhoneInput
            className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
            international
            countryCallingCodeEditable={false}
            defaultCountry="PH"
            value={formData.emergencyContactNumber}
            onChange={(value) => setFormData({ ...formData, contactNumber: value })}
            required
          />

          <label className="flex items-center mt-2">
            Does hiker have medical condition?
            <input
              type="checkbox"
              name="medicalCondition"
              checked={formData.medicalCondition}
              onChange={handleChange}
              className="ml-2"
            />
          </label>

          {formData.medicalCondition && (
            <>
              {preInput('Condition Details', 'Provide details of the medical condition')}
              <textarea
                type="text"
                name="conditionDetails"
                value={formData.conditionDetails}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit" onClick={handleSubmit} className="w-full p-2 bg-primary text-white rounded-2xl mt-4">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
