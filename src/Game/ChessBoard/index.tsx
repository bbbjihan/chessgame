import { ReactElement } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { getSquareIndex } from "../../utils/functions";
import { moveableSquareState, positionArrState } from "../../utils/recoil";
import ChessPiece from "../ChessPiece";
import MoveablePoint from "./MoveablePoint";
import { Board, BoardBlock, BoardWrap, Square } from "./style";

const ChessBoard = (): ReactElement => {
  const position = useRecoilValue(positionArrState);
  const moveableSquare = useRecoilValue(moveableSquareState);
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
        <Board>
          {board.map((row: number[], rowIndex: number) => {
            return (
              <Row key={rowIndex}>
                {row.map((square: number, squareIndex: number) => {
                  const piece = position[rowIndex][squareIndex];
                  const moveable = moveableSquare[rowIndex][squareIndex];
                  return (
                    <Square
                      isDark={square === 0}
                      key={rowIndex * 10 + squareIndex}
                    >
                      {
                        moveable &&
                        <MoveablePoint
                          destination={getSquareIndex(rowIndex, squareIndex)}
                        />
                      }
                      {
                        piece &&
                        <ChessPiece
                          piece={piece}
                          squareIndex={getSquareIndex(rowIndex, squareIndex)}
                          row={rowIndex}
                          col={squareIndex}
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
