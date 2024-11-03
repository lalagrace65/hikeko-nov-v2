import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import EventsPage from "../pages/admin-page/EventsPage.jsx";
import StaffPage from "../pages/staff-page/StaffPage.jsx";

export default function AccountNav() {
    const { ready, user } = useContext(UserContext);
    const { subpage, action } = useParams();  // Get both subpage and action from URL

    // While still fetching the user data, show loading
    if (!ready) {
        return 'Loading...';
    }

    // If user is not authenticated, redirect to login page
    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    // Default to 'profile' if no subpage is provided
    const selectedTab = subpage || 'profile';

    return (
        <div>
            {/* Navigation Tabs */}
            <nav className="w-full flex justify-center mt-8 gap-3">
                {user && user.role === 'user' && (
                    <Link
                        className={`inline-flex gap-1 py-2 px-4 ${selectedTab === 'bookings' ? 'bg-primary text-white rounded-full transition-transform transform hover:scale-105' : 'bg-gray-200 text-black rounded-full transition-transform transform hover:scale-105'}`}
                        to={'/account/bookings'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        My bookings
                    </Link>
                )}
                {/* Only render the "My Accommodations" tab if the user is an admin */}
                {user && user.role === 'admin' && (
                    <Link
                    className={`inline-flex gap-1 py-2 px-4 ${selectedTab === 'staff' ? 'bg-primary text-white rounded-full transition-transform transform hover:scale-105' : 'bg-gray-200 text-black rounded-full transition-transform transform hover:scale-105'}`}
                    to={'/account/staff'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Staff
                    </Link>
                )}
                {/* Only render the "My Accommodations" tab if the user is an admin */}
                {(user && (user.role === 'admin' || user.role === 'staff')) &&(
                    <Link
                        className={`inline-flex gap-1 py-2 px-4 ${selectedTab === 'events' ? 'bg-primary text-white rounded-full transition-transform transform hover:scale-105' : 'bg-gray-200 text-black rounded-full transition-transform transform hover:scale-105'}`}
                        to={'/account/events'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        Packages
                    </Link>
                )}
            </nav>

            {/* Content based on selected tab */}
            <div className="mt-8">
                {selectedTab === 'joinerBooking' && (
                    <BookPage />
                )}
                {selectedTab === 'staff' && (
                    <StaffPage />
                )}
                {selectedTab === 'events' && !action && (
                    <EventsPage />
                )}
            </div>
        </div>
    );
}
