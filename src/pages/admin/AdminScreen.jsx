import React, { useState, useEffect } from "react";
import { Container, Button, Nav, Card } from "react-bootstrap";
import { defaultSongs, defaultUsers } from "../../data/dataDefault";
import UsersTable from "./components/UsersTable";
import SongsTable from "./components/SongsTable";
import ArtistsTable from "./components/ArtistsTable";
import SearchModal from "./components/SearchModal";

const AdminScreen = () => {