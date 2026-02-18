import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-full">
      <div className="container-fluid footer-container">
        <div className="row footer-row">

          <div className="col-12 col-md-6 col-lg-3 footer-column">
            <h4>NAVEGACIÓN</h4>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Inicio
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/favorites");
                  }}
                >
                  Tus favoritos
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-3 footer-column">
            <h4>MI CUENTA</h4>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about-us");
                  }}
                >
                  Nosotros
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Iniciar sesión
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                >
                  Registrarme
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-3 footer-column footer-social-col">
            <h4>SEGUINOS</h4>

            <div className="footer-socials-expand">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-expand-btn"
              >
                <span className="icon">
                  <i className="bi bi-facebook"></i>
                </span>
                <span className="text">Facebook</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-expand-btn"
              >
                <span className="icon">
                  <i className="bi bi-instagram"></i>
                </span>
                <span className="text">Instagram</span>
              </a>

              <a
                href="https://github.com/Pablobasso25/Wavv-Music"
                target="_blank"
                rel="noopener noreferrer"
                className="social-expand-btn"
              >
                <span className="icon">
                  <i className="bi bi-github"></i>
                </span>
                <span className="text">Git Hub</span>
              </a>
            </div>
          </div>

          {/* COLUMNA 4 */}
          <div className="col-12 col-md-6 col-lg-3 footer-column">
            <h4>LEGAL</h4>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/privacy-policy");
                  }}
                >
                  Política de privacidad
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/security");
                  }}
                >
                  Seguridad y centro de privacidad
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="footer-line" />
      </div>
    </footer>
  );
};

export default Footer;
