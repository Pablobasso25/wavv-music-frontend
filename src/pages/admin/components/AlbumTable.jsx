import React from "react";
import { Table, Button } from "react-bootstrap";

const AlbumTable = ({ albums, onDelete }) => {
  return (
    <>
      <h4 className="text-white mb-3">Álbumes guardados</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Artista</th>
            <th>Fecha</th>
            <th>Tracks</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {albums.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-secondary">
                No hay álbumes guardados. Buscá un artista para comenzar.
              </td>
            </tr>
          ) : (
            albums.map((album) => (
              <tr key={album.id}>
                <td>{album.name}</td>
                <td>{album.artists?.[0]?.name || "N/A"}</td>
                <td>{album.release_date}</td>
                <td>{album.total_tracks}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(album.id)}
                    title="Eliminar álbum"
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default AlbumTable;
