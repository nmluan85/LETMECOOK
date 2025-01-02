import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProfileModal = ({ onComplete }) => {
    const { user, logout } = useAuth();
    const [avatar, setAvatar] = useState(
        "https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg"
    );
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        if (user) {
            setRole(user.role);
            setEmail(user.email);
            setUsername(user.username);
            setAvatar(user.avatar);
        }
    }, [user]);
    return (
        <div className="flex justify-center items-center w-fit bg-transparent">
            <div className="bg-white rounded-lg shadow-lg w-fit">
                <div className="flex items-center flex-row p-4 w-full">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                        <p className="text-xs font-bold">{username}</p>
                        <p className="text-xs text-gray-700">{email}</p>
                    </div>
                </div>
                <div className="border-t-2 w-full items-start border-gray-200 p-4">
                    <Link to="/edit-profile">
                        <div className="flex items-center cursor-pointer">
                            <FaRegCircleUser className="w-5 h-5 mr-4" />
                            <span
                                className="text-gray-700 text-sm"
                                onClick={() => onComplete()}
                            >
                                Edit profile
                            </span>
                        </div>
                    </Link>
                    {role == "User" ? (
                        <Link to="/upgrade">
                            <div className="flex items-center mt-2">
                                <MdOutlineTipsAndUpdates className="w-5 h-5 mr-4" />
                                <span
                                    className="text-gray-700 text-sm cursor-pointer"
                                    onClick={() => {
                                        onComplete();
                                    }}
                                >
                                    Go Premium
                                </span>
                            </div>
                        </Link>
                    ) : null}
                    {
                        role == "Admin" ? (
                            <Link to="/admin-hub">
                                <div className="flex items-center mt-2">
                                <MdOutlineTipsAndUpdates className="w-5 h-5 mr-4" />
                                <span
                                    className="text-gray-700 text-sm cursor-pointer"
                                    onClick={() => {
                                    onComplete();
                                    }}
                                >
                                    Manage Accounts
                                </span>
                                </div>
                            </Link>
                        ) : null
                    }
                </div>
                <div className="border-t-2 w-full items-center border-gray-200 p-4">
                    <div className="flex items-center">
                        <TbLogout2 className="w-5 h-5 mr-4" />
                        <span
                            className="text-gray-700 text-sm cursor-pointer"
                            onClick={() => {
                                onComplete();
                                logout();
                            }}
                        >
                            Sign out
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileModal;
