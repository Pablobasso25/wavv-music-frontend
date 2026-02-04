import React, { createContext, useContext, useEffect, useState } from "react";
import { defaultAdmin, defaultUsers, defaultSongs } from "../data/dataDefault";
import SubscriptionScreen from "../pages/subscription/SubscriptionScreen";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const storedSongs = JSON.parse(localStorage.getItem("songs"));

    if (!storedUsers)
      localStorage.setItem(
        "users",
        JSON.stringify([defaultAdmin, ...defaultUsers])
      );

    if (!storedSongs)
      localStorage.setItem("songs", JSON.stringify(defaultSongs));

    if (storedUser) setUser(storedUser);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
