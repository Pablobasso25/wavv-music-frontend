import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

const AdminForm = ({ type = "user", editData = null, onSave = null }) => {
  const isUser = type === "user";
  const isEditing = editData !== null;

 
  const [formData, setFormData] = useState(
    isUser
      ? { username: "", email: "", password: "" }
      : { title: "", artist: "", url: "", cover: "", plays: "" }
  );


  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando formulario...", formData);
  };

  return (
    <Card className="mb-4 bg-dark text-white border-secondary">
      <Card.Body>
        <h4>
          {isUser
            ? isEditing
              ? "Editar usuario"
              : "Agregar nuevo usuario"
            : isEditing
            ? "Editar canción"
            : "Agregar nueva canción"}
        </h4>
        <Form onSubmit={handleSubmit}>
          {isUser ? (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                {isEditing ? "Guardar cambios" : "Agregar usuario"}
              </Button>
              {isEditing && (
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => onSave && onSave()}
                >
                  Cancelar
                </Button>
              )}
            </>
          ) : (
            <>
          <Form.Group className="mb-2">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Artista</Form.Label>
                <Form.Control
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>URL del audio</Form.Label>
                <Form.Control
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com/song.mp3"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>URL de portada (opcional)</Form.Label>
                <Form.Control
                  type="url"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reproducciones (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="plays"
                  value={formData.plays}
                  onChange={handleChange}
                  placeholder="Ej: 5 Million Plays"
                />
              </Form.Group>
              <Button type="submit" variant="success">
                {isEditing ? "Guardar cambios" : "Agregar canción"}
              </Button>
              {isEditing && (
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => onSave && onSave()}
                >
                  Cancelar
                </Button>
              )}
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdminForm;