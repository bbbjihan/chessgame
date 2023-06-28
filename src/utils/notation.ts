import { atom, selector } from "recoil";
import { checkMatedState, checkedState } from "./checkChecked";
import { destinationState, movingPieceState, turnState } from "./recoil";

export const notationState = atom<string[]>({
  key: "notationState",
  default: []
})

export const setNotationState = selector({
  key: "setNotationState",
  get: () => { },
  set: ({ get, set }) => {
    const turn = get(turnState);
    const movingPiece = get(movingPieceState);
    const destination = get(destinationState);
    const checked = get(checkedState);
    const checkMated = get(checkMatedState);

    const newNot = `${
      movingPiece === "P" || movingPiece === "p" ?
      ``
      :
      movingPiece.toUpperCase()
      }${destination
      }${
        (turn === "w" ? checked[0] : checked[1]) ?
        `+`
        :
        ``
      }${
        (turn === "w" ? checkMated[0] : checkMated[1]) ?
        `#`
        :
        ``
      }`
      set(notationState,prev => [...prev, newNot])
  }
})