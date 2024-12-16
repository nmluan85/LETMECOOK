import React from "react";
import { useState, useEffect} from "react";
import LoginBackground from "../../assets/login.png";
import { IoMdClose } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import Login from "./login"; 
import SignUp from "./signUp";
import { useAuth } from "../../contexts/AuthContext";

const LoginModal = ({isLogin, onClose, onSuccess}) => {
    const { login } = useAuth();
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
            <div 
                className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex flex-col md:flex-row max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div 
                    className="w-2/5 bg-cover bg-center rounded-l-lg"
                    style={{backgroundImage: `url(${LoginBackground})`}}
                >
                </div>

                <div className="w-3/5 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">{isLogin ? 'Log in' : 'Sign up'}</h2>
                        <IoMdClose
                            className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer transition"
                            onClick={onClose}     
                        />
                    </div>

                    <div className="flex-grow">
                        {isLogin ? (
                            <Login onSuccess = {onSuccess} />
                        ) : (
                            <SignUp onSuccess = {onSuccess} />
                        )}
                    </div>

                    <div className="text-center mt-auto">
                        <p className="text-sm text-gray-500 mb-5 ml-10 mr-10">
                            By continuing, you agree to the update
                            <span className="font-bold"> Terms of Sale</span>, 
                            <span className="font-bold"> Terms of Service</span>, and
                            <span className="font-bold"> Privacy Policy</span>.
                        </p>
                        <p className="text-sm text-gray-500 mb-2">OR</p>
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