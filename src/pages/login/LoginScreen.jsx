import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginScreen.css";

const LoginScreen = ({ show, handleClose }) => {
  const { login, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "password") {
      value = value.replace(/[<>\s]/g, "");
    }

    setFormData({ ...formData, [e.target.name]: value });
  };


  useEffect(() => {
    if (!show) {
      setError(null);
    }
  }, [show]);

  const handleSubmit = async (e) => {
if (e)     e.preventDefault();
    setLoading(true);
setError(null);

    try {
      await login(formData);
    } catch (err) {
      console.error("Error capturado en el componente:", err);
      if (!err.response) setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="bg-dark text-white border-secondary shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Iniciar sesión</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                    maxLength={50}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-dark text-white border-secondary"
                    maxLength={20}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn-primary-custom w-100 py-2">
                  {loading ? "Iniciando sesión..." : "Ingresar"}
                </Button>
              </Form>

              <p className="text-secondary mt-3 text-center">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-primary text-decoration-none"
                >
                  Regístrate aquí
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
