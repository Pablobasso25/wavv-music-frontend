import React, { createContext, useContext, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";
import publicidad from "../assets/images/publicidad.png";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio());
  const [adsCounter, setAdsCounter] = useState(0);
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  const executeActionWithAd = (callback) => {
    if (user?.subscription?.status === "premium") {
      callback();
      return;
    }

    if (adsCounter >= 3) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      setIsAdPlaying(true);

      Swal.fire({
        width: "450px",
        padding: "0",
        background: "#181818",
        html: `
      <div style="padding: 15px;">
        <img src="${publicidad} " style="width: 100%; border-radius: 15px; display: block;" />
      </div>

      <div style="padding: 0 20px 20px 20px; text-align: center; font-family: 'Circular', sans-serif;">
        <h2 style="color: #fff; font-size: 1.7rem; font-weight: 700; margin-bottom: 10px;">
          ¡Disfrutá sin límites!
        </h2>
        <p style="color: #b3b3b3; font-size: 0.95rem; line-height: 1.4; margin-bottom: 25px;">
          Llegaste al límite de la versión gratuita. Pasate a <span style="color: #a855f7; font-weight: bold;">Premium</span> para escuchar todas las canciones que quieras, sin interrupciones.
        </p>
      </div>
    `,
        showConfirmButton: true,
        confirmButtonText: "DESCUBRIR PREMIUM",
        confirmButtonColor: "#a855f7",
        showCancelButton: true,
        cancelButtonText: "Seguir con anuncios",
        cancelButtonColor: "transparent",
        timer: 10000,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
          popup: "my-swal-popup",
          confirmButton: "my-swal-confirm",
          cancelButton: "my-swal-cancel",
        },
        didOpen: () => {
          const container = Swal.getContainer();
          if (container) container.style.zIndex = "30000";

          const cancelBtn = Swal.getCancelButton();
          cancelBtn.style.textDecoration = "underline";
          cancelBtn.style.color = "#b3b3b3";
          cancelBtn.style.fontSize = "0.9rem";
        },
      }).then((result) => {
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
        isAdPlaying,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
