import { useRecoilValue } from "recoil";
import { checkedState } from "../utils/checkChecked";
import { FENState, pieceScoreState, turnState } from "../utils/recoil";
import ChessBoard from "./ChessBoard";

const Game = () => {
  const FEN = useRecoilValue(FENState);
  const turn = useRecoilValue(turnState);
  const pieceScore = useRecoilValue(pieceScoreState);
  const checked = useRecoilValue(checkedState);
  return(
    <div>
      <ChessBoard/>
      FEN: {FEN}<br/>
      turn: {turn === "w" ? `white` : `black`}<br/>
      pieceScore: {pieceScore[2]}<br/>
      checked:
      {
        checked[0] && "white"
      }
      {
        checked[1] && "black"
      }
      <br/>
    </div>
  )
}

export default Game;