import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./Url";


export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);    // Store the user info here
    const [ready, setReady] = useState(false); // Track if data is fetched
    const [error, setError] = useState(null);   // Track any errors

    // This is where we call the fetchUserProfile function
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Attempt to fetch user profile with credentials (cookies)
                const { data } = await axios.get(`${baseUrl}/profile`, { 
                    withCredentials: true 
                });
                
                if (data) {
                    console.log("Fetched user profile:", data);
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data)); // Save in localStorage
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    // Handle Unauthorized error gracefully
                    console.error("User is not authorized. Please log in.");
                    setError("Unauthorized: Please log in.");
                    setUser(null); // Ensure user is set to null
                    localStorage.removeItem('user'); // Remove any saved user data
                } else {
                    console.error("Error fetching user profile:", err);
                    setError("Failed to fetch user profile. Please log in.");
                    setUser(null); // Ensure user is set to null
                    localStorage.removeItem('user');
                }
            } finally {
                setReady(true);
            }
        };
    
        // Try to load user from localStorage first
        const storedUser = localStorage.getItem('user');
        console.log("Stored user from localStorage:", storedUser);
        
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setReady(true);
        } else {
            fetchUserProfile();  // Call the fetchUserProfile function if no user in localStorage
        }
    }, []);  // Empty dependency array, so it runs once when the component mounts
    
    return (
        <UserContext.Provider value={{ user, setUser, ready, error }}>
            {children}
        </UserContext.Provider>
    );
}
