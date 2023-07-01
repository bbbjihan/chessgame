import { Route, Routes } from "react-router-dom";
import Game from "../Game";
import Lobby from "../Lobby";
import LogIn from "../LogIn";
import SetName from "../LogIn/SetName";

const Routers = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/entername" element={<SetName />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </>
  )
}

export default Routers;