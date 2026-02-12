import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
} from "react-bootstrap";
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

  const [pwd, setPwd] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [pwdError, setPwdError] = useState("");

  const startEdit = (field) => {
    setEditing(field);

    if (field === "name") setDraft((d) => ({ ...d, name: user.name || "" }));
    if (field === "bio") setDraft((d) => ({ ...d, bio: user.bio || "" }));

    if (field === "password") {
      setPwd({ current: "", next: "", confirm: "" });
      setPwdError("");
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setPwdError("");
  };

  const saveName = () => {
    const v = (draft.name || "").trim();
    if (!v) return;
    handleUpdate({ name: v });
    setEditing(null);
  };

  const saveBio = () => {
    const v = (draft.bio || "").trim();
    if (v.length > 250) return;
    handleUpdate({ bio: v });
    setEditing(null);
  };

  const savePassword = () => {
    setPwdError("");

    if (!pwd.current || !pwd.next || !pwd.confirm)
      return setPwdError("Completá todos los campos.");
    if (pwd.current !== user.password)
      return setPwdError("La contraseña actual es incorrecta.");
    if (pwd.next.length < 8)
      return setPwdError(
        "La nueva contraseña debe tener al menos 8 caracteres.",
      );
    if (pwd.next !== pwd.confirm)
      return setPwdError("La confirmación no coincide.");
    if (pwd.next === pwd.current)
      return setPwdError("La nueva contraseña no puede ser igual a la actual.");

    handlePasswordChange(pwd.next);
    setEditing(null);
  };

  const gradientBtn = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
  };

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
          <Col lg={10} xl={8}>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen;