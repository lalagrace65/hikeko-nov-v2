import { baseUrl } from "@/Url";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');  

    // Function for sending registration data to API
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post(`${baseUrl}/register`, {
                name,
                email,
                password,
                role   // Send role along with other registration data
            });
            alert('Registration Successful. Now you can log in');
        } catch (e) {
            alert('Registration failed. Please try again later');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={name} 
                        onChange={ev => setName(ev.target.value)} 
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
                    
                    {/* Role Selection Dropdown */}
                    <select 
                        value={role} 
                        onChange={ev => setRole(ev.target.value)} 
                        className="my-2"
                    >
                        <option value="">Select Role</option>  {/* Optional, to ensure selection */}
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </select>


                    <button className="primary">Register</button>

                    <div className="text-center py-2 text-gray-500">
                        Already a member? 
                        <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
