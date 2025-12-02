import React from "react";
import { Card, Table, Button } from "react-bootstrap";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <Card className="bg-dark text-white border-secondary h-100">
      <Card.Body>
        <h4 className="mb-3">Usuarios registrados</h4>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Table striped bordered hover variant="dark" className="mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-secondary">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => onEdit(user)}
                        title="Editar usuario"
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(user.id)}
                        title="Eliminar usuario"
                      >
                        ❌
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserTable;
