import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TaPrivacyPolicy from "@/context/TaCredPrivacyPolicyTermsCondi";

// Custom phone number validation using isValidPhoneNumber
const validatePhoneNumber = (value) => {
  if (!value || !isValidPhoneNumber(value)) {
    return "Please enter a valid phone number."; // Error message if invalid
  }
  return true; // If valid, return true to indicate no error
};

export default function CredForm() {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactNo, setOwnerMobileNum] = useState("");
  const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birCertificate: "",
      termsAccepted: false,
      contactNo: "",
    },
  });

  // Retrieve subscriptionId from localStorage
  const subscriptionId = localStorage.getItem('subscriptionId');

  const onSubmit = async (data, ev) => {
    ev.preventDefault();

    if (data.birCertificate === "no") {
      toast.error("You must have a BIR Certificate to proceed.");
      return;
    }

    localStorage.setItem("formData", JSON.stringify(data));
    // Navigate to the next page
    navigate("/travelAgencySignUp/businessDetails", { state: { subscriptionId, formData: data } });
  };

  const preventLeadingWhitespace = (value) => {
    return value.trim().length === value.length || "No leading whitespace allowed.";
  };

  const handlePhoneChange = (value) => {
    setOwnerMobileNum(value); // Update local state
    setValue("contactNo", value); // Update react-hook-form value

    // Validate phone number using isValidPhoneNumber
    const validationResult = validatePhoneNumber(value);
    if (validationResult === true) {
      clearErrors("contactNo"); // Clear the error if valid
    } else {
      setError("contactNo", { type: "manual", message: validationResult }); // Set error if invalid
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Owner First Name */}
      <div>
        <Input
          name="firstName"
          label="Business Owner First Name"
          {...register("firstName", {
            required: "Owner First Name is required.",
            validate: preventLeadingWhitespace,
          })}
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm ml-1">{errors.firstName.message}</span>
        )}
      </div>

      {/* Owner Last Name */}
      <div>
        <Input
          label="Business Owner Last Name"
          {...register("lastName", {
            required: "Owner Last Name is required.",
            validate: preventLeadingWhitespace,
          })}
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm ml-1">{errors.lastName.message}</span>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label className="block text-gray-700">Owner's Mobile Number:</label>
        <PhoneInput
          className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-xl"
          international
          countryCallingCodeEditable={false}
          defaultCountry="PH"
          placeholder="Enter phone number"
          value={contactNo}
          onChange={handlePhoneChange} // Update value and validate on change
        />
        {errors.contactNo && (
          <span className="text-red-500 text-sm ml-1">{errors.contactNo.message}</span>
        )}
      </div>

      {/* BIR Certificate */}
      <div>
        <label className="block text-gray-700">Do you have a BIR Certificate?</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              {...register("birCertificate", { required: "This field is required." })}
              type="radio"
              value="yes"
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              {...register("birCertificate")}
              type="radio"
              value="no"
              className="mr-2"
            />
            No
          </label>
        </div>
        {errors.birCertificate && (
          <span className="text-red-500 text-sm ml-1">{errors.birCertificate.message}</span>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("termsAccepted", { required: "You must accept the terms and policy." })}
            color="teal"
          />
          <label
            className="ml-2 cursor-pointer text-gray-700"
            onClick={() => setIsDialogOpen(true)}
          >
            I accept Terms of Service and Privacy Policy
          </label>
        </div>
        {errors.termsAccepted && (
          <span className="text-red-500 text-sm ml-1">{errors.termsAccepted.message}</span>
        )}
      </div>

      {/* Terms Dialog */}
      <TaPrivacyPolicy
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)} // Close the dialog
        onAccept={() => setValue("termsAccepted", true)} // Set termsAccepted to true when accepted
      />

      {/* Submit Button */}
      <Button type="submit" className="w-full mt-4 bg-primary text-white">
        Get Started
      </Button>
    </form>
  );
}
