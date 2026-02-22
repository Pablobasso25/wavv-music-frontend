import axios from "./axios";

export const registerRequest = (user) => axios.post("/register", user);
export const loginRequest = (user) => axios.post("/login", user);
export const verifyTokenRequest = () => axios.get("/profile");
export const logoutRequest = () => axios.post("/logout");
export const updateProfileRequest = (user) => axios.put("/profile", user);
export const forgotPasswordRequest = (email) =>
  axios.post("/forgot-password", { email });
export const resetPasswordRequest = (token, password) =>
  axios.post(`/reset-password/${token}`, { password });