import React, { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "boxicons/css/boxicons.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MusicPlayerProvider } from "./context/MusicPlayerContext.jsx";
import { SongProvider } from "./context/SongContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
    <AuthProvider>
      <SongProvider>
        <MusicPlayerProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </MusicPlayerProvider>
      </SongProvider>
    </AuthProvider>
    </Router>
  </StrictMode>,
);
