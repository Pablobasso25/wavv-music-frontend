import React, { useState } from "react";
import { Table, Image, Button } from "react-bootstrap";
import { deleteSongRequest } from "../../../api/songs";
import { PAGINATION, DEFAULT_AVATAR } from "../../../config/constants";
import { showConfirm, showSuccess, showError } from "../../../helpers/alerts";

const SongsTable = ({ songs, setSongs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = PAGINATION.ADMIN_TABLE_ITEMS;

  const deleteSong = async (id) => {
    showConfirm("Se eliminará de la base de datos").then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSongRequest(id);
          const filteredSongs = songs.filter((s) => s._id !== id);
          setSongs(filteredSongs);
          showSuccess("La canción ha sido eliminada.", "Eliminado");
        } catch (error) {
          showError("No se pudo eliminar la canción");
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSongs = songs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(songs.length / itemsPerPage);

  return (
    <>
      <div className="table-responsive">
        <Table hover variant="dark" className="align-middle mb-0">
          <thead className="bg-black">
            <tr
              className="text-secondary text-uppercase small"
              style={{ letterSpacing: "1px" }}
            >
              <th className="py-3 ps-4" style={{ width: "80px" }}>
                Portada
              </th>
              <th className="py-3">Título</th>
              <th className="py-3">Artista</th>
              <th className="py-3">Duración</th>
              <th className="py-3 pe-4 text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentSongs.map((song) => (
              <tr key={song._id} style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td className="ps-4 py-3">
                  <Image
                    src={song.image || DEFAULT_AVATAR}
                    rounded
                    width={48}
                    height={48}
                    className="shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td className="fw-bold text-white">{song.title}</td>
                <td className="text-white-50">{song.artist}</td>
                <td className="text-white-50">{song.duration || "--:--"}</td>
                <td className="text-end pe-4">
                  <div className="d-flex gap-2 justify-content-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      onClick={() => deleteSong(song._id)}
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

export default SongsTable;
