import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { baseUrl } from "@/Url.jsx";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirectPath, setRedirectPath] = useState('/');
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setRedirect(true);
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role === 'admin') {
                setRedirectPath('/admin');
            } else if (parsedUser.role === 'staff') {
                setRedirectPath('/staff-db');
            } else if (parsedUser.role === 'user') {
                setRedirectPath('/profile');
            } else {
                setRedirectPath('/');
            }
        }
    }, [setUser]);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post(`${baseUrl}/login`, { email, password }, { withCredentials: true });
            setUser(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            toast.success('Login successful');
            if (data.role === 'admin') {
                setRedirectPath('/admin');
            } else if (data.role === 'staff') {
                setRedirectPath('/staff-db');
            } else if (data.role === 'user') {
                setRedirectPath('/profile');
            } else {
                setRedirectPath('/');
            }
            setRedirect(true);
        } catch (e) {
            if (e.response && e.response.status === 403) {
                toast.error('Your account is suspended');
            } else if (e.response && e.response.status === 422) {
                toast.error('Invalid email or password');
            } else if (e.response && e.response.status === 404) {
                toast.error('User not found');
            } else {
                toast.error('Login failed');
            }
        }
    }    

    if (redirect) {
        return <Navigate to={redirectPath} />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="flex flex-col gap-2">
                    <div>
                        <Typography variant="h6" className="text-2xl text-center">Login</Typography>
                        <hr className="w-full border-t-1 border-gray-300 mx-auto mt-4 mb-4" />
                        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                            <input 
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                                required
                            />
                            <input 
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                required
                            />
                            <Button className="primary mt-4" type="submit">Login</Button>
                        </form>
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className="text-center py-2 text-gray-500 mt-2">
                        <Typography variant="small" className="font-normal mt-4">
                            Don't have an account? 
                            <Link className="text-black font-semibold" to={'/register'}> Register now</Link>
                        </Typography>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
