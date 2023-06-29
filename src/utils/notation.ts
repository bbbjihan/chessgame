import { atom, selector } from "recoil";
import { checkMatedState, checkedState } from "./checkChecked";
import { getNumberIndex } from "./functions";
import { capturedState, destinationState, movingPieceState, movingStartState } from "./recoil";

export const notationState = atom<string[]>({
  key: "notationState",
  default: []
})

export const setNotationState = selector({
  key: "setNotationState",
  get: () => { },
  set: ({ get, set }) => {
    const movingPiece = get(movingPieceState);
    const movingStart = get(movingStartState);
    const destination = get(destinationState);
    const checked = get(checkedState);
    const checkMated = get(checkMatedState);
    const captured = get(capturedState);

    let newNot = ``;
    if((movingPiece === "K" || movingPiece === "k") && Math.abs(getNumberIndex(movingStart)[1] - getNumberIndex(destination)[1]) > 1){
      if(getNumberIndex(destination)[1] === 6){//kingside castle
        newNot = `O-O`;
      }else if(getNumberIndex(destination)[1] === 2){//queenside castle
        newNot = `O-O-O`;
      }
    }else{
      if(movingPiece === "P" || movingPiece === "p"){
        if(captured){
          newNot = `${movingStart[0]}x${destination}`
        }else{
          newNot = `${destination}`
        }
      }else{
        newNot = `${movingPiece.toUpperCase()}${captured ? `x` : ``}${destination}`
        if(checkMated[0] || checkMated[1]) newNot += `#`
        else if(checked[0] || checked[1]) newNot += `+`
      }
    }
    set(notationState, prev => [...prev, newNot])
  }
})