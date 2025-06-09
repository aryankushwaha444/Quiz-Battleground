import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get auth status from localStorage
  const getStoredAuth = () => localStorage.getItem("isAuthenticated") === "true";
  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth);
  const [user, setUser] = useState(getStoredUser);

  // Store user in localStorage and update state
  const login = (user) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);

  };

  // Clear all auth-related data
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);

  };

  // Sync across tabs
  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(getStoredAuth());
      setUser(getStoredUser());
    };

    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
