import { baseUrl } from "@/Url";
import axios from "axios";
import React,{ useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Typography, Input, avatar } from "@material-tailwind/react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import StyledInput from "@/components/icons/InputField";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        contactNo: "",
        emergencyContactNo: "",
        dateOfBirth: "",
        avatar: "",
    });
    const [passwordValidation, setPasswordValidation] = useState({
        hasLowercase: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false,
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password
    const [errors, setErrors] = useState({});
    const form = React.useRef();

    useEffect(() => {
        const datepicker = flatpickr("#date-picker", {
            dateFormat: "Y-m-d",
            onChange: ([selectedDate]) => {
                setFormData((prevState) => ({
                    ...prevState,
                    dateOfBirth: selectedDate.toISOString().split("T")[0], // ISO format
                }));
            },
        });

        // Optional: Customize styling (from your provided script)
        const calendarContainer = datepicker.calendarContainer;
        const calendarMonthNav = datepicker.monthNav;
        const calendarNextMonthNav = datepicker.nextMonthNav;
        const calendarPrevMonthNav = datepicker.prevMonthNav;
        const calendarDaysContainer = datepicker.daysContainer;

        calendarContainer.className +=
            " bg-white p-4 border border-blue-gray-50 rounded-lg shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 focus:outline-none break-words whitespace-normal";

        calendarMonthNav.className +=
            " flex items-center justify-between mb-4 [&>div.flatpickr-month]:-translate-y-3";

        calendarNextMonthNav.className +=
            " absolute !top-2.5 !right-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300";

        calendarPrevMonthNav.className +=
            " absolute !top-2.5 !left-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300";

        calendarDaysContainer.className +=
            " [&_span.flatpickr-day]:!rounded-md [&_span.flatpickr-day.selected]:!bg-gray-900 [&_span.flatpickr-day.selected]:!border-gray-900";

        return () => datepicker.destroy(); // Cleanup on unmount
    }, []);
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value.trimStart() });

        // Validate password on input
        if (field === "password") {
            setPasswordValidation({
                hasLowercase: /[a-z]/.test(value),
                hasUppercase: /[A-Z]/.test(value),
                hasNumber: /[0-9]/.test(value),
                hasSpecialChar: /[@$!%*?&]/.test(value),
                hasMinLength: value.length >= 8,
            });
        }
        // Phone number validation
        if (field === "contactNo" || field === "emergencyContactNo") {
            if (value && !isValidPhoneNumber(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "Invalid phone number format for the selected country.",
                }));
            } else {
                setErrors((prevErrors) => {
                    const { [field]: _, ...rest } = prevErrors; // Remove specific error
                    return rest;
                });
            }
        }
    };
    const handlePhoneChange = (field, value) => {
        const maxLength = 13; // Set the max length to 13 digits
        const formattedValue = value.replace(/\D/g, ""); // Strip non-digit characters
        
        // Only update if the length is less than or equal to the max length
        if (formattedValue.length <= maxLength) {
            setFormData((prevState) => ({ ...prevState, [field]: value }));
            
            // Phone number validation
            if (isValidPhoneNumber(value)) {
                setErrors((prevErrors) => {
                    const { [field]: _, ...rest } = prevErrors; // Remove specific error
                    return rest;
                });
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "Invalid phone number format for the selected country.",
                }));
            }
        } else {
            // Optionally, show an error if user tries to enter more than maxLength
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: `Your number cannot exceed ${maxLength} digits.`,
            }));
        }
    };
    

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
        // Validate email - only Gmail allowed
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;  // Regex to check Gmail format
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Only Gmail addresses are allowed.";
        }

        if (!formData.address.trim()) newErrors.address = "Address is required.";
        if (!formData.password.trim()) newErrors.password = "Password is required.";
        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required.";
        if (!isValidPhoneNumber(formData.contactNo)) {
            newErrors.contactNo = "Invalid Contact Number format.";
        }
        if (!isValidPhoneNumber(formData.emergencyContactNo)) {
            newErrors.emergencyContactNo = "Invalid Emergency Contact Number format.";
        }
        if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of Birth is required.";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!Object.values(passwordValidation).every(Boolean)) {
            newErrors.password = "Password does not meet all criteria.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const registerUser = async (ev) => {
        ev.preventDefault();

        if (!validateForm()) return; // Stop submission if form is invalid

        const submissionData = {
            ...formData,
            role: "staff",
        };
        console.log("Preparing to submit:", submissionData);

        const emailData = {
            to_name: formData.firstName, // Name for EmailJS
            to_email: formData.email, // Email for EmailJS
            to_mobileNum: formData.contactNo, // Mobile Number for EmailJS
            to_address: formData.address, // Address for EmailJS
            to_dob: formData.dateOfBirth, // Date of Birth for EmailJS
        };

        try {
            console.log("Preparing to send email...");
            //await emailjs.send('service_ehzzg2c', 'template_xc2nmxt', emailData, 'XczVijVc-NaoUCGic');
            await emailjs.send('service_yjbwkqk', 'template_lyrpfqj', emailData, 'Dm5FV3SaKG6JVjSyM');
            console.log("Email sent successfully!");

            const signupResult = await axios.post(`${baseUrl}/register`, {
                ...formData,
                role: "staff",
            });
            console.log("Signup successful:", signupResult.data);
            toast.success("Registration Successful!");

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                contactNo: "",
                emergencyContactNo: "",
                dateOfBirth: "",
            });
            setPasswordValidation({
                hasLowercase: false,
                hasUppercase: false,
                hasNumber: false,
                hasSpecialChar: false,
                hasMinLength: false,
            });
        } catch (error) {
            toast.error("Registration failed.");
            console.error(error);
        }
    };

    return (
    <div className="mt-10 grow flex items-center justify-center">
        <Card className="mx-auto w-full max-w-[30rem] border">
            <CardBody className="flex flex-col gap-4">
                <Typography variant="h6" className="text-2xl text-center">Register</Typography>
                <hr className="w-full border-t-1 border-gray-300 mx-auto mt-4" />
                <form className="max-w-md mx-auto" onSubmit={registerUser} ref={form}>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <div className="mt-2">
                            <Input
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={(ev) => handleChange("firstName", ev.target.value)}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>
                        <div className="mt-2">
                            <Input
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={(ev) => handleChange("lastName", ev.target.value)}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>
                        <div>
                            <h6 className="ml-2 text-gray-600 text-sm">Contact Number</h6>
                            <PhoneInput
                                className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-xl"
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="PH"
                                placeholder="Enter phone number"
                                value={formData.contactNo}
                                onChange={(value) => handlePhoneChange("contactNo", value || "")}
                                name="contactNo"
                                
                            />
                            {errors.contactNo && <p className="text-red-500 text-sm">{errors.contactNo}</p>}
                        </div>
                        <div>
                            <h6 className="ml-2 text-gray-600 text-sm">Emergency Contact Number</h6>
                            <PhoneInput
                                className=" phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-xl"
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="PH"
                                placeholder="Enter phone number"
                                value={formData.emergencyContactNo}
                                onChange={(value) => handlePhoneChange("emergencyContactNo", value || "")}
                            />
                            {errors.emergencyContactNo && <p className="text-red-500 text-sm">{errors.emergencyContactNo}</p>}
                        </div>
                    </div>
                    <div>
                        <Input
                            label="Address"
                            value={formData.address}
                            onChange={(ev) => handleChange("address", ev.target.value)}
                            name="address"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div className="mt-2">
                        <h6 className="ml-2 text-gray-600 text-sm mb-1">Date of Birth</h6>
                        <div className="relative min-h-[48px] w-full min-w-[200px]">
                            <input
                                id="date-picker"
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder="Select a Date"
                                value={formData.dateOfBirth}
                                onChange={(ev) => handleChange("dateOfBirth", ev.target.value)}
                                name="dateOfBirth"                            
                            />
                            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex">
                            <Input
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={(ev) => handleChange("email", ev.target.value)}
                                name="email"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="relative mt-4">
                        <Input
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            value={formData.password}
                            onChange={(ev) => handleChange("password", ev.target.value)}
                        />
                        <div
                            className="absolute top-3 right-3 cursor-pointer text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="relative mt-4">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(ev) => handleChange("confirmPassword", ev.target.value)}
                        />
                        <div
                            className="absolute top-3 right-3 cursor-pointer text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <ul className="mt-2 text-sm ml-2">
                            <li className={passwordValidation.hasLowercase ? "text-green-400" : "text-gray-400"}>
                                * Includes a lowercase letter
                            </li>
                            <li className={passwordValidation.hasUppercase ? "text-green-400" : "text-gray-400"}>
                                * Includes an uppercase letter
                            </li>
                            <li className={passwordValidation.hasNumber ? "text-green-400" : "text-gray-400"}>
                                * Includes a number
                            </li>
                            <li className={passwordValidation.hasSpecialChar ? "text-green-400" : "text-gray-400"}>
                                * Includes a special character (@, $, !, %, *, ?, &)
                            </li>
                            <li className={passwordValidation.hasMinLength ? "text-green-400" : "text-gray-400"}>
                                * At least 8 characters long
                            </li>
                        </ul>
                    <Button className="primary mt-4" type="submit">Register</Button>
                </form>
            </CardBody>
            <CardFooter className="pt-0">
                <div className="text-center py-2 text-gray-500 mt-2">
                    <Typography variant="small" className="font-normal">
                        Already a member?
                        <Link className="text-black font-semibold" to="/login"> Login</Link>
                    </Typography>
                </div>
            </CardFooter>
        </Card>
    </div>
    );
}