import PieceImg from "../ChessPiece/PieceImg";
import { CapturedPieces, CardWrap, Left, PawnIMGWrap, PieceScore, PlayerCapturedPieceRow, PlayerColor, PlayerID, PlayerInformRow, PlayerRating, PlayerTitle, Right } from "./style";

interface PlayerCardProps {
  ID: string,
  rating: number,
  title: string,
  color: string,
  capturedPieces: string[],
  pieceScore: number,
  state: string
}

const PlayerCard = ({ ID, rating, title, color, capturedPieces, pieceScore, state }: PlayerCardProps) => {
  return (
    <CardWrap>
      <Left>
        <PlayerColor
          color={color}
        />
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
              if (piece === "p" || piece === "P") {
                return (
                  <PawnIMGWrap>
                    <PieceImg
                      piece={piece}
                      height="2rem"
                      width="2rem"
                    />
                  </PawnIMGWrap>
                )
              } else {
                return (
                  <PieceImg
                    piece={piece}
                    height="2rem"
                    width="2rem"
                  />
                )
              }
            })}
            <PieceScore>
              {pieceScore}
            </PieceScore>
          </CapturedPieces>
        </PlayerCapturedPieceRow>
      </Right>
    </CardWrap>
  )
}

export default PlayerCard;