import { useRecoilValue } from "recoil";
import { FENState, pieceScoreState, turnState } from "../utils/recoil";
import ChessBoard from "./ChessBoard";

const Game = () => {
  const FEN = useRecoilValue(FENState);
  const turn = useRecoilValue(turnState);
  const pieceScore = useRecoilValue(pieceScoreState);
  return(
    <div>
      <ChessBoard/>
      FEN: {FEN}<br/>
      turn: {turn === "w" ? `white` : `black`}<br/>
      pieceScore: {pieceScore[2]}
    </div>
  )
}

export default Game;