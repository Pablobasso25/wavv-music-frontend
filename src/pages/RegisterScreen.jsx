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
import emailjs from "@emailjs/browser"; 
import Swal from "sweetalert2"; 

const EMAILJS_CONFIG = { 
  SERVICE_ID: "service_46a3s63",
  TEMPLATE_ID: "template_v81kajd",
  PUBLIC_KEY: "W0WIYNiPDb9B0Jhf3",
}; 

emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

const RegisterScreen = () => {
  
  const onSubmit = () => {}; 
  const handleSubmit = (func) => (e) => { e.preventDefault(); func({}); }; 

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