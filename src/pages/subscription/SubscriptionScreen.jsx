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
import { showError } from "../../helpers/alerts";

const SubscriptionScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  const currentPlanName = user?.subscription?.status?.toLowerCase() || "free";

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getPlansRequest();
        const sortedPlans = res.data.sort((a, b) => a.price - b.price);
        setPlans(sortedPlans);
      } catch (error) {
        console.error("Error cargando los planes:", error);
      } finally {
        setPageLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const handleBuy = async (plan) => {
    if (plan.price === 0) return;
    setLoading(true);
    try {
      const res = await createPreferenceRequest({
        planId: plan._id,
      });

      const initPoint =
        res.data?.init_point || res.data?.initPoint || res.init_point;

      if (initPoint) {
        window.location.href = initPoint;
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      showError("No se pudo conectar con Mercado Pago");
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
        {plans.map((plan) => {
          const isCurrentPlan = currentPlanName === plan.name.toLowerCase();
          const isFreePlan = plan.price === 0;

          return (
            <Col md={5} lg={4} key={plan._id}>
              <Card
                className={`h-100 shadow-lg ${
                  !isFreePlan
                    ? "border-success text-white"
                    : "border-secondary bg-dark text-white"
                }`}
                style={
                  !isFreePlan
                    ? {
                        background:
                          "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                        borderWidth: "2px",
                      }
                    : {}
                }
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className={`fs-2 fw-bold ${!isFreePlan ? "text-success" : ""}`}
                  >
                    {plan.name}
                  </Card.Title>
                  <h3 className={isFreePlan ? "text-secondary mb-4" : "mb-4"}>
                    ${plan.price} <small>/mes</small>
                  </h3>
                  <ListGroup variant="flush" className="bg-transparent mb-4">
                    {plan.benefits?.map((benefit, index) => (
                      <ListGroup.Item
                        key={index}
                        className="bg-transparent text-white border-secondary"
                      >
                        <i className="bx bx-check text-success me-2"></i>
                        {benefit}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button
                    onClick={() => handleBuy(plan)}
                    disabled={loading || isCurrentPlan || isFreePlan}
                    className="mt-auto w-100 py-2 btn-expand"
                    style={{
                      backgroundColor:
                        isCurrentPlan || isFreePlan ? "#6c757d" : "#198754",
                      border: "none",
                    }}
                  >
                    {isCurrentPlan
                      ? "Tu plan actual"
                      : isFreePlan
                        ? "Plan Gratuito"
                        : loading
                          ? "Procesando..."
                          : "Suscribirme ahora"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default SubscriptionScreen;
