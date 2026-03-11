import React from "react";
import { ProgressBar, Badge } from "react-bootstrap";
import { getForceConfig } from "../../utils/passwordUtils";

const PasswordStrengthBar = ({ force, validations, password }) => {
  if (!password) return null;
  const config = getForceConfig(force);

  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-white-50">Fuerza de la contraseña:</small>
        <Badge bg={config.variant}>{config.texto}</Badge>
      </div>
      <ProgressBar 
        now={force} 
        variant={config.variant} 
        className="mb-2" 
        style={{ height: "8px" }} 
      />
      
      {force < 99 && (
        <div className="border border-warning rounded p-2" style={{ maxHeight: "120px", overflowY: "auto", background: "rgba(0,0,0,0.2)" }}>
          {!validations.longitud && <small className="d-block text-danger">❌ Mínimo 8 caracteres</small>}
          {!validations.mayuscula && <small className="d-block text-danger">❌ Al menos una mayúscula</small>}
          {!validations.minuscula && <small className="d-block text-danger">❌ Al menos una minúscula</small>}
          {!validations.numero && <small className="d-block text-danger">❌ Al menos un número</small>}
          {!validations.simbolo && <small className="d-block text-danger">❌ Al menos un símbolo (!@#$)</small>}
          {!validations.noEspacios && <small className="d-block text-danger">❌ Sin espacios</small>}
          {!validations.diferenteAlUsername && <small className="d-block text-danger">❌ Diferente al usuario</small>}
        </div>
      )}
      {force >= 99 && (
        <div className="border border-success rounded p-2 text-center" style={{ background: "rgba(25, 135, 84, 0.1)" }}>
          <small className="text-success fw-bold">✅ Contraseña segura</small>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthBar;