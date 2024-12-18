import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useLoginModal } from "../../../contexts/LoginModalContext";
import { Navigate} from "react-router-dom";

const ProtectedRoute = ({children, roles}) => {
    const {isLoggedIn, role} = useAuth();
    const {openLoginModal} = useLoginModal();
    if (!isLoggedIn){
        openLoginModal(true);
    }
    if (!roles.includes(role)){
        // Update preimum role
        return <Navigate to="/" />;
    }
    return children;
};
export default ProtectedRoute;
