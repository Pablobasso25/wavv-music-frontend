import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../api/auth";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import ShowPassword from "./ShowPassword";
import "../login/LoginScreen.css"; 

const validatePassword = (password) => {
  return (
    password.length >= 8 &&
    password.length <= 20 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|_/]/.test(password) &&
    !/\s/.test(password) &&
    !/[<>]/.test(password)
  );
};

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    let newErrors = { ...errors };

    if (!value) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!validatePassword(value)) {
      newErrors.password =
        "Debe tener 8-20 caracteres, mayúscula, minúscula, número y símbolo";
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!password) return setError("La contraseña es obligatoria");
    if (!validatePassword(password)) {
      return setError("La contraseña no cumple con los requisitos de seguridad");
    }

    setLoading(true);
    try {
      const res = await resetPasswordRequest(token, password);
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Error al cambiar la contraseña");
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
              <h2 className="login-title mb-4 text-center">Nueva contraseña</h2>

              <p className="text-white-50 text-center mb-4 small">
                Crea una nueva contraseña segura para tu cuenta de Wavv Music.
              </p>

              {message && <Alert variant="success" className="py-2 small text-center">{message}</Alert>}
              {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="login-label">Nueva contraseña</Form.Label>
                  <ShowPassword
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="login-input"
                    placeholder="Contraseña segura"
                    required
                    isInvalid={!!errors.password}
                  />

                  {errors.password && (
                    <div className="text-danger small mt-2" style={{ fontSize: '0.75rem' }}>
                       {errors.password}
                    </div>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  className="login-btn w-100 fw-bold py-2"
                  disabled={loading || errors.password}
                >
                  {loading ? "Cambiando..." : "Actualizar contraseña"}
                </Button>
              </Form>

              <div className="text-center mt-4 text-white-50">
                <small>Serás redirigido al inicio tras el éxito.</small>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;