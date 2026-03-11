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
    <div className="p-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Gestión de Planes Reales</h3>
        <Badge bg={selectedPlan?.isActive ? "success" : "danger"}>
            {selectedPlan?.isActive ? "Activo en tienda" : "Pausado"}
        </Badge>
      </div>

      <Form onSubmit={handleSave}>
        <Row>
          <Col md={6}>
            <h5>Detalles Económicos</h5>
            <Form.Group className="mb-3">
              <Form.Label>Precio (Sincronizado con Mercado Pago)</Form.Label>
              <Form.Control
                type="number"
                value={selectedPlan?.price}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, price: parseFloat(e.target.value) })}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={saving} className="mt-4">
          {saving ? "Sincronizando DB..." : "Guardar cambios"}
        </Button>
      </Form>
    </div>
  );
};

export default PlansManager;