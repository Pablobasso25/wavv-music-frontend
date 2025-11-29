import { useState } from "react";
import ArtistasSidebar from "../../components/ArtistasSidebar";
import MusicPlayer from "../../components/MusicPlayer";
import { defaultAlbum } from "../../data/dataDefault";

const HomeScreen = () => {
    const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);

    return (
        <div className="d-flex">
            <ArtistasSidebar onAlbumSelect={setSelectedAlbum} />
            <div className="mx-auto">
                <h1>Contenido Principal Home</h1>
            </div>
            <MusicPlayer />
        </div>
    );
};

export default HomeScreen;