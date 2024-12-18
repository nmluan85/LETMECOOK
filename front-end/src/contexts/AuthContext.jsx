import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRoleType] = useState(null);
    const login = () => {setIsLoggedIn(true)};
    const logout = () => {setIsLoggedIn(false)};
    const setRole = (role) => {setRoleType(role)};
    return (
        <AuthContext.Provider value={{ isLoggedIn, role, login, logout, setRole}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);