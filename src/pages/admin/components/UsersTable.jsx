import React, { useState } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import {
  deactivateUserRequest,
  activateUserRequest,
  deleteUserRequest,
  updateUserRequest,
} from "../../../api/songs";
import Swal from "sweetalert2";
import { showEditUserModal } from "../../../helpers/alerts";

const UsersTable = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEditUser = async (user) => {
    const result = await showEditUserModal(user);

    if (result.isConfirmed) {
      try {
        await updateUserRequest(user._id, result.value);
        const updatedUsers = users.map((u) =>
          u._id === user._id
            ? {
                ...u,
                username: result.value.username,
                email: result.value.email,
                subscription: {
                  ...u.subscription,
                  status: result.value.subscriptionStatus,
                },
              }
            : u,
        );
        setUsers(updatedUsers);
        Swal.fire({
          title: "Actualizado",
          text: "Usuario actualizado correctamente",
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "No se pudo actualizar el usuario";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          background: "#1a1a1a",
          color: "#fff",
        });
      }
    }
  };

  const permanentDeleteUser = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará permanentemente al usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUserRequest(id);
          const filteredUsers = users.filter((u) => u._id !== id);
          setUsers(filteredUsers);
          Swal.fire({
            title: "Eliminado",
            text: "Usuario eliminado permanentemente",
            icon: "success",
            background: "#1a1a1a",
            color: "#fff",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el usuario",
            icon: "error",
            background: "#1a1a1a",
            color: "#fff",
          });
        }
      }
    });
  };

  const activateUser = async (id) => {
    try {
      await activateUserRequest(id);
      const updatedUsers = users.map((u) =>
        u._id === id ? { ...u, isActive: true } : u,
      );
      setUsers(updatedUsers);
      Swal.fire({
        title: "Activado",
        text: "El usuario ha sido dado de alta.",
        icon: "success",
        background: "#1a1a1a",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo dar de alta al usuario",
        icon: "error",
        background: "#1a1a1a",
        color: "#fff",
      });
    }
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El usuario será dado de baja",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, dar de baja",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deactivateUserRequest(id);
          const updatedUsers = users.map((u) =>
            u._id === id ? { ...u, isActive: false } : u,
          );
          setUsers(updatedUsers);
          Swal.fire({
            title: "Dado de baja",
            text: "El usuario ha sido dado de baja.",
            icon: "success",
            background: "#1a1a1a",
            color: "#fff",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo dar de baja al usuario",
            icon: "error",
            background: "#1a1a1a",
            color: "#fff",
          });
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <>
      <div className="table-responsive">
        <Table hover variant="dark" className="align-middle mb-0">
          <thead className="bg-black">
            <tr
              className="text-secondary text-uppercase small"
              style={{ letterSpacing: "1px" }}
            >
              <th className="py-3 ps-4">Usuario</th>
              <th className="py-3">Email</th>
              <th className="py-3">Registro</th>
              <th className="py-3">Rol</th>
              <th className="py-3">Plan</th>
              <th className="py-3">Clave</th>
              <th className="py-3 pe-4 text-end">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-3 text-white fw-bold"
                      style={{
                        width: "40px",
                        height: "40px",
                        fontSize: "1.2rem",
                      }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-bold text-white">{user.username}</div>
                      {user.isActive === false && (
                        <Badge bg="danger" style={{ fontSize: "0.65em" }}>
                          INACTIVO
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>

                <td className="text-white-50">{user.email}</td>

                <td className="text-white-50">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <Badge
                    bg={user.role === "admin" ? "warning" : "dark"}
                    text={user.role === "admin" ? "dark" : "light"}
                    className="border border-secondary px-3 py-2 rounded-pill"
                  >
                    {user.role.toUpperCase()}
                  </Badge>
                </td>

                <td>
                  <Badge
                    bg={
                      user.subscription?.status === "premium"
                        ? "info"
                        : "secondary"
                    }
                    className="px-3 py-2 rounded-pill"
                  >
                    {user.subscription?.status === "premium"
                      ? "PREMIUM"
                      : "FREE"}
                  </Badge>
                </td>

                <td
                  className="text-white-50 font-monospace"
                  style={{ letterSpacing: "2px" }}
                >
                  ••••••••
                </td>

                <td className="text-end pe-4">
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => handleEditUser(user)}
                      disabled={user.role === "admin"}
                      title="Editar"
                      type="button"
                    >
                      <i
                        className="bi bi-pencil-fill"
                        style={{ fontSize: "0.8rem" }}
                      ></i>
                    </Button>

                    {user.isActive === false ? (
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                        onClick={() => activateUser(user._id)}
                        disabled={user.role === "admin"}
                        title="Dar de alta"
                        type="button"
                      >
                        <i
                          className="bi bi-check-lg"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                      </Button>
                    ) : (
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                        onClick={() => deleteUser(user._id)}
                        disabled={user.role === "admin"}
                        title="Dar de baja"
                        type="button"
                      >
                        <i
                          className="bi bi-slash-circle"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                      </Button>
                    )}

                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => permanentDeleteUser(user._id)}
                      disabled={user.role === "admin"}
                      title="Eliminar permanentemente"
                      type="button"
                    >
                      <i
                        className="bi bi-trash-fill"
                        style={{ fontSize: "0.8rem" }}
                      ></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {totalPages > 0 && (
        <div className="d-flex justify-content-center align-items-center gap-2 p-3 border-top border-secondary">
          <button
            className="btn btn-dark btn-sm border-secondary text-white"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            type="button"
          >
            <i
              className="bi bi-chevron-left"
              style={{ pointerEvents: "none" }}
            ></i>
          </button>

          <span className="text-white mx-2 small">
            {currentPage} de {totalPages}
          </span>

          <button
            className="btn btn-dark btn-sm border-secondary text-white"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            type="button"
          >
            <i
              className="bi bi-chevron-right"
              style={{ pointerEvents: "none" }}
            ></i>
          </button>
        </div>
      )}
    </>
  );
};

export default UsersTable;