import bB from "../../img/chesspieces/chessdotcom/bB.png";
import bK from "../../img/chesspieces/chessdotcom/bK.png";
import bN from "../../img/chesspieces/chessdotcom/bN.png";
import bP from "../../img/chesspieces/chessdotcom/bP.png";
import bQ from "../../img/chesspieces/chessdotcom/bQ.png";
import bR from "../../img/chesspieces/chessdotcom/bR.png";
import wB from "../../img/chesspieces/chessdotcom/wB.png";
import wK from "../../img/chesspieces/chessdotcom/wK.png";
import wN from "../../img/chesspieces/chessdotcom/wN.png";
import wP from "../../img/chesspieces/chessdotcom/wP.png";
import wQ from "../../img/chesspieces/chessdotcom/wQ.png";
import wR from "../../img/chesspieces/chessdotcom/wR.png";
import { ChessPieceIMG } from "./style";

interface PieceImgProps {
  piece: string;
}

const PieceImg = ({ piece }: PieceImgProps) => {
  return <ChessPieceIMG src={getPieceImgSrc(piece)} />;
};

const getPieceImgSrc = (piece: string): string => {
  // 이런 스위치문의 경우 객체 map 을 사용하는것도 좋다고 생각해요
  // ex)
  // {
  //   'b': bB,
  //   'k': bK,
  //   ...
  // }
  switch (piece) {
    case "b":
      return bB;
    case "k":
      return bK;
    case "n":
      return bN;
    case "p":
      return bP;
    case "q":
      return bQ;
    case "r":
      return bR;
    case "B":
      return wB;
    case "K":
      return wK;
    case "N":
      return wN;
    case "P":
      return wP;
    case "Q":
      return wQ;
    case "R":
      return wR;
    default:
      return "";
  }
};

export default PieceImg;
