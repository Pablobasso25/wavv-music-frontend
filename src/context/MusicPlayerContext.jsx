import React, { createContext, useContext, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import successSound from "../assets/sounds/success.mp3";
import errorSound from "../assets/sounds/error.mp3";
import warningSound from "../assets/sounds/warning.mp3";
import publicidad from "../assets/images/publicidad.png";
import { showPremiumAlert2 } from "../helpers/alerts";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio());
  const [adsCounter, setAdsCounter] = useState(0);
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  const playUISound = (type) => {
    if (isPlaying) return;

    let soundPath;
    switch (type) {
      case "success":
        soundPath = successSound;
        break;
      case "error":
        soundPath = errorSound;
        break;
      case "warning":
        soundPath = warningSound;
        break;
      default:
        return;
    }

    const audio = new Audio(soundPath);
    audio.volume = 0.3;
    audio
      .play()
      .catch((e) => console.log("Audio play bloqueado o interrumpido"));
  };

  const executeActionWithAd = (callback) => {
    
    if (user?.subscription?.status === "premium") {
      callback();
      return;
    }
     if (adsCounter >= 3) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      setIsAdPlaying(true);
      playUISound("warning");
      showPremiumAlert2(publicidad).then((result) => {
        setIsAdPlaying(false);
        if (result.isConfirmed) {
          navigate("/subscription");
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
        setIsPlaying,
        playUISound,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
