import React, { useState } from "react";
import "./SubscriptonScreen.css";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { createPreferenceRequest } from "../../api/payment";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const PLAN_PRICES = {
  PREMIUM: 6000,
  FAMILIAR: 15000,
};
const SubscriptionScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const isPremium = user?.subscription?.status === "premium";
  const isFamiliar = user?.subscription?.status === "familiar";
  const isFree = !isPremium && !isFamiliar;
  const handleBuy = async (planType, price) => {
    try {
      const res = await createPreferenceRequest({ planType, price });   
      const initPoint =
        res.data?.init_point || res.data?.initPoint || res.init_point;
      if (initPoint) {
        window.location.href = initPoint;
      } 
    } catch (error) {
    }
  };
  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1 className="display-4 fw-bold text-white">
            Lleva tu música al siguiente nivel
          </h1>
          <p className="text-secondary fs-5">
            Elige el plan que mejor se adapte a ti.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center gap-4">
        <Col md={5} lg={3}>
          <Card className="bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-2 fw-bold">Free</Card.Title>
              <h3 className="text-secondary mb-4">
                $0 <small>/mes</small>
              </h3>
              <ListGroup variant="flush" className="bg-transparent mb-4">
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>
                  Escucha todas las canciones
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-x text-danger me-2"></i>
                  Límite de 5 canciones en Playlist
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-secondary border-secondary">
                  Soporte estándar
                </ListGroup.Item>
              </ListGroup>
              <Button
                disabled
                className="mt-auto w-100 py-2 btn-expand"
                style={{
                  backgroundColor: "#6c757d",
                  color: "#000000",
                  border: "none",
                  cursor: "not-allowed",
                }}
              >
                <span className="btn-icon">
                  <i className="bx bx-lock"></i>
                </span>
                <span className="btn-text">
                  {isFree ? "Tu plan actual" : "Plan Gratuito"}
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} lg={3}>
          <Card
            className="text-white h-100 shadow-lg border-success"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              borderWidth: "2px",
            }}
          >
            <div className="position-absolute top-0 end-0 p-2 ">
              <span
                className="badge bg-success text-dark"
                style={{ fontSize: "0.7rem" }}
              >
                PROMO
              </span>
            </div>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-2 fw-bold text-success">
                Premium
              </Card.Title>
              <h3 className="mb-4">
                $6000<small>/mes</small>
              </h3>
              <ListGroup variant="flush" className="bg-transparent mb-4">
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>
                  Playlist <strong>Ilimitada</strong>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>
                  Sin anuncios
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>
                  Calidad de audio superior
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>
                  Soporte 24/7
                </ListGroup.Item>
              </ListGroup>
              <Button
                onClick={() => handleBuy("Premium", PLAN_PRICES.PREMIUM)}
                disabled={loading || isPremium}
                className="mt-auto w-100 py-2  btn-expand"
                style={{
                  backgroundColor: isPremium ? "#6c757d" : "#198754",
                  color: "#000000",
                  border: "none",
                  cursor: isPremium ? "not-allowed" : "pointer",
                }}
              >
                <span className="btn-icon">
                  <i className={`bx ${isPremium ? "bx-lock" : "bx-cart"}`}></i>
                </span>
                <span className="btn-text">
                  {isPremium
                    ? "Tu plan actual"
                    : loading
                      ? "Procesando..."
                      : "Suscribirme ahora"}
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} lg={3}>
          <Card
            className="text-white h-100 shadow-lg border-info"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              borderWidth: "2px",
            }}
          >
            <div className="position-absolute top-0 end-0 p-2 ">
              <span
                className="badge bg-info text-dark"
                style={{ fontSize: "0.7rem" }}
              >
                FAVORITO
              </span>
            </div>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-2 fw-bold text-info">
                Familiar
              </Card.Title>
              <h3 className="mb-4">
                $15000 <small>/mes</small>
              </h3>
              <ListGroup variant="flush" className="bg-transparent mb-4">
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-info me-2"></i>
                  Playlist <strong>Ilimitada</strong>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-info me-2"></i>
                  Sin anuncios
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-info me-2"></i>
                  Calidad de audio superior
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-info me-2"></i>
                  Soporte 24/7
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-info me-2"></i>
                  <strong>Hasta 3 dispositivos simultáneos</strong>
                </ListGroup.Item>
              </ListGroup>
              <Button
                disabled
                className="mt-auto w-100 py-2  btn-expand"
                style={{
                  backgroundColor: "#6c757d",
                  color: "#ffffff",
                  border: "none",
                  cursor: "not-allowed",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                }}
              >
                <span className="btn-text" style={{ maxWidth: "200px", opacity: 1, marginLeft: 0 }}>
                  Próximamente
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SubscriptionScreen;