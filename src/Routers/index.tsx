import { Route, Routes } from "react-router-dom";
import Game from "../Game";

const Routers = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Game />} />
    </Routes>
    </>
  )
}

export default Routers;