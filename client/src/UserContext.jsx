import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./Url";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);    // Store the user info here
    const [ready, setReady] = useState(false); // Track if data is fetched
    const [error, setError] = useState(null);   // Track any errors

    // Inside UserContextProvider
    const updateUserRequiresPasswordChange = (requiresPasswordChange) => {
        setUser((prevUser) => ({
            ...prevUser,
            requiresPasswordChange,
        }));
    };

    // This is where we call the fetchUserProfile function
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Attempt to fetch user profile with credentials (cookies)
                const { data } = await axios.get(`${baseUrl}/profile`, { 
                    withCredentials: true 
                });

                // Check if data is available and includes required user fields
                if (data) {
                    console.log("Fetched user profile:", data);
                    setUser(data); // Update the user state with firstName, lastName, email, etc.
                    localStorage.setItem('user', JSON.stringify(data)); // Save in localStorage
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    console.error("User is not authorized. Please log in.");
                    setError("Unauthorized: Please log in.");
                    setUser(null); 
                    localStorage.removeItem('user'); 
                } else {
                    console.error("Error fetching user profile:", err);
                    setError("Failed to fetch user profile. Please log in.");
                    setUser(null); 
                    localStorage.removeItem('user');
                }
            } finally {
                setReady(true);
            }
        };

        // Check local storage for user data on initial load
        const storedUser = localStorage.getItem('user');
        console.log("Stored user from localStorage:", storedUser);

        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set user from localStorage if available
            setReady(true);
        } else {
            fetchUserProfile();  // Call the fetchUserProfile function if no user in localStorage
        }
    }, []);  // Run this only once on component mount    

    return (
        <UserContext.Provider value={{ user, setUser, ready, error, updateUserRequiresPasswordChange }}>
            {children}
        </UserContext.Provider>
    );
}
