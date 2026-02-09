import React, { createContext, useContext, useState, useRef, useEffect } from "react";
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

export const useMusicPlayer = () => useContext(MusicPlayerContext);