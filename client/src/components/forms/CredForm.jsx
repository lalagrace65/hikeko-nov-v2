import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input} from "@material-tailwind/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function CredForm() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ownerMobileNum, setOwnerMobileNum] = useState("");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      ownerFirstName: "",
      ownerLastName: "",
      birCertificate: "",
      termsAccepted: false,
      ownerMobileNum: "",
    },
  });

  
  const onSubmit = async (data, ev) => {
    ev.preventDefault();

    if (data.birCertificate === "no") {
      toast.error("You must have a BIR Certificate to proceed.");
      return;
    }

    localStorage.setItem("formData", JSON.stringify(data));
    // Navigate to the next page
    navigate("/travelAgencySignUp/businessDetails");
  };

  const preventLeadingWhitespace = (value) => {
    return value.trim().length === value.length || "No leading whitespace allowed.";
  };


  return (
      <form onSubmit={handleSubmit(onSubmit)} 
       className="space-y-4">
        
        {/* Owner First Name */}
        <div>
          <Input 
            name='ownerFirstName'
            label="Business Owner First Name"
            {...register("ownerFirstName", {
              required: "Owner First Name is required.",
              validate: preventLeadingWhitespace,
            })}
            
          />
          {errors.ownerFirstName && (
            <span className="text-red-500">{errors.ownerFirstName.message}</span>
          )}
        </div>

        {/* Owner Last Name */}
        <div>
          <Input
            label="Business Owner Last Name"
            {...register("ownerLastName", {
              required: "Owner Last Name is required.",
              validate: preventLeadingWhitespace,
            })}
           
          />
          {errors.ownerLastName && (
            <span className="text-red-500">{errors.ownerLastName.message}</span>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-gray-700">Owner's Mobile Number:</label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="PH"
            placeholder="Enter phone number"
            value={ownerMobileNum}
            onChange={(value) => {
              setOwnerMobileNum(value); // Update local state
              setValue("ownerMobileNum", value); // Update react-hook-form value
            }}
            onBlur={() => {
              // Manually trigger validation on blur
              setValue("ownerMobileNum", ownerMobileNum, { shouldValidate: true });
            }}
            className="mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          {errors.ownerMobileNum && (
            <span className="text-red-500">{errors.ownerMobileNum.message}</span>
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
            <span className="text-red-500">{errors.birCertificate.message}</span>
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
            <span className="text-red-500">{errors.termsAccepted.message}</span>
          )}
        </div>

        {/* Terms Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg">
              <h2 className="text-xl font-semibold">Terms and Conditions</h2>
              <p className="mt-4">By accepting, you agree to our terms and conditions.</p>
              <div className="flex justify-end mt-4">
                <Button
                  color="teal"
                  onClick={() => {
                    setValue("termsAccepted", true);
                    setIsDialogOpen(false);
                  }}
                >
                  Accept
                </Button>
                <Button color="gray" onClick={() => setIsDialogOpen(false)} className="ml-2">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button 
            type="submit" 
            className="w-full mt-4"
        >
          Get Started
        </Button>
      </form>
  );
}
