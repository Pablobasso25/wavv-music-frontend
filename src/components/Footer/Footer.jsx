import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/images/logo2.svg";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false)

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
                  <Link to="/playlist">Mi Playlist</Link>
              </li>
              <li>
                  <Link to="/perfil">Perfil</Link>
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
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyModal(true);
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
                      setShowSecurityModal(true);
                    }}
                  >
                    Seguridad y centro de privacidad
                  </a>
              </li>
              <li>
                  <a href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true);
                    }}
                  >
                    Términos y condiciones
                  </a>
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
