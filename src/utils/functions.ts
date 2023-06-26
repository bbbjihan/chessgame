export const getSquareIndex = (row: number, column: number): string => {
  const rank = ["a", "b", "c", "d", "e", "f", "g", "h"]
  return `${rank[column]}${8 - row}`
}

export const getNumberIndex = (square: string): [number, number] => {
  const rank = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const col = rank.findIndex((e) => e === square[0])
  return [8 - parseInt(square[1]),col]
}

export const getPositionString = (positionArr:string[][]): string => {
  let positionString = ""
  let blinkCounter = 0;
  positionArr.forEach((row, rowIndex)=>{
    row.forEach((col) => {
      if(col === "") blinkCounter++;
      else{
        positionString += `${blinkCounter === 0 ? `` : `${blinkCounter}`}${col}`
        blinkCounter = 0;
      }
    })
    positionString += `${blinkCounter === 0 ? `` : `${blinkCounter}`}`
    blinkCounter = 0;
    if(rowIndex !== positionArr.length - 1) positionString += "/"
  })
  return positionString
}

export const pieceMovement = (positionArr:string[][], setPosition:Function, movingPiece:string, movingStart:string, destination:string):void => {

  let result:string[][] = new Array(8).fill("").map(() => new Array(8).fill(""))
  for(let i = 0; i < 8; i++) for(let j = 0; j < 8; j++) result[i][j] = positionArr[i][j];

  const [startRow, startCol]:[number, number] = getNumberIndex(movingStart);
  const [destiRow, destiCol]:[number, number] = getNumberIndex(destination);

  console.log(result);
  console.log(result[startRow][startCol])
  result[startRow][startCol] = "";
  result[destiRow][destiCol] = movingPiece;

  const resultString = getPositionString(result);
  console.log(`move ${movingPiece} from ${movingStart}(${startRow}/${startCol}) to ${destination}(${destiRow}/${destiCol}), result is ${resultString}.`)

  setPosition(resultString);
}