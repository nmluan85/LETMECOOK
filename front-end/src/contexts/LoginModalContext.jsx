import React, { createContext, useState, useContext } from 'react';

const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isLogin, setLogin] = useState(true); // 2 option: Login (True) or Sign up (False)

    const openLoginModal = (type) => {
        setLoginModalOpen(true);
        setLogin(type);
    }
    const closeLoginModal = () => setLoginModalOpen(false);

    return (
        <LoginModalContext.Provider value={{ isLoginModalOpen, isLogin, openLoginModal, closeLoginModal }}>
            {children}
        </LoginModalContext.Provider>
    );
};

export const useLoginModal = () => useContext(LoginModalContext);
