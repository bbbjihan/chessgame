import { ReactElement } from "react";
import { setUseStateType } from "../../../utils/interfaces";
import PieceImg from './PieceImg';
import { ChessPieceWrap } from "./style";

interface ChessPieceProps {
  piece: string
  squareIndex: string,
  setMovingPiece: setUseStateType<string>,
  setMovingStart: setUseStateType<string>
}

const ChessPiece = ({ piece, squareIndex, setMovingPiece, setMovingStart }: ChessPieceProps): ReactElement => {
  const handleMove = () => {
    setMovingPiece(piece);
    setMovingStart(squareIndex);
  }

  return (
    <ChessPieceWrap
      onClick={handleMove}
    >
      <PieceImg
        piece={piece}
        width="100%"
        height="100%"
      />
    </ChessPieceWrap>
  )
}

export default ChessPiece;