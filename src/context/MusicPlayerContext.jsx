import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { toastError } from "../helpers/alerts";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (shouldAutoPlay && currentSong && audioRef.current) {
      audioRef.current.load();

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error al reproducir:", error);
          toastError("No se pudo reproducir la canción. Intentá nuevamente.");
          setIsPlaying(false);
        });

      setShouldAutoPlay(false);
    }
  }, [shouldAutoPlay]);

  const playSong = (song) => {
    setCurrentSong(song);
    setProgress(0);
    setCurrentTime(0);
    setShouldAutoPlay(true);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      const seekTime = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(value);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        currentTime,
        duration,
        audioRef,
        playSong,
        togglePlay,
        handleTimeUpdate,
        handleSeek,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
