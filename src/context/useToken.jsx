import React, { createContext, useContext, useEffect, useState } from "react";
import { showError } from "../helpers/alerts";

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
        showError(
          "No se pudo conectar con Spotify. Verificá tu conexión a internet.",
          "Error de conexión"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchToken();

    const interval = setInterval(() => {
      if (expiresAt && Date.now() >= expiresAt) {
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
