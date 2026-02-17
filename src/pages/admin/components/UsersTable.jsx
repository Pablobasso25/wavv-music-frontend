import React, { useState } from "react";
import { Table, Badge, Button } from "react-bootstrap";

const UsersTable = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers);
    localStorage.setItem("users", JSON.stringify(nextUsers));
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredUsers = users.filter((u) => u.id !== id);
        persistUsers(filteredUsers);
        Swal.fire({
          title: "Eliminado",
          text: "El usuario ha sido eliminado.",
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
        });
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
            <tr className="text-secondary text-uppercase small" style={{ letterSpacing: "1px" }}>
              <th className="py-3 ps-4">Usuario</th>
              <th className="py-3">Email</th>
              <th className="py-3">Registro</th>
              <th className="py-3">Rol</th>
              <th className="py-3">Plan</th>
              <th className="py-3">Pass</th>
              <th className="py-3 pe-4 text-end">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-3 text-white fw-bold"
                      style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-bold text-white">{user.username}</div>
                      {user.isSuspended && (
                        <Badge bg="danger" style={{ fontSize: "0.65em" }}>
                          SUSPENDIDO
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>

                <td className="text-white-50">{user.email}</td>

                <td className="text-white-50">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
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
                    bg={user.subscription?.status === "premium" ? "info" : "secondary"}
                    className="px-3 py-2 rounded-pill"
                  >
                    {user.subscription?.status === "premium" ? "PREMIUM" : "FREE"}
                  </Badge>
                </td>

                <td className="text-white-50 font-monospace" style={{ letterSpacing: "2px" }}>
                  ••••••••
                </td>

                <td className="text-end pe-4">
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Editar"
                      disabled
                      type="button"
                    >
                      <i className="bi bi-pencil-fill" style={{ fontSize: "0.8rem" }}></i>
                    </Button>

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Suspender"
                      disabled
                      type="button"
                    >
                      <i className="bi bi-slash-circle" style={{ fontSize: "0.9rem" }}></i>
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => deleteUser(user.id)}
                      disabled={user.role === "admin"}
                      title="Eliminar"
                      type="button"
                    >
                      <i className="bi bi-trash-fill" style={{ fontSize: "0.8rem" }}></i>
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
            <i className="bi bi-chevron-left" style={{ pointerEvents: "none" }}></i>
          </button>

          <span className="text-white mx-2 small">
            {currentPage} de {totalPages}
          </span>

          <button
            className="btn btn-dark btn-sm border-secondary text-white"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            type="button"
          >
            <i className="bi bi-chevron-right" style={{ pointerEvents: "none" }}></i>
          </button>
        </div>
      )}
    </>
  );
};

export default UsersTable;
