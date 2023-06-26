import { ReactElement } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getSquareIndex } from "../../utils/functions";
import { moveableSquareState, movingPieceState, movingStartState, positionArrState } from "../../utils/recoil";
import PieceImg from './PieceImg';
import { ChessPieceWrap } from "./style";

interface ChessPieceProps {
  piece: string
  squareIndex: string
  row: number
  col: number
}

const ChessPiece = ({ piece, squareIndex, row, col }: ChessPieceProps): ReactElement => {
  const setMoveableSquare = useSetRecoilState(moveableSquareState);
  const position = useRecoilValue(positionArrState);
  const setMovingPiece = useSetRecoilState(movingPieceState);
  const setMovingStart = useSetRecoilState(movingStartState);

  const handleMove = () => {
    let moveable = new Array(8).fill(false).map(() => new Array(8).fill(false));
    setMovingPiece(piece);
    setMovingStart(getSquareIndex(row,col));
    switch (piece) {
      case "P":
        //흰색 폰 movement 정의
        
        if(row === 6 && !position[4][col]) moveable[4][col] = true;
        //위로 두 칸 전진
        if(row > 0 && !position[row-1][col]) moveable[row-1][col] = true;
        //위로 한 칸 전진
        if(row > 0 && col > 0 && position[row-1][col-1]) moveable[row-1][col-1] = true;
        //왼쪽 위로 먹으면서 전진
        if(row > 0 && col < 7 && position[row-1][col+1]) moveable[row-1][col+1] = true;
        //오른쪽 위로 먹으면서 전진
        setMoveableSquare(moveable);
        break;
      case "p":
        //검은색 폰 movement 정의

        if(row === 1 && !position[3][col]) moveable[3][col] = true;
        //아래로 두 칸 전진
        if(row < 7 && !position[row+1][col]) moveable[row+1][col] = true;
        //아래로 한 칸 전진
        if(row < 7 && col > 0 && position[row+1][col-1]) moveable[row+1][col-1] = true;
        //왼쪽 아래로 먹으면서 전진
        if(row < 7 && col < 7 && position[row+1][col+1]) moveable[row+1][col+1] = true;
        //오른쪽 아래로 먹으면서 전진
        setMoveableSquare(moveable);
        break;
      case "N" || "n":
        setMoveableSquare(moveable);
        break;
      case "B" || "b":
        setMoveableSquare(moveable);
        break;
      case "R" || "r":
        setMoveableSquare(moveable);
        break;
      case "Q" || "q":
        setMoveableSquare(moveable);
        break;
      case "K" || "k":
        setMoveableSquare(moveable);
        break;
      default:
        break;
    }
  }

  return (
    <ChessPieceWrap
      onClick={handleMove}
    >
      <PieceImg
        piece={piece}
      />
    </ChessPieceWrap>
  )
}

export default ChessPiece;