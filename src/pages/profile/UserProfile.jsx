import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

const getToday = () => {
  const d = new Date();
  return d.toLocaleDateString("es-AR");
};

const STORAGE_KEY = "userProfileData_v1";
const INITIAL_USER = {
  name: "Tomas Gomez",
  username: "Tomas123",
  email: "Tomas@wavvmusic.com",
  joinDate: "",
  bio: "Me gusta la música desde que tengo uso de razón.",
  avatarUrl: "",
  password: "password123",
};

export const FieldEditForm = ({
  title,
  label,
  initialValue,
  isTextarea = false,
  onSave,
  onCancel,
  validate,
}) => {
  const [value, setValue] = useState(initialValue ?? "");
  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");
    const value = typeof value === "string" ? value.trim() : value;

    if (validate) {
      const message = validate(value);
      if (message) return setError(message);
    }

    onSave(value);
  };

  return (
    <div>
      <h3 className="text-white mb-4">{title}</h3>

      <Form>
        <Form.Group>
          <Form.Label className="text-white">{label}</Form.Label>
          <Form.Control
            as={isTextarea ? "textarea" : "input"}
            rows={isTextarea ? 5 : undefined}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Group>

        {error && (
          <Alert variant="danger" className="mt-3 mb-0">
            {error}
          </Alert>
        )}

         <div className="d-flex gap-2 justify-content-end mt-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
          >
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default function useUserProfile() {
  const [user, setUser] = useState(INITIAL_USER);
  const [mode, setMode] = useState("view");
 

  useEffect(() => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw) {
    try {
      const parsed = JSON.parse(raw);

      if (!parsed.joinDate) {
        const fixed = { ...parsed, joinDate: getToday() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fixed));
        setUser(fixed);
      } else {
        setUser(parsed);
      }
    } catch {
      const seeded = { ...INITIAL_USER, joinDate: getToday() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      setUser(seeded);
    }
  } else {
    const seeded = { ...INITIAL_USER, joinDate: getToday() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    setUser(seeded);
  }
}, []);
}

const persist = (data) => {
    setUser(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const handleUpdate = (partial) => {
    persist({ ...user, ...partial });
    setMode("view");
  };

  const handleDelete = () => {
    const ok = window.confirm(
      "¿Estás seguro de que querés eliminar los datos del perfil?"
    );
    if (!ok) return;

    persist({
      ...INITIAL_USER,
      name: "",
      username: "",
      email: "",
      bio: "",
      avatarUrl: "",
    });
    setMode("view");
  };