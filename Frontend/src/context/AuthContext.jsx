import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";

    if (storedToken && storedAuth) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken) => {
    const blockedToken = localStorage.getItem("blockedToken");

    if (blockedToken && blockedToken === newToken) {
      return {
        success: false,
        message: "This token is blocked and cannot be used again.",
      };
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    setToken(newToken);

    return { success: true };
  };

  const logout = () => {
    const currentToken = localStorage.getItem("token");

    if (currentToken) {
      localStorage.setItem("blockedToken", currentToken); 
    }
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
