import bB from "../../../img/chesspieces/chessdotcom/bB.png";
import bK from "../../../img/chesspieces/chessdotcom/bK.png";
import bN from "../../../img/chesspieces/chessdotcom/bN.png";
import bP from "../../../img/chesspieces/chessdotcom/bP.png";
import bQ from "../../../img/chesspieces/chessdotcom/bQ.png";
import bR from "../../../img/chesspieces/chessdotcom/bR.png";
import wB from "../../../img/chesspieces/chessdotcom/wB.png";
import wK from "../../../img/chesspieces/chessdotcom/wK.png";
import wN from "../../../img/chesspieces/chessdotcom/wN.png";
import wP from "../../../img/chesspieces/chessdotcom/wP.png";
import wQ from "../../../img/chesspieces/chessdotcom/wQ.png";
import wR from "../../../img/chesspieces/chessdotcom/wR.png";
import { ChessPieceIMG } from "./style";

interface PieceImgProps {
  piece: string,
  width: string,
  height: string
}

interface imgMap {
  [key: string]: string
}

const getPieceImgSrc = (piece: string): string => {
  const chessdotcomImg: imgMap = {
    "b": bB,
    "k": bK,
    "n": bN,
    "p": bP,
    "q": bQ,
    "r": bR,
    "B": wB,
    "K": wK,
    "N": wN,
    "P": wP,
    "Q": wQ,
    "R": wR,
  }
  return (
    chessdotcomImg[piece] ? chessdotcomImg[piece] : ""
  )
};

const PieceImg = ({ piece, width, height }: PieceImgProps) => {
  return <ChessPieceIMG
    src={getPieceImgSrc(piece)}
    width={width}
    height={height}
  />;
};

export default PieceImg;