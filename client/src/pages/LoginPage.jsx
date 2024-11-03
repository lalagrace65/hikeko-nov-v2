import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";  

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirectPath, setRedirectPath] = useState('/'); // Default redirect path
    const { setUser } = useContext(UserContext);
    
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/login', { email, password }, { withCredentials: true });
            setUser(data);  // This should include name, email, id, and role
            
            alert('Login successful');

            // Check user role to set redirect path
            if (data.role === 'admin') {
                setRedirectPath('/admin'); // Redirect to AdminPage for admin users
            } else {
                setRedirectPath('/'); // Or any other page for non-admin users
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
