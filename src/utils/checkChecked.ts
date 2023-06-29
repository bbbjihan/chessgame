import { atom, selector } from "recoil";
import { getPieceMoveablePointToArr } from "./pieceMove";
import { castleState, enPassantState, positionArrState, turnState } from "./recoil";

export const checkedState = atom<boolean[]>({
  key: "checkedState",
  default: [false, false]
})

export const checkMatedState = atom<boolean[]>({
  key: "checkMatedState",
  default: [false, false]
})

export const drawState = atom<boolean>({
  key: "drawState",
  default: false
})

export const whiteWholeMoveablePointArrState = atom({
  key: "whiteWholeMoveablePointArrState",
  default: new Array(8).fill(false).map(() => new Array(8).fill(false))
})

export const blackWholeMoveablePointArrState = atom({
  key: "blackWholeMoveablePointArrState",
  default: new Array(8).fill(false).map(() => new Array(8).fill(false))
})

/**
 * setMoveablePointArr
 * turn state의 값에 따라 차례를 확인하고, 각 차례가 지날 때마다 차례를 넘긴 플레이어가 기물을 움직일 수 있게 된 모든 영역을 확인해서 각 플레이어의 moveablePointArrState에 저장함.
 * 이를 통해 check여부와 상대 플레이어가 king을 둘 수 있는 위치가 어딘 지를 확인할 수 있게 해줌
 */
export const setMoveablePointArrState = selector({
  key: "setMoveablePointArrState",
  get: () => { },
  set: (({ get, set }) => {
    const position: string[][] = get(positionArrState);
    const enpassant = get(enPassantState);
    const castle = get(castleState);

    let whiteMoveable: boolean[][] = new Array(8).fill(false).map(() => new Array(8).fill(false));
    let blackMoveable: boolean[][] = new Array(8).fill(false).map(() => new Array(8).fill(false));

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (position[i][j] === position[i][j].toUpperCase()) getPieceMoveablePointToArr(position[i][j], i, j, position, whiteMoveable, enpassant, castle);
        if (position[i][j] !== position[i][j].toUpperCase()) getPieceMoveablePointToArr(position[i][j], i, j, position, blackMoveable, enpassant, castle);
      }
    }

    set(whiteWholeMoveablePointArrState, whiteMoveable);
    set(blackWholeMoveablePointArrState, blackMoveable);
  })
})

/**
 * 기물 이동 후 갱신된 각 플레이어들의 moveable State를 통해 킹이 위협받고 있는지와 기물을 움직일 수 있는지 확인. 체크와 메이트 여부 갱신
 */
export const setCheckedState = selector({
  key: "setCheckedState",
  get: () => { },
  set: (({ get, set }) => {
    const position: string[][] = get(positionArrState);
    const whiteMoveable: boolean[][] = get(whiteWholeMoveablePointArrState);
    const blackMoveable: boolean[][] = get(blackWholeMoveablePointArrState);
    const turn: string = get(turnState);

    let whiteKingPosition: [number, number] = [-1, -1];
    let blackKingPosition: [number, number] = [-1, -1];
    let whiteCntMoveable = 0;
    let blackCntMoveable = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (position[i][j] === "K") whiteKingPosition = [i, j];
        if (position[i][j] === "k") blackKingPosition = [i, j];
        if (whiteMoveable[i][j]) whiteCntMoveable += 1;
        if (blackMoveable[i][j]) blackCntMoveable += 1;
      }
    }

    const whiteChecked = blackMoveable[whiteKingPosition[0]][whiteKingPosition[1]];
    const blackChecked = whiteMoveable[blackKingPosition[0]][blackKingPosition[1]];
    set(checkedState, [whiteChecked, blackChecked]);

    let whiteCheckmated = false;
    let blackCheckmated = false;
    let staleMated = false;
    if(turn === "w"){
      if(!whiteCntMoveable){
        if(whiteChecked){
          whiteCheckmated = true;
        }else{
          staleMated = true;
        }
      }
    }else{
      if(!blackCntMoveable){
        if(blackChecked){
          blackCheckmated = true;
        }else{
          staleMated = true;
        }
      }
    }

    set(checkMatedState, [whiteCheckmated, blackCheckmated]);
    set(drawState, staleMated)
  })
})