import AccountNav from "../components/AccountNav";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function AccountPage() {
    const { user } = useContext(UserContext);
    return (
        <AccountNav/>
    );
}
