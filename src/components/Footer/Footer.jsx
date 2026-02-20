import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/images/logo2.svg";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-full">
      <div className="container-fluid footer-container">
        <div className="row footer-row">
          <div className="col-12 col-md-6 col-lg-3 footer-column">
            <div className="footer-brand">
              <img src={Logo} alt="Wavv Music Logo" className="footer-logo" />
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 footer-column">
            <h4>MI CUENTA</h4>
            <ul>
              <li>
                <Link to="/about-us">Nosotros</Link>
              </li>
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/register">Registrarme</Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-3 footer-column footer-social-col">
            <h4>SEGUINOS</h4>
            <div className="footer-socials-expand">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-expand-btn"
                aria-label="Visitar LinkedIn"
              >
                <span className="icon">
                  <i className="bi bi-linkedin"></i>
                </span>
                <span className="text">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-expand-btn"
                aria-label="Visitar Instagram"
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
                aria-label="Visitar GitHub"
              >
                <span className="icon">
                  <i className="bi bi-github"></i>
                </span>
                <span className="text">GitHub</span>
              </a>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 footer-column">
            <h4>LEGAL</h4>
            <ul>
              <li>
                <Link to="/privacy-policy">Política de privacidad</Link>
              </li>
              <li>
                <Link to="/security">Seguridad y privacidad</Link>
              </li>
              <li>
                <Link to="/terms">Términos y condiciones</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-line" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Wavv Music. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
