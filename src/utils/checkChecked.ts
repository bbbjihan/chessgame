import { atom, selector } from "recoil";
import { positionArrState } from "./recoil";

export const checkedState = atom<[boolean, boolean]>({
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

export const blackMoveablePointsState = selector({
  key: "blackMoveablePointsState",
  get: (({get}) => {
    const positionArr = get(positionArrState);
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
      }
    }
  })
})

export const whiteMoveablePointsState = selector({
  key: "whiteMoveablePointsState",
  get: (({get}) => {
    
  })
})