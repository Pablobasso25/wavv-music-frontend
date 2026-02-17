import React, { useState, useEffect } from "react";
import { Container, Button, Nav, Card } from "react-bootstrap";
import { defaultSongs, defaultUsers } from "../../data/dataDefault";
import UsersTable from "./components/UsersTable";
import SongsTable from "./components/SongsTable";
import ArtistsTable from "./components/ArtistsTable";
import SearchModal from "./components/SearchModal";

const AdminScreen = () => {

  const [currentTab, setCurrentTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Cargar datos del localStorage
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    let storedSongs = JSON.parse(localStorage.getItem("songs"));
    const storedArtists = JSON.parse(localStorage.getItem("artistas")) || [];

    if (!storedUsers || storedUsers.length === 0) {
      storedUsers = defaultUsers;
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    if (!storedSongs || storedSongs.length === 0) {
      storedSongs = defaultSongs;
      localStorage.setItem("songs", JSON.stringify(storedSongs));
    }

    setUsers(storedUsers);
    setSongs(storedSongs);
    setArtists(storedArtists);
  }, []);