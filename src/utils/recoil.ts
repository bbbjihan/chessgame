import { atom, selector } from "recoil";
import { GameInformation } from "./interfaces";

export const rotateState = atom<boolean>({
  key: "rotateState",
  default: false
})

export const FENState = selector({
  key: "FENState",
  get: (({ get }) => {
    const position: string = get(positionState);
    const turn: string = get(turnState);
    const castle: string = get(castleState);
    const enPassant: string = get(enPassantState);
    const halfMove: string = get(halfMoveState).toString();
    const fullMove: string = get(fullMoveState).toString();

    return `${position} ${turn} ${castle} ${enPassant} ${halfMove} ${fullMove}`;
  })
})

export const positionState = atom<string>({
  key: "positionState",
  default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
})
//기본 시작 포지션"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
//스테일메이트 테스트용 포지션 "8/8/8/8/8/5K2/Q7/5k2"
//캐슬링 테스트용 포지션 "r3k2r/8/8/8/8/8/8/R3K2R"

export const positionArrState = selector<string[][]>({
  key: "positionArrState",
  get: (({ get }) => {
    const positionSplited: string[] = get(positionState).split('/');
    let positionArr: string[][] = []

    positionSplited.forEach((row: string, rowIndex: number) => {
      const rowSplited: string[] = row.split('');
      let rowArr: string[] = []

      rowSplited.forEach((square: string, squareIndex: number) => {
        if (parseInt(square)) {
          for (let i = 0; i < parseInt(square); i++) rowArr.push("")
        } else {
          rowArr.push(square)
        }
      })

      positionArr.push(rowArr);
    })
    return positionArr
  })
})

export const pieceScoreState = selector<number[]>({
  key: "pieceScoreState",
  get: (({ get }) => {
    let pieceScore = [0, 0, 0]
    const positionSplited: string[] = get(positionState).split('/');
    positionSplited.forEach((row: string, rowIndex: number) => {
      row.split('').forEach((square: string, squareIndex: number) => {
        switch (square) {
          case "p":
            pieceScore[1] += 1;
            break;
          case "n":
            pieceScore[1] += 3;
            break;
          case "b":
            pieceScore[1] += 3;
            break;
          case "r":
            pieceScore[1] += 5;
            break;
          case "q":
            pieceScore[1] += 9;
            break;
          case "P":
            pieceScore[0] += 1;
            break;
          case "N":
            pieceScore[0] += 3;
            break;
          case "B":
            pieceScore[0] += 3;
            break;
          case "R":
            pieceScore[0] += 5;
            break;
          case "Q":
            pieceScore[0] += 9;
            break;
        }
      })
    })
    pieceScore[2] = pieceScore[0] - pieceScore[1];
    return pieceScore;
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

export const destinationState = atom<string>({
  key: "destinationState",
  default: ""
})

export const whiteCapturedPiecesState = atom<string[]>({
  key: "whiteCapturedPiecesState",
  default: []
})

export const blackCapturedPiecesState = atom<string[]>({
  key: "blackCapturedPiecesState",
  default: []
})

export const capturedState = atom<boolean>({
  key: "capturedState",
  default: false
})

export const lobbyGamesState = atom<GameInformation[]|undefined>({
  key: "lobbyGamesState",
  default: []
})