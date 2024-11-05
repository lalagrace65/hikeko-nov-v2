import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./Url";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);    // Store the user info here
    const [ready, setReady] = useState(false); // Track if data is fetched

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/profile`, { withCredentials: true });
                if (data) {
                    console.log("Fetched user profile:", data);
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (err) {
                console.error("Error fetching user profile:", err);
                setUser(null);
                localStorage.removeItem('user');
            } finally {
                setReady(true);
            }
        };
    
        const storedUser = localStorage.getItem('user');
        console.log("Stored user from localStorage:", storedUser);  // Add this line
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setReady(true);
        } else {
            fetchUserProfile();
        }
    }, []);
    
    

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
