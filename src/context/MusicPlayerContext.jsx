/* import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipsCount, setSkipsCount] = useState(0); 
  const audioRef = useRef(new Audio());

  const playSong = (song, songList = []) => {
    if (songList.length > 0) {
      setQueue(songList);
      const index = songList.findIndex(s => s.title === song.title);
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      setQueue([song]);
      setCurrentIndex(0);
    }

    setCurrentSong(song);
    audioRef.current.src = song.audio || song.youtubeUrl || song.preview_url;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (user?.subscription?.status === "free" && skipsCount >= 3) {
      toast.info("¡Límite de saltos alcanzado! Pasate a Premium.");
      return;
    }

    if (currentIndex < queue.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSkipsCount(prev => prev + 1);
      const nextSong = queue[nextIdx];
      setCurrentSong(nextSong);
      audioRef.current.src = nextSong.audio || nextSong.youtubeUrl || nextSong.preview_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevSong = queue[prevIdx];
      setCurrentSong(prevSong);
      audioRef.current.src = prevSong.audio || prevSong.youtubeUrl || prevSong.preview_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        nextTrack,
        prevTrack,
        audioRef,
        queue
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext); */

/* import React, { createContext, useContext, useState, useRef } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio());

  const playSong = (song, songList = []) => {
    if (songList.length > 0) {
      setQueue(songList);
      // Buscamos por ID o Título para ser más precisos
      const index = songList.findIndex(s => s._id === song._id || s.title === song.title);
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      setQueue([song]);
      setCurrentIndex(0);
    }

    setCurrentSong(song);
    audioRef.current.src = song.audio || song.youtubeUrl || song.preview_url;
    audioRef.current.play().catch(error => console.log("Error al reproducir:", error));
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    // YA NO HAY VALIDACIÓN DE USUARIO AQUÍ (Lo hace el componente visual)
    if (queue.length > 0) {
      // Lógica simple: avanzar índice
      let nextIdx = currentIndex + 1;
      if (nextIdx >= queue.length) nextIdx = 0; // Loop al principio si termina

      setCurrentIndex(nextIdx);
      const nextSong = queue[nextIdx];
      
      if (nextSong) {
        setCurrentSong(nextSong);
        audioRef.current.src = nextSong.audio || nextSong.youtubeUrl || nextSong.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const prevTrack = () => {
    if (queue.length > 0) {
      let prevIdx = currentIndex - 1;
      if (prevIdx < 0) prevIdx = queue.length - 1; // Loop al final si retrocede

      setCurrentIndex(prevIdx);
      const prevSong = queue[prevIdx];
      
      if (prevSong) {
        setCurrentSong(prevSong);
        audioRef.current.src = prevSong.audio || prevSong.youtubeUrl || prevSong.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        nextTrack,
        prevTrack,
        audioRef,
        queue
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext); */

/* import React, { createContext, useContext, useState, useRef } from "react";
import { useAuth } from "./AuthContext"; // Para verificar si es Premium
import Swal from "sweetalert2"; // Para la alerta global

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio());

  // --- CONTADOR GLOBAL DE ADS ---
  const [adsCounter, setAdsCounter] = useState(0);

  // --- FUNCIÓN CENTRAL DE PROTECCIÓN (INTERCEPTOR) ---
  // Esta función recibe la acción que quieres hacer (dar play, siguiente, anterior)
  // y decide si te deja pasar o te muestra publicidad.
  const executeActionWithAd = (callback) => {
    // 1. Si es Premium, pase VIP
    if (user?.subscription?.status === "premium") {
      callback();
      return;
    }

    // 2. Si es Free y llegó al límite (3 interacciones)
    if (adsCounter >= 3) {
      // Pausamos la música si estaba sonando
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);

      Swal.fire({
        title: "¡Publicidad!",
        text: "Escuchaste 3 canciones. Pásate a Premium para escuchar sin límites.",
        imageUrl: "https://media.giphy.com/media/l41lFw057lAJQM50I/giphy.gif",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Music Ad",
        timer: 5000, // 5 segundos
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: "Ver Planes",
        confirmButtonColor: "#8b5cf6",
        showCancelButton: true,
        cancelButtonText: "Esperar...",
        background: "#111",
        color: "#fff",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirección forzada a suscripción
          window.location.href = "/subscription";
        } else {
          // Si esperó los 5 seg, reiniciamos contador y ejecutamos la acción
          setAdsCounter(0);
          callback();
        }
      });
    } else {
      // Si no ha llegado al límite, sumamos 1 y ejecutamos
      setAdsCounter((prev) => prev + 1);
      callback();
    }
  };

  const playSong = (song, songList = []) => {
    if (songList.length > 0) {
      setQueue(songList);
      const index = songList.findIndex((s) => s._id === song._id || s.title === song.title);
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      if (queue.length === 0) {
        setQueue([song]);
        setCurrentIndex(0);
      }
    }

    setCurrentSong(song);
    audioRef.current.src = song.audio || song.youtubeUrl || song.preview_url;
    audioRef.current.play().catch((e) => console.log("Error play:", e));
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      let nextIdx = currentIndex + 1;
      if (nextIdx >= queue.length) nextIdx = 0;

      setCurrentIndex(nextIdx);
      const nextSong = queue[nextIdx];

      if (nextSong) {
        setCurrentSong(nextSong);
        audioRef.current.src = nextSong.audio || nextSong.youtubeUrl || nextSong.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const prevTrack = () => {
    if (queue.length > 0) {
      let prevIdx = currentIndex - 1;
      if (prevIdx < 0) prevIdx = queue.length - 1;

      setCurrentIndex(prevIdx);
      const prevSong = queue[prevIdx];

      if (prevSong) {
        setCurrentSong(prevSong);
        audioRef.current.src = prevSong.audio || prevSong.youtubeUrl || prevSong.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        nextTrack,
        prevTrack,
        audioRef,
        queue,
        executeActionWithAd, // <--- EXPORTAMOS LA PROTECCIÓN
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext); */

