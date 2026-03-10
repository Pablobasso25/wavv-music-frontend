import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const processPayment = async () => {
      setTimeout(async () => {
        await refreshUser(); 
        
        Swal.fire({
          title: "¡Pago Procesado!",
          text: "Tu suscripción ha sido actualizada. ¡Ya eres Premium!",
          icon: "success",
          background: "#191B1B",
          color: "#fff",
          confirmButtonColor: "#198754",
        }).then(() => {
          navigate("/");
        });
      }, 4000);
    };

    processPayment();
  }, []);

  return (
    <Container className="vh-100 d-flex flex-column align-items-center justify-content-center text-white text-center">
      <Spinner animation="border" variant="success" className="mb-4" style={{ width: '4rem', height: '4rem' }} />
      <h2 className="fw-bold">Validando tu suscripción...</h2>
      <p className="text-secondary">Estamos sincronizando tu pago con Wavv Music. No cierres esta ventana.</p>
    </Container>
  );
};

export default PaymentSuccess;