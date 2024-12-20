import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRoleType] = useState("guest");
    const login = () => {
        setIsLoggedIn(true)
    };
    const logout = async () => {
        try {
            // setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', 
            });
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(false)
            }       
            else {
                // setResponseMessage(data.message);
            }
        } catch (error) {
            // setResponseMessage(error.message || "An unexpected error occurred.");
        } finally {
            // setIsLoading(false); // Stop loading
        }
    };
    const setRole = (role) => {setRoleType(role)};

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/check-auth", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await response.json();
                if (data.success) {
                    setIsLoggedIn(true);
                    setRoleType(data.role);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error verifying authentication:", error.message);
                setIsLoggedIn(false);
            }
        };

        verifyAuth();
    }, []);
    return (
        <AuthContext.Provider value={{ isLoggedIn, role, login, logout, setRole}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);