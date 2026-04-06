import { createContext, useContext, useState, useEffect } from "react";
import { decodeToken, isTokenExpired } from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({
          user_id: decoded.user_id,
          email: decoded.email,
          roles_id: decoded.roles_id,
        });
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user_email");
    }
    
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = decodeToken(token);
    if (decoded) {
      setUser({
        user_id: decoded.user_id,
        email: decoded.email,
        roles_id: decoded.roles_id,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setUser(null);
  };

  const isAdmin = () => {
    return user?.roles_id === 1;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}