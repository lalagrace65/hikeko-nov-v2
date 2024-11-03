import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function ProtectRoute({ children }) {
    const { user, ready } = useContext(UserContext);

    // Wait until user data is ready
    if (!ready) return null;

    // If user is not logged in or not an admin, redirect to the login page
    if (!user || user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    // If user is an admin, render the protected route's children
    return children;
}

export default ProtectRoute;
