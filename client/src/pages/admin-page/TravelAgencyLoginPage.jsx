import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "@/UserContext";
import { baseUrl } from "@/Url.jsx";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export default function TravelAgencyLoginPage() {
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
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setRedirectPath(parsedUser.role === 'admin' ? '/admin' : '/');
            setRedirect(true);
            console.log('User is already logged in. Redirecting to:', parsedUser.role === 'admin' ? '/admin' : '/');
        }
    }, [setUser]);


    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            console.log('Attempting to login with', { email, password }); // Log input values
            const { data } = await axios.post(`${baseUrl}/travelAgencyLogin`, { email, password }, { withCredentials: true });
    
            console.log('Response from server:', data); // Log the entire response data from the server
    
            // Check if token exists in the response data
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                
                if (data.requiresPasswordChange) {
                    toast.success('Login successful. Please change your password.');
                    setRedirectPath('/admin/settings');
                } else {
                    setRedirectPath(data.role === 'admin' ? '/admin' : '/');
                }
    
                setRedirect(true);
                console.log('Login successful. Redirecting to:', redirectPath);
            } else {
                console.error('No token found in response data');
                toast.error('Login failed: token not provided by server');
            }
    
        } catch (e) {
            console.error('Login error:', e); // Log the error details
            toast.error(e.response?.data || 'Login failed');
        }
    }
    
    if (redirect) {
        console.log('Redirecting to:', redirectPath);
        return <Navigate to={redirectPath} />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <Card className="w-full max-w-[60rem] h-[20rem] flex-row shadow-xl border">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/2 shrink-0 rounded-r-none"
                >
                    <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="card-image"
                    className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Typography variant="h3" color="blue-gray">Travel Agency Login</Typography>
                    <form className="w-full" onSubmit={handleLoginSubmit}>
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
                        <button className="primary mt-4">Login</button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
