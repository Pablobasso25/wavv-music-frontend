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
          <Card
              className="border-0 shadow-lg mb-4"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
                borderRadius: "20px",
              }}
            >
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center">
                  <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                    <div className="position-relative d-inline-block">
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) updateAvatar(file);
                          e.target.value = "";
                        }}
                      />

                      <Image
                        src={
                          user.avatarUrl ||
                          "https://images.pexels.com/photos/2599136/pexels-photo-2599136.jpeg"
                        }
                        alt="Profile"
                        roundedCircle
                        className="img-fluid"
                        style={{
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                          border: "4px solid #6c5ce7",
                          boxShadow: "0 8px 32px rgba(108, 92, 231, 0.3)",
                        }}
                      />

                      <Button
                        className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          ...gradientBtn,
                          border: "3px solid #1a1a2e",
                        }}
                        onClick={() => fileRef.current?.click()}
                        title="Cambiar foto"
                      >
                        <Camera size={20} color="white" />
                      </Button>
                    </div>
                  </Col>

                  <Col xs={12} md={8}>
                    <h3 className="mb-3 text-info-emphasis fw-semibold fs-3">
                      {user.username || "Sin username"}
                    </h3>

                    <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between">
                      <div className="flex-fill">
                        {editing === "bio" ? (
                          <>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              value={draft.bio}
                              onChange={(e) =>
                                setDraft((d) => ({ ...d, bio: e.target.value }))
                              }
                            />
                            <div className="d-flex gap-2 justify-content-end mt-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={cancelEdit}
                              >
                                Cancelar
                              </Button>
                              <Button
                                size="sm"
                                style={gradientBtn}
                                onClick={saveBio}
                              >
                                Guardar
                              </Button>
                            </div>
                            <small className="text-white-50">
                              Máximo 250 caracteres.
                            </small>
                          </>
                        ) : (
                          <p
                            className="text-light mb-4"
                            style={{ lineHeight: "1.6" }}
                          >
                            {user.bio || "Sin biografía..."}
                          </p>
                        )}
                      </div>

                      <Button
                        className="ms-sm-3 p-2 rounded align-self-end align-self-sm-start"
                        style={gradientBtn}
                        onClick={() => startEdit("bio")}
                        title="Editar biografía"
                      >
                        <Edit2 size={18} color="white" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>









          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen;