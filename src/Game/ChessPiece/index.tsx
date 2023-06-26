import { ReactElement } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getSquareIndex } from "../../utils/functions";
import { moveableSquareState, movingPieceState, movingStartState, positionArrState, turnState } from "../../utils/recoil";
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
  const turn = useRecoilValue(turnState);

  const isOpponent = (attacker: string, defencer: string): boolean => {
    if (defencer === "") return true;
    return (attacker === attacker.toUpperCase()) === (defencer !== defencer.toUpperCase());
  }

  const handleMove = () => {
    console.log(`Selected piece ${piece}. ${row} / ${col}`)
    let moveable = new Array(8).fill(false).map(() => new Array(8).fill(false));
    setMovingPiece(piece);
    setMovingStart(getSquareIndex(row, col));
    if((piece === piece.toUpperCase()) !== (turn === "w")){ //not your turn.
      setMoveableSquare(moveable);
      return;
    }
    let [destiRow, destiCol] = [0, 0]
    switch (piece) {

      case "P": //white pawn movement
        if (row === 6 && !position[4][col]) moveable[4][col] = true;
        if (row > 0 && !position[row - 1][col]) moveable[row - 1][col] = true;
        if (row > 0 && col > 0 && position[row - 1][col - 1] && isOpponent(piece, position[row - 1][col - 1])) moveable[row - 1][col - 1] = true;
        if (row > 0 && col < 7 && position[row - 1][col + 1] && isOpponent(piece, position[row - 1][col + 1])) moveable[row - 1][col + 1] = true;
        break;

      case "p": //black pawn movement
        if (row === 1 && !position[3][col]) moveable[3][col] = true;
        if (row < 7 && !position[row + 1][col]) moveable[row + 1][col] = true;
        if (row < 7 && col > 0 && position[row + 1][col - 1] && isOpponent(piece, position[row + 1][col - 1])) moveable[row + 1][col - 1] = true;
        if (row < 7 && col < 7 && position[row + 1][col + 1] && isOpponent(piece, position[row + 1][col + 1])) moveable[row + 1][col + 1] = true;
        break;

      case "N":
      case "n": //night movement
        if (row > 0) {
          if (col > 1 && isOpponent(piece, position[row - 1][col - 2])) moveable[row - 1][col - 2] = true;
          if (col < 6 && isOpponent(piece, position[row - 1][col + 2])) moveable[row - 1][col + 2] = true;
          if (row > 1) {
            if (col > 0 && isOpponent(piece, position[row - 2][col - 1])) moveable[row - 2][col - 1] = true;
            if (col < 7 && isOpponent(piece, position[row - 2][col + 1])) moveable[row - 2][col + 1] = true;
          }
        }
        if (row < 7) {
          if (col > 1 && isOpponent(piece, position[row + 1][col - 2])) moveable[row + 1][col - 2] = true;
          if (col < 6 && isOpponent(piece, position[row + 1][col + 2])) moveable[row + 1][col + 2] = true;
          if (row < 6) {
            if (col > 0 && isOpponent(piece, position[row + 2][col - 1])) moveable[row + 2][col - 1] = true;
            if (col < 7 && isOpponent(piece, position[row + 2][col + 1])) moveable[row + 2][col + 1] = true;
          }
        }
        break;

      case "B":
      case "b": //bishop movement
        [destiRow, destiCol] = [row - 1, col - 1];
        while (destiRow >= 0 && destiCol >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow -= 1;
          destiCol -= 1;
        }
        [destiRow, destiCol] = [row + 1, col + 1];
        while (destiRow <= 7 && destiCol <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow += 1;
          destiCol += 1;
        }
        [destiRow, destiCol] = [row - 1, col + 1];
        while (destiRow >= 0 && destiCol <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow -= 1;
          destiCol += 1;
        }
        [destiRow, destiCol] = [row + 1, col - 1];
        while (destiRow <= 7 && destiCol >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow += 1;
          destiCol -= 1;
        }
        break;

      case "R":
      case "r": //rook movement
        console.log("ROOK");
        [destiRow, destiCol] = [row - 1, col];
        while (destiRow >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow -= 1;
        }
        [destiRow, destiCol] = [row, col - 1];
        while (destiCol >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiCol -= 1;
        }
        [destiRow, destiCol] = [row + 1, col];
        while (destiRow <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow += 1;
        }
        [destiRow, destiCol] = [row, col + 1];
        while (destiCol <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiCol += 1;
        }
        break;
      case "Q":
      case "q": //queen movement
        [destiRow, destiCol] = [row - 1, col - 1];
        while (destiRow >= 0 && destiCol >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow -= 1;
          destiCol -= 1;
        }
        [destiRow, destiCol] = [row + 1, col + 1];
        while (destiRow <= 7 && destiCol <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow += 1;
          destiCol += 1;
        }
        [destiRow, destiCol] = [row - 1, col + 1];
        while (destiRow >= 0 && destiCol <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow -= 1;
          destiCol += 1;
        }
        [destiRow, destiCol] = [row + 1, col - 1];
        while (destiRow <= 7 && destiCol >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow += 1;
          destiCol -= 1;
        }
        [destiRow, destiCol] = [row - 1, col];
        while (destiRow >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow -= 1;
        }
        [destiRow, destiCol] = [row, col - 1];
        while (destiCol >= 0) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiCol -= 1;
        }
        [destiRow, destiCol] = [row + 1, col];
        while (destiRow <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiRow += 1;
        }
        [destiRow, destiCol] = [row, col + 1];
        while (destiCol <= 7) {
          if (position[destiRow][destiCol]) {
            if (isOpponent(piece, position[destiRow][destiCol])) moveable[destiRow][destiCol] = true;
            break;
          }
          else moveable[destiRow][destiCol] = true;
          destiCol += 1;
        }
        break;
      case "K":
      case "k": //king movement
        if(row > 0){
          if (col > 0 && isOpponent(piece, position[row-1][col-1])) moveable[row-1][col-1] = true;
          if (col < 7 && isOpponent(piece, position[row-1][col+1])) moveable[row-1][col+1] = true;
          if(isOpponent(piece, position[row-1][col]))moveable[row-1][col] = true;
        }
        if(row < 7){
          if (col > 0 && isOpponent(piece, position[row+1][col-1])) moveable[row+1][col-1] = true;
          if (col < 7 && isOpponent(piece, position[row+1][col+1])) moveable[row+1][col+1] = true;
          if(isOpponent(piece, position[row+1][col]))moveable[row+1][col] = true;
        }
        if (col > 0 && isOpponent(piece, position[row][col-1])) moveable[row][col-1] = true;
        if (col < 7 && isOpponent(piece, position[row][col+1])) moveable[row][col+1] = true;
        break;
      default:
        break;
    }
    setMoveableSquare(moveable);
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