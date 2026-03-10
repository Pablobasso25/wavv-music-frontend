import React, { useState } from "react";
import { forgotPasswordRequest } from "../../api/auth";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../login/LoginScreen.css"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail) return setError("El email es obligatorio");
    if (cleanEmail.length < 5 || cleanEmail.length > 50) {
      return setError("El email debe tener entre 5 y 50 caracteres");
    }

    setLoading(true);
    try {
      const res = await forgotPasswordRequest(cleanEmail);
      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      setError(error.response?.data?.message || "Error al enviar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <div className="login-modal-content p-4 shadow">
            <div className="login-modal-body">
              <h2 className="login-title mb-4 text-center">Recuperar cuenta</h2>
              
              <p className="text-white-50 text-center mb-4 small">
                Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
              </p>

              {message && <Alert variant="success" className="py-2 small">{message}</Alert>}
              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="login-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Usuario@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="login-btn w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar enlace"}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link to="/" className="login-register-link small">
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;