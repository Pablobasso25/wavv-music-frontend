import React, { useState } from "react";
import { Table, Image, Button } from "react-bootstrap";
import { deleteAlbumRequest } from "../../../api/songs";
import Swal from "sweetalert2";

const ArtistsTable = ({ artists, setArtists }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteArtist = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el artista de la lista",
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
          await deleteAlbumRequest(id);
          const filteredArtists = artists.filter((a) => a._id !== id);
        setArtists(filteredArtists);
        Swal.fire({
          title: "Eliminado",
          text: "El artista ha sido eliminado.",
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
        });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el artista",
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
  const currentArtists = artists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(artists.length / itemsPerPage);

  return (
    <>
      <div className="table-responsive">
        <Table hover variant="dark" className="align-middle mb-0">
          <thead className="bg-black">
            <tr className="text-secondary text-uppercase small" style={{ letterSpacing: "1px" }}>
              <th className="py-3 ps-4" style={{ width: "80px" }}>Foto</th>
              <th className="py-3">Nombre</th>
              <th className="py-3">Álbum</th>
              <th className="py-3 pe-4 text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentArtists.map((artist) => (
              <tr key={artist.id} style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td className="ps-4 py-3">
                  <Image
                    src={artist.image || "https://via.placeholder.com/40"}
                    roundedCircle
                    width={48}
                    height={48}
                    className="shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td className="fw-bold text-white">{artist.name || artist.artistName}</td>
                <td className="text-white-50">{artist.album?.name || artist.name || "-"}</td>
                <td className="text-end pe-4">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-circle d-flex align-items-center justify-content-center ms-auto"
                    style={{ width: "32px", height: "32px" }}
                    onClick={() => deleteArtist(artist._id || artist.id)}
                  >
                    <i className="bi bi-trash-fill" style={{ fontSize: "0.8rem" }}></i>
                  </Button>
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
          <span className="text-white mx-2 small">{currentPage} de {totalPages}</span>
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

export default ArtistsTable;