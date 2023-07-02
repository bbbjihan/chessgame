import PieceImg from "../ChessPiece/PieceImg";
import { CapturedPieces, CardWrap, IMGWrap, Left, PlayerCapturedPieceRow, PlayerColor, PlayerID, PlayerInformRow, PlayerRating, PlayerTitle, Right } from "./style";

interface PlayerCardProps {
  name: string,
  title: string,
  color: string,
  capturedPieces: string[],
  pieceScore: number,
  state: string,
  win: number,
  draw: number,
  lose: number
}

const PlayerCard = ({ name, win, lose, draw, title, color, capturedPieces, pieceScore, state }: PlayerCardProps) => {
  return (
    <CardWrap>
      <Left>
        <PlayerColor
          color={color}
        >
            {pieceScore === 0 ? "" : (pieceScore > 0 ? `+${pieceScore}` : pieceScore)}
        </PlayerColor>
      </Left>
      <Right>
        <PlayerInformRow>
          <PlayerID>{name}</PlayerID>
          <PlayerRating>{win ? win : `0`} / {draw ? draw : `0`} / {lose ? lose : `0`} {`( ${win + draw === 0 ? `0` : `${(win * 100 / (win + lose)).toFixed(2)}`}% )`}</PlayerRating>
          <PlayerTitle>{title}</PlayerTitle>
        </PlayerInformRow>
        <PlayerCapturedPieceRow>
          <CapturedPieces>
            {capturedPieces.map((piece, pieceIndex) => {
              return (
                <IMGWrap
                  isPawn={piece === "p" || piece === "P"}
                >
                  <PieceImg
                    piece={piece}
                    height="2rem"
                    width="2rem"
                  />
                </IMGWrap>
              )
            })}
          </CapturedPieces>
        </PlayerCapturedPieceRow>
      </Right>
    </CardWrap>
  )
}

export default PlayerCard;