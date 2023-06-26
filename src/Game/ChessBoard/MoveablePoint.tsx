import { ReactElement } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pieceMovement } from '../../utils/functions';
import { moveableSquareState, movingPieceState, movingStartState, positionArrState, positionState, turnState } from '../../utils/recoil';
import { DotWrap, MoveableDot } from './style';

interface MoveablePointProps {
  destination: string
}

const MoveablePoint = ({ destination }: MoveablePointProps): ReactElement => {
  const positionArr = useRecoilValue(positionArrState);
  const movingPiece = useRecoilValue(movingPieceState);
  const movingStart = useRecoilValue(movingStartState);
  
  const setPosition = useSetRecoilState(positionState);
  const setTurn = useSetRecoilState(turnState);

  const resetMovingPiece = useResetRecoilState(movingPieceState);
  const resetMoveableSqaure = useResetRecoilState(moveableSquareState);
  const resetMovingStart = useResetRecoilState(movingStartState);

  const onClick = () => {
    pieceMovement(positionArr, setPosition, movingPiece, movingStart, destination)
    setTurn((prev)=>{
      if(prev === "w"){
        return "b"
      }else{
        return "w"
      }
    })
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