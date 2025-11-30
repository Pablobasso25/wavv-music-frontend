import React, { createContext, useContext, useEffect, useState } from "react";
import { getTokenApi } from "../helpers/musicApi";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expiresAt, setExpiresAt] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { access_token, expires_at } = await getTokenApi();

        setToken(access_token);
        setExpiresAt(expires_at);
      } catch (error) {
        console.error("Error al obtener el token de Spotify:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();

    const interval = setInterval(() => {
      if (expiresAt && Date.now() >= expiresAt) {
        console.log("🔄 Token vencido, renovando...");
        fetchToken();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <TokenContext.Provider value={{ token, loading }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
