import axios from "./axios";

export const getSongsRequest = () => axios.get("/songs");
export const createSongRequest = (song) => axios.post("/songs", song);
export const deleteSongRequest = (id) => axios.delete(`/songs/${id}`);
export const getSongRequest = (id) => axios.get(`/songs/${id}`);
export const searchExternalSongsRequest = (term) =>
  axios.get(`/search-external?search=${term}`);
export const addSongToPlaylistRequest = (songId) =>
  axios.post("/playlist/add", { songId });
export const getPlaylistRequest = () => axios.get("/playlist");
export const getUserPlaylistRequest = () => axios.get("/playlist");
export const removeSongFromPlaylistRequest = (songId) => axios.delete(`/playlist/${songId}`);