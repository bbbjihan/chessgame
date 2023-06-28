import { useRecoilState, useRecoilValue } from "recoil";
import { checkMatedState, checkedState, staleMatedState } from "../utils/checkChecked";
import { notationState } from "../utils/notation";
import { FENState, pieceScoreState, rotateState, turnState } from "../utils/recoil";
import ChessBoard from "./ChessBoard";
import PlayerCard from "./PlayerCard";
import { ChessBoardWrap, PageContent, PageWrap, PlayerAndBoard, PlayerCardWrap } from "./style";

const Game = () => {
  const FEN = useRecoilValue(FENState);
  const turn = useRecoilValue(turnState);
  const pieceScore = useRecoilValue(pieceScoreState);
  const checked = useRecoilValue(checkedState);
  const checkMated = useRecoilValue(checkMatedState);
  const staleMated = useRecoilValue(staleMatedState);
  const notation = useRecoilValue(notationState);
  const [rotate, setRotate] = useRecoilState(rotateState);
  return (
    <PageWrap>
      <PageContent>
        <PlayerAndBoard
          rotate={rotate}
        >
          <PlayerCardWrap>
            <PlayerCard
              ID="지한짱"
              rating={2200}
              title="GM"
              color="b"
              capturedPieces={["Q", "R", "R", "B", "B", "N", "N", "P", "P", "P", "P", "P", "P", "P", "P"]}
              pieceScore={1}
              state="normal"
            />
          </PlayerCardWrap>
          <ChessBoardWrap>
            <ChessBoard />
          </ChessBoardWrap>
          <PlayerCardWrap>
            <PlayerCard
              ID="시연짱"
              rating={1800}
              title="IM"
              color="w"
              capturedPieces={["q", "r", "r", "b", "b", "n", "n", "p", "p", "p", "p", "p", "p", "p", "p"]}
              pieceScore={-1}
              state="normal"
            />
          </PlayerCardWrap>
        </PlayerAndBoard>
        FEN: {FEN} <br />
        turn: {turn === "w" ? `white` : `black`}<br />
        pieceScore: {pieceScore[2]}<br />
        checked:
        {
          checked[0] && "white"
        }
        {
          checked[1] && "black"
        }
        <br />
        checkMated:
        {
          checkMated[0] && "white"
        }
        {
          checkMated[1] && "black"
        }
        <br />
        staleMated:{staleMated.toString()}<br />
        <button
          onClick={
            () => { setRotate(prev => !prev) }
          }
        >
          ROTATE
        </button>
        <br />
        {
          notation.map((turn, turnIndex) => {
            if (turnIndex % 2 === 0) {
              return (
                <>
                  {`${Math.floor(turnIndex / 2) + 1}. ${turn}`}
                </>
              )
            } else {
              return (
                <>
                  {` ${turn}\n`}<br />
                </>
              )
            }
          })
        }
        <br />
      </PageContent>
    </PageWrap>
  )
}

export default Game;