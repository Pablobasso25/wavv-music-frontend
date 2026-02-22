import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "./LoginScreen.css";
import ShowPassword from "./ShowPassword";

const LoginScreen = ({ show, handleClose, onSwitchToRegister }) => {
  const { login, errors: authErrors } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (e) e.preventDefault();
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
            <Form.Label className="login-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Usuario@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="login-input"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="login-label">Contraseña</Form.Label>
            <ShowPassword
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Contraseña"
            />
          </Form.Group>

          <Button type="submit" className="login-btn w-100" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </Button>
        </Form>

        <p className="login-register-text">
          ¿No tienes cuenta?{" "}
          <span
            className="login-register-link"
            onClick={() => onSwitchToRegister && onSwitchToRegister()}
            style={{ cursor: "pointer" }}
          >
            Regístrate aquí
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginScreen;
