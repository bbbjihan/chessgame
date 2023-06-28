import { ReactElement } from "react";
import { useSetRecoilState } from "recoil";
import { renderMoveablePointState } from "../../utils/pieceMove";
import { movingPieceState, movingStartState } from "../../utils/recoil";
import PieceImg from './PieceImg';
import { ChessPieceWrap } from "./style";

interface ChessPieceProps {
  piece: string
  squareIndex: string
  row: number
  col: number
}

const ChessPiece = ({ piece, squareIndex }: ChessPieceProps): ReactElement => {
  const setMovingPiece = useSetRecoilState(movingPieceState);
  const setMovingStart = useSetRecoilState(movingStartState);
  const renderMoveablePoint = useSetRecoilState(renderMoveablePointState);

  const handleMove = () => {
    setMovingPiece(piece);
    setMovingStart(squareIndex);
    renderMoveablePoint();
  }

  return (
    <ChessPieceWrap
      onClick={handleMove}
    >
      <PieceImg
        piece={piece}
        width="100%"
        height="100%"
      />
    </ChessPieceWrap>
  )
}

export default ChessPiece;