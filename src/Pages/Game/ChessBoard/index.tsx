import { doc, updateDoc } from 'firebase/firestore';
import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { capturedPiecesSort, getNumberIndex, getPositionString, getSquareIndex } from "../../../utils/functions";
import { setUseStateType } from '../../../utils/interfaces';
import { getPieceMoveablePointToArr } from '../../../utils/pieceMove';
import ChessPiece from "../ChessPiece";
import { Board, BoardBlock, BoardRow, BoardWrap, DotWrap, MoveableDot, Square } from "./style";

interface ChessBoardProps {
  whoIsCurrentUser: string,
  position: string,
  rotate: boolean,
  enPassant: string,
  castle: string,
  turn: string,
  promotionPiece: string,
  checked: boolean[],
  checkMated: boolean[],
  halfMove: number,
  fullMove: number,
  whiteCapturedPieces: string[],
  blackCapturedPieces: string[],
  notation: string[],
  setChecked: setUseStateType<boolean[]>,
  setCheckMated: setUseStateType<boolean[]>,
  setIsDraw: setUseStateType<boolean>,
  setTurn: setUseStateType<string>,
  setNotation: setUseStateType<string[]>
  setWhiteCapturedPieces: setUseStateType<string[]>,
  setBlackCapturedPieces: setUseStateType<string[]>,
  setHalfMove: setUseStateType<number>,
  setFullMove: setUseStateType<number>,
  setEnPassant: setUseStateType<string>,
  setCastle: setUseStateType<string>,
  setPosition: setUseStateType<string>,
}

