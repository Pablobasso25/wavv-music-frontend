import { Card, Table, Button } from "react-bootstrap";

const SongTable = ({ songs, onEdit, onDelete }) => {
    return (
        <Card className="bg-dark text-white border-secondary h-100">
            <Card.Body>
                <h4 className="mb-3">Canciones guardadas</h4>

                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <Table striped bordered hover variant="dark" className="mb-0">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Artista</th>
                                <th>Reproducciones</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-secondary">
                                        No hay canciones guardadas. Agregá una canción para
                                        comenzar.
                                    </td>
                                </tr>
                            ) : (
                                songs.map((song) => (
                                    <tr key={song.id}>
                                        <td>{song.title}</td>
                                        <td>{song.artist}</td>
                                        <td>{song.plays}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => onEdit(song)}
                                                title="Editar canción"
                                            >
                                                ✏️
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => onDelete(song.id)}
                                                title="Eliminar canción"
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

export default SongTable;