import React from "react";
import { useState, useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = ({onSuccess}) => {
    const {login} = useAuth();
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
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            if (data.message == "Login successful.") {
                login();
                setResponseMessage(data.message);
                onSuccess();
                onClose();
            }       
            else {
                setResponseMessage(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setResponseMessage(error.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false); // Stop loading
        }
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
                <p className="text-red-500 text-sm mb-4">{responseMessage}</p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white rounded-lg px-4 py-2 transition mb-16 ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary-500 hover:bg-primary-600"
                }`}
            >
                {isLoading ? "Loading..." : "Continue"}
            </button>
        </form>
    )
}

export default Login;