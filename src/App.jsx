import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterScreen from "./pages/Autenticacion/RegisterScreen";
import LoginScreen from "./pages/Autenticacion/LoginScreen";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeScreen from "./pages/Home/HomeScreen";
import NavBar from "./components/NavBar";
import WelcomeScreen from "./pages/WelcomeScreen";
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
        <Route path="/login" element={<LoginScreen />} />
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
      </Routes>
    </Router>
  );
};

export default App;
