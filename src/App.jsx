import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterScreen from "./pages/register/RegisterScreen";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeScreen from "./pages/home/HomeScreen";
import NavBar from "./components/NavBar";
import WelcomeScreen from "./pages/welcome/WelcomeScreen";
import PlaylistScreen from "./pages/playlist/PlaylistScreen";
import LoginScreen from "./pages/login/LoginScreen";
import AdminScreen from "./pages/admin/AdminScreen";
import Footer from "./components/Footer";
import Error404Screen from "./pages/error404/Error404Screen";

import AboutUs from "./pages/aboutUs/AboutUsScreen"; 

const App = () => {
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const loading = setTimeout(() => setWelcome(false), 3000);
    return () => clearTimeout(loading);
  }, []);

  if (welcome) return <WelcomeScreen />;
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <LoginScreen />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <RegisterScreen />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NavBar />
              <HomeScreen />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminScreen />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <ProtectedRoute>
              <NavBar />
              <PlaylistScreen />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error404Screen />} />
      </Routes>
    </Router>
  );
};

export default App;
