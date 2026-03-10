import React, { useState, useEffect } from "react";
import "./SubscriptonScreen.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { createPreferenceRequest, getPlansRequest } from "../../api/payment";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const SubscriptionScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [dbPlan, setDbPlan] = useState(null);

  const isPremium = user?.subscription?.status === "premium";

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getPlansRequest();
        const premium = res.data.find(
          (p) => p.name.toLowerCase() === "premium",
        );
        setDbPlan(premium);
      } catch (error) {
        console.error("Error cargando precio real:", error);
      } finally {
        setPageLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const handleBuy = async (planType) => {
    if (!dbPlan) return;
    setLoading(true);
    try {
      const res = await createPreferenceRequest({
        planType: dbPlan.name,
        price: Number(dbPlan.price),
      });

      const initPoint =
        res.data?.init_point || res.data?.initPoint || res.init_point;

      if (initPoint) {
        window.location.href = initPoint;
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      Swal.fire("Error", "No se pudo conectar con Mercado Pago", "error");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

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
        <Col md={5} lg={4}>
          <Card className="bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-2 fw-bold">Free</Card.Title>
              <h3 className="text-secondary mb-4">
                $0 <small>/mes</small>
              </h3>
              <ListGroup variant="flush" className="bg-transparent mb-4">
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>Escucha todas
                  las canciones
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-x text-danger me-2"></i>Límite de 5
                  canciones en Playlist
                </ListGroup.Item>
              </ListGroup>
              <Button
                disabled
                className="mt-auto w-100 py-2"
                style={{ backgroundColor: "#6c757d", border: "none" }}
              >
                {!isPremium ? "Tu plan actual" : "Plan Gratuito"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} lg={4}>
          <Card
            className="text-white h-100 shadow-lg border-success"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              borderWidth: "2px",
            }}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-2 fw-bold text-success">
                Premium
              </Card.Title>
              <h3 className="mb-4">
                ${dbPlan ? dbPlan.price : "..."}
                <small>/mes</small>
              </h3>
              <ListGroup variant="flush" className="bg-transparent mb-4">
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>Playlist{" "}
                  <strong>Ilimitada</strong>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent text-white border-secondary">
                  <i className="bx bx-check text-success me-2"></i>Sin anuncios
                </ListGroup.Item>
              </ListGroup>
              <Button
                onClick={() => handleBuy("Premium")}
                disabled={loading || isPremium}
                className="mt-auto w-100 py-2 btn-expand"
                style={{
                  backgroundColor: isPremium ? "#6c757d" : "#198754",
                  border: "none",
                }}
              >
                {isPremium
                  ? "Tu plan actual"
                  : loading
                    ? "Procesando..."
                    : "Suscribirme ahora"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SubscriptionScreen;