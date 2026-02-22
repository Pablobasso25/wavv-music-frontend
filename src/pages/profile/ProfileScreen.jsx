import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Button, Spinner } from 'react-bootstrap';
import { Mail, Calendar, Edit2, User, Save, X, Lock, Camera, Eye, EyeOff, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'; 
import './ProfileScreen.css';

function ProfileScreen() {
  const { user, updateProfile, loading, refreshUser } = useAuth();
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null); 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    avatar: "",
    password: ""
  });

  const passwordValidation = {
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSymbol: /[!@#$%^&*(),.?":{}|_/<>]/.test(formData.password)
  };
  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        avatar: user.avatar || defaultAvatar,
        password: ""
      });
    }
  }, [user]);
  const handleImageClick = () => {
    if (isEditing) fileInputRef.current.click();
  };
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setAvatarFile(file); 
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};
  const handleRemoveImage = () => {
    setAvatarFile(null);
    setFormData(prev => ({ ...prev, avatar: defaultAvatar }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const form = new FormData();
      form.append("username", formData.username);
      form.append("bio", formData.bio);
      if (formData.password) {
        form.append("password", formData.password);
      }
      if (avatarFile) { 
        form.append("avatar", avatarFile);
      }
      await updateProfile(form);
      setIsEditing(false);
      setFormData(prev => ({ ...prev, password: "" }));
      toast.success("Perfil actualizado correctamente", {
        theme: "dark",
        position: "top-right"
      });
    } catch (error) {
      console.error(error);
      const errors = error.response?.data;
      if (Array.isArray(errors)) {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          html: errors.map(err => `<p style="margin: 5px 0;">• ${err}</p>`).join(''),
          background: "#1a1a1a",
          color: "#f5f5f5",
          confirmButtonColor: "#5773ff"
        });
      } else {
        toast.error("Error al actualizar el perfil", {
          theme: "dark",
          position: "top-right"
        });
      }
    } finally {
      setIsSaving(false);
    }
  };
