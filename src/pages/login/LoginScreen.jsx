import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { validateLogin, LOGIN_LIMITS } from "../../utils/authValidations";
import ShowPassword from "./ShowPassword";
import "./LoginScreen.css";
import { Link } from "react-router-dom";

const LoginScreen = ({ show, handleClose, onSwitchToRegister }) => {
  const { login, isAuthenticated, errors: authErrors } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [localErrors, setLocalErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) handleClose();
  }, [isAuthenticated, handleClose]);

  useEffect(() => {
    if (!show) {
      setFormData({ email: "", password: "" });
      setLocalErrors({});
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;

    if (name === "password") cleanValue = value.replace(/[<>\s]/g, "");

    const maxLength = name === "email" ? LOGIN_LIMITS.email.max : LOGIN_LIMITS.password.max;
    if (cleanValue.length > maxLength) return;

    setFormData({ ...formData, [name]: cleanValue });
    if (localErrors[name]) setLocalErrors({ ...localErrors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLogin(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setLocalErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      await login(formData);
    } catch (err) {
      console.error("Error en login:", err);
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
      contentClassName="login-modal-content"
    >
      <Modal.Body className="login-modal-body p-4">
        <h2 className="login-title mb-4 text-center text-white">Iniciar sesión</h2>

        {authErrors && authErrors.length > 0 && (
          <Alert variant="danger" className="py-2 text-center">
            {typeof authErrors[0] === 'object' ? authErrors[0].message : authErrors[0]}
          </Alert>
        )}

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="login-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Usuario@gmail.com"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!localErrors.email}
              className="login-input"
            />
            <Form.Control.Feedback type="invalid">{localErrors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="login-label">Contraseña</Form.Label>
            <ShowPassword
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!localErrors.password}
              className="login-input"
            />
            {localErrors.password && <div className="text-danger small mt-1">{localErrors.password}</div>}
          </Form.Group>

          <Button type="submit" className="login-btn w-100 py-2 fw-bold" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </Button>
        </Form>

        <p className="login-register-text mt-4 text-center">
          ¿No tienes cuenta?{" "}
          <span className="login-register-link fw-bold" onClick={onSwitchToRegister} style={{ cursor: "pointer" }}>
            Regístrate aquí
          </span>
        </p>
        <p className="login-register-text">
          <Link
            to="/forgot-password"
            className="login-register-link"
            onClick={handleClose}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginScreen;