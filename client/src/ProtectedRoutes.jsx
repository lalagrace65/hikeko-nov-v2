import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/UserContext";

function ProtectRoute({ children }) {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.requiresPasswordChange) {
        return <Navigate to="/admin/settings" />;
    }

    return children;
}

export default ProtectRoute;
