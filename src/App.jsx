import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterScreen from "./pages/Autenticacion/RegisterScreen";
import LoginScreen from "./pages/Autenticacion/LoginScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
const App = () => {
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const cargando = setTimeout(() => setWelcome(false), 3000);
    return () => clearTimeout(cargando);
  }, []);

  if (welcome) return <WelcomeScreen />;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
