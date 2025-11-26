import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import { TokenProvider } from "./context/useToken";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TokenProvider>
          <MusicPlayerProvider>
            <Routes></Routes>
          </MusicPlayerProvider>
        </TokenProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