import React, { createContext, useContext, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio());

  const [adsCounter, setAdsCounter] = useState(0);

  // --- NUEVO ESTADO DE BLOQUEO ---
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  const executeActionWithAd = (callback) => {
    if (user?.subscription?.status === "premium") {
      callback();
      return;
    }

    if (adsCounter >= 3) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);

      // 1. ACTIVAMOS EL BLOQUEO
      setIsAdPlaying(true);

      Swal.fire({
        title: "¡Publicidad!",
        text: "Limite de canciones alcanzado. Pásate a Premium para escuchar sin límites.",
        imageUrl: "https://media.giphy.com/media/l41lFw057lAJQM50I/giphy.gif",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Music Ad",
        timer: 7000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: "Ver Planes",
        confirmButtonColor: "#8b5cf6",
        background: "#111",
        color: "#fff",
        allowOutsideClick: false,
        allowEscapeKey: false,
        // Forzamos que el z-index de la alerta sea superior al del player
        didOpen: () => {
          const swalContainer = document.querySelector(".swal2-container");
          if (swalContainer) swalContainer.style.zIndex = "20000";
        },
      }).then((result) => {
        // 2. DESACTIVAMOS EL BLOQUEO AL TERMINAR
        setIsAdPlaying(false);

        if (result.isConfirmed) {
          window.location.href = "/subscription";
        } else {
          setAdsCounter(0);
          callback();
        }
      });
    } else {
      setAdsCounter((prev) => prev + 1);
      callback();
    }
  };

  const playSong = (song, songList = []) => {
    if (songList.length > 0) {
      setQueue(songList);
      const index = songList.findIndex(
        (s) => s._id === song._id || s.title === song.title,
      );
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      if (queue.length === 0) {
        setQueue([song]);
        setCurrentIndex(0);
      }
    }
    setCurrentSong(song);
    audioRef.current.src = song.audio || song.youtubeUrl || song.preview_url;
    audioRef.current.play().catch((e) => console.log("Error play:", e));
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      let nextIdx = currentIndex + 1;
      if (nextIdx >= queue.length) nextIdx = 0;
      setCurrentIndex(nextIdx);
      const nextSong = queue[nextIdx];
      if (nextSong) {
        setCurrentSong(nextSong);
        audioRef.current.src =
          nextSong.audio || nextSong.youtubeUrl || nextSong.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const prevTrack = () => {
    if (queue.length > 0) {
      let prevIdx = currentIndex - 1;
      if (prevIdx < 0) prevIdx = queue.length - 1;
      setCurrentIndex(prevIdx);
      const prevSong = queue[prevIdx];
      if (prevSong) {
        setCurrentSong(prevSong);
        audioRef.current.src =
          prevSong.audio || prevSong.youtubeUrl || prevSong.preview_url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlay,
        nextTrack,
        prevTrack,
        audioRef,
        queue,
        executeActionWithAd,
        isAdPlaying, // <--- EXPORTAMOS EL ESTADO DE BLOQUEO
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
