import { atom, selector } from "recoil";

export const FENState = selector<string>({
  key: "FENState",
  get: (({get}) => {
    const position:string = get(positionState);
    const turn:string = get(turnState);
    const castle:string = get(castleState);
    const enPassant:string = get(enPassantState);
    const halfMove:string = get(halfMoveState).toString();
    const fullMove:string = get(fullMoveState).toString();

    return `${position} ${turn} ${castle} ${enPassant} ${halfMove} ${fullMove}`;
  })
})

export const positionState = atom<string>({
  key: "positionState",
  default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
})

export const positionArrState = selector<string[][]>({
  key: "positionArr",
  get: (({get}) => {
    const positionSplited:string[] = get(positionState).split('/');
    let positionArr:string[][] = []

    positionSplited.forEach((row:string, rowIndex:number) => {
      const rowSplited:string[] = row.split('');
      let rowArr:string[] = []

      rowSplited.forEach((square:string, squareIndex:number) => {
        if(parseInt(square)){
          for(let i = 0; i < parseInt(square); i++) rowArr.push("")
        }else{
          rowArr.push(square)
        }
      })

      positionArr.push(rowArr);
    })
    return positionArr
  })
})

export const moveableSquareState = atom<boolean[][]>({
  key: "moveableSquareState",
  default: new Array(8).fill(false).map(() => new Array(8).fill(false))
})

export const turnState = atom<string>({
  key: "turnState",
  default: "w"
})

export const castleState = atom<string>({
  key: "castleState",
  default: "KQkq"
})

export const enPassantState = atom<string>({
  key: "enPassantState",
  default: "-"
})

export const halfMoveState = atom<number>({
  key: "halfMoveState",
  default: 0
})

export const fullMoveState = atom<number>({
  key: "fullMoveState",
  default: 0
})

export const movingPieceState = atom<string>({
  key: "movingPieceState",
  default: ""
})

export const movingStartState = atom<string>({
  key: "movingStartState",
  default: ""
})

export const pieceCapturedState = atom<string[]>({
  key: "pieceCapturedState",
  default: []
})