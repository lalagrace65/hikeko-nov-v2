import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const formSchema = z.object({
  ownerFirstName: z.string().min(2, {
    message: "Owner First Name is required.",
  }),
  ownerLastName: z.string().min(2, {
    message: "Owner Last Name is required.",
  }),
  businessEmail: z.string().email({
    message: "Business Email is required.",
  }),
  birCertificate: z.enum(["yes", "no"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "Business Registration Certificate is required." };
      }
      return { message: "Invalid input." };
    },
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

export default function CredentialForm() {
  const navigate = useNavigate(); // Initialize navigate
  const [isChecked, setIsChecked] = useState(false);

  const [contactNo, setContactNo] = useState('');

  const handleCheckboxChange = (ev) => {
    setIsChecked(ev.target.checked); // Update state based on checkbox
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerFirstName: "",
      ownerLastName: "",
      businessEmail: "",
      ownerMobileNum: "",
      birCertificate: "",
      termsAccepted: false,
    },
  });

  const handleNext = form.handleSubmit((formValues) => {
    // Check if BIR Certificate is present
    if (formValues.birCertificate === "no") {
      toast.error("You must have a BIR Certificate to proceed."); // Use toast for notification
      return; // Prevent proceeding to the next step
    }
    // Now termsAccepted is validated through form schema
    // Store data in local storage
    localStorage.setItem("formData", JSON.stringify(formValues));
    // Navigate to the next page
    navigate("/travelAgencySignUp/businessDetails");
  });

  return (
    <div className="">
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="ownerFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Owner First Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Owner Last Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Business Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerMobileNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner's Mobile Number:</FormLabel>
                <FormControl>
                    <PhoneInput
                        className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PH"
                        placeholder="Enter phone number"
                        value={contactNo}
                        onChange={setContactNo}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have BIR 2303 form (BIR Certificate)?</FormLabel>
                <FormControl>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="birFormYes"
                        value="yes"
                        checked={field.value === "yes"}
                        onChange={() => field.onChange("yes")} // Update form state directly
                        className="mr-2"
                      />
                      <label htmlFor="birFormYes">Yes</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="birFormNo"
                        value="no"
                        checked={field.value === "no"}
                        onChange={() => field.onChange("no")} // Update form state directly
                        className="mr-2"
                      />
                      <label htmlFor="birFormNo">No</label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Terms and conditions  */}
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-6"
                    id="terms"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                  <Label htmlFor="terms" 
                    className="cursor-pointer"
                    onClick={() => {
                      
                    }}>Accept terms and conditions</Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button
            type="button"
            onClick={handleNext}
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Get Started
          </Button>
        </form>
      </Form>
    </div>
  );
}
