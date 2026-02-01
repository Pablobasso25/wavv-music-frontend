import axios from "axios";

// Verificamos si estamos en producción o desarrollo
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
