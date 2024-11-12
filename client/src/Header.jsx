import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import axios from 'axios';
import { baseUrl } from "./Url.jsx";

export default function Header() {
    const { user, setUser, ready } = useContext(UserContext);
    console.log("Header: Current user:", user); // Log user to check

    // Check if the user is an admin or staff
    const isAdminOrStaff = user && (user.role === 'admin' || user.role === 'staff');

    // If the user is an admin or staff, return null to hide the header
    if (isAdminOrStaff) {
        return null; // Do not render the Header
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const exploreDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Function to handle logout
    async function handleLogout() {
        await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Clear local storage on logout
        setUser(null);
        navigate('/');
    }

    // Handle closing user dropdown on clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    // Handle closing explore dropdown on clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target)) {
                setExploreDropdownOpen(false);
            }
        }

        if (exploreDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [exploreDropdownOpen]);

    return (
        <div className="sticky top-0 z-50">
            <header  className="py-6 px-44 flex justify-between bg-white shadow-lg text-primary">
                <Link to={'/'} className="flex items-center gap-1 hover:text-hoverColor">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className="font-bold text-xl">HIKEKO</span>
                </Link>

                {/* Navigation and User menu */}
                <div className="flex items-center gap-6">
                    <nav className="flex gap-6">
                        <Link to="/" className=" hover:text-hoverColor">Home</Link>
                        
                        {/* Explore dropdown */}
                        <div ref={exploreDropdownRef} className="relative">
                            <Link onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)} className="hover:text-hoverColor inline-flex">Explore
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 mt-2 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Link>
                            {exploreDropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 border">
                                    <Link to="/trails" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Tour & Packages</Link>
                                    <Link to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Community</Link>
                                </div>
                            )}
                        </div>

                        <Link to="/book" className=" hover:text-hoverColor">Book</Link>
                        <Link to="/about" className=" hover:text-hoverColor">About</Link>
                    </nav>

                    {/* User icon and dropdown */}
                    <div onClick={() => setDropdownOpen(!dropdownOpen)} className="relative" ref={dropdownRef}>
                        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer shadow-none hover:shadow-md hover:shadow-gray-300 transition-shadow ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div className="flex items-center gap-2 bg-primary text-white rounded-full border border-primary overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {!!user && (
                                <div>{user.name}</div>
                            )}
                        </div>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border">
                                {!!user ? (
                                    <>
                                        <Link to="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Account</Link>
                                        <Link to="/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profile</Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 bg-white hover:bg-gray-100">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Login</Link>
                                        <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Register</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}
