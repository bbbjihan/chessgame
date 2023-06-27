import { ReactElement } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { pieceMoveState } from "../../utils/pieceMove";
import {
  destinationState,
  moveableSquareState,
  movingPieceState,
  movingStartState,
  turnState,
} from "../../utils/recoil";
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

  const pieceMove = useSetRecoilState(pieceMoveState);
  const onClick = () => {
    setDestination(destination);
    pieceMove();

    setTurn((prev) => {
      // prev === "w" ? "b" : "w" //여기서는 삼항연산자도 가독성이 좋아보이긴 하네요
      if (prev === "w") {
        return "b";
      } else {
        return "w";
      }
    });

    resetMoveableSqaure();
    resetMovingPiece();
    resetMovingStart();
    setDestination("");
  };

  return (
    <DotWrap onClick={onClick}>
      <MoveableDot />
    </DotWrap>
  );
};

export default MoveablePoint;
