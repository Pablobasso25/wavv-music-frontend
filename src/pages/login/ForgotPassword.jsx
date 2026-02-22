import React, { useState } from "react";
import { forgotPasswordRequest } from "../../api/auth";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// ✅ Validación completa
const validateEmail = (email) => {
  const trimmed = email.trim();

  return (
    trimmed.length >= 5 &&
    trimmed.length <= 50 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  );
};

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

    // ✅ VALIDACIÓN FRONTEND COMPLETA
    if (!cleanEmail) {
      return setError("El email es obligatorio");
    }

    if (cleanEmail.length < 5 || cleanEmail.length > 50) {
      return setError("El email debe tener entre 5 y 50 caracteres");
    }

    if (!validateEmail(cleanEmail)) {
      return setError("El email no es válido");
    }

    setLoading(true);

    try {
      const res = await forgotPasswordRequest(cleanEmail);
      setMessage(res.data.message);
      setEmail(""); // limpia input después de enviar
    } catch (error) {
      setError(
        error.response?.data?.message || "Error al enviar la solicitud"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="bg-dark text-white border-secondary shadow">
            <Card.Header
              className="border-secondary text-center pt-4 pb-2"
              style={{ background: "transparent" }}
            >
              <h3>Recuperar contraseña</h3>
            </Card.Header>
            <Card.Body className="p-4">
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-dark text-white border-secondary"
                    required
                    minLength={5}
                    maxLength={50}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                  style={{
                    backgroundColor: "#6f42c1",
                    borderColor: "#6f42c1",
                  }}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/login" className="text-decoration-none text-light">
                  <small>Volver al inicio de sesión</small>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;