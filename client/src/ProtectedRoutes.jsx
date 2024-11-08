import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function ProtectRoute({ children }) {
    const { user, ready } = useContext(UserContext);

    if (!ready) {
        console.log("Loading user data..."); // Add this line
        return <div>Loading...</div>;
    }

    if (!user || user.role !== "admin") {
        console.log("User not authenticated or not an admin, redirecting to login."); // Add this line
        return <Navigate to="/login" />;
    }  

    if (!user) {
        return <Navigate to="/login" />; // Redirect to login if the user is not authenticated
    }
    
    // If user is an admin, render the protected route's children
    return children;
}


export default ProtectRoute;
