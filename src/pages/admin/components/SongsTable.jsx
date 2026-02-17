import React, { useState } from "react";
import { Table, Image, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const SongsTable = ({ songs, setSongs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteSong = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará de la lista global",
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
        const filteredSongs = songs.filter((s) => s._id !== id);
        setSongs(filteredSongs);
        localStorage.setItem("songs", JSON.stringify(filteredSongs));
        Swal.fire({
          title: "Eliminado",
          text: "La canción ha sido eliminada.",
          icon: "success",
          background: "#1a1a1a",
          color: "#fff",
        });
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
            <tr className="text-secondary text-uppercase small" style={{ letterSpacing: "1px" }}>
              <th className="py-3 ps-4" style={{ width: "80px" }}>Portada</th>
              <th className="py-3">Título</th>
              <th className="py-3">Artista</th>
              <th className="py-3">Álbum</th>
              <th className="py-3">Duración</th>
              <th className="py-3 pe-4 text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentSongs.map((song) => (
              <tr key={song._id} style={{ borderBottom: "1px solid #2d2d2d" }}>
                <td className="ps-4 py-3">
                  <Image
                    src={song.cover || "https://via.placeholder.com/40"}
                    rounded
                    width={48}
                    height={48}
                    className="shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td className="fw-bold text-white">{song.title || song.name}</td>
                <td className="text-white-50">{song.artist}</td>
                <td className="text-white-50">{song.album}</td>
                <td className="text-white-50">{song.duration || "--:--"}</td>
                <td className="text-end pe-4">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-circle d-flex align-items-center justify-content-center ms-auto"
                    style={{ width: "32px", height: "32px" }}
                    onClick={() => deleteSong(song._id)}
                  >
                    <i className="bi bi-trash-fill" style={{ fontSize: "0.8rem" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default SongsTable;