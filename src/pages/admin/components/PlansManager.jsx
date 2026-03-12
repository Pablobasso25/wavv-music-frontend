import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, InputGroup, Badge, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { getPlansRequest, updatePlanRequest } from "../../../api/payment";

const PlansManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    loadPlans();
  }, []);

 const loadPlans = async () => {
  try {
    const res = await getPlansRequest();
    setPlans(res.data);
    
    if (res.data.length > 0) {
      const p = res.data.find(plan => plan.name === "Premium");
      
      if (p) {
        setSelectedPlan({
          id: p._id,
          title: p.name,
          price: p.price,
          currency: p.currency || "ARS",
          features: p.benefits || [],
          isActive: p.isActive
        });
      }
    }
  } catch (error) {
    console.error("Error cargando planes:", error);
  } finally {
    setLoading(false);
  }
};

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePlanRequest(selectedPlan.id, {
      title: selectedPlan.title,
      price: selectedPlan.price,
      features: selectedPlan.features,
      isActive: selectedPlan.isActive
    });
      Swal.fire({
        icon: "success",
        title: "Base de datos actualizada",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#5773ff",
      });
      await loadPlans();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error al guardar", background: "#1a1a1a", color: "#fff" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>;

  return (
    <div className="p-3 text-white d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <div className="bg-dark border border-secondary rounded p-4 shadow-lg text-center">
          <div className="d-flex justify-content-center align-items-center mb-3 border-bottom border-secondary pb-2">
            <h3 className="m-0 fw-bold fs-5">Gestión de Planes</h3>
      </div>

      <Form onSubmit={handleSave}>
            <style>
              {`
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                  -webkit-appearance: none; 
                  margin: 0; 
                }
                input[type=number] { -moz-appearance: textfield; }
              `}
            </style>
            <h5 className="text-uppercase text-secondary mb-2 small" style={{ letterSpacing: "1px" }}>Detalles Económicos</h5>
        <Row>
              <Col md={12}>
                <Form.Group className="mb-2">
                  <Form.Label className="text-light">Precio (Sincronizado con Mercado Pago)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-secondary border-secondary text-white">$</InputGroup.Text>
              <Form.Control
                type="number"
                      min="0"
                      onWheel={(e) => e.target.blur()}
                      onKeyDown={(e) => ["-", "e", "E", "+"].includes(e.key) && e.preventDefault()}
                      value={selectedPlan?.price || ""}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, price: parseFloat(e.target.value) })}
                      className="bg-black text-white border-secondary p-2 text-center"
                      style={{ fontSize: "1rem" }}
              />
                  </InputGroup>
            </Form.Group>
          </Col>
        </Row>
            
            <div className="d-flex justify-content-center mt-3 pt-2 border-top border-secondary">
              <Button variant="primary" type="submit" disabled={saving} className="px-3 fw-bold btn-sm">
                {saving ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                    Sincronizando DB...
                  </>
                ) : (
                  "Guardar cambios"
                )}
        </Button>
            </div>
      </Form>
    </div>
      </div>
    </div>
  );
};

export default PlansManager;