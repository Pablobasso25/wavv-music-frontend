import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AdminForm from "../../../components/AdminForm";
import UserTable from "./UserTable";

const UsersSection = ({ users, setUsers }) => {

  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password || "",
    });
  };


  const handleDeleteUser = (userId) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) {
      return;
    }

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event("storage"));
    alert("✅ Usuario eliminado correctamente.");
  };

  const handleSaveUser = () => {
    setEditingUser(null);
  };

  return (
    <Row className="mb-5">
      <Col md={5}>
        <AdminForm type="user" editData={editingUser} onSave={handleSaveUser} />
      </Col>
      <Col md={7}>
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </Col>
    </Row>
  );
};

export default UsersSection;