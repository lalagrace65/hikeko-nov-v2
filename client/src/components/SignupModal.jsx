import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { UserContext } from "@/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "@/Url";
import toast from "react-hot-toast";

export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // For toggling between SignIn and SignUp
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');
  const { setUser } = useContext(UserContext);

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setRedirect(true);
      const parsedUser = JSON.parse(storedUser);

      // Set the redirect path based on user role
      if (parsedUser.role === 'user') {
        setRedirectPath('/profile');
      } else {
        setRedirectPath('/');
      }
    }
  }, []);

  // Handle Sign In
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/login`, { email, password }, { withCredentials: true });
      setUser(data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      toast.success('Login successful');

      if (data.role === 'user') {
        setRedirectPath('/profile');
      } else {
        setRedirectPath('/');
      }

      setRedirect(true);
    } catch (e) {
      toast.error('Login failed');
    }
  }

  // Handle Sign Up
  async function handleSignUpSubmit(ev) {
    const handleClose = () => {
      setIsVisible(false); // Set visibility to false to hide the modal or component
    };
  
    ev.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post(`${baseUrl}/signup`, { firstName, lastName, email, password });

      toast.success('Sign Up successful, please log in!');

      // Toggle to login form after successful sign up
      setIsSignUp(false);
    } catch (e) {
      toast.error('Sign Up failed');
    }
  }

  if (redirect) {
    return <Navigate to={redirectPath} />
  }

  return (
    <div className="fixed z-9999 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="mx-auto w-full max-w-[30rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5" >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
              {isSignUp ? "Sign Up" : "Sign In"}
            </div> 
          </Typography>
          <hr className="w-full border-t-1 border-gray-300 mx-auto mt-4 mb-4" />
          <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
            {isSignUp ? "Create your account" : "Enter your email and password to Sign In."}
          </Typography>
          <form onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit}>
            {isSignUp && (
              <>
                <Typography className="mb-2" variant="h6">First Name</Typography>
                <Input label="First Name" size="lg" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} required />

                <Typography className="mb-2" variant="h6">Last Name</Typography>
                <Input label="Last Name" size="lg" value={lastName} onChange={(ev) => setLastName(ev.target.value)} required />
              </>
            )}

            <Typography className="mb-2" variant="h6">Your Email</Typography>
            <Input label="Email" size="lg" type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} required />

            <Typography className="mt-2 mb-2" variant="h6">Your Password</Typography>
            <Input label="Password" size="lg" type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} required />

            {isSignUp && (
              <>
                <Typography className="mt-2 mb-2" variant="h6">Confirm Password</Typography>
                <Input label="Confirm Password" size="lg" type="password" value={confirmPassword} onChange={(ev) => setConfirmPassword(ev.target.value)} required />
              </>
            )}
          </form>
        </CardBody>

        <CardFooter className="pt-0">
          <Button variant="gradient" type="submit" fullWidth>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            {isSignUp ? (
              <>
                Already have an account? 
                <Typography as="a" variant="small" color="blue-gray" className="ml-1 font-bold" onClick={() => setIsSignUp(false)}>
                  Sign In
                </Typography>
              </>
            ) : (
              <>
                Don't have an account? 
                <Typography as="a" variant="small" color="blue-gray" className="ml-1 font-bold" onClick={() => setIsSignUp(true)}>
                  Sign Up
                </Typography>
              </>
            )}
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
