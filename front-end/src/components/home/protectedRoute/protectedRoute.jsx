import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import LoginModal from "../../../components/login/loginModal";

const ProtectedRoute = ({ children }) => {
  const {isLoggedIn, login} = useAuth();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    login();
    setLoginModalOpen(false); 
  };

  if (!isLoggedIn) {
    setLoginModalOpen(true);
    return (
      <>
        {isLoginModalOpen && (
          <LoginModal
            onClose={() => setLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
