import axios from "./axios";

export const getSongsRequest = (page = 1, limit = 5, includeUser = false) => {
  let url = `/songs?page=${page}&limit=${limit}`;
  if (includeUser) url += `&includeUser=true`;
  return axios.get(url);
};
export const createSongRequest = (song) => axios.post("/songs", song);
export const deleteSongRequest = (id) => axios.delete(`/songs/${id}`);
export const getSongRequest = (id) => axios.get(`/songs/${id}`);
export const setTrendingSongRequest = (id) =>
  axios.put(`/songs/${id}/trending`);
export const searchExternalSongsRequest = (term) =>
  axios.get(`/search-external?search=${term}`);
export const addSongToPlaylistRequest = (songData) =>
  axios.post("/playlist/add", songData);
export const getPlaylistRequest = () => axios.get("/playlist");
export const getUserPlaylistRequest = (page = 1, limit = 5) =>
  axios.get(`/playlist?page=${page}&limit=${limit}`);
export const removeSongFromPlaylistRequest = (songId) =>
  axios.delete(`/playlist/${songId}`);
export const getAlbumsRequest = (page = 1, limit = 5) =>
  axios.get(`/albums?page=${page}&limit=${limit}`);
export const getAlbumByIdRequest = (id, page = 1, limit = 5) =>
  axios.get(`/albums/${id}?page=${page}&limit=${limit}`);
export const createAlbumRequest = (album) => axios.post("/albums", album);
export const deleteAlbumRequest = (id) => axios.delete(`/albums/${id}`);
export const getUsersRequest = (page = 1, limit = 5) =>
  axios.get(`/users?page=${page}&limit=${limit}`);
export const deactivateUserRequest = (id) =>
  axios.put(`/users/${id}/deactivate`);
export const activateUserRequest = (id) => axios.put(`/users/${id}/activate`);
export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);
export const updateUserRequest = (id, userData) =>
  axios.put(`/users/${id}`, userData);
