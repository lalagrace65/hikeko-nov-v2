import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/UserContext";

function ProtectRoute({ children, requirePasswordChange = false }) {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requirePasswordChange && user.requiresPasswordChange) {
        return <Navigate to="/admin/settings" />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectRoute;
