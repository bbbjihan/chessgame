import { useRecoilValue } from "recoil";
import { FENState, blackCapturedPiecesState, pieceScoreState, rotateState, whiteCapturedPiecesState } from "../utils/recoil";
import ChessBoard from "./ChessBoard";
import GameInform from "./GameInform";
import PlayerCard from "./PlayerCard";
import { BottomGameInform, BottomRow, ChessBoardWrap, GameInformWrap, PageContent, PageWrap, PlayerAndBoard, PlayerCardWrap } from "./style";

const Game = () => {
  const FEN = useRecoilValue(FENState);
  const rotate = useRecoilValue(rotateState);
  const whiteCapturedPieces = useRecoilValue(whiteCapturedPiecesState);
  const blackCapturedPieces = useRecoilValue(blackCapturedPiecesState);
  const pieceScore = useRecoilValue(pieceScoreState);
  return (
    <PageWrap>
      <PageContent>
        <PlayerAndBoard
          rotate={rotate}
        >
          <PlayerCardWrap>
            <PlayerCard
              ID="BlackPlayer"
              rating={2200}
              title="GM"
              color="b"
              capturedPieces={whiteCapturedPieces}
              pieceScore={- pieceScore[2]}
              state="normal"
            />
          </PlayerCardWrap>
          <ChessBoardWrap>
            <ChessBoard />
          </ChessBoardWrap>
          <PlayerCardWrap>
            <PlayerCard
              ID="WhitePlayer"
              rating={1800}
              title="IM"
              color="w"
              capturedPieces={blackCapturedPieces}
              pieceScore={pieceScore[2]}
              state="normal"
            />
          </PlayerCardWrap>
        </PlayerAndBoard>
        <GameInformWrap>
          <GameInform />
        </GameInformWrap>
      </PageContent>
      <BottomGameInform>
        <BottomRow>
          FEN: {FEN}
        </BottomRow>
      </BottomGameInform>
    </PageWrap>
  )
}

export default Game;