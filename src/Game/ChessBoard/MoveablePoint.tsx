import { ReactElement } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pieceMovement } from '../../utils/functions';
import { moveableSquareState, movingPieceState, movingStartState, positionArrState, positionState } from '../../utils/recoil';
import { DotWrap, MoveableDot } from './style';

interface MoveablePointProps {
  destination: string
}

const MoveablePoint = ({ destination }: MoveablePointProps): ReactElement => {
  const positionArr = useRecoilValue(positionArrState);
  const setPosition = useSetRecoilState(positionState);
  const movingPiece = useRecoilValue(movingPieceState);
  const movingStart = useRecoilValue(movingStartState);
  const resetMovingPiece = useResetRecoilState(movingPieceState);
  const resetMoveableSqaure = useResetRecoilState(moveableSquareState);
  const resetMovingStart = useResetRecoilState(movingStartState);

  const onClick = () => {
    pieceMovement(positionArr, setPosition, movingPiece, movingStart, destination)
    resetMoveableSqaure();
    resetMovingPiece();
    resetMovingStart();
  }
  
  return (
    <DotWrap
      onClick={onClick}
    >
      <MoveableDot />
    </DotWrap>
  )
}

export default MoveablePoint;