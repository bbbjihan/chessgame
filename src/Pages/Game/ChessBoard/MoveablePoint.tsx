import { ReactElement } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { setCheckedState, setMoveablePointArrState } from "../../../utils/checkChecked";
import { setNotationState } from "../../../utils/notation";
import { pieceMoveState } from "../../../utils/pieceMove";
import {
  destinationState,
  moveableSquareState,
  movingPieceState,
  movingStartState,
  turnState
} from "../../../utils/recoil";
import { DotWrap, MoveableDot } from "./style";

interface MoveablePointProps {
  destination: string;
}

const MoveablePoint = ({ destination }: MoveablePointProps): ReactElement => {
  const setTurn = useSetRecoilState(turnState);
  const setDestination = useSetRecoilState(destinationState);

  const resetMovingPiece = useResetRecoilState(movingPieceState);
  const resetMoveableSqaure = useResetRecoilState(moveableSquareState);
  const resetMovingStart = useResetRecoilState(movingStartState);
  const resetDestination = useResetRecoilState(destinationState);

  const pieceMove = useSetRecoilState(pieceMoveState);
  const setMoveablePoints = useSetRecoilState(setMoveablePointArrState);
  const setChecked = useSetRecoilState(setCheckedState);
  const setNotation = useSetRecoilState(setNotationState);

  const onClick = () => {
    setDestination(destination);

    pieceMove();
    
    setTurn((prev) => prev === "w" ? "b" : "w");

    setMoveablePoints();
    setChecked();
    setNotation();

    resetMoveableSqaure();
    resetMovingPiece();
    resetMovingStart();
    resetDestination();
  };

  return (
    <DotWrap onClick={onClick}>
      <MoveableDot />
    </DotWrap>
  );
};

export default MoveablePoint;
