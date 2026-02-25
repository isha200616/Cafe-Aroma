import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ REMOVED: import { useNavigate } from "react-router-dom"; (This was causing the warning)

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check LocalStorage on initial Load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 2. Login Function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 3. Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // We use window.location.href here to ensure a full state reset on logout
    window.location.href = "/"; 
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};