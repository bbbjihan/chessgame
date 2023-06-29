import PieceImg from "../ChessPiece/PieceImg";
import { CapturedPieces, CardWrap, IMGWrap, Left, PlayerCapturedPieceRow, PlayerColor, PlayerID, PlayerInformRow, PlayerRating, PlayerTitle, Right } from "./style";

interface PlayerCardProps {
  ID: string,
  rating: number,
  title: string,
  color: string,
  capturedPieces: string[],
  pieceScore: number,
  state: string,
}

const PlayerCard = ({ ID, rating, title, color, capturedPieces, pieceScore, state }: PlayerCardProps) => {
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
          <PlayerID>{ID}</PlayerID>
          <PlayerRating>{rating}</PlayerRating>
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