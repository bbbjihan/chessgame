import { selector } from "recoil";
import { getNumberIndex, getPositionString } from "./functions";
import { blackCapturedPiecesState, castleState, destinationState, moveableSquareState, movingPieceState, movingStartState, positionArrState, positionState, turnState, whiteCapturedPiecesState } from "./recoil";

export const pieceMoveState = selector<void>({
  key: "pieceMoveState",
  get: () => {},
  set: (({ get, set }) => {
    const positionArr = get(positionArrState);
    const movingStart = get(movingStartState);
    const movingPiece = get(movingPieceState);
    const destination = get(destinationState);

    let result: string[][] = new Array(8).fill("").map(() => new Array(8).fill(""))
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) result[i][j] = positionArr[i][j];

    const [startRow, startCol]: [number, number] = getNumberIndex(movingStart);
    const [destiRow, destiCol]: [number, number] = getNumberIndex(destination);

    //capture piece
    const target = positionArr[destiRow][destiCol];
    if(target !== ""){
      if(target === target.toUpperCase()){
        const whiteCapturedPieces = get(whiteCapturedPiecesState);
        set(whiteCapturedPiecesState, [...whiteCapturedPieces, target])
      }else{
        const blackCapturedPieces = get(blackCapturedPiecesState);
        set(blackCapturedPiecesState, [...blackCapturedPieces, target])
      }
    }

    result[startRow][startCol] = "";
    result[destiRow][destiCol] = movingPiece;

    const resultString = getPositionString(result);
    //console.log(`move ${movingPiece} from ${movingStart}(${startRow}/${startCol}) to ${destination}(${destiRow}/${destiCol}), result is ${resultString}.`)
    set(positionState, resultString);
    
    let castle: string|string[] = get(castleState);
    if(!(castle === "-")){
      castle = castle.split('');
      if(movingPiece === "r"){
        if(movingStart === "a8"){
          castle = castle.filter((x) => x !== "q");
        }else if(movingStart === "h8"){
          castle = castle.filter((x) => x !== "k");
        }
      }else if(movingPiece === "R"){
        if(movingStart === "a1"){
          castle = castle.filter((x) => x !== "Q");
        }else if(movingStart === "h1"){
          castle = castle.filter((x) => x !== "K");
        }
      }else if(movingPiece === "k"){
        castle = castle.filter((x) => x !== "q" && x !== "k");
      }else if(movingPiece === "K"){
        castle = castle.filter((x) => x !== "Q" && x !== "K");
      }
      if(castle.length === 0){
        set(castleState, "-");
      }else{
        set(castleState, castle.join(''));
      }
    }
  })
})

export const renderMoveablePointState = selector<void>({
  key: "renderMoveablePointState",
  get: () => {},
  set: (({ get, set }) => {
    const piece: string = get(movingPieceState);
    const movingStart: string = get(movingStartState);
    const [row, col]: [number, number] = getNumberIndex(movingStart);
    let moveable = new Array(8).fill(false).map(() => new Array(8).fill(false));
    const position = get(positionArrState);

    //console.log(`The piece "${piece}" is Selected. Index is ${getSquareIndex(row, col)}(${row}/${col})`)

    if ((piece === piece.toUpperCase()) !== (get(turnState) === "w")) { //not your turn.
      set(moveableSquareState, moveable);
      return;
    }

    getPieceMoveablePointToArr(piece, row, col, position, moveable);
    set(moveableSquareState, moveable);
  })
})

const isOpponent = (attacker: string, defencer: string): boolean => {
  if (defencer === "") return true;
  return (attacker === attacker.toUpperCase()) === (defencer !== defencer.toUpperCase());
}

