import { ReactElement } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { getSquareIndex } from "../../utils/functions";
import { moveableSquareState, positionArrState } from "../../utils/recoil";
import ChessPiece from "../ChessPiece";
import MoveablePoint from "./MoveablePoint";
import { Board, BoardBlock, BoardWrap, DarkSquare, LightSquare } from "./style";

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
                    // Square에서 isDark 라는 인자를 받아서 color가 dark인지 light 인지 판단하면 가독성이 더 좋아질 것 같네용
                    //
                    // <Square isDark={square === 0}>
                    //   {
                    //       moveable &&          // 삼항연산자는 가급적 피하는 것을 추천, 사실 지금처럼 && 도 선호하지는 않는데 이런식으로도 동작한다? 라는 느낌으로 남겨봤습니당
                    //         <MoveablePoint     // 나는 컴포넌트 렌더링 부분에서 삼항연산자 사용할 때에는 "" 말고 null을 리턴하는 편
                    //           destination={getSquareIndex(rowIndex, squareIndex)} />
                    //     }
                    //     {
                    //       !piece &&
                    //         <ChessPiece
                    //           piece={piece}
                    //           squareIndex={getSquareIndex(rowIndex, squareIndex)}
                    //           row={rowIndex}
                    //           col={squareIndex}
                    //         />
                    //     }
                    // </Square>
                    square === 0 ? (
                      <DarkSquare key={rowIndex * 10 + squareIndex}>
                        {moveable ? (
                          <MoveablePoint
                            destination={getSquareIndex(rowIndex, squareIndex)}
                          />
                        ) : (
                          ""
                        )}
                        {piece === "" ? (
                          ""
                        ) : (
                          <ChessPiece
                            piece={piece}
                            squareIndex={getSquareIndex(rowIndex, squareIndex)}
                            row={rowIndex}
                            col={squareIndex}
                          />
                        )}
                      </DarkSquare>
                    ) : (
                      <LightSquare key={rowIndex * 10 + squareIndex}>
                        {moveable ? (
                          <MoveablePoint
                            destination={getSquareIndex(rowIndex, squareIndex)}
                          />
                        ) : (
                          ""
                        )}
                        {piece === "" ? (
                          ""
                        ) : (
                          <ChessPiece
                            piece={piece}
                            squareIndex={getSquareIndex(rowIndex, squareIndex)}
                            row={rowIndex}
                            col={squareIndex}
                          />
                        )}
                      </LightSquare>
                    )
                  );
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
