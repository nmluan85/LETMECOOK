import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoginModal } from "../../contexts/LoginModalContext";

const Login = ({ changeState, onForgotPassword }) => {
    const { login } = useAuth();
    const { closeLoginModal } = useLoginModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [code, setCode] = useState("");

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setResponseMessage("");

        if (!email || !password) {
            setResponseMessage("Please fill in all fields");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:3000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: "include",
                },
            );
            const data = await response.json();
            if (data.success) {
                // window.location.reload();
                login(data.user);
                closeLoginModal();
            } else {
                setResponseMessage(data.message);
            }
        } catch (error) {
            setResponseMessage(
                error.message || "An unexpected error occurred.",
            );
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleVerifyClick = () => {
        setShowVerify(true);
    };

    const handleSubmitVerify = async (e) => {
        e.preventDefault();
        setResponseMessage("");

        if (!code) {
            setResponseMessage("Please fill in code field");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:3000/api/users/verify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                login(data.user);
                setResponseMessage(data.message);
                closeLoginModal();
            } else {
                setResponseMessage(
                    data.message || "Verification failed. Please try again.",
                );
            }
        } catch (error) {
            setResponseMessage(
                error.message || "An unexpected error occurred.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (showVerify) {
        return (
            <form onSubmit={handleSubmitVerify}>
                <div className="mb-4">
                    <label className="block text-lg font-normal text-gray-700 mb-5">
                        An email with a verification code was just sent to{" "}
                        {email}.
                    </label>
                    <input
                        type="number"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                {responseMessage && (
                    <p className="text-red-500 text-sm mb-4">
                        {responseMessage}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white rounded-lg px-4 py-2 transition mb-2 ${
                        isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary-500 hover:bg-primary-600"
                    }`}
                >
                    {isLoading ? "Loading..." : "Continue"}
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmitLogin}>
            <div className="mb-4">
                <label className="block text-lg font-normal text-gray-700 mb-5">
                    Enter your email and password to log in.
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {responseMessage && (
                <div className="text-red-500 text-sm mb-4">
                    {responseMessage ===
                    "Email not verified. Please verify your email." ? (
                        <div className="flex justify-between items-center">
                            <p>{responseMessage}</p>
                            <span
                                className="font-bold text-primary-default hover:text-red-700 cursor-pointer ml-2"
                                onClick={handleVerifyClick}
                            >
                                Verify now?
                            </span>
                        </div>
                    ) : (
                        <p>{responseMessage}</p>
                    )}
                </div>
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
                {isLoading ? "Loading..." : "Continue"}
            </button>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 mt-4 mb-14">
                    Don't have an account?
                    <span
                        className="font-bold text-primary-default hover:text-primary-800 cursor-pointer"
                        onClick={changeState}
                    >
                        {" "}
                        Sign up now
                    </span>
                </p>
                <p className="text-sm text-gray-500 mt-4 mb-14">
                    <span
                        className="font-bold text-primary-default hover:text-red-700 cursor-pointer"
                        onClick={onForgotPassword}
                    >
                        Forgot password?
                    </span>
                </p>
            </div>
        </form>
    );
};

export default Login;
