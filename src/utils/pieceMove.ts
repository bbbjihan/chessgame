import { selector } from "recoil";
import { getNumberIndex, getPositionString, getSquareIndex } from "./functions";
import { destinationState, moveableSquareState, movingPieceState, movingStartState, positionArrState, positionState, turnState } from "./recoil";

export const pieceMoveState = selector<void>({
  key: "pieceMoveState",
  get: (()=>{}),
  set: (({get, set}) => {
    const positionArr = get(positionArrState);
    const movingStart = get(movingStartState);
    const movingPiece = get(movingPieceState);
    const destination = get(destinationState);

    let result:string[][] = new Array(8).fill("").map(() => new Array(8).fill(""))
    for(let i = 0; i < 8; i++) for(let j = 0; j < 8; j++) result[i][j] = positionArr[i][j];
  
    const [startRow, startCol]:[number, number] = getNumberIndex(movingStart);
    const [destiRow, destiCol]:[number, number] = getNumberIndex(destination);

    result[startRow][startCol] = "";
    result[destiRow][destiCol] = movingPiece;
  
    const resultString = getPositionString(result);
    console.log(`move ${movingPiece} from ${movingStart}(${startRow}/${startCol}) to ${destination}(${destiRow}/${destiCol}), result is ${resultString}.`)
  
    set(positionState,resultString);
  })
})

export const renderMoveablePointState = selector<void>({
  key: "renderMoveablePointState",
  get: (() => {}),
  set: (({get, set}) => {
    const isOpponent = (attacker: string, defencer: string): boolean => {
      if (defencer === "k" || defencer === "K") return false;
      if (defencer === "") return true;
      return (attacker === attacker.toUpperCase()) === (defencer !== defencer.toUpperCase());
    }

    const piece:string = get(movingPieceState);
    const movingStart:string = get(movingStartState);
    const [row, col] : [number, number] = getNumberIndex(movingStart);
    let moveable = new Array(8).fill(false).map(() => new Array(8).fill(false));
    const position = get(positionArrState);
    
    console.log(`The piece "${piece}" is Selected. Index is ${getSquareIndex(row,col)}(${row}/${col})`)

    if((piece === piece.toUpperCase()) !== (get(turnState) === "w")){ //not your turn.
      set(moveableSquareState,moveable);
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
    set(moveableSquareState,moveable);
  })
})