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
import { useState } from "react";
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
  const onSubmit = () => {};

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
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  type="submit"
                  className="btn-primary-custom w-100 py-2"
                  disabled={true}
                  variant="secondary"
                >
                  Registrarse
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
