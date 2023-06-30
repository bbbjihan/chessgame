import { Route, Routes } from "react-router-dom";
import Game from "../Game";
import Lobby from "../Lobby";
import LogIn from "../LogIn";

const Routers = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </>
  )
}

export default Routers;