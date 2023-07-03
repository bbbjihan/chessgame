import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { db, firebaseApp } from "../../firebase";
import { UserInform } from "../../utils/interfaces";
import Loading from "../Loading";
import ChessBoard from "./ChessBoard";
import GameInform from "./GameInform";
import PlayerCard from "./PlayerCard";
import { BottomGameInform, BottomRow, ChessBoardWrap, GameInformWrap, PageContent, PageWrap, PlayerAndBoard, PlayerCardWrap } from "./style";

const Game = () => {
  const [gameLoading, setGameLoading] = useState(true);

  const [FEN, setFEN] = useState<string>(" w KQkq - 0 0");
  const [position, setPosition] = useState<string>("8/8/8/8/8/8/8/8");
  const [turn, setTurn] = useState<string>("w");
  const [castle, setCastle] = useState<string>("KQkq");
  const [enPassant, setEnPassant] = useState<string>("-");
  const [halfMove, setHalfMove] = useState<number>(0);
  const [fullMove, setFullMove] = useState<number>(0);
  useEffect(() => {
    setFEN(`${position} ${turn} ${castle} ${enPassant} ${halfMove} ${fullMove}`)
  }, [position, turn, castle, enPassant, fullMove, halfMove])

  const [rotate, setRotate] = useState<boolean>(false);
  const [whiteCapturedPieces, setWhiteCapturedPieces] = useState<string[]>([]);
  const [blackCapturedPieces, setBlackCapturedPieces] = useState<string[]>([]);

  const [checked, setChecked] = useState<boolean[]>([false, false]);
  const [checkMated, setCheckMated] = useState<boolean[]>([false, false]);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const [promotionPiece, setPromotionPiece] = useState<string>("Q");

  const [pieceScore, setPieceScore] = useState<number[]>([0, 0, 0]);
  //pieceScore automatically renewal
  useEffect(() => {
    let pieceScore = [0, 0, 0]
    const positionSplited: string[] = position.split('/');
    positionSplited.forEach((row: string, rowIndex: number) => {
      row.split('').forEach((square: string, squareIndex: number) => {
        switch (square) {
          case "p":
            pieceScore[1] += 1;
            break;
          case "n":
            pieceScore[1] += 3;
            break;
          case "b":
            pieceScore[1] += 3;
            break;
          case "r":
            pieceScore[1] += 5;
            break;
          case "q":
            pieceScore[1] += 9;
            break;
          case "P":
            pieceScore[0] += 1;
            break;
          case "N":
            pieceScore[0] += 3;
            break;
          case "B":
            pieceScore[0] += 3;
            break;
          case "R":
            pieceScore[0] += 5;
            break;
          case "Q":
            pieceScore[0] += 9;
            break;
        }
      })
    })
    pieceScore[2] = pieceScore[0] - pieceScore[1];
    setPieceScore(pieceScore)
  }, [position])

  const [blackPlayer, setBlackPlayer] = useState<UserInform>({
    userID: "",
    name: "",
    title: "",
    win: 0,
    lose: 0,
    draw: 0
  })
  const [whitePlayer, setWhitePlayer] = useState<UserInform>({
    userID: "",
    name: "",
    title: "",
    win: 0,
    lose: 0,
    draw: 0
  })
  const [notation, setNotation] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [whoIsCurrentUser, setWhoIsCurrentUser] = useState<string>("");
  const auth = getAuth(firebaseApp);

  //first rendering
  useEffect(() => {
    const fetchInforms = async () => {
      const gameID = searchParams.get("ID");
      if (typeof gameID === "string") {
        const gameRef = doc(db, "game", gameID);
        const gameDoc = await getDoc(gameRef);
        console.log(gameDoc.data()!.white);
        const [Dposition, Dturn, Dcastle, Denpassant, DhalfMove, DfullMove] = gameDoc.data()!.FEN.split(' ');
        setWhitePlayer(gameDoc.data()!.white);
        setBlackPlayer(gameDoc.data()!.black);
        setWhiteCapturedPieces([...gameDoc.data()!.captured].filter(x => (x === x.toUpperCase())))
        setBlackCapturedPieces([...gameDoc.data()!.captured].filter(x => (x !== x.toUpperCase())))
        setPosition(Dposition);
        setTurn(Dturn);
        setCastle(Dcastle);
        setEnPassant(Denpassant);
        setHalfMove(DhalfMove);
        setFullMove(DfullMove);
        setNotation(gameDoc.data()!.notation);
        
        if (gameDoc.data()!.white.userID === auth.currentUser?.uid) {
          setWhoIsCurrentUser("w")
        } else if (gameDoc.data()!.black.userID === auth.currentUser?.uid) {
          setWhoIsCurrentUser("b")
          setRotate(true);
        } else {
          setWhoIsCurrentUser("n")
        }
      }
    }
    fetchInforms()
      .then(() => { setGameLoading(false) });
  }, [searchParams])

  //get game inform repetively
  useEffect(() => {
    const fetchGame = async () => {
      const gameID = searchParams.get("ID");
      if (typeof gameID === "string") {
        const gameRef = doc(db, "game", gameID);
        const gameDoc = await getDoc(gameRef);
        const DFEN = gameDoc.data()!.FEN
        if (DFEN === FEN) return;
        const [Dposition, Dturn, Dcastle, Denpassant, DhalfMove, DfullMove] = DFEN.split(' ');
        setWhitePlayer(gameDoc.data()!.white);
        setBlackPlayer(gameDoc.data()!.black);
        setWhiteCapturedPieces([...gameDoc.data()!.captured].filter(x => (x === x.toUpperCase())))
        setBlackCapturedPieces([...gameDoc.data()!.captured].filter(x => (x !== x.toUpperCase())))
        setPosition(Dposition);
        setTurn(Dturn);
        setCastle(Dcastle);
        setEnPassant(Denpassant);
        setHalfMove(DhalfMove);
        setFullMove(DfullMove);
        setNotation(gameDoc.data()!.notation);
      }
    }
    let timer = setInterval(() => {
      fetchGame()
        .catch(err => console.log(`fetchGame err : ` + err))
    }, 3000);
    return () => clearInterval(timer);
  }, [searchParams])


  return (
    <PageWrap>
      {gameLoading && <Loading />}
      <PageContent>
        <PlayerAndBoard
          rotate={rotate}
        >
          <PlayerCardWrap>
            <PlayerCard
              name={blackPlayer.name}
              win={blackPlayer.win}
              lose={blackPlayer.lose}
              draw={blackPlayer.draw}
              title={blackPlayer.title}
              color="b"
              capturedPieces={whiteCapturedPieces}
              pieceScore={- pieceScore[2]}
              state="normal"
            />
          </PlayerCardWrap>
          <ChessBoardWrap>
            <ChessBoard
              whoIsCurrentUser={whoIsCurrentUser}
              position={position}
              rotate={rotate}
              enPassant={enPassant}
              castle={castle}
              turn={turn}
              promotionPiece={promotionPiece}
              checked={checked}
              checkMated={checkMated}
              halfMove={halfMove}
              fullMove={fullMove}
              whiteCapturedPieces={whiteCapturedPieces}
              blackCapturedPieces={blackCapturedPieces}
              notation={notation}
              setChecked={setChecked}
              setCheckMated={setCheckMated}
              setIsDraw={setIsDraw}
              setTurn={setTurn}
              setNotation={setNotation}
              setWhiteCapturedPieces={setWhiteCapturedPieces}
              setBlackCapturedPieces={setBlackCapturedPieces}
              setHalfMove={setHalfMove}
              setFullMove={setFullMove}
              setEnPassant={setEnPassant}
              setCastle={setCastle}
              setPosition={setPosition}
            />
          </ChessBoardWrap>
          <PlayerCardWrap>
            <PlayerCard
              name={whitePlayer.name}
              win={whitePlayer.win}
              lose={whitePlayer.lose}
              draw={whitePlayer.draw}
              title={whitePlayer.title}
              color="w"
              capturedPieces={blackCapturedPieces}
              pieceScore={pieceScore[2]}
              state="normal"
            />
          </PlayerCardWrap>
        </PlayerAndBoard>
        <GameInformWrap>
          <GameInform
            notation={notation}
            setRotate={setRotate}
            checked={checked}
            checkMated={checkMated}
            isDraw={isDraw}
            turn={turn}
          />
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