import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/UserContext";

function ProtectRoute({ children, requirePasswordChange = false }) {
    const { user } = useContext(UserContext);

    if (!user) {
        // Redirect to login if user is not authenticated
        return <Navigate to="/login" />;
    }

    if (requirePasswordChange) {
        // Check if user needs to change their password
        if (user.requiresPasswordChange) {
            return children; // Render the children if password change is required
        } else {
            return <Navigate to="/admin" />; // Redirect to admin page if no password change is needed
        }
    }

    if (user.role !== 'admin' && user.role !== 'staff') {
        // Redirect non-admin users to the home page
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectRoute;
