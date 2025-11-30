import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterScreen from "./pages/RegisterScreen";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeScreen from "./pages/HomeScreen";
import NavBar from "./components/NavBar";
import WelcomeScreen from "./pages/WelcomeScreen";
import PlaylistScreen from "./pages/PlaylistScreen";
// import LoginScreen from "./pages/LoginScreen"; // Descomentar cuando esté listo

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
        {/* TODO: Descomentar cuando LoginScreen esté listo */}
        {/* <Route path="/login" element={<LoginScreen />} /> */}
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NavBar />
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <ProtectedRoute>
              <NavBar />
              <PlaylistScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