;
  const handleCancel = () => {
    setAvatarFile(null); 
    setFormData({
      username: user.username,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar || defaultAvatar,
      password: ""
    });
    setIsEditing(false);
    setShowPassword(false);
  };
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        <p>No se pudo cargar el perfil. Por favor, inicia sesión.</p>
      </div>
    );
  }
  return (
    <div className="min-vh-100 py-5" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)" }}>
      <Container className="px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="border-0 shadow-lg mb-4" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", borderRadius: "20px" }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center">
                  <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                    <div className="position-relative d-inline-block">
                      <Image
                        src={formData.avatar}
                        alt="Profile"
                        roundedCircle
                        className="img-fluid"
                        style={{
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                          border: "4px solid #6c5ce7",
                          boxShadow: "0 8px 32px rgba(108, 92, 231, 0.3)",
                          cursor: isEditing ? "pointer" : "default"
                        }}
                        onClick={handleImageClick}
                      />
                      {isEditing && (
                        <>
                          <div 
                            onClick={handleImageClick}
                            className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex align-items-center justify-content-center shadow"
                            style={{ width: "40px", height: "40px", cursor: "pointer", border: "2px solid #fff" }}
                          >
                            <Camera size={20} color="white" />
                          </div>
                          
                          <div 
                            onClick={handleRemoveImage}
                            className="position-absolute top-0 end-0 bg-danger rounded-circle d-flex align-items-center justify-content-center shadow"
                            style={{ width: "30px", height: "30px", cursor: "pointer", border: "2px solid #fff" }}
                          >
                            <X size={16} color="white" />
                          </div>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                          />
                        </>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} md={8}>
                    {isEditing ? (
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control text-light mb-3 fw-semibold fs-3"
                        style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #667eea" }}
                      />
                    ) : (
                      <h3 className="mb-3 text-info-emphasis fw-semibold fs-3">
                        {formData.username}
                      </h3>
                    )}
                    <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between">
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Cuéntanos algo sobre ti..."
                          className="form-control text-light mb-3 flex-fill bio-input"
                          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #667eea" }}
                          rows="3"
                        />
                      ) : (
                        <p className="text-light mb-4 flex-fill" style={{ lineHeight: "1.6" }}>
                          {formData.bio || "No hay biografía disponible."}
                        </p>
                      )}
                      <div className="d-flex gap-2 ms-sm-3 align-self-end align-self-sm-start">
                        {isEditing ? (
                          <>
                            <Button 
                              onClick={handleSave} 
                              disabled={isSaving}
                              className="p-2 rounded d-flex align-items-center justify-content-center" 
                              style={{ background: "#2ecc71", border: "none" }}
                            >
                              {isSaving ? <Spinner size="sm" /> : <Save size={18} color="white" />}
                            </Button>
                            <Button 
                              onClick={handleCancel} 
                              className="p-2 rounded d-flex align-items-center justify-content-center" 
                              style={{ background: "#e74c3c", border: "none" }}
                            >
                              <X size={18} color="white" />
                            </Button>
                          </>
                        ) : (
                          <Button 
                            onClick={() => setIsEditing(true)} 
                            className="p-2 rounded d-flex align-items-center justify-content-center" 
                            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }}
                          >
                            <Edit2 size={18} color="white" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="border-0 shadow-lg" style={{ background: "rgba(26, 26, 46, 0.8)", backdropFilter: "blur(10px)", borderRadius: "20px" }}>
              <Card.Body className="p-4 p-md-5">
                <h4 className="text-white mb-4 fs-4 fw-bold">Información Personal</h4>
                <div className="mb-4 p-3 rounded" style={{background: "rgba(15,52,96,0.3)"}}>
                  <div className="d-flex align-items-center">
                    <div className="me-3 d-flex align-items-center justify-content-center rounded flex-shrink-0" style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                      <Mail size={24} color="white" />
                    </div>
                    <div className="text-break">
                      <small className="text-white">Email:</small>
                      <p className="text-white fw-medium mb-0">{formData.email}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4 p-3 rounded" style={{background: "rgba(15,52,96,0.3)"}}>
                  <div className="d-flex align-items-center">
                    <div className="me-3 d-flex align-items-center justify-content-center rounded flex-shrink-0" style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                      <Lock size={24} color="white" />
                    </div>
                    <div className="flex-fill">
                      <small className="text-white">Contraseña:</small>
                      <div className="mt-1">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <div className="flex-grow-1 position-relative">
                            {isEditing ? (
                              <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Nueva contraseña (opcional)"
                                value={formData.password} 
                                onChange={handleChange} 
                                className="form-control form-control-sm text-light pe-5 password-input" 
                                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #667eea" }} 
                              />
                            ) : (
                              <p className="text-white fw-medium mb-0">
                                {showPassword ? "TuPassword123" : "••••••••"}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ms-2 border-0 bg-transparent d-flex align-items-center"
                            style={{ color: "#0dcaf0", transition: "opacity 0.2s" }}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {isEditing && formData.password && (
                          <div className="mt-2 p-2 rounded" style={{ background: "rgba(0,0,0,0.2)", fontSize: "0.75rem" }}>
                            <div className="d-flex align-items-center mb-1" style={{ color: passwordValidation.minLength ? "#2ecc71" : "#e74c3c" }}>
                              {passwordValidation.minLength ? "✅" : "❌"} Mínimo 8 caracteres
                            </div>
                            <div className="d-flex align-items-center mb-1" style={{ color: passwordValidation.hasUpperCase ? "#2ecc71" : "#e74c3c" }}>
                              {passwordValidation.hasUpperCase ? "✅" : "❌"} Al menos 1 mayúscula
                            </div>
                            <div className="d-flex align-items-center mb-1" style={{ color: passwordValidation.hasLowerCase ? "#2ecc71" : "#e74c3c" }}>
                              {passwordValidation.hasLowerCase ? "✅" : "❌"} Al menos 1 minúscula
                            </div>
                            <div className="d-flex align-items-center mb-1" style={{ color: passwordValidation.hasNumber ? "#2ecc71" : "#e74c3c" }}>
                              {passwordValidation.hasNumber ? "✅" : "❌"} Al menos 1 número
                            </div>
                            <div className="d-flex align-items-center" style={{ color: passwordValidation.hasSymbol ? "#2ecc71" : "#e74c3c" }}>
                              {passwordValidation.hasSymbol ? "✅" : "❌"} Al menos 1 símbolo (!@#$%^&*)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded" style={{background: "rgba(15,52,96,0.3)"}}>
                  <div className="d-flex align-items-center">
                    <div className="me-3 d-flex align-items-center justify-content-center rounded flex-shrink-0" style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                      <Calendar size={24} color="white" />
                    </div>
                    <div>
                      <small className="text-white">Miembro desde:</small>
                      <p className="text-white fw-medium mb-0">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen;