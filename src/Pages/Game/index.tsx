import { useRecoilValue } from "recoil";
import { FENState, blackCapturedPiecesState, pieceScoreState, rotateState, whiteCapturedPiecesState } from "../../utils/recoil";
import { blackPlayerState, whitePlayerState } from "../../utils/userAtoms";
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
  const blackPlayer = useRecoilValue(blackPlayerState);
  const whitePlayer = useRecoilValue(whitePlayerState);
  
  return (
    <PageWrap>
      <PageContent>
        <PlayerAndBoard
          rotate={rotate}
        >
          <PlayerCardWrap>
            <PlayerCard
              name={blackPlayer.name}
              win={blackPlayer.win}
              lose={blackPlayer.lose}
              draw={blackPlayer.draw}
              title={blackPlayer.title}
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
              name={whitePlayer.name}
              win={whitePlayer.win}
              lose={whitePlayer.lose}
              draw={whitePlayer.draw}
              title={whitePlayer.title}
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