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