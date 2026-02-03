import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Mail, Calendar, Edit2, Camera, Lock, User } from "lucide-react";

function ProfileScreen() {
  const userData = {
    name: "Tomas Gomez",
    username: "Tomas123",
    email: "Tomas@wavvmusic.com",
    joinDate: "22-01-2026",
    bio: "Me gusta la musica desde que tengo uso de razon. Wavv Music me permite descubrir nuevos artistas y compartir mis playlists con amigos.",
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
                borderRadius: "20px"
              }}
            >
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center">
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <div className="position-relative d-inline-block">
                      <Image
                        src="https://images.pexels.com/photos/2599136/pexels-photo-2599136.jpeg"
                        alt="Profile"
                        roundedCircle
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
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "3px solid #1a1a2e",
                        }}
                      >
                        <Camera size={20} color="white" />
                      </Button>
                    </div>
                  </Col>
                  <Col md={8}>
                    <h3 className="mb-3 text-white">{userData.username}</h3>               
                    <div className="d-flex align-items-start justify-content-between">
                      <p
                        className="text-light mb-4 flex-fill"
                        style={{ lineHeight: "1.6" }}
                      >
                        {userData.bio}
                      </p>
                      <Button
                        className="ms-3 p-2 rounded"
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none"
                        }}
                      >
                        <Edit2 size={18} color="white" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card
              className="border-0 shadow-lg"
              style={{
                background: "rgba(26, 26, 46, 0.8)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px"
              }}
            >
              <Card.Body className="p-4 p-md-5">
                <h4 className="text-white mb-4 fs-4 fw-bold">
                  Información Personal
                </h4>
                <div className="mb-4 p-3 rounded" style={{background: "rgba(15,52,96,0.3)"}}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center flex-fill">
                      <div className="me-3 d-flex align-items-center justify-content-center rounded" style={{
                        width: "48px",
                        height: "48px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      }}>
                        <User size={24} color="white" />
                      </div>
                      <div>
                        <small className="text-white">Nombre:</small>
                        <p className="text-white fw-medium mb-0">
                          {userData.name}
                        </p>
                      </div>
                    </div>
                    <Button variant="link" className="p-2">
                      <Edit2 size={18} color="#8b8ba0" />
                    </Button>
                  </div>
                </div>
                <div className="mb-4 p-3 rounded" style={{background: "rgba(15,52,96,0.3)"}}>
                  <div className="d-flex align-items-center">
                    <div className="me-3 d-flex align-items-center justify-content-center rounded" style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    }}>
                      <Mail size={24} color="white" />
                    </div>
                    <div>
                      <small className="text-white">Email:</small>
                      <p className="text-white fw-medium mb-0">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4 p-3 rounded" style={{background: "rgba(15,52,96,0.3)"}}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center flex-fill">
                      <div className="me-3 d-flex align-items-center justify-content-center rounded" style={{
                        width: "48px",
                        height: "48px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      }}>
                        <Lock size={24} color="white" />
                      </div>
                      <div>
                        <small className="text-white">Contraseña:</small>
                        <p className="text-white fw-medium mb-0">••••••••</p>
                      </div>
                    </div>
                    <Button variant="link" className="p-2">
                      <Edit2 size={18} color="#8b8ba0" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 rounded" style={{background: "rgba(15,52,96,0.3)"}}>
                  <div className="d-flex align-items-center">
                    <div className="me-3 d-flex align-items-center justify-content-center rounded" style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    }}>
                      <Calendar size={24} color="white" />
                    </div>
                    <div>
                      <small className="text-white">Miembro desde:</small>
                      <p className="text-white fw-medium mb-0">
                        {userData.joinDate}
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
