import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const EditProfile = () => {
    const { isLoggedIn, user, login, logout } = useAuth(); // Access current user and setUser from AuthContext
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState("");

    // Load current user data into form fields
    useEffect(() => {
        if (user) {
            setDisplayName(user.username || "");
            setDescription(user.description || "");
            setPreview(user.avatar || ""); // Assume avatar URL is in user object
        }
    }, [user]);

    // Handle avatar image selection
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setPreview(URL.createObjectURL(file)); // Create a preview URL
    };

    // Handle Save Changes
    const handleSaveChanges = async () => {
        try {
            // Prepare the updated fields
            const updatedFields = {
                username: displayName,
                avatar: preview,
                description: description
            };

            // Call the PUT API to update the user profile
            const response = await fetch('http://localhost:3000/api/users/edit-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
                credentials: "include"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const data = await response.json();

            // Update the user in AuthContext
            login(data.user);

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <div className="bg-white p-8 min-h-screen mt-6">
            <div className="max-w-4xl mx-auto border border-gray-300 p-6">
                <h1 className="text-2xl font-bold mb-4">About Me</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Section: Input Fields */}
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <label
                                className="block text-sm font-bold mb-2"
                                htmlFor="displayName"
                            >
                                Display Name*
                            </label>
                            <input
                                className="w-full border border-gray-400 p-2"
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Your display name"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <textarea
                                className="w-full border border-gray-400 p-2"
                                id="description"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write something about you!"
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Section: Image Upload */}
                    <div className="flex flex-col items-center">
                        <label className="block text-sm font-bold mb-2">
                            Add an Image
                        </label>
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border border-gray-300 relative">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <FaCamera className="text-orange-500 text-4xl mb-2" />
                                    <p className="text-sm font-bold">Profile Photo</p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleAvatarChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Save Changes Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;