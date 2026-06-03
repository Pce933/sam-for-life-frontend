import React, { createContext, useContext, useEffect, useState } from "react";
import { adminMe } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sam_admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    adminMe()
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem("sam_admin_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("sam_admin_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("sam_admin_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
