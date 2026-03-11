import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  logoutRequest,
  updateProfileRequest,
} from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
      throw error;
    }
  };

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      const errorData = error.response?.data;
      if (Array.isArray(errorData)) {
        setErrors(errorData);
      } else if (errorData?.message) {
        setErrors([errorData.message]);
      } else {
        setErrors(["Error de conexión con el servidor"]);
      }
    }
  };
  const updateProfile = async (user) => {
    try {
      const res = await updateProfileRequest(user);
      setUser(res.data);
      setErrors([]);
      return res.data;
    } catch (error) {
      const errorData = error.response?.data;
      setErrors(
        Array.isArray(errorData)
          ? errorData
          : [errorData?.message || "Error al actualizar"],
      );
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
    } finally {
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
      setErrors([]);
    }
  };

  const refreshUser = async () => {
    try {
      const res = await verifyTokenRequest();
      if (res.data) {
        setUser(res.data);
      }
    } catch {}
  };

  useEffect(() => {
    async function checkLogin() {
      try {
        setLoading(true);
        const res = await verifyTokenRequest();

        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        updateProfile,
        refreshUser,
        user,
        isAuthenticated,
        errors,
        loading,
        setErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
