import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage("");

        // Validation
        if (!password || !repeatPassword) {
            setResponseMessage("Please fill in all fields");
            return;
        }

        if (password !== repeatPassword) {
            setResponseMessage("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/users/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            
            if (data.success) {
                setSuccess(true);
                setResponseMessage("Password reset successful. Redirecting to login...");
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setResponseMessage(data.message);
            }
        } catch (error) {
            setResponseMessage(error.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Password
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New password"
                                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    {responseMessage && (
                        <p className={`text-sm mb-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
                            {responseMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white rounded-lg px-4 py-2 transition ${
                            isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-primary-500 hover:bg-primary-600"
                        }`}
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;