import { ReactElement } from "react"
import { Row } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { moveableSquareState, positionArrState } from "../../utils/recoil"
import ChessPiece from "../ChessPiece"
import MoveablePoint from "./MoveablePoint"
import { Board, BoardBlock, BoardWrap, DarkSquare, LightSquare } from "./style"

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
    [1, 0, 1, 0, 1, 0, 1, 0]
  ]
  return (
    <BoardWrap>
      <BoardBlock>
        <Board>
          {board.map((row: number[], rowIndex: number) => {
            return (
              <Row key={rowIndex}>
                {row.map((square: number, squareIndex: number) => {
                  const piece = position[rowIndex][squareIndex]
                  return (
                    square === 0 ?
                      <DarkSquare
                        key={rowIndex * 10 + squareIndex}
                      >
                        <MoveablePoint/>
                        {piece === "" ?
                          ""
                          :
                          <ChessPiece
                            piece={piece}
                            squareIndex={getSquareIndex(rowIndex,squareIndex)}
                            row={rowIndex}
                            col={squareIndex}
                          />
                        }
                      </DarkSquare>
                      :
                      <LightSquare
                        key={rowIndex * 10 + squareIndex}
                      >
                        {piece === "" ?
                          ""
                          :
                          <ChessPiece
                            piece={piece}
                            squareIndex={getSquareIndex(rowIndex,squareIndex)}
                            row={rowIndex}
                            col={squareIndex}
                          />
                        }
                      </LightSquare>
                  )
                })}
              </Row>
            )
          })}
        </Board>
      </BoardBlock>
    </BoardWrap>
  )
}

const getSquareIndex = (row:number, column:number):string => {
  const rank = ["a","b","c","d","e","f","g","h"]
  return `${rank[column]}${8 - row}`
}

export default ChessBoard