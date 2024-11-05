import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { baseUrl } from "@/Url.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirectPath, setRedirectPath] = useState('/'); // Default redirect path
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
        }
    }, [setUser]);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post(`${baseUrl}/login`, { email, password }, { withCredentials: true });
            
            setUser(data);  // This should include name, email, id, and role
            
            // Store token and user info in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));

            alert('Login successful');

            // Set redirect path based on user role
            if (data.role === 'admin') {
                setRedirectPath('/admin');
            } else {
                setRedirectPath('/');
            }

            setRedirect(true);
        } catch (e) {
            alert('Login failed');
        }
    }

    // Redirect based on the user's role
    if (redirect) {
        return <Navigate to={redirectPath} />
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
