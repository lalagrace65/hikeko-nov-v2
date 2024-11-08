import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import axios from 'axios';
import { baseUrl } from "./Url.jsx";

export default function testModal() {
    const { user, setUser } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // Modal visibility state
    const dropdownRef = useRef(null);
    const exploreDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Toggle signup modal
    const openSignupModal = () => setIsSignupModalOpen(true);
    const closeSignupModal = () => setIsSignupModalOpen(false);

    // Handle outside click for dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target)) {
                setExploreDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="sticky top-0 z-50">
            <header className="py-6 px-44 flex justify-between bg-white shadow-lg text-primary">
                <Link to={'/'} className="flex items-center gap-1 hover:text-hoverColor">
                    <span className="font-bold text-xl">HIKEKO</span>
                </Link>

                <div className="flex items-center gap-6">
                    <nav className="flex gap-6">
                        <Link to="/" className="hover:text-hoverColor">Home</Link>
                        <div ref={exploreDropdownRef} className="relative">
                            <Link onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)} className="hover:text-hoverColor inline-flex">
                                Explore
                            </Link>
                            {exploreDropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 border">
                                    <Link to="/trails" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Tour & Packages</Link>
                                    <Link to="/forum" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Community</Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div onClick={() => setDropdownOpen(!dropdownOpen)} className="relative" ref={dropdownRef}>
                        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer shadow-none hover:shadow-md transition-shadow ">
                            <div className="flex items-center gap-2 bg-primary text-white rounded-full border border-primary overflow-hidden">
                                <span>User</span>
                            </div>
                            {!!user && <div>{user.name}</div>}
                        </div>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border">
                                {!!user ? (
                                    <>
                                        <Link to="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Account</Link>
                                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profile</Link>
                                        <button onClick={() => {}} className="block w-full text-left px-4 py-2 text-gray-700 bg-white hover:bg-gray-100">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Sign In</Link>
                                        <Link onClick={openSignupModal} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Sign Up</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Signup Modal */}
            {isSignupModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">Sign Up</h2>
                        {/* Signup form fields go here */}
                        <form>
                            <input type="text" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
                            <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
                            <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
                            <button type="submit" className="w-full p-2 bg-primary text-white rounded">Sign Up</button>
                        </form>
                        <button onClick={closeSignupModal} className="mt-4 text-gray-600 hover:text-gray-800">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
