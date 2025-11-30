import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  ProgressBar,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const EMAILJS_CONFIG = {
  SERVICE_ID: "service_46a3s63",
  TEMPLATE_ID: "template_v81kajd",
  PUBLIC_KEY: "W0WIYNiPDb9B0Jhf3",
};
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

const RegisterScreen = () => {
  const [send, setSend] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmarPassword: "",
    },
  });

  const navigate = useNavigate();
  const password = watch("password");
  const username = watch("username");

  const validatePassword = (password) => {
    if (!password) return { force: 0, validations: {} };

    const validations = {
      longitud: password.length >= 8,
      mayuscula: /[A-Z]/.test(password),
      minuscula: /[a-z]/.test(password),
      numero: /\d/.test(password),
      simbolo: /[!@#$%^&*(),.?":{}|_/]/.test(password),
      noEspacios: !/\s/.test(password),
      longitudMaxima: password.length <= 20,
      diferenteAlUsername: password !== username,
      noCaracteresPeligrosos: !/[<>]/.test(password),
      noPalabrasComunes: !/(password|123456|admin|12345678|123456789)/i.test(
        password
      ),
    };

    let force = 0;

    force += Math.min(password.length * 4, 32);
    if (validations.longitud) force += 10;
    if (validations.mayuscula) force += 10;
    if (validations.minuscula) force += 10;
    if (validations.numero) force += 10;
    if (validations.simbolo) force += 18;
    if (validations.noEspacios) force += 5;
    if (validations.diferenteAlUsername) force += 5;

    return {
      force: Math.min(force, 100),
      validations,
    };
  };

  const { force: forcePassword, validations } = validatePassword(password);

  const informationForce = () => {
    if (forcePassword === 0)
      return { texto: "No ingresado", variant: "secondary" };
    if (forcePassword < 50) return { texto: "Débil", variant: "danger" };
    if (forcePassword < 80) return { texto: "Regular", variant: "warning" };
    if (forcePassword < 99) return { texto: "Buena", variant: "info" };
    return { texto: "Muy Fuerte", variant: "success" };
  };

  const infoForce = informationForce();

  const showSuccessAlert = (emailEnviado = true) => {
    const mensaje = emailEnviado
      ? "¡Te hemos enviado un email de confirmación! Redirigiendo al login..."
      : "⚠️ Registro exitoso, pero no se pudo enviar el email. Redirigiendo al login...";

    Swal.fire({
      title: "✔️¡Registro Exitoso!",
      html: `
        <div style="text-align: center;">
          <p style="margin-bottom: 10px; font-size: 16px;">¡Bienvenido a <strong>Wavv Music</strong>!</p>
          <p style="margin-bottom: 0; font-size: 14px; color: ${
            emailEnviado ? "#b0b0b0" : "#ffc107"
          };">${mensaje}</p>
        </div>
      `,
      icon: "success",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      color: "#ffffff",
      iconColor: "#6f42c1",
      confirmButtonText: "¡Empezar!",
      confirmButtonColor: "#6f42c1",
      timer: 4000,
      timerProgressBar: true,
    }).then(() => {
      navigate("/login");
    });
  };

  const onSubmit = async (data) => {
    if (forcePassword < 99) {
      Swal.fire({
        title: "🔒 Contraseña insuficiente",
        text: "La contraseña debe ser MUY FUERTE para registrarse",
        icon: "warning",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "#ffffff",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#ffc107",
      });
      return;
    }

    setSend(true);
    setErrorEmail("");

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const exists = users.some((user) => user.email === data.email);

      if (exists) {
        Swal.fire({
          title: "❌ Error",
          text: "Ya existe un usuario con ese email",
          icon: "error",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          color: "#ffffff",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#dc3545",
        });
        setSend(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        username: data.username,
        email: data.email,
        password: data.password,
        role: "usuario",
        favorites: [],
        playlists: [],
        createdAt: new Date().toISOString(),
        verificado: false,
      };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      // ENVIAR EMAIL
      let emailFueEnviado = false;
      try {
        const templateParams = {
          to_name: data.username,
          to_email: data.email,
          email: data.email,
          from_name: "Harmony Stream",
          fecha: new Date().toISOString().split("T")[0],
        };

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        emailFueEnviado = true;
      } catch (emailError) {
        emailFueEnviado = false;
      }

      showSuccessAlert(emailFueEnviado);
    } catch (error) {
      Swal.fire({
        title: "❌ Error",
        text: "Hubo un problema con el registro. Intenta nuevamente.",
        icon: "error",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "#ffffff",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setSend(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 mt-2">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={7}>
          <Card className="bg-dark text-white border-secondary shadow">
            <Card.Header className="border-secondary">
              <h4 className="text-center mb-0">Registro en WavvMusic</h4>
              <small className="text-center d-block text-warning mt-1">
                🔒 Contraseña debe ser <strong>MUY FUERTE</strong> para
                registrarse
              </small>
            </Card.Header>
            <Card.Body className="p-4">
              {errorEmail && (
                <Alert variant="danger" className="mb-4">
                  {errorEmail}
                </Alert>
              )}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de usuario *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tu nombre de usuario"
                    className="bg-dark text-white border-secondary"
                    isInvalid={errors.username}
                    maxLength={30}
                    {...register("username", {
                      required: "El nombre de usuario es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Mínimo 2 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "Máximo 30 caracteres",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Solo letras, números y guiones bajos",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username && errors.username.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-dark text-white border-secondary"
                    isInvalid={errors.email}
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Por favor ingresa un email válido",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email && errors.email.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Crea una contraseña MUY FUERTE (8-20 caracteres)"
                    className="bg-dark text-white border-secondary"
                    isInvalid={errors.password && forcePassword < 99}
                    maxLength={20}
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe tener al menos 8 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "La contraseña no puede tener más de 20 caracteres",
                      },
                      validate: {
                        fuerza: () =>
                          forcePassword >= 99 ||
                          (forcePassword > 0 &&
                            "La contraseña debe ser MUY FUERTE"),
                        noEspacios: (value) =>
                          !/\s/.test(value) ||
                          "La contraseña no puede contener espacios",
                        diferenteAlUsername: (value) => {
                          const currentUsername = watch("username");
                          return (
                            value !== currentUsername ||
                            "La contraseña no puede ser igual al nombre de usuario"
                          );
                        },
                        noCaracteresPeligrosos: (value) =>
                          !/[<>]/.test(value) ||
                          "La contraseña no puede contener < o >",
                        noPalabrasComunes: (value) =>
                          !/(password|123456|admin|qwerty)/i.test(value) ||
                          "La contraseña es muy común",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password &&
                      forcePassword < 99 &&
                      errors.password.message}
                  </Form.Control.Feedback>

                  {password && (
                    <div className="text-end mt-1">
                      <small
                        className={
                          password.length > 20 ? "text-danger" : "text-white-50"
                        }
                      >
                        {password.length}/20 caracteres
                      </small>
                    </div>
                  )}

                  {password && (
                    <div className="mt-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-white-50">
                          Fuerza de la contraseña:
                        </small>
                        <Badge bg={infoForce.variant}>{infoForce.texto}</Badge>
                      </div>
                      <ProgressBar
                        now={forcePassword}
                        variant={infoForce.variant}
                        className="mb-2"
                      />

                      {Object.keys(validations).some(
                        (key) => !validations[key]
                      ) &&
                        forcePassword < 99 && (
                          <div
                            style={{ maxHeight: "100px", overflowY: "auto" }}
                            className="border border-warning rounded p-2"
                          >
                            <div className="row g-1">
                              {!validations.longitud && (
                                <div className="col-12">
                                  <small className="text-danger">
                                    ❌ Mínimo 8 caracteres
                                  </small>
                                </div>
                              )}
                              {!validations.mayuscula && (
                                <div className="col-12">
                                  <small className="text-danger">
                                    ❌ Al menos una mayúscula
                                  </small>
                                </div>
                              )}
                              {!validations.minuscula && (
                                <div className="col-12">
                                  <small className="text-danger">
                                    ❌ Al menos una minúscula
                                  </small>
                                </div>
                              )}
                              {!validations.numero && (
                                <div className="col-12">
                                  <small className="text-danger">
                                    ❌ Al menos un número
                                  </small>
                                </div>
                              )}
                              {!validations.simbolo && (
                                <div className="col-12">
                                  <small className="text-danger">
                                    ❌ Al menos un símbolo (!@#$% etc.)
                                  </small>
                                </div>
                              )}
                              {!validations.noEspacios && (
                                <div className="col-12">
                                  <small className="text-danger">
                                    ❌ Sin espacios
                                  </small>
                                </div>
                              )}
                              {!validations.diferenteAlUsername && (
                                <div className="col-12">
                                  <small className="text-danger">
                                    ❌ Diferente al usuario
                                  </small>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      {forcePassword >= 99 && (
                        <div className="border border-success rounded p-2 text-center">
                          <small className="text-success ">
                            ✅ Contraseña segura
                          </small>
                        </div>
                      )}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirmar contraseña *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repite tu contraseña"
                    className="bg-dark text-white border-secondary"
                    isInvalid={errors.confirmarPassword}
                    maxLength={20}
                    {...register("confirmarPassword", {
                      required: "Confirma tu contraseña",
                      validate: (value) =>
                        value === password || "Las contraseñas no coinciden",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmarPassword &&
                      errors.confirmarPassword.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  className="btn-primary-custom w-100 py-2"
                  disabled={send || forcePassword < 99}
                  variant={forcePassword >= 99 ? "primary" : "secondary"}
                >
                  {send ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Registrando...
                    </>
                  ) : forcePassword < 99 ? (
                    "🔒 Contraseña debe ser MUY FUERTE"
                  ) : (
                    "Registrarse"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
