import { Route, Routes } from "react-router-dom";
import Game from "../Pages/Game";
import Lobby from "../Pages/Lobby";
import LogIn from "../Pages/LogIn";
import SetName from "../Pages/LogIn/SetName";
import NewGame from "../Pages/NewGame/index.";

const Routers = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/entername" element={<SetName />} />
      <Route path="/newgame" element={<NewGame />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </>
  )
}

export default Routers;