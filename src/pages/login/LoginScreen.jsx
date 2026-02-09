import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginScreen.css";
import VisualizacionContrasena from "./VisualizacionContrasena";

const LoginScreen = ({ show, handleClose }) => {
  const { login, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
      navigate("/");
    }
  }, [isAuthenticated, navigate, handleClose]);

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
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
            />
          </Form.Group>

          <Button type="submit" className="login-btn w-100" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </Button>
        </Form>

        <p className="login-register-text">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="login-register-link"
            onClick={handleClose}
          >
            Regístrate aquí
          </Link>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginScreen;