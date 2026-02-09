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
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="login-modal-dialog"
      contentClassName="login-modal-content"
      backdropClassName="modal-glass-backdrop"
    >
      <Modal.Body className="login-modal-body">
        <h2 className="login-title">Iniciar sesión</h2>


        {(error || (authErrors && authErrors.length > 0)) && (
          <Alert variant="danger">{error || authErrors[0]}</Alert>
        )}

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
