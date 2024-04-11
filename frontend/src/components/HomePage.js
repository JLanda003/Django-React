import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";``
import Room from "./Room";
import RenderHomePage from "./RenderHomePage";

const HomePage = () => {
  const [roomDetails, setRoomDetails] = useState({
    roomCode: null,
  })

  useEffect ( () => {
    const getRoom = async() => {
      try {
        const response = await fetch('/api/user-in-room')
        const data = await response.json();
        data && data.code
        ? setRoomDetails({roomCode : data.code})
        : setRoomDetails({roomCode : null});
      } catch (error) {
        console.error('Error al procesar la solicitud', error);
      }
    };
    getRoom();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          roomDetails.roomCode
          ? <Navigate to={`/room/${roomDetails.roomCode}`} />
          : <RenderHomePage />
        } />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default HomePage;
