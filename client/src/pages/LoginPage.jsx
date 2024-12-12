import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { baseUrl } from "@/Url.jsx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import HikekoTermsOfService from "@/context/HikekoTermsService.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [redirect, setRedirect] = useState(false);
    const [redirectPath, setRedirectPath] = useState('/');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { setUser } = useContext(UserContext);

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    useEffect(() => {
        // Check if the token exists in the cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        const storedUser = localStorage.getItem('user');
    
        if (token && storedUser) {
            // If token and storedUser exist, decode the token and set the user
            const decodedToken = jwt.decode(token.split('=')[1]);
            setUser(decodedToken || parsedUser);  // Use one source of truth

            console.log('Decoded Token:', decodedToken);

            setRedirect(true);
    
            // Set the redirect path based on the user's role
            if (parsedUser.role === 'admin') {
                setRedirectPath('/admin/dashboard');
            } else if (parsedUser.role === 'staff') {
                setRedirectPath('/staff-db');
            } else if (parsedUser.role === 'user') {
                setRedirectPath('/');
            } else {
                setRedirectPath('/login');
            }
        } else if (!token || !storedUser) {
            // Optionally handle case when token or storedUser is missing
            setRedirectPath('/login');
        }
    }, [setUser]);
    

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        setErrorMessage('');
        try {
            const { data } = await axios.post(`${baseUrl}/login`, { email, password },{withCredentials: true });
            
            setUser(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));

             // Optionally, set cookies manually
            document.cookie = `token=${data.token}; path=/; secure; HttpOnly; SameSite=Lax`;

            toast.success('Login successful');
            if (data.role === 'admin') {
                setRedirectPath('/admin/dashboard');
            } else if (data.role === 'staff') {
                setRedirectPath('/staff-db');
            } else if (data.role === 'user') {
                window.location.href = '/';
            } else {
                setRedirectPath('/login');
            }
            setRedirect(true);
        } catch (e) {
            if (e.response && e.response.status === 403) {
                setErrorMessage('Your account is suspended');
            } else if (e.response && e.response.status === 401) {
                setErrorMessage('Account not verified');
            } else if (e.response && e.response.status === 422) {
                setErrorMessage('Invalid email or password');
            } else if (e.response && e.response.status === 404) {
                setErrorMessage('User not found');
            } else {
                setErrorMessage('Login failed');
            }
        }
    }    

    if (redirect) {
        return <Navigate to={redirectPath} />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <Card className="mx-auto w-full max-w-[24rem] border mt-6">
                <CardBody className="flex flex-col gap-2">
                    <div>
                        <Typography variant="h6" className="text-2xl text-center">Login</Typography>
                        <hr className="w-full border-t-1 border-gray-300 mx-auto mt-4 mb-4" />
                        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <Input 
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    
                                />
                            </div>
                            <div className="relative mt-4">
                                <Input 
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    
                                />
                                <div
                                    className="absolute top-3 right-3 cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </div>
                            </div>
                            {/* Error message display */}
                            {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
                            <Button className="primary mt-4" type="submit">Login</Button>
                            <HikekoTermsOfService
                                isOpen={isDialogOpen}
                                onClose={() => setIsDialogOpen(false)} // Close the dialog
                            />

                        </form>
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className="text-center py-2 text-gray-500 mt-2">
                        <Typography variant="small" className="font-normal mt-4">
                            Don't have an account? 
                            <Link className="text-black font-semibold" to={'/register'}> Register now</Link>
                        </Typography>
                        <Typography variant="small" className="font-normal mt-4">
                            By continuing to use HikeKo, you agree to <br/>
                            our <span className="text-primary hover:opacity-50 ease-in duration-200  underline cursor-pointer"
                            onClick={() => setIsDialogOpen(true)}
                            >Terms of Service</span>
                        </Typography>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
