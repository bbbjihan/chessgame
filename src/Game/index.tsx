import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../firebase";
import { UserInform } from "../utils/interfaces";
import { notationState } from "../utils/notation";
import { FENState, blackCapturedPiecesState, castleState, enPassantState, fullMoveState, halfMoveState, pieceScoreState, positionState, rotateState, turnState, whiteCapturedPiecesState } from "../utils/recoil";
import ChessBoard from "./ChessBoard";
import GameInform from "./GameInform";
import PlayerCard from "./PlayerCard";
import { BottomGameInform, BottomRow, ChessBoardWrap, GameInformWrap, PageContent, PageWrap, PlayerAndBoard, PlayerCardWrap } from "./style";

const Game = () => {
  const FEN = useRecoilValue(FENState);
  const rotate = useRecoilValue(rotateState);
  const whiteCapturedPieces = useRecoilValue(whiteCapturedPiecesState);
  const blackCapturedPieces = useRecoilValue(blackCapturedPiecesState);
  const pieceScore = useRecoilValue(pieceScoreState);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const setWhiteCapturedPieces = useSetRecoilState(whiteCapturedPiecesState);
  const setBlackCapturedPieces = useSetRecoilState(blackCapturedPiecesState);
  const setPosition = useSetRecoilState(positionState);
  const setTurn = useSetRecoilState(turnState);
  const setCastle = useSetRecoilState(castleState);
  const setEnPassant = useSetRecoilState(enPassantState);
  const setHalfMove = useSetRecoilState(halfMoveState);
  const setFullMove = useSetRecoilState(fullMoveState);
  const setNotation = useSetRecoilState(notationState);

  const [white, setWhite] = useState<UserInform>({
    userID: "",
    name: "",
    title: "",
    win: 0,
    lose: 0,
    draw: 0
  })
  const [black, setBlack] = useState<UserInform>({
    userID: "",
    name: "",
    title: "",
    win: 0,
    lose: 0,
    draw: 0
  })

  useEffect(() => {
    const fetchGame = async() => {
      const gameID = searchParams.get("ID");
      const data = await getDocs(query(collection(db, "game")));
      data.forEach(doc => {
        if(doc.id === gameID){
          console.log(doc.data());
          setWhite(doc.data().white);
          setBlack(doc.data().black);
          setWhiteCapturedPieces([ ...doc.data().captured ].filter(x => (x === x.toUpperCase())))
          setBlackCapturedPieces([ ...doc.data().captured ].filter(x => (x !== x.toUpperCase())))
          const [position, turn, castle, enpassant, halfMove, fullMove] = doc.data().FEN.split(' ');
          setPosition(position);
          setTurn(turn);
          setCastle(castle);
          setEnPassant(enpassant);
          setHalfMove(halfMove);
          setFullMove(fullMove);
          setNotation(doc.data().notation);
        }
      })
    }

    fetchGame()
    .then(() => {})
    .catch(err => console.log(err))
  },[
    searchParams, setBlackCapturedPieces, setWhiteCapturedPieces, setCastle, setEnPassant, setFullMove, setHalfMove, setNotation, setPosition, setTurn
  ])

  return (
    <PageWrap>
      <PageContent>
        <PlayerAndBoard
          rotate={rotate}
        >
          <PlayerCardWrap>
            <PlayerCard
              name={black.name}
              win={black.win}
              lose={black.lose}
              draw={black.draw}
              title={black.title}
              color="b"
              capturedPieces={whiteCapturedPieces}
              pieceScore={- pieceScore[2]}
              state="normal"
            />
          </PlayerCardWrap>
          <ChessBoardWrap>
            <ChessBoard />
          </ChessBoardWrap>
          <PlayerCardWrap>
            <PlayerCard
              name={white.name}
              win={white.win}
              lose={white.lose}
              draw={white.draw}
              title={white.title}
              color="w"
              capturedPieces={blackCapturedPieces}
              pieceScore={pieceScore[2]}
              state="normal"
            />
          </PlayerCardWrap>
        </PlayerAndBoard>
        <GameInformWrap>
          <GameInform />
        </GameInformWrap>
      </PageContent>
      <BottomGameInform>
        <BottomRow>
          FEN: {FEN}
        </BottomRow>
      </BottomGameInform>
    </PageWrap>
  )
}

export default Game;