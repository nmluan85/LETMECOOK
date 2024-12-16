import React from "react";
import { useState, useEffect} from "react";
import LoginBackground from "../../assets/login.png";
import { IoMdClose } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const LoginModal = ({onClose, onLoginSuccess}) => {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
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
                onLoginSuccess();
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
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div 
                className="bg-white rounded-lg shadow-lg w-full h-4/6 max-w-5xl flex"
                onClick={(e) => e.stopPropagation()}
            >
                <div 
                    className="w-2/5 bg-cover bg-center rounded-l-lg"
                    style={{backgroundImage: `url(${LoginBackground})`}}
                >
                </div>

                <div className="w-3/5 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">Login</h2>
                        <IoMdClose
                            className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer transition"
                            onClick={() => {
                                console.log('close')
                                onClose()}}
                                
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
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

                    <div className="text-center mt-auto">
                        <p className="text-sm text-gray-500 mb-2">OR</p>
                        <p className="text-sm text-gray-500 mb-5 ml-10 mr-10">
                            By continuing, you agree to the update
                            <span className="font-bold"> Terms of Sale</span>, 
                            <span className="font-bold"> Terms of Service</span>, and
                            <span className="font-bold"> Privacy Policy</span>.
                        </p>
                        <button
                            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition"
                            style={{
                                backgroundColor: "#f1f4fe",
                                color: "#ea4336",
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f4fe")} // Hover in
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f1f4fe")} // Hover out
                        >   
                            <FaGoogle
                                className="text-xl"
                                style={{
                                    color: "#ea4336",
                                }}
                            >
                            </FaGoogle>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginModal;