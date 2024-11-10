import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "@/UserContext";
import { baseUrl } from "@/Url.jsx";
import toast from "react-hot-toast";

export default function TravelAgencyLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirectPath, setRedirectPath] = useState('null'); // Default redirect path
    const { setUser } = useContext(UserContext);
    
    // Check if the user is already logged in when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
    
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setRedirect(true); // Automatically redirect if already logged in
            const parsedUser = JSON.parse(storedUser);

            // Set the redirect path based on user role
            if (parsedUser.role === 'admin') {
                setRedirectPath('/admin');
            } else {
                setRedirectPath('/');
            }
            console.log('User is already logged in. Redirecting to:', redirectPath);
        }
    }, [setUser]);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            console.log('Attempting to login with', { email, password }); // Log input values
            const { data } = await axios.post(`${baseUrl}/travelAgencyLogin`, { email, password }, { withCredentials: true });
    
            console.log('Response from server:', data); // Log the response data from the server
            
            if (data.requiresPasswordChange) {
                toast.success('Login successful. Please change your password.');
                setRedirectPath('/admin/settings'); // Redirect to password update page
                setRedirect(true);  // Set redirect to true to trigger redirection
                console.log('Password change required. Redirecting to settings.');
            } else {
                setUser(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
    
                // Redirect based on role
                if (data.role === 'admin') {
                    setRedirectPath('/admin');
                } else {
                    setRedirectPath('/');
                }
                setRedirect(true); // Trigger the redirect
                console.log('Login successful. Redirecting to:', redirectPath);
            }
        } catch (e) {
            console.error('Login error:', e); // Log the error details
            toast.error(e.response?.data || 'Login failed');
        }
    }
    
    // Conditional redirect based on the state
    if (redirect) {
        console.log('Redirecting to:', redirectPath);
        return <Navigate to={redirectPath} />;
    }


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account? <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
