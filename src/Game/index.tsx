import { useRecoilValue } from "recoil";
import { checkMatedState, checkedState, staleMatedState } from "../utils/checkChecked";
import { notationState } from "../utils/notation";
import { FENState, pieceScoreState, turnState } from "../utils/recoil";
import ChessBoard from "./ChessBoard";

const Game = () => {
  const FEN = useRecoilValue(FENState);
  const turn = useRecoilValue(turnState);
  const pieceScore = useRecoilValue(pieceScoreState);
  const checked = useRecoilValue(checkedState);
  const checkMated = useRecoilValue(checkMatedState);
  const staleMated = useRecoilValue(staleMatedState);
  const notation = useRecoilValue(notationState);
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
      checkMated:
      {
        checkMated[0] && "white"
      }
      {
        checkMated[1] && "black"
      }
      <br/>
      staleMated:{staleMated.toString()}<br/>
      {
      notation.map((turn, turnIndex) => {
        if(turnIndex % 2 === 0){
          return(
            <>
            {`${Math.floor(turnIndex/2) + 1}. ${turn}`}
            </>
          )
        }else{
          return(
            <>
            {` ${turn}\n`}<br/>
            </>
          )
        }
      })
      }
      <br/>
    </div>
  )
}

export default Game;