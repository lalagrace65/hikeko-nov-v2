import { useContext } from 'react';
import { UserContext } from '../UserContext.jsx';

export default function ProfilePage() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1 className="text-xl font-bold">Profile Page</h1>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            {/* Add more user details if necessary */}
        </div>
    );
}
