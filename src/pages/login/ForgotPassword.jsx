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

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await forgotPasswordRequest(email);
      setMessage(res.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Error al enviar la solicitud");
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
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                  style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}
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
