import React from "react";
import { useState, useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = ({onSuccess, changeState}) => {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState();
    const [isVerify, setIsVerify] = useState(false);
    
    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        setResponseMessage("");

        if (!email || !username || !password || !repeatPassword) {
            setResponseMessage("Please fill in all fields");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, repeatPassword }),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setIsVerify(true);
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
    const handleSubmitVerify = async (e) => {
        e.preventDefault();
        setResponseMessage("");

        if (!code) {
            setResponseMessage("Please fill in code field");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({code}),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            if (data.success) {
                login(data.user);
                setResponseMessage(data.message);
                onSuccess();
            }
            else {
                setResponseMessage(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setResponseMessage(error.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        !isVerify ? (
            <form onSubmit={handleSubmitSignUp}>
            <div className="mb-4">
                <label className="block text-lg font-normal text-gray-700 mb-5">
                    Create your free account.
                </label>
                <input
                    type="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {responseMessage && (
                <p className="text-red-500 text-sm mb-4">{responseMessage}</p>
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
            <p className="text-sm text-gray-500 mt-4 mb-10">
                Already have an account?
                <span 
                    className="font-bold text-primary-default hover:text-primary-800 cursor-pointer"
                    onClick={changeState}
                > Log in</span>
            </p>
        </form>
        ) : (
            <form onSubmit={handleSubmitVerify}>
                <div className="mb-4">
                <label className="block text-lg font-normal text-gray-700 mb-5">
                    An email with a verification code was just send to {email}.
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
                <p className="text-red-500 text-sm mb-4">{responseMessage}</p>
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
        )
    )
}

export default SignUp;