import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import { TokenProvider } from "./context/useToken";

import AboutUs from "./pages/AboutUs"; 

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TokenProvider>
          <MusicPlayerProvider>

            <Routes>
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>

          </MusicPlayerProvider>
        </TokenProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