const ChessBoard = ({ whoIsCurrentUser, position, rotate, enPassant, castle, turn, halfMove, fullMove, whiteCapturedPieces, blackCapturedPieces, notation, setChecked, setCheckMated, setIsDraw, setTurn, setNotation, setWhiteCapturedPieces, setBlackCapturedPieces, setHalfMove, setFullMove, setEnPassant, setCastle, promotionPiece, setPosition, checked, checkMated }: ChessBoardProps): ReactElement => {
  const [positionArr, setPositionArr] = useState(new Array(8).fill("").map(() => new Array(8).fill("")));
  const [moveableSquare, setMoveableSquare] = useState<boolean[][]>(new Array(8).fill(false).map(() => new Array(8).fill(false)));
  const [whiteWholeMoveableSquare, setWhiteWholeMoveableSquare] = useState(new Array(8).fill(false).map(() => new Array(8).fill(false)));
  const [blackWholeMoveableSquare, setBlackWholeMoveableSquare] = useState(new Array(8).fill(false).map(() => new Array(8).fill(false)));
  const [movingPiece, setMovingPiece] = useState("");
  const [movingStart, setMovingStart] = useState("");
  const [destination, setDestination] = useState("");
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

  //positionArr state autoatically renewal
  useEffect(() => {
    const positionSplited: string[] = position.split('/');
    let newPositionArr: string[][] = []
    positionSplited.forEach((row: string, rowIndex: number) => {
      const rowSplited: string[] = row.split('');
      let rowArr: string[] = []
      rowSplited.forEach((square: string, squareIndex: number) => {
        if (parseInt(square)) {
          for (let i = 0; i < parseInt(square); i++) rowArr.push("")
        } else {
          rowArr.push(square)
        }
      })

      newPositionArr.push(rowArr);
    })
    setPositionArr(newPositionArr)
  }, [position])

  //wholeMoveableSquare automatically renewal
  useEffect(() => {
    let whiteMoveable: boolean[][] = new Array(8).fill(false).map(() => new Array(8).fill(false));
    let blackMoveable: boolean[][] = new Array(8).fill(false).map(() => new Array(8).fill(false));
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (positionArr[i][j] === positionArr[i][j].toUpperCase()) getPieceMoveablePointToArr(positionArr[i][j], i, j, positionArr, whiteMoveable, enPassant, castle);
        if (positionArr[i][j] !== positionArr[i][j].toUpperCase()) getPieceMoveablePointToArr(positionArr[i][j], i, j, positionArr, blackMoveable, enPassant, castle);
      }
    }
    setWhiteWholeMoveableSquare(whiteMoveable);
    setBlackWholeMoveableSquare(blackMoveable);
  }, [castle, enPassant, positionArr])

  //check checked when position is changed
  useEffect(() => {
    let whiteKingPosition: [number, number] = [-1, -1];
    let blackKingPosition: [number, number] = [-1, -1];
    let whiteCntMoveable = 0;
    let blackCntMoveable = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (positionArr[i][j] === "K") whiteKingPosition = [i, j];
        if (positionArr[i][j] === "k") blackKingPosition = [i, j];
        if (whiteWholeMoveableSquare[i][j]) whiteCntMoveable += 1;
        if (blackWholeMoveableSquare[i][j]) blackCntMoveable += 1;
      }
    }
    if (whiteKingPosition[0] === -1 || whiteKingPosition[1] === -1 || blackKingPosition[0] === -1 || blackKingPosition[1] === -1) {
      return;
    }
    const whiteChecked = blackWholeMoveableSquare[whiteKingPosition[0]][whiteKingPosition[1]];
    const blackChecked = whiteWholeMoveableSquare[blackKingPosition[0]][blackKingPosition[1]];
    setChecked([whiteChecked, blackChecked]);
    let whiteCheckmated = false;
    let blackCheckmated = false;
    let staleMated = false;
    if (turn === "w") {
      if (!whiteCntMoveable) {
        if (whiteChecked) {
          whiteCheckmated = true;
        } else {
          staleMated = true;
        }
      }
    } else {
      if (!blackCntMoveable) {
        if (blackChecked) {
          blackCheckmated = true;
        } else {
          staleMated = true;
        }
      }
    }
    setCheckMated([whiteCheckmated, blackCheckmated])
    setIsDraw(staleMated)
  }, [positionArr, whiteWholeMoveableSquare, blackWholeMoveableSquare, turn, setCheckMated, setChecked, setIsDraw])

  //render moveablePoint when clicked Piece
  useEffect(() => {
    if(whoIsCurrentUser === "s" || (whoIsCurrentUser === "w" && turn === "b") || (whoIsCurrentUser === "b" && turn === "w")){
      return;
    }

    const [row, col]: [number, number] = getNumberIndex(movingStart);
    let moveable = new Array(8).fill(false).map(() => new Array(8).fill(false));

    //console.log(`The piece "${piece}" is Selected. Index is ${getSquareIndex(row, col)}(${row}/${col})`)

    if (movingStart === ""
      || movingPiece === ""
      || (movingPiece === movingPiece.toUpperCase()) !== (turn === "w")
    ) { //not your turn.
      setMoveableSquare(moveable);
      return;
    }

    getPieceMoveablePointToArr(movingPiece, row, col, positionArr, moveable, enPassant, castle);
    setMoveableSquare(moveable);
  }, [movingPiece, movingStart, castle, positionArr, enPassant, turn])

  //pieceMove when clicked moveablePoint
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if(destination === "") return;
    const pieceMove = async() => {
      if(destination === "") return Error;
      let captured = false;
      //pieceMove
      let result: string[][] = new Array(8).fill("").map(() => new Array(8).fill(""))
      for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) result[i][j] = positionArr[i][j];

      const [startRow, startCol]: [number, number] = getNumberIndex(movingStart);
      const [destiRow, destiCol]: [number, number] = getNumberIndex(destination);

      //set halfMoveState
      if (movingPiece === "P" || movingPiece === "p") {
        setHalfMove(0);
      } else {
        setHalfMove(prev => (parseInt(prev.toString()) + 1));
      }

      //set fullMoveState
      if (turn === "b") {
        setFullMove(prev => (parseInt(prev.toString()) + 1))
      };

      //set enpassantState
      if (movingPiece === "P" && movingStart[1] === '2' && destination[1] === '4') {
        setEnPassant(`${movingStart[0]}3`)
      } else if (movingPiece === "p" && movingStart[1] === '7' && destination[1] === '5') {
        setEnPassant(`${movingStart[0]}6`)
      } else {
        setEnPassant("-");
      }

      //handle castling
      if (movingPiece === "K" && Math.abs(getNumberIndex(movingStart)[1] - getNumberIndex(destination)[1]) > 1) {
        if (getNumberIndex(destination)[1] === 6) {//kingside castle
          result[7][7] = "";
          result[7][5] = "R";
        } else if (getNumberIndex(destination)[1] === 2) {//queenside castle
          result[7][0] = "";
          result[7][3] = "R";
        }
      }
      if (movingPiece === "k" && Math.abs(getNumberIndex(movingStart)[1] - getNumberIndex(destination)[1]) > 1) {
        if (getNumberIndex(destination)[1] === 6) {//kingside castle
          result[0][7] = "";
          result[0][5] = "r";
        } else if (getNumberIndex(destination)[1] === 2) {//queenside castle
          result[0][0] = "";
          result[0][3] = "r";
        }
      }

      //capture piece
      const target = positionArr[destiRow][destiCol];
      if (target !== "") {
        if (target === target.toUpperCase()) {
          setWhiteCapturedPieces(prev => capturedPiecesSort([...prev, target]))
        } else {
          setBlackCapturedPieces(prev => capturedPiecesSort([...prev, target]))
        }
        setHalfMove(0);
        captured = true;
      } else {
      }

      //handle enpassant(capture)
      if (destination === enPassant) {
        const enpassantIndex = getNumberIndex(enPassant);
        if (movingPiece === "P") {
          result[enpassantIndex[0] + 1][enpassantIndex[1]] = "";
          setBlackCapturedPieces(prev => capturedPiecesSort([...prev, "p"]))
          captured = true;
        } else if (movingPiece === "p") {
          result[enpassantIndex[0] - 1][enpassantIndex[1]] = "";
          setWhiteCapturedPieces(prev => capturedPiecesSort([...prev, "P"]))
          captured = true;
        }
      }

      //handle castling posibility
      let castleRenewal: string | string[] = castle;
      if (!(castleRenewal === "-")) {
        castleRenewal = castleRenewal.split('');
        if (movingPiece === "r") {
          if (movingStart === "a8") {
            castleRenewal = castleRenewal.filter((x) => x !== "q");
          } else if (movingStart === "h8") {
            castleRenewal = castleRenewal.filter((x) => x !== "k");
          }
        } else if (movingPiece === "R") {
          if (movingStart === "a1") {
            castleRenewal = castleRenewal.filter((x) => x !== "Q");
          } else if (movingStart === "h1") {
            castleRenewal = castleRenewal.filter((x) => x !== "K");
          }
        } else if (movingPiece === "k") {
          castleRenewal = castleRenewal.filter((x) => x !== "q" && x !== "k");
        } else if (movingPiece === "K") {
          castleRenewal = castleRenewal.filter((x) => x !== "Q" && x !== "K");
        } else if (destination === "a8") {
          castleRenewal = castleRenewal.filter((x) => x !== "q");
        } else if (destination === "h8") {
          castleRenewal = castleRenewal.filter((x) => x !== "k");
        } else if (destination === "a0") {
          castleRenewal = castleRenewal.filter((x) => x !== "Q");
        } else if (destination === "h0") {
          castleRenewal = castleRenewal.filter((x) => x !== "K");
        }

        if (castleRenewal.length === 0) {
          setCastle("-")
        } else {
          setCastle(castleRenewal.join(''));
        }
      }

      result[startRow][startCol] = "";

      //handle promotion
      if (destiRow === 0 && movingPiece === "P") {
        result[destiRow][destiCol] = promotionPiece;
      } else if (destiRow === 7 && movingPiece === "p") {
        result[destiRow][destiCol] = promotionPiece.toLowerCase();
      } else {
        result[destiRow][destiCol] = movingPiece;
      }

      const resultString = getPositionString(result);
      //console.log(`move ${movingPiece} from ${movingStart}(${startRow}/${startCol}) to ${destination}(${destiRow}/${destiCol}), result is ${resultString}.`)
      setPosition(resultString);//setNotations
      let newNot = ``;
      if ((movingPiece === "K" || movingPiece === "k") && Math.abs(getNumberIndex(movingStart)[1] - getNumberIndex(destination)[1]) > 1) {
        if (getNumberIndex(destination)[1] === 6) {//kingside castle
          newNot = `O-O`;
        } else if (getNumberIndex(destination)[1] === 2) {//queenside castle
          newNot = `O-O-O`;
        }
      } else {
        if (movingPiece === "P" || movingPiece === "p") {
          if (captured) {
            newNot = `${movingStart[0]}x${destination}`
          } else {
            newNot = `${destination}`
          }
          if (destination[1] === "8" && movingPiece === "P") {
            newNot += `=${promotionPiece}`
          } else if (destination[1] === "1" && movingPiece === "p") {
            newNot += `=${promotionPiece.toLowerCase()}`
          }
        } else {
          newNot = `${movingPiece.toUpperCase()}${captured ? `x` : ``}${destination}`
        }
      }
      if (checkMated[0] || checkMated[1]) newNot += `#`;
      else if (checked[0] || checked[1]) newNot += `+`;
      setNotation(prev => [...prev, newNot])
    }
    pieceMove()
    .then(() => {
      setTurn((prev) => prev === "w" ? "b" : "w");
      setMoveableSquare(new Array(8).fill(false).map(() => new Array(8).fill(false)));
      setMovingPiece("");
      setMovingStart("");
      setDestination("");
    })
    .catch(err => console.log(`pieceMove error : ` + err))
  }, [destination])

  //pieceMove upload when piece moved
  useEffect(() => {
    if(position === "8/8/8/8/8/8/8/8") return;
    const uploadMove = async() => {
      const gameID = searchParams.get("ID");
      if(typeof gameID === "string"){
        const docRef = doc(db,"game",gameID);
        updateDoc(docRef, {
          FEN: `${position} ${turn} ${castle} ${enPassant} ${halfMove} ${fullMove}`,
          captured: [...whiteCapturedPieces, ...blackCapturedPieces],
          notation: notation
        })
      }
    }
    uploadMove()
    .catch(err => console.log(`uploadMove error : ` + err))
  },[notation])
  
  return (
    <BoardWrap>
      <BoardBlock>
        <Board
          rotate={rotate}
        >
          {board.map((row: number[], rowIndex: number) => {
            return (
              <BoardRow
                key={rowIndex}
              >
                {row.map((_, squareIndex: number) => {
                  const renderSquareIndex = rotate ? (7 - squareIndex) : squareIndex;
                  const piece = positionArr[rowIndex][renderSquareIndex];
                  const moveable = moveableSquare[rowIndex][renderSquareIndex];
                  return (
                    <Square
                      isDark={row[renderSquareIndex] === 0}
                      key={rowIndex * 10 + renderSquareIndex}
                    >
                      {
                        moveable &&
                        <DotWrap onClick={() => {
                          setDestination(getSquareIndex(rowIndex, renderSquareIndex))
                        }}>
                          <MoveableDot />
                        </DotWrap>
                      }
                      {
                        piece &&
                        <ChessPiece
                          piece={piece}
                          squareIndex={getSquareIndex(rowIndex, renderSquareIndex)}
                          setMovingPiece={setMovingPiece}
                          setMovingStart={setMovingStart}
                        />
                      }
                    </Square>
                  )
                })}
              </BoardRow>
            );
          })}
        </Board>
      </BoardBlock>
    </BoardWrap>
  );
};
export default ChessBoard;
