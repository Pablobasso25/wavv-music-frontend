import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { validatePassword } from "../../utils/passwordUtils";
import PasswordStrengthBar from "./PasswordStrengthBar";
import ShowPassword from "../login/ShowPassword";
import "./RegisterScreen.css";

const RegisterScreen = ({ show, handleClose, onSwitchToLogin }) => {
  const [send, setSend] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password", "");
  const username = watch("username", "");

  const { force, validations } = validatePassword(password, username);

  const onSubmit = async (data) => {
    setSend(true);
    try {
      await signup(data);
      Swal.fire({
      title: "¡Bienvenido!",
      html: `
        <div style="text-align: center;">
          <p style="margin-bottom: 10px; font-size: 16px;">Tu cuenta ha sido creada con éxito en <strong>Wavv Music</strong>.</p>
          <p style="margin-bottom: 0; font-size: 14px; color: #b0b0b0;">¡Te hemos enviado un email de bienvenida! Entrando a Wavv Music...</p>
        </div>
      `,
      icon: "success",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      color: "#ffffff",
      iconColor: "#6f42c1",
      confirmButtonText: "¡Empezar a escuchar!",
      confirmButtonColor: "#6f42c1",
      timer: 3000,
      timerProgressBar: true,
    }).then(() => {
      navigate("/");
    });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data[0] || "Error en el servidor",
        icon: "error",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setSend(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      size="lg"
      contentClassName="register-modal-content"
    >
      <Modal.Body className="p-4">
        <h2 className="register-title mb-4">Crear cuenta</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label className="register-label">
              Nombre de usuario *
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              className="register-input"
              isInvalid={!!errors.username}
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
            />
            {errors.username && (
              <div className="text-danger small mt-1">
                {errors.username.message}
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="register-label">Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Usuario@gmail.com"
              className="register-input"
              isInvalid={!!errors.email}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un correo válido",
                },
              })}
            />
            {errors.email && (
              <div className="text-danger small mt-1">
                {errors.email.message}
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="register-label">Contraseña *</Form.Label>
            <ShowPassword
              placeholder="Contraseña"
              className="register-input"
              isInvalid={
                !!errors.password || (password?.length > 0 && force < 99)
              }
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            {(errors.password || (password?.length > 0 && force < 99)) && (
              <div className="text-danger small mt-1">
                {errors.password?.message || "La contraseña aún no es segura"}
              </div>
            )}
            <PasswordStrengthBar
              force={force}
              validations={validations}
              password={password}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="register-label">
              Confirmar contraseña *
            </Form.Label>
            <ShowPassword
              placeholder="Repite tu contraseña"
              className="register-input"
              isInvalid={!!errors.confirmarPassword}
              {...register("confirmarPassword", {
                required: "Confirma tu contraseña",
                validate: (v) =>
                  v === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmarPassword && (
              <div className="text-danger small mt-1">
                {errors.confirmarPassword.message}
              </div>
            )}
          </Form.Group>

          <Button
            type="submit"
            className="register-btn w-100"
            disabled={send || force < 99}
          >
            {send
              ? "Registrando..."
              : force < 99
                ? "Registrarse"
                : "Registrarse"}
          </Button>
        </Form>
        <p className="register-link-text">
          ¿Ya tienes cuenta?{" "}
          <span
            className="register-link"
            onClick={() => onSwitchToLogin && onSwitchToLogin()}
            style={{ cursor: "pointer" }}
          >
            Ingresar
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterScreen;