import AccountNav from "../components/AccountNav";

export default function AccountPage() {
    const { user } = useContext(UserContext);
    return (
        <AccountNav/>
    );
}
