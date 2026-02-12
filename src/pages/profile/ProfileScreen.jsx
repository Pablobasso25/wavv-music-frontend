import React, { useRef, useState } from "react";
import { Container, Row, Col, Card, Image, Button, Form } from "react-bootstrap";
import { Mail, Calendar, Edit2, Camera, Lock, User } from "lucide-react";
import useUserProfile from "./UserProfile";

function ProfileScreen() {
  const fileRef = useRef(null);

  const { user, handleUpdate, handlePasswordChange, updateAvatar } =
    useUserProfile();

  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({
    name: "",
    bio: "",
  });

  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const startEdit = (field) => {
    setEditing(field);

    if (field === "name") setDraft((draft) => ({ ...draft, name: user.name || "" }));
    if (field === "bio") setDraft((draft) => ({ ...draft, bio: user.bio || "" }));

    if (field === "password") {
      setPassword({ current: "", next: "", confirm: "" });
      setPasswordError("");
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setPasswordError("");
  };

  const saveName = () => {
    const value = (draft.name || "").trim();
    if (!value) return;
    handleUpdate({ name: value });
    setEditing(null);
  };

  const saveBio = () => {
    const value = (draft.bio || "").trim();
    if (value.length > 250) return;
    handleUpdate({ bio: value });
    setEditing(null);
  };

  const savePassword = () => {
    setPasswordError("");

    if (!password.current || !password.next || !password.confirm)
      return setPasswordError("Completá todos los campos.");
    if (password.current !== user.password)
      return setPasswordError("La contraseña actual es incorrecta.");
    if (password.next !== password.confirm)
      return setPasswordError("La confirmación no coincide.");
    if (password.next === password.current)
      return setPasswordError("La nueva contraseña no puede ser igual a la actual.");

    handlePasswordChange(password.next);
    setEditing(null);
  };

  const gradientBtn = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
  };
}
return (
    <div
      className="min-vh-100 py-5"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      <Container className="px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}></Col>
          
      </Row>
    </Container>
  </div>
);
