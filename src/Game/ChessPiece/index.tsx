import { ReactElement } from "react";
import { useSetRecoilState } from "recoil";
import bB from "../../img/chesspieces/bB.png";
import bK from "../../img/chesspieces/bK.png";
import bN from "../../img/chesspieces/bN.png";
import bP from "../../img/chesspieces/bP.png";
import bQ from "../../img/chesspieces/bQ.png";
import bR from "../../img/chesspieces/bR.png";
import wB from "../../img/chesspieces/wB.png";
import wK from "../../img/chesspieces/wK.png";
import wN from "../../img/chesspieces/wN.png";
import wP from "../../img/chesspieces/wP.png";
import wQ from "../../img/chesspieces/wQ.png";
import wR from "../../img/chesspieces/wR.png";
import { moveableSquareState } from "../../utils/recoil";
import { ChessPieceIMG, ChessPieceWrap } from "./style";

interface ChessPieceProps {
  piece: string
  squareIndex: string
  row: number
  col: number
}

const ChessPiece = ({ piece, squareIndex, row, col }: ChessPieceProps): ReactElement => {
  const setMoveableSquare = useSetRecoilState(moveableSquareState);

  const handleMove = () => {
  }

  return (
    <ChessPieceWrap>
      <ChessPieceIMG src={getPieceImgSrc(piece)} onClick={handleMove} />
    </ChessPieceWrap>
  )
}

const getPieceImgSrc = (piece: string): string => {
  switch (piece) {
    case ("b"):
      return bB;
    case ("k"):
      return bK;
    case ("n"):
      return bN;
    case ("p"):
      return bP;
    case ("q"):
      return bQ;
    case ("r"):
      return bR;
    case ("B"):
      return wB;
    case ("K"):
      return wK;
    case ("N"):
      return wN;
    case ("P"):
      return wP;
    case ("Q"):
      return wQ;
    case ("R"):
      return wR;
    default:
      return "";
  }
}

export default ChessPiece;