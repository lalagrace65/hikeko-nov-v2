import { baseUrl } from "@/Url";
import axios from "axios";
import { useState } from "react";
import { Button, Card, CardBody, CardFooter, Typography, Input } from "@material-tailwind/react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [emergencyContactNo, setEmergencyContactNo] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [role] = useState('staff');  

    // Function for sending registration data to API
    async function registerUser(ev) {
        ev.preventDefault();
        // Check if the passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return; // Stop the form submission if passwords don't match
        }
        try { 
            await axios.post(`${baseUrl}/register`, {
                firstName, 
                lastName, 
                email, 
                password, 
                confirmPassword, 
                address, 
                contactNo, 
                emergencyContactNo, 
                dateOfBirth, 
                role 
            });
            toast.success('Registration Successful!');
            console.log('Registration successful');
            
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAddress('');
            setContactNo('');
            setEmergencyContactNo('');
            setDateOfBirth('');
        } catch (e) {
            toast.error('Registration failed');
            console.log(error);
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <Card className="mx-auto w-full max-w-[30rem]">
                <CardBody className="flex flex-col gap-4">
                <div>
                    <Typography variant="h6" className="text-2xl text-center">Register</Typography>
                    <hr className="w-full border-t-1 border-gray-300 mx-auto mt-4 mb-4" />
                    <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <div className="grid gap-1 sm:grid-cols-2">
                        <input 
                            type="text" 
                            placeholder="first name" 
                            value={firstName} 
                            onChange={ev => setFirstName(ev.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="last name" 
                            value={lastName} 
                            onChange={ev => setLastName(ev.target.value)} 
                        />
                        <div>
                            <h6 className="ml-2 text-gray-600 text-sm">Contact Number</h6>
                            <PhoneInput
                                className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="PH"
                                placeholder="Enter phone number"
                                value={contactNo}
                                onChange={setContactNo}
                            />
                        </div>
                        <div>
                            <h6 className="ml-2 text-gray-600 text-sm">Emergency Contact Number</h6>
                            <PhoneInput
                                className="phone-input-container mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="PH"
                                placeholder="Enter phone number"
                                value={emergencyContactNo}
                                onChange={setEmergencyContactNo}    
                            />
                        </div>
                    </div>
                        <input 
                            type="text" 
                            placeholder="address" 
                            value={address} 
                            onChange={ev => setAddress(ev.target.value)} 
                        />
                    
                        <h6 className="mt-2 ml-2 text-gray-600 text-sm">Date of Birth</h6>
                        <input 
                            className="mt-1 mb-2 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                            type="Date" 
                            value={dateOfBirth} 
                            onChange={ev => setDateOfBirth(ev.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={ev => setPassword(ev.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={ev => setConfirmPassword(ev.target.value)} 
                        />
                        </form>
                        </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button className="primary" type="submit">Register</Button>
                    <div className="text-center py-2 text-gray-500 mt-2">
                        <Typography variant="small" className="font-normal"> 
                            Already a member?
                            <Link className=" text-black font-semibold" to={'/login'}> Login</Link>
                        </Typography>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
