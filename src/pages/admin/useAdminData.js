import { useState, useEffect } from "react";
import {
  getSongsRequest,
  getAlbumsRequest,
  getUsersRequest,
} from "../../api/songs";
import { getPlansRequest } from "../../api/payment";

export const useAdminData = () => {
  const [currentTab, setCurrentTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, [currentTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (currentTab === "users") {
        const res = await getUsersRequest();
        setUsers(res.data.users || res.data || []);
      } else if (currentTab === "songs") {
        const res = await getSongsRequest(1, 1000, true);
        setSongs(res.data.songs || res.data || []);
      } else if (currentTab === "artists") {
        const res = await getAlbumsRequest();
        setArtists(res.data.albums || res.data || []);
      } else if (currentTab === "plans") {
        const res = await getPlansRequest();
        setPlans(res.data || []);
      }
    } catch (error) {
      console.error(`Error cargando ${currentTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentTab,
    setCurrentTab,
    users,
    setUsers,
    songs,
    setSongs,
    artists,
    setArtists,
    plans,
    setPlans,
    loading,
    showModal,
    setShowModal,
    loadData,
  };
};
