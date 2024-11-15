import { baseUrl } from "@/Url";
import axios from "axios";
import { useState } from "react";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        if (!formData.password.trim()) newErrors.password = "Password is required.";
        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required.";
        if (!formData.contactNo) newErrors.contactNo = "Contact Number is required.";
        if (!formData.emergencyContactNo) newErrors.emergencyContactNo = "Emergency Contact Number is required.";
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

        try {
            await axios.post(`${baseUrl}/register`, {
                ...formData,
                role: "staff",
            });
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
        <div className="mt-4 grow flex items-center justify-center">
            <Card className="mx-auto w-full max-w-[30rem]">
                <CardBody className="flex flex-col gap-4">
                    <Typography variant="h6" className="text-2xl text-center">Register</Typography>
                    <hr className="w-full border-t-1 border-gray-300 mx-auto mt-4 mb-4" />
                    <form className="max-w-md mx-auto" onSubmit={registerUser}>
                        <div className="grid gap-1 sm:grid-cols-2">
                            <div>
                                <h6 className="ml-2 text-gray-600 text-sm">First Name</h6>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={(ev) => handleChange("firstName", ev.target.value)}
                                    className="w-full px-3 py-2 border rounded-xl"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div>
                                <h6 className="ml-2 text-gray-600 text-sm">Last Name</h6>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={(ev) => handleChange("lastName", ev.target.value)}
                                    className="w-full px-3 py-2 border rounded-xl"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                            <div>
                                <h6 className="ml-2 text-gray-600 text-sm">Contact Number</h6>
                                <PhoneInput
                                    className="mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-xl"
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry="PH"
                                    placeholder="Enter phone number"
                                    value={formData.contactNo}
                                    onChange={(value) => handleChange("contactNo", value || "")}
                                />
                                {errors.contactNo && <p className="text-red-500 text-sm">{errors.contactNo}</p>}
                            </div>
                            <div>
                                <h6 className="ml-2 text-gray-600 text-sm">Emergency Contact Number</h6>
                                <PhoneInput
                                    className="mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-xl"
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry="PH"
                                    placeholder="Enter phone number"
                                    value={formData.emergencyContactNo}
                                    onChange={(value) => handleChange("emergencyContactNo", value || "")}
                                />
                                {errors.emergencyContactNo && <p className="text-red-500 text-sm">{errors.emergencyContactNo}</p>}
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Address"
                                value={formData.address}
                                onChange={(ev) => handleChange("address", ev.target.value)}
                                className="w-full px-3 py-2 border rounded-xl"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>
                        <div>
                            <h6 className="mt-2 ml-2 text-gray-600 text-sm">Date of Birth</h6>
                            <input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(ev) => handleChange("dateOfBirth", ev.target.value)}
                                className="w-full px-3 py-2 border rounded-xl"
                            />
                            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(ev) => handleChange("email", ev.target.value)}
                                className="w-full px-3 py-2 border rounded-xl"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(ev) => handleChange("password", ev.target.value)}
                                className="w-full px-3 py-2 border rounded-xl"
                            />
                            <div
                                className="absolute top-3 right-3 cursor-pointer text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            <ul className="mt-2 text-sm">
                                <li className={passwordValidation.hasLowercase ? "text-green-500" : "text-red-500"}>
                                    * Includes a lowercase letter
                                </li>
                                <li className={passwordValidation.hasUppercase ? "text-green-500" : "text-red-500"}>
                                    * Includes an uppercase letter
                                </li>
                                <li className={passwordValidation.hasNumber ? "text-green-500" : "text-red-500"}>
                                    * Includes a number
                                </li>
                                <li className={passwordValidation.hasSpecialChar ? "text-green-500" : "text-red-500"}>
                                    * Includes a special character (@, $, !, %, *, ?, &)
                                </li>
                                <li className={passwordValidation.hasMinLength ? "text-green-500" : "text-red-500"}>
                                    * At least 8 characters long
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={(ev) => handleChange("confirmPassword", ev.target.value)}
                                className="w-full px-3 py-2 border rounded-xl"
                            />
                            <div
                                className="absolute top-3 right-3 cursor-pointer text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
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
