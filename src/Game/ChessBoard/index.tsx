import { ReactElement } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { getSquareIndex } from "../../utils/functions";
import { moveableSquareState, positionArrState, rotateState } from "../../utils/recoil";
import ChessPiece from "../ChessPiece";
import MoveablePoint from "./MoveablePoint";
import { Board, BoardBlock, BoardWrap, Square } from "./style";

const ChessBoard = (): ReactElement => {
  const position = useRecoilValue(positionArrState);
  const moveableSquare = useRecoilValue(moveableSquareState);
  const rotate = useRecoilValue(rotateState);
  const board: number[][] = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ];
  return (
    <BoardWrap>
      <BoardBlock>
        <Board
          rotate={rotate}
        >
          {board.map((row: number[], rowIndex: number) => {
            return (
              <Row
                key={rowIndex}
                rotate={rotate}
              >
                {row.map((_, squareIndex: number) => {
                  const renderSquareIndex = rotate ? (7 - squareIndex) : squareIndex;
                  const piece = position[rowIndex][renderSquareIndex];
                  const moveable = moveableSquare[rowIndex][renderSquareIndex];
                  return (
                    <Square
                      isDark={row[renderSquareIndex] === 0}
                      key={rowIndex * 10 + renderSquareIndex}
                    >
                      {
                        moveable &&
                        <MoveablePoint
                          destination={getSquareIndex(rowIndex, renderSquareIndex)}
                        />
                      }
                      {
                        piece &&
                        <ChessPiece
                          piece={piece}
                          squareIndex={getSquareIndex(rowIndex, renderSquareIndex)}
                          row={rowIndex}
                          col={renderSquareIndex}
                        />
                      }
                    </Square>
                  )
                })}
              </Row>
            );
          })}
        </Board>
      </BoardBlock>
    </BoardWrap>
  );
};
export default ChessBoard;
