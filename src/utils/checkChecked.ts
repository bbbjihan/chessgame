import { atom, selector } from "recoil";
import { getPieceMoveablePointToArr } from "./pieceMove";
import { positionArrState } from "./recoil";

export const checkedState = atom<boolean[]>({
  key: "checkedState",
  default: [false, false]
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

    let whiteMoveable: boolean[][] = new Array(8).fill(false).map(() => new Array(8).fill(false));
    let blackMoveable: boolean[][] = new Array(8).fill(false).map(() => new Array(8).fill(false));

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
          if (position[i][j] === position[i][j].toUpperCase()) getPieceMoveablePointToArr(position[i][j], i, j, position, whiteMoveable);
          if (position[i][j] !== position[i][j].toUpperCase()) getPieceMoveablePointToArr(position[i][j], i, j, position, blackMoveable);
      }
    }

      set(whiteWholeMoveablePointArrState, whiteMoveable);
      set(blackWholeMoveablePointArrState, blackMoveable);
  })
})

export const setCheckedState = selector({
  key: "setCheckedState",
  get: () => { },
  set: (({ get, set }) => {
    const position: string[][] = get(positionArrState);
    const whiteMoveable: boolean[][] = get(whiteWholeMoveablePointArrState);
    const blackMoveable: boolean[][] = get(blackWholeMoveablePointArrState);

    let whiteKingPosition: [number, number] = [-1, -1];
    let blackKingPosition: [number, number] = [-1, -1];

    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        if (position[i][j] === "K") whiteKingPosition = [i, j];
        if (position[i][j] === "k") blackKingPosition = [i, j];
      }
    }
    set(checkedState, [blackMoveable[whiteKingPosition[0]][whiteKingPosition[1]], whiteMoveable[blackKingPosition[0]][blackKingPosition[1]]]);
  })
})