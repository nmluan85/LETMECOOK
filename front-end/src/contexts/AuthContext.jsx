import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const login = (User) => {
        setUser(User);
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
                setUser(null);
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
                    setUser(data.user);
                    setIsLoggedIn(true);
                } else {
                    setUser(null);
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
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);