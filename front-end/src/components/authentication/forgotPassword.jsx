import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ onBack }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage("");

        if (!email) {
            setResponseMessage("Please enter your email");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:3000/api/users/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                },
            );
            const data = await response.json();

            if (data.success) {
                setResponseMessage(
                    "Password reset instructions sent to your email",
                );
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
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-lg font-normal text-gray-700 mb-5">
                    Reset your password
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {responseMessage && (
                <p
                    className={`text-sm mb-4 ${responseMessage.includes("sent") ? "text-green-500" : "text-red-500"}`}
                >
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
                {isLoading ? "Loading..." : "Reset Password"}
            </button>

            <p className="text-sm text-gray-500 mt-4 mb-14">
                Remember your password?
                <span
                    className="font-bold text-primary-default hover:text-primary-800 cursor-pointer"
                    onClick={onBack}
                >
                    {" "}
                    Back to Login
                </span>
            </p>
        </form>
    );
};

export default ForgotPassword;
