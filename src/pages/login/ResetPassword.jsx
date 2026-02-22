import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../api/auth";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import ShowPassword from "./ShowPassword";

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

    if (!password) {
      return setError("La contraseña es obligatoria");
    }

    if (!validatePassword(password)) {
      return setError(
        "Debe tener 8-20 caracteres, mayúscula, minúscula, número y símbolo"
      );
    }

    setLoading(true);

    try {
      const res = await resetPasswordRequest(token, password);
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error al cambiar la contraseña"
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
              <h3>Nueva contraseña</h3>
            </Card.Header>

            <Card.Body className="p-4">
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Nueva contraseña</Form.Label>

                  <ShowPassword
  name="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="bg-dark text-white border-secondary"
  placeholder="Nueva contraseña"
  required
  minLength={8}
  maxLength={20}
/>

                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading || errors.password}
                  style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}
                >
                  {loading ? "Cambiando..." : "Cambiar"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
