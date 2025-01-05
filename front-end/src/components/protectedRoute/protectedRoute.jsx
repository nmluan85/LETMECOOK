import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoginModal } from "../../contexts/LoginModalContext";
import LoadingScreen from "../loading";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
    const { isLoggedIn, user } = useAuth();
    const { openLoginModal } = useLoginModal();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!user) {
            setIsLoading(true);
        } else if (!isLoggedIn) {
            setIsLoading(false);
            openLoginModal(true);
        } else if (!roles.includes(user.role)) {
            setIsLoading(false);
            openLoginModal(true);
        } else {
            setIsLoading(false);
        }
    });

    return <>{isLoading ? <LoadingScreen /> : children}</>;
};
export default ProtectedRoute;
