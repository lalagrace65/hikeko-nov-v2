import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import axios from 'axios';
import { baseUrl } from "./Url.jsx";
import { Avatar, IconButton, Menu, MenuHandler, MenuList, MenuItem, Tooltip } from "@material-tailwind/react";
import { IoNotificationsOutline } from "react-icons/io5";
import ProfilePage from "./pages/user-page/ProfilePage.jsx";
import toast from "react-hot-toast";

export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const dropdownRef = useRef(null);
    const exploreDropdownRef = useRef(null);
    const hamburgerDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Check if the user is an admin or staff
    const isAdminOrStaff = user && (user.role === 'admin' || user.role === 'staff');

    // Function to handle logout
    async function handleLogout() {
        try {
            await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Clear local storage on logout
            setUser(null);
            toast.success('Logged out successfully.');
            navigate('/');
        } catch (err) {
            console.log('Cookies after logout:', document.cookie);
            console.error("Error during logout:", err);
        }
    }
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${baseUrl}/profile`, { withCredentials: true });
            setUser(response.data);
        } catch (err) {
            setError('Unable to fetch profile name.');
            console.error(err);
        } finally {
            setLoading(false);  // Set loading to false once the fetch is done
        }
    };
    useEffect(() => {
        fetchUserProfile();
    }, []);

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

    // Handle closing user hamburger on clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (hamburgerDropdownRef.current && !hamburgerDropdownRef.current.contains(event.target)) {
                setHamburgerOpen(false);
            }
        }

        if (hamburgerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hamburgerOpen]);

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

    // Fetch notifications after user profile is fetched
    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${baseUrl}/api/notifications`, { withCredentials: true });
                    setNotifications(response.data.notifications); // Assuming API returns an array of notifications
                    setNotificationCount(response.data.notifications.filter(n => !n.isRead).length); // Count unread notifications
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotifications();
    }, [user]);

    const handleNotificationClick = (notificationId) => {
        // Mark the notification as read when clicked
        axios.patch(`${baseUrl}/api/notifications/markAsRead/${notificationId}`)
            .then(() => {
                setNotifications(prev => prev.map(n =>
                    n._id === notificationId ? { ...n, isRead: true } : n
                ));
                setNotificationCount(prev => prev - 1);
            })
            .catch(err => console.error('Error marking notification as read:', err));
    };

    // Conditionally render header based on user's role
    if (isAdminOrStaff) {
        return null; // Hide Header if the user is admin or staff
    }

    return (
        <div className="sticky top-0 z-50">
            <header className="py-4 px-4 w-full sm:px-6 md:px-40 lg:px-60 flex justify-between bg-white shadow-lg text-primary">
                <Link to={'/'} className="flex items-center gap-1 hover:scale-[1.03]">
                    <img src="HIKEKO-LOGO-BIG.png" alt="Logo" className="w-8 h-10" />
                    <span className="text-xl">HIKEKO</span>
                </Link>
    
                {/* Navigation and User menu */}
                <div className="flex items-center gap-4 sm:gap-6">
    
                    {/* Hamburger menu for small screens */}
                    <div className="md:hidden lg:hidden flex items-center" ref={hamburgerDropdownRef}>
                    <button
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                        className="flex items-center gap-2 border border-gray-300 bg-white rounded-full py-1 px-3 cursor-pointer shadow-none hover:shadow-md hover:shadow-gray-300 transition-shadow"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <Avatar 
                                src={user?.avatar || '/GUEST-PROFILE.png'} 
                                size="sm" 
                            />  
                    </button>

                    {/* Dropdown menu for small screens */}
                    {hamburgerOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border z-50 ">
                            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Home</Link>
                            <Link to="/trails" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Tour & Packages</Link>
                            <Link to="/forum" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Community</Link>
                            {user && (
                                <Link to="/book" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Bookings</Link>
                            )}
                            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">About</Link>
                            {!!user ? (
                                <div>
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profile</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-700 bg-white hover:bg-gray-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Login</Link>
                                    <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Register</Link>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
    
                    {/* Full Navigation Menu (for larger screens) */}
                    <nav className="hidden lg:flex gap-6 items-center">
                        <Link to="/" className="hover:text-hoverColor">Home</Link>
    
                        {/* Explore dropdown */}
                        <div ref={exploreDropdownRef} className="relative">
                            <Link onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)} className="hover:text-hoverColor inline-flex">
                                Explore
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 mt-2 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Link>
                            {exploreDropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 border">
                                    <Link to="/trails" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Tour & Packages</Link>
                                    <Link to="/forum" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Community</Link>
                                </div>
                            )}
                        </div>
    
                        {user && (
                            <Link to="/book" className="hover:text-hoverColor">Bookings</Link>
                        )}
    
                        <Link to="/about" className="hover:text-hoverColor">About</Link>
    
                        {/* Notifications Dropdown */}
                        {user && (
                            <div>
                                <Tooltip content="Notifications" placement="bottom" className="bg-gray-700 mt-1 text-xs">
                                    <Menu>
                                        <MenuHandler>
                                            <IconButton variant="text" className="relative bg-transparent text-primary hover:text-hoverColor">
                                                <IoNotificationsOutline className="size-5" />
                                                {notificationCount > 0 && (
                                                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex justify-center items-center">
                                                        {notificationCount}
                                                    </div>
                                                )}
                                            </IconButton>
                                        </MenuHandler>
                                        <MenuList className="max-h-64 overflow-auto">
                                            {notifications.map((notification) => (
                                                <MenuItem
                                                    key={notification._id}
                                                    className={`flex items-start gap-4 ${notification.isRead ? '' : 'bg-gray-100'}`}
                                                    onClick={() => handleNotificationClick(notification._id)}
                                                >
                                                    <Avatar src={notification.userId.avatar || '/default-avatar.png'} alt="Notification Avatar" size="xs" />
                                                    <div>{notification.message}</div>
                                                </MenuItem>
                                            ))}
                                            <MenuItem className="text-center">
                                                <button
                                                    className="w-full py-1 px-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                                                    onClick={() => setNotifications([])} // Clear notifications
                                                >
                                                    Mark all as read
                                                </button>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Tooltip>
                            </div>
                        )}
                    </nav>
    
                    {/* User icon and dropdown */}
                    <div onClick={() => setDropdownOpen(!dropdownOpen)} className="relative hidden md:block lg:block" ref={dropdownRef}>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-3 cursor-pointer shadow-none hover:shadow-md hover:shadow-gray-300 transition-shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <Avatar 
                                src={user?.avatar || '/GUEST-PROFILE.png'} 
                                size="sm" 
                            />  
                            {!!user && !loading && (
                                <div>{user.firstName}</div>
                            )}
                        </div>
    
                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 border">
                                {!!user ? (
                                    <div>
                                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profile</Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 bg-white hover:bg-gray-100">Logout</button>
                                    </div>
                                ) : (
                                    <div>
                                        <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Login</Link>
                                        <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Register</Link>
                                    </div>
                                )}
                            </div>
                        )}
                    
                    </div>

                </div>
            </header>

        </div>
    );
    
}