/**
*기물이 움직인 이후에 킹이 위협받는지 시뮬레이션 해줌. getPieceMoveablePointToArr에서 각 기물 움직임 로직과 아군 기물에 가로막히는 건 이미 필터링되었음.
*/
export const movementSimulation = (
  piece: string,
  startRow: number,
  startCol: number,
  destiRow: number,
  destiCol: number,
  position: string[][],
  player: string
): boolean => {
  let kingPosition: number[] = [-1, -1];
  let positionAfterMove: string[][] = new Array(8).fill("").map(() => new Array(8).fill(""));
  let enemyMoveablePoints: boolean[][] = new Array(8).fill(false).map(() => new Array(8).fill(false));

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      positionAfterMove[i][j] = position[i][j];
    }
  }

  positionAfterMove[startRow][startCol] = "";
  positionAfterMove[destiRow][destiCol] = piece;

  for (let i: number = 0; i < 8; i++) {
    for (let j: number = 0; j < 8; j++) {
      const nowPiece: string = positionAfterMove[i][j]
      if (player === "w") {
        if (nowPiece !== nowPiece.toUpperCase()) getPieceMoveablePointToArr(nowPiece, i, j, positionAfterMove, enemyMoveablePoints, true);
        if (nowPiece === "K") {
          kingPosition[0] = i;
          kingPosition[1] = j;
        };
      } else if (player === "b") {
        if (nowPiece === nowPiece.toUpperCase()) getPieceMoveablePointToArr(nowPiece, i, j, positionAfterMove, enemyMoveablePoints, true);
        if (nowPiece === "k") {
          kingPosition[0] = i;
          kingPosition[1] = j;
        };
      };
    }
  }

  if (kingPosition[0] === -1 || kingPosition[1] === -1) return true;
  return !enemyMoveablePoints[kingPosition[0]][kingPosition[1]]
}

