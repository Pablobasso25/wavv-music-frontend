import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/logo2.svg";
import "../index.css";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false)

  return (
    <>
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

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} Wavv Music. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      <Modal
        show={showPrivacyModal}
        onHide={() => setShowPrivacyModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#1f2428", borderBottom: "1px solid #333" }}>
          <Modal.Title className="text-white fw-bold">
            Política de Privacidad - Wavv Music
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#1f2428", color: "white" }}>
          <p className="text-secondary">
            En <strong>Wavv Music</strong> valoramos tu privacidad. Esta política explica cómo recopilamos,
            usamos y protegemos tu información.
          </p>

          <h5 className="text-white mt-4">1. Información que recopilamos</h5>
          <ul className="text-secondary">
            <li><strong>Datos personales:</strong> nombre de usuario, email y contraseña encriptada.</li>
            <li><strong>Datos de uso:</strong> canciones escuchadas, favoritos, playlists y actividad dentro de la app.</li>
            <li><strong>Datos técnicos:</strong> navegador, sistema operativo y dirección IP.</li>
          </ul>

          <h5 className="text-white mt-4">2. Cómo usamos tu información</h5>
          <ul className="text-secondary">
            <li>Para permitir el acceso a tu cuenta.</li>
            <li>Para mejorar la experiencia de usuario.</li>
            <li>Para personalizar recomendaciones musicales.</li>
            <li>Para gestionar suscripciones premium.</li>
            <li>Para enviarte notificaciones importantes del servicio.</li>
          </ul>

          <h5 className="text-white mt-4">3. Cookies</h5>
          <p className="text-secondary">
            Usamos cookies para mantener tu sesión activa y mejorar tu navegación.
            Podés desactivarlas desde tu navegador, pero algunas funciones podrían dejar de funcionar.
          </p>

          <h5 className="text-white mt-4">4. Compartición de datos</h5>
          <p className="text-secondary">
            No vendemos ni compartimos tu información personal con terceros, excepto en casos necesarios:
          </p>
          <ul className="text-secondary">
            <li>Servicios de autenticación o suscripción.</li>
            <li>Cumplimiento de obligaciones legales.</li>
          </ul>

          <h5 className="text-white mt-4">5. Seguridad</h5>
          <p className="text-secondary">
            Protegemos tus datos con medidas de seguridad modernas, incluyendo encriptación de contraseñas
            y control de accesos.
          </p>

          <h5 className="text-white mt-4">6. Tus derechos</h5>
          <ul className="text-secondary">
            <li>Solicitar la eliminación de tu cuenta.</li>
            <li>Modificar tus datos personales.</li>
            <li>Consultar qué información almacenamos.</li>
          </ul>

          <p className="text-secondary mt-4">
            Si tenés dudas sobre esta política, podés contactarnos desde la aplicación.
          </p>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#1f2428", borderTop: "1px solid #333" }}>
          <Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSecurityModal}
        onHide={() => setShowSecurityModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#1f2428", borderBottom: "1px solid #333" }}>
          <Modal.Title className="text-white fw-bold">
            Seguridad y Centro de Privacidad
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#1f2428", color: "white" }}>
          <p className="text-secondary">
            En <strong>Wavv Music</strong> trabajamos para que tu cuenta sea segura y tengas control sobre tu información.
          </p>

          <h5 className="text-white mt-4">1. Protección de tu cuenta</h5>
          <ul className="text-secondary">
            <li>Tu contraseña se guarda de forma encriptada.</li>
            <li>Recomendamos usar contraseñas seguras y únicas.</li>
            <li>No compartas tu contraseña con nadie.</li>
          </ul>

          <h5 className="text-white mt-4">2. Recomendaciones de seguridad</h5>
          <ul className="text-secondary">
            <li>Usá contraseñas de al menos 8 caracteres.</li>
            <li>Incluí números, letras y símbolos.</li>
            <li>Cerrá sesión si usás dispositivos públicos.</li>
          </ul>

          <h5 className="text-white mt-4">3. Control de datos</h5>
          <p className="text-secondary">
            Podés controlar y gestionar tu información desde tu perfil, incluyendo:
          </p>
          <ul className="text-secondary">
            <li>Actualizar tu avatar y nombre de usuario.</li>
            <li>Eliminar canciones de favoritos.</li>
            <li>Administrar tu suscripción Premium.</li>
          </ul>

          <h5 className="text-white mt-4">4. Reportar actividad sospechosa</h5>
          <p className="text-secondary">
            Si detectás actividad sospechosa en tu cuenta, te recomendamos:
          </p>
          <ul className="text-secondary">
            <li>Cambiar tu contraseña inmediatamente.</li>
            <li>Cerrar sesión en todos los dispositivos.</li>
            <li>Contactar al soporte desde la app.</li>
          </ul>

          <h5 className="text-white mt-4">5. Suscripción Premium</h5>
          <p className="text-secondary">
            Tu suscripción Premium se gestiona con fecha de vencimiento automática.
            Cuando expira, tu cuenta vuelve a modo Free automáticamente.
          </p>

          <p className="text-secondary mt-4">
            Estamos comprometidos con tu seguridad y privacidad.
          </p>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#1f2428", borderTop: "1px solid #333" }}>
          <Button variant="secondary" onClick={() => setShowSecurityModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showTermsModal}
        onHide={() => setShowTermsModal(false)}
        centered
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#1f2428", borderBottom: "1px solid #333" }}
        >
          <Modal.Title className="text-white fw-bold">
            Términos y Condiciones
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#1f2428", color: "white" }}>
          <p className="text-secondary">
            Al utilizar <strong>Wavv Music</strong>, aceptás los siguientes términos y condiciones.
          </p>

          <h5 className="text-white mt-4">1. Uso del servicio</h5>
          <p className="text-secondary">
            El usuario se compromete a utilizar la plataforma de forma legal y respetuosa.
            Está prohibido el uso indebido, la distribución no autorizada de contenido
            o cualquier actividad que perjudique a otros usuarios.
          </p>

          <h5 className="text-white mt-4">2. Cuentas</h5>
          <p className="text-secondary">
            Cada usuario es responsable de la seguridad de su cuenta y contraseña.
            Wavv Music no se responsabiliza por accesos no autorizados derivados
            de negligencia del usuario.
          </p>

          <h5 className="text-white mt-4">3. Suscripción Premium</h5>
          <p className="text-secondary">
            La suscripción Premium es de pago y se renueva según el período contratado.
            Si no se renueva, la cuenta vuelve automáticamente al modo Free.
          </p>

          <h5 className="text-white mt-4">4. Modificaciones</h5>
          <p className="text-secondary">
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Las modificaciones serán informadas dentro de la plataforma.
          </p>

          <h5 className="text-white mt-4">5. Cancelación</h5>
          <p className="text-secondary">
            Podemos suspender o cancelar cuentas que incumplan estos términos.
          </p>
        </Modal.Body>

        <Modal.Footer
          style={{ backgroundColor: "#1f2428", borderTop: "1px solid #333" }}
        >
          <Button variant="secondary" onClick={() => setShowTermsModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Footer;
