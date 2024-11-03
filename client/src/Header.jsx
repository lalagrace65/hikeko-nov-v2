import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import axios from 'axios';

export default function Header() {
    const { user, setUser } = useContext(UserContext);
    
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

    //notification
    const [notificationOpen, setNotificationOpen] = useState(false);
    const notificationRef = useRef(null);

    
    // Function to handle logout
    async function handleLogout() {
        await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
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

    // Handle closing notification dropdown on clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationOpen(false);
            }
        }

        if (notificationOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationOpen]);

    return (
        <div>
            <header className="py-6 px-20 flex justify-between">
                <Link to={'/'} className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className="font-bold text-xl">Hikeko</span>
                </Link>
                <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                    <div>Anywhere</div>
                    <div className="border-l border-gray-300"></div>
                    <div>Any week</div>
                    <div className="border-l border-gray-300"></div>
                    <div>Add guests</div>
                    <button className="bg-primary text-white p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>

                {/* Navigation and User menu */}
                <div className="flex items-center gap-6">
                    <nav className="flex gap-6">
                        <Link to="/" className=" hover:text-primary">Home</Link>
                        
                        {/* Explore dropdown */}
                        <div ref={exploreDropdownRef} className="relative">
                            <Link onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)} className="hover:text-primary inline-flex">Explore
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 mt-2 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Link>
                            {exploreDropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 border">
                                    <Link to="/trails" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tour & Packages</Link>
                                    <Link to="/forum" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Community</Link>
                                </div>
                            )}
                        </div>

                        <Link to="/book" className=" hover:text-primary">Book</Link>
                        <Link to="/about" className=" hover:text-primary">About</Link>
                    
                        {/* Notification dropdown */}
                        <div ref={notificationRef} className="relative">
                            <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500 hover:text-primary">
                                    <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm8-6V11a8 8 0 1 0-16 0v5l-2 2v1h20v-1l-2-2ZM18 17H6v-.235l.965-1.145A1 1 0 0 0 7 14v-3a5 5 0 0 1 10 0v3a1 1 0 0 0 .035.62L18 16.765V17Z" />
                                </svg>
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                            </button>
                            {notificationOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 border">
                                    <div className="px-4 py-2 text-gray-700 font-semibold">Notifications</div>
                                    <div className="border-t">
                                        <div className="px-4 py-2 text-gray-700 hover:bg-gray-100">New booking request from John Doe</div>
                                        <div className="px-4 py-2 text-gray-700 hover:bg-gray-100">Your booking is confirmed</div>
                                        <div className="px-4 py-2 text-gray-700 hover:bg-gray-100">New message from the admin</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    
                    </nav>

                    {/* User icon and dropdown */}
                    <div onClick={() => setDropdownOpen(!dropdownOpen)} className="relative" ref={dropdownRef}>
                        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer shadow-none hover:shadow-md hover:shadow-gray-300 transition-shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div className="flex items-center gap-2 bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
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
                                        <Link to="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Account</Link>
                                        <Link to="/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 bg-white hover:bg-gray-100">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
                                        <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Register</Link>
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
