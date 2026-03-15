import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { showWarning, showSuccess, showError } from "../../../helpers/alerts";
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

  const handleSelectPlan = (plan) => {
    setSelectedPlan({
      id: plan._id,
      title: plan.name,
      price: plan.price,
      features: plan.benefits || [],
      isActive: plan.isActive,
      adInterval:
        plan.adInterval ?? (plan.name.toLowerCase() === "free" ? 3 : 0),
      playlistLimit:
        plan.playlistLimit ?? (plan.name.toLowerCase() === "free" ? 5 : 9999),
    });
  };

  const loadPlans = async () => {
    setLoading(true);
    try {
      const res = await getPlansRequest();
      setPlans(res.data);

      if (res.data.length > 0) {
        const current = selectedPlan
          ? res.data.find((p) => p._id === selectedPlan.id) || res.data[0]
          : res.data[0];
        handleSelectPlan(current);
      }
    } catch (error) {
      console.error("Error cargando planes:", error);
      showError(
        "No se pudieron obtener los datos de los planes.",
        "Error de Carga",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && selectedPlan) {
      const updatedFeatures = [...selectedPlan.features, newFeature.trim()];
      setSelectedPlan({ ...selectedPlan, features: updatedFeatures });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (indexToRemove) => {
    if (selectedPlan) {
      const updatedFeatures = selectedPlan.features.filter(
        (_, index) => index !== indexToRemove,
      );
      setSelectedPlan({ ...selectedPlan, features: updatedFeatures });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      selectedPlan?.price === "" ||
      selectedPlan?.price === null ||
      selectedPlan?.price === undefined
    ) {
      return showWarning(
        "El plan debe tener un precio válido para continuar.",
        "Precio requerido",
      );
    }
    const priceNum = Number(selectedPlan.price);
    const adIntervalNum = Number(selectedPlan.adInterval);
    const playlistLimitNum = Number(selectedPlan.playlistLimit);

    if (priceNum < 0 || priceNum > 1000000) {
      return showWarning(
        "El precio debe estar entre 0 y 1.000.000.",
        "Precio inválido",
      );
    }

    if (adIntervalNum < 0 || adIntervalNum > 50) {
      return showWarning(
        "El intervalo de anuncios debe estar entre 0 y 50.",
        "Intervalo inválido",
      );
    }

    if (playlistLimitNum < 1 || playlistLimitNum > 10000) {
      return showWarning(
        "El límite de la playlist debe estar entre 1 y 10.000.",
        "Límite inválido",
      );
    }

    setSaving(true);
    try {
      await updatePlanRequest(selectedPlan.id, {
        name: selectedPlan.title,
        price: priceNum,
        benefits: selectedPlan.features,
        isActive: selectedPlan.isActive,
        adInterval: adIntervalNum,
        playlistLimit: playlistLimitNum,
      });
      showSuccess(
        "Los cambios en el plan se han guardado correctamente.",
        "Base de datos actualizada",
      );
      await loadPlans();
    } catch (error) {
      console.error("Error guardando el plan:", error);
      showError(
        "No se pudieron guardar los cambios. Inténtalo de nuevo.",
        "Error al guardar",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <div className="p-3 text-white d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <div className="bg-dark border border-secondary rounded p-4 shadow-lg">
          <div className="d-flex justify-content-center align-items-center mb-3 border-bottom border-secondary pb-3">
            <h3 className="m-0 fw-bold fs-5 text-center">Gestión de Planes</h3>
          </div>

          {!selectedPlan ? (
            <p className="text-center text-secondary">
              No se encontraron planes para gestionar.
            </p>
          ) : (
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

              <Form.Group className="mb-4">
                <Form.Label className="text-light">
                  Seleccionar Plan a Editar
                </Form.Label>
                <Form.Select
                  className="bg-black text-white border-secondary shadow-none"
                  value={selectedPlan?.id || ""}
                  onChange={(e) => {
                    const plan = plans.find((p) => p._id === e.target.value);
                    if (plan) handleSelectPlan(plan);
                  }}
                >
                  {plans.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <h5
                className="text-uppercase text-secondary mb-3 small"
                style={{ letterSpacing: "1px" }}
              >
                Configuración del Plan
              </h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">Precio</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-secondary border-secondary text-white">
                        $
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        min="0"
                        max="1000000"
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) =>
                          ["-", "e", "E", "+"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={selectedPlan?.price ?? ""}
                        onChange={(e) => {
                          if (e.target.value.length <= 10) {
                            setSelectedPlan({
                              ...selectedPlan,
                              price: e.target.value,
                            });
                          }
                        }}
                        className="bg-black text-white border-secondary p-2"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Intervalo Anuncios
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        min="0"
                        max="50"
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) =>
                          ["-", "e", "E", "+"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={selectedPlan?.adInterval ?? ""}
                        onChange={(e) =>
                          setSelectedPlan({
                            ...selectedPlan,
                            adInterval: Number(e.target.value),
                          })
                        }
                        className="bg-black text-white border-secondary p-2"
                        placeholder="Ej: 3 (0 = sin anuncios)"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-light">
                      Límite en Playlist
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        min="1"
                        max="10000"
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) =>
                          ["-", "e", "E", "+"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={selectedPlan?.playlistLimit ?? ""}
                        onChange={(e) =>
                          setSelectedPlan({
                            ...selectedPlan,
                            playlistLimit: Number(e.target.value),
                          })
                        }
                        className="bg-black text-white border-secondary p-2"
                        placeholder="Ej: 5 (9999 = Ilimitado)"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <h5
                className="text-uppercase text-secondary mt-4 mb-3 small"
                style={{ letterSpacing: "1px" }}
              >
                Beneficios del Plan
              </h5>

              <ListGroup variant="flush" className="mb-3">
                {selectedPlan?.features?.map((feature, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center bg-transparent border-secondary px-0 text-white py-2"
                  >
                    <span>{feature}</span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "24px", height: "24px" }}
                      onClick={() => handleRemoveFeature(index)}
                    >
                      &times;
                    </Button>
                  </ListGroup.Item>
                ))}
                {selectedPlan?.features?.length === 0 && (
                  <p className="text-secondary small text-center mt-2">
                    Aún no se han añadido beneficios.
                  </p>
                )}
              </ListGroup>

              <Form.Group>
                <Form.Label className="text-light">Nuevo Beneficio</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Ej: Playlists ilimitadas"
                    className="bg-black text-white border-secondary"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button variant="outline-primary" onClick={handleAddFeature}>
                    Añadir
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-center mt-4 pt-3 border-top border-secondary">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={saving}
                  className="px-4 fw-bold"
                >
                  {saving ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Sincronizando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlansManager;
