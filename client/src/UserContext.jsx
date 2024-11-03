import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);    // Store the user info here
    const [ready, setReady] = useState(false); // Track if data is fetched

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/profile', { withCredentials: true });
                setUser(data); // Store user data if available
                localStorage.setItem('user', JSON.stringify(data)); // Persist user data in local storage
                console.log("User data:", data); // Log user data
            } catch (err) {
                setUser(null); // Set user to null if not authenticated
                localStorage.removeItem('user'); // Remove user data from local storage if not authenticated
            } finally {
                setReady(true); // Indicate that loading is complete
            }
        };

        // Check local storage for user data on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set user from local storage if available
            setReady(true); // Mark as ready since we got user from local storage
        } else {
            fetchUserProfile(); // Fetch profile from API if not found in local storage
        }
    }, []);  // Run this only once on component mount    

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
