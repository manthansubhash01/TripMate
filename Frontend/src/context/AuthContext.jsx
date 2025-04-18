import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const login = (newToken) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    setToken(newToken);
  };

  const logout = () => {
    setIsAuthenticated("false");
    setToken("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout }}
    >
        {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
