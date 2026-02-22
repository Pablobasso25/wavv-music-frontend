import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeScreen from "./pages/home/HomeScreen";
import NavBar from "./components/Navbar/NavBar";
import WelcomeScreen from "./pages/welcome/WelcomeScreen";
import PlaylistScreen from "./pages/playlist/PlaylistScreen";
import AdminScreen from "./pages/admin/AdminScreen";
import Footer from "./components/Footer/Footer";
import Error404Screen from "./pages/error404/Error404Screen";
import AboutUs from "./pages/aboutUs/AboutUsScreen";
import ProfileScreen from "./pages/profile/ProfileScreen.jsx";
import SubscriptionScreen from "./pages/subscription/SubscriptionScreen.jsx";
import { useAuth } from "./context/AuthContext";
import ForgotPassword from "./pages/login/ForgotPassword.jsx";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import ScrollToTop from "./components/scrollToTop/ScrollToTop.jsx";

const App = () => {
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const loading = setTimeout(() => setWelcome(false), 3000);
    return () => clearTimeout(loading);
  }, []);

  if (welcome) return <WelcomeScreen />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <NavBar />
              <ProfileScreen />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <NavBar />
              <AdminScreen />
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
        <Route
          path="/about-us"
          element={
            <>
              <NavBar />
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <NavBar />
              <SubscriptionScreen />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <ForgotPassword />
            </>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <>
              <ResetPassword />
            </>
          }
        />
        <Route path="*" element={<Error404Screen />} />
      </Routes>
    </>
  );
};

export default App;