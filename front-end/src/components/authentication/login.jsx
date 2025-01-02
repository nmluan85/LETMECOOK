import React from "react";
import { useState, useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoginModal } from "../../contexts/LoginModalContext";

const Login = ({onSuccess, changeState}) => {
    const {login} = useAuth();
    const {closeLoginModal} = useLoginModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setResponseMessage("");

        if (!email || !password) {
            setResponseMessage("Please fill in all fields");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                // window.location.reload();
                login(data.user);
                closeLoginModal();
            }       
            else {
                setResponseMessage(data.message);
            }
        } catch (error) {
            setResponseMessage(error.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    }
    const handleForgotPassword = async () => {
        setResponseMessage("");
        try {
            const response = await fetch("http://localhost:3000/api/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.message);
            }
        } catch (error) {
            setResponseMessage(error.message);
        }
    };
    
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
                <p className="text-red-500 text-sm mb-4">{responseMessage}</p>
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
            <p className="text-sm text-gray-500 mt-4 mb-14 flex justify-between items-center">
                <span>
                    Don't have an account? 
                    <span 
                        className="font-bold text-primary-default hover:text-primary-800 cursor-pointer"
                        onClick={changeState}
                    >
                        Sign up now
                    </span>
                </span>
                <span 
                    className="font-bold text-primary-default hover:text-primary-800 cursor-pointer"
                    onClick={handleForgotPassword}
                >
                    Forgot password?
                </span>
            </p>
        </form>
    )
}

export default Login;