export const getPieceMoveablePointToArr = (piece: string, row: number, col: number, position: string[][], moveable: boolean[][], isSimulation: boolean = false): void => {
  let [destiRow, destiCol] = [0, 0]
  const player = piece === piece.toUpperCase() ? "w" : "b";
  switch (piece) {
    case "P": //white pawn movement
      if (row === 6 && !position[4][col] && (isSimulation ? true : movementSimulation(piece, row, col, 4, col, position, player))) moveable[4][col] = true;
      if (row > 0 && !position[row - 1][col] && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col, position, player))) moveable[row - 1][col] = true;
      if (row > 0 && col > 0 && position[row - 1][col - 1] && isOpponent(piece, position[row - 1][col - 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col - 1, position, player))) moveable[row - 1][col - 1] = true;
      if (row > 0 && col < 7 && position[row - 1][col + 1] && isOpponent(piece, position[row - 1][col + 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col + 1, position, player))) moveable[row - 1][col + 1] = true;
      break;

    case "p": //black pawn movement
      if (row === 1 && !position[3][col] && (isSimulation ? true : movementSimulation(piece, row, col, 3, col, position, player))) moveable[3][col] = true;
      if (row < 7 && !position[row + 1][col] && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col, position, player))) moveable[row + 1][col] = true;
      if (row < 7 && col > 0 && position[row + 1][col - 1] && isOpponent(piece, position[row + 1][col - 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col - 1, position, player))) moveable[row + 1][col - 1] = true;
      if (row < 7 && col < 7 && position[row + 1][col + 1] && isOpponent(piece, position[row + 1][col + 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col + 1, position, player))) moveable[row + 1][col + 1] = true;
      break;

    case "N":
    case "n": //night movement
      if (row > 0) {
        if (col > 1 && isOpponent(piece, position[row - 1][col - 2]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col - 2, position, player))) moveable[row - 1][col - 2] = true;
        if (col < 6 && isOpponent(piece, position[row - 1][col + 2]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col + 2, position, player))) moveable[row - 1][col + 2] = true;
        if (row > 1) {
          if (col > 0 && isOpponent(piece, position[row - 2][col - 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 2, col - 1, position, player))) moveable[row - 2][col - 1] = true;
          if (col < 7 && isOpponent(piece, position[row - 2][col + 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 2, col + 1, position, player))) moveable[row - 2][col + 1] = true;
        }
      }
      if (row < 7) {
        if (col > 1 && isOpponent(piece, position[row + 1][col - 2]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col - 2, position, player))) moveable[row + 1][col - 2] = true;
        if (col < 6 && isOpponent(piece, position[row + 1][col + 2]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col + 2, position, player))) moveable[row + 1][col + 2] = true;
        if (row < 6) {
          if (col > 0 && isOpponent(piece, position[row + 2][col - 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 2, col - 1, position, player))) moveable[row + 2][col - 1] = true;
          if (col < 7 && isOpponent(piece, position[row + 2][col + 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 2, col + 1, position, player))) moveable[row + 2][col + 1] = true;
        }
      }
      break;

    case "B":
    case "b": //bishop movement
      [destiRow, destiCol] = [row - 1, col - 1];
      while (destiRow >= 0 && destiCol >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow -= 1;
        destiCol -= 1;
      }
      [destiRow, destiCol] = [row + 1, col + 1];
      while (destiRow <= 7 && destiCol <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow += 1;
        destiCol += 1;
      }
      [destiRow, destiCol] = [row - 1, col + 1];
      while (destiRow >= 0 && destiCol <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow -= 1;
        destiCol += 1;
      }
      [destiRow, destiCol] = [row + 1, col - 1];
      while (destiRow <= 7 && destiCol >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow += 1;
        destiCol -= 1;
      }
      break;

    case "R":
    case "r": //rook movement
      [destiRow, destiCol] = [row - 1, col];
      while (destiRow >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow -= 1;
      }
      [destiRow, destiCol] = [row, col - 1];
      while (destiCol >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiCol -= 1;
      }
      [destiRow, destiCol] = [row + 1, col];
      while (destiRow <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow += 1;
      }
      [destiRow, destiCol] = [row, col + 1];
      while (destiCol <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiCol += 1;
      }
      break;

    case "Q":
    case "q": //queen movement
      [destiRow, destiCol] = [row - 1, col - 1];
      while (destiRow >= 0 && destiCol >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow -= 1;
        destiCol -= 1;
      }
      [destiRow, destiCol] = [row + 1, col + 1];
      while (destiRow <= 7 && destiCol <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow += 1;
        destiCol += 1;
      }
      [destiRow, destiCol] = [row - 1, col + 1];
      while (destiRow >= 0 && destiCol <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow -= 1;
        destiCol += 1;
      }
      [destiRow, destiCol] = [row + 1, col - 1];
      while (destiRow <= 7 && destiCol >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow += 1;
        destiCol -= 1;
      }
      [destiRow, destiCol] = [row - 1, col];
      while (destiRow >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow -= 1;
      }
      [destiRow, destiCol] = [row, col - 1];
      while (destiCol >= 0) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiCol -= 1;
      }
      [destiRow, destiCol] = [row + 1, col];
      while (destiRow <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiRow += 1;
      }
      [destiRow, destiCol] = [row, col + 1];
      while (destiCol <= 7) {
        if (position[destiRow][destiCol]) {
          if (isOpponent(piece, position[destiRow][destiCol]) && (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player))) moveable[destiRow][destiCol] = true;
          break;
        }
        else if (isSimulation ? true : movementSimulation(piece, row, col, destiRow, destiCol, position, player)) moveable[destiRow][destiCol] = true;
        destiCol += 1;
      }
      break;
    case "K":
    case "k": //king movement
      if (row > 0) {
        if (col > 0 && isOpponent(piece, position[row - 1][col - 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col - 1, position, player))) moveable[row - 1][col - 1] = true;
        if (col < 7 && isOpponent(piece, position[row - 1][col + 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col + 1, position, player))) moveable[row - 1][col + 1] = true;
        if (isOpponent(piece, position[row - 1][col]) && (isSimulation ? true : movementSimulation(piece, row, col, row - 1, col, position, player))) moveable[row - 1][col] = true;
      }
      if (row < 7) {
        if (col > 0 && isOpponent(piece, position[row + 1][col - 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col - 1, position, player))) moveable[row + 1][col - 1] = true;
        if (col < 7 && isOpponent(piece, position[row + 1][col + 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col + 1, position, player))) moveable[row + 1][col + 1] = true;
        if (isOpponent(piece, position[row + 1][col]) && (isSimulation ? true : movementSimulation(piece, row, col, row + 1, col, position, player))) moveable[row + 1][col] = true;
      }
      if (col > 0 && isOpponent(piece, position[row][col - 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row, col - 1, position, player))) moveable[row][col - 1] = true;
      if (col < 7 && isOpponent(piece, position[row][col + 1]) && (isSimulation ? true : movementSimulation(piece, row, col, row, col + 1, position, player))) moveable[row][col + 1] = true;
      break;
    default:
      break;
  }
}