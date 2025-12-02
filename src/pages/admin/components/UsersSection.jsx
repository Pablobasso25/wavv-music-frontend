import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AdminForm from "../AdminForm";
import UserTable from "./UserTable";
import { showError, showConfirm, toastSuccess } from "../../../helpers/alerts";

const UsersSection = ({ users, setUsers }) => {
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    if (user.email === "admin@wavvmusic.com") {
      showError(
        "No puedes editar el usuario administrador.",
        "Acción no permitida"
      );
      return;
    }

    setEditingUser({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password || "",
    });
  };

  const handleDeleteUser = async (userId) => {
    const userToDelete = users.find((user) => user.id === userId);
    if (userToDelete && userToDelete.email === "admin@wavvmusic.com") {
      showError(
        "No puedes eliminar el usuario administrador.",
        "Acción no permitida"
      );
      return;
    }

    const result = await showConfirm(
      "Esta acción no se puede deshacer.",
      "¿Estás seguro de eliminar este usuario?"
    );

    if (!result.isConfirmed) {
      return;
    }

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event("storage"));
    toastSuccess("Usuario eliminado correctamente");
  };

  const handleSaveUser = () => {
    setEditingUser(null);
  };

  return (
    <div className="mb-5">
      <h2 className="text-white mb-4">Gestión de Usuarios</h2>
      <Row className="mb-5">
        <Col md={5}>
          <AdminForm
            type="user"
            editData={editingUser}
            onSave={handleSaveUser}
          />
        </Col>
        <Col md={7}>
          <UserTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UsersSection;
