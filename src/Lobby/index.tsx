import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ReactElement, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import PieceImg from '../Game/ChessPiece/PieceImg';
import { db } from '../firebase';
import { GameInformation, UserInform } from '../utils/interfaces';
import { lobbyGamesState } from "../utils/recoil";
import { firebaseApp } from './../firebase';
import { BoardWrap, GameCard, GameCardBoard, GameCardPlayers, GameCardState, GameList, GameNumber, LobbyBox, LobbyBoxWrap, LobbyPageWrap, LobbyTitle, LobbyTitleWrap, NewGameButton, NewGameButtonWrap, PlayerColor, PlayerInformRow, PlayerInforms, PlayerLeft, PlayerName, PlayerRecord, PlayerRight, PlayerTitle, ProfileLine, ProfileWrap, ProfileWrapWrap, Square, UserName, UserNameWrap, UserProfile, UserRecord, UserRecordWrap, UserTitle, UserTitleWrap } from "./style";

interface RenderBoardProps {
  FEN: string
}

const RenderBoard = ({ FEN }: RenderBoardProps): ReactElement => {
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
  const position = FEN.split(' ')[0].split('/');
  let positionArr: string[][] = [];
  position.forEach((row: string, rowIndex: number) => {
    const rowSplited: string[] = row.split('');
    let rowArr: string[] = []
    rowSplited.forEach((square: string, squareIndex: number) => {
      if (parseInt(square)) {
        for (let i = 0; i < parseInt(square); i++) rowArr.push("")
      } else {
        rowArr.push(square)
      }
    })
    positionArr.push(rowArr);
  })
  return (
    <>
      {board.map((row: number[], rowIndex: number) => {
        return (
          <Row
            key={rowIndex}
          >
            {row.map((_, squareIndex: number) => {
              const piece = positionArr[rowIndex][squareIndex];
              return (
                <Square
                  isDark={row[squareIndex] === 0}
                  key={rowIndex * 10 + squareIndex}
                >
                  {
                    piece &&
                    <PieceImg
                      piece={piece}
                      width="100%"
                      height="1.25rem"
                    />
                  }
                </Square>
              )
            })}
          </Row>
        );
      })}
    </>
  )
}


const Lobby = (): ReactElement => {
  const [games, setGames] = useRecoilState(lobbyGamesState);
  const movePage = useNavigate();
  const auth = getAuth(firebaseApp);
  const [userInform, setUserInform] = useState<UserInform>({
    userID: "",
    name: "",
    title: "",
    win: 0,
    lose: 0,
    draw: 0
  });

  useEffect(() => {
    const getGames = async () => {
      const data = await getDocs(query(collection(db, "game")));
      const gamesData:GameInformation[] = [];
      data.docs.forEach(async (gameDoc) => {
        const gameData = {
          gameID: gameDoc.id,
          gameNum: gameDoc.data().gameNum,
          startTime: gameDoc.data().startTime,
          black: {
            userID: gameDoc.data().black.userID,
            name: gameDoc.data().black.name,
            win: gameDoc.data().black.win,
            lose: gameDoc.data().black.lose,
            draw: gameDoc.data().black.draw,
            title: gameDoc.data().black.title,
          },
          white: {
            userID: gameDoc.data().white.userID,
            name: gameDoc.data().white.name,
            win: gameDoc.data().white.win,
            lose: gameDoc.data().white.lose,
            draw: gameDoc.data().white.draw,
            title: gameDoc.data().white.title,
          },
          FEN: gameDoc.data().FEN,
          state: gameDoc.data().state,
          notation: gameDoc.data().notation,
          captured: gameDoc.data().captured,
        }
        gamesData.push(gameData);
      })
      setGames(gamesData);
    }
    getGames()
      .catch(err => console.log(err));
  }, [setGames])

  useEffect(() => {
    const redirectLobby = async () => {
      if (!auth.currentUser) {
        movePage("/");
      } else {
        const data = await getDocs(query(collection(db, "user"), where("userID", "==", auth.currentUser?.uid)));
        const newData = data.docs.map(doc => ({ ...doc.data() }))[0];
        const userInform: UserInform = {
          userID: (newData.userID ? newData.userID : ``),
          name: (newData.name ? newData.name : ``),
          title: (newData.title ? newData.title : ``),
          win: (newData.win ? parseInt(newData.win) : 0),
          lose: (newData.lose ? parseInt(newData.lose) : 0),
          draw: (newData.draw ? parseInt(newData.draw) : 0)
        }
        setUserInform(userInform);
      }
    }
    redirectLobby().catch(err => console.log(err));
  }, [auth.currentUser, movePage]);

  const onGameCardClick = (gameID:string) => {
    movePage(`/game?ID=${gameID}`)
  }

  return (
    <LobbyPageWrap>
      <ProfileWrapWrap>
        <ProfileWrap>
          <UserProfile>
            <UserNameWrap>
              <UserName>{userInform.name ? userInform.name : ``}</UserName>
            </UserNameWrap>
            <ProfileLine />
            <UserTitleWrap>
              <UserTitle>{userInform.title ? userInform.title : ``}</UserTitle>
            </UserTitleWrap>
            <ProfileLine />
            <UserRecordWrap>
              <UserRecord>{userInform.win ? userInform.win : `0`} / {userInform.draw ? userInform.draw : `0`} / {userInform.lose ? userInform.lose : `0`} {`( ${userInform.win + userInform.draw === 0 ? `0` : `${(userInform.win * 100 / (userInform.win + userInform.lose)).toFixed(2)}`}% )`}</UserRecord>
            </UserRecordWrap>
            <ProfileLine />
            <NewGameButtonWrap>
              <NewGameButton>NEW GAME</NewGameButton>
            </NewGameButtonWrap>
          </UserProfile>
        </ProfileWrap>
      </ProfileWrapWrap>
      <LobbyBoxWrap>
        <LobbyBox>
          <LobbyTitleWrap>
            <LobbyTitle>LOBBY</LobbyTitle>
          </LobbyTitleWrap>
          <GameList>
            {games ?
              games.slice().reverse().map((game) => {
                return (
                  <GameCard
                    onClick={()=>{
                      onGameCardClick(game.gameID);
                    }}
                  >
                    <GameNumber>
                      {game.gameNum}
                    </GameNumber>
                    <GameCardPlayers>
                      <PlayerInforms>
                        <PlayerLeft>
                          <PlayerColor
                            color='w'
                          />
                        </PlayerLeft>
                        <PlayerRight>
                          <PlayerInformRow>
                            <PlayerName>{game.white.name}</PlayerName>
                          </PlayerInformRow>
                          <PlayerInformRow>
                            <PlayerTitle>{game.white.title}</PlayerTitle>
                          </PlayerInformRow>
                          <PlayerInformRow>
                            <PlayerRecord>{game.white.win ? game.white.win : `0`} / {game.white.draw ? game.white.draw : `0`} / {game.white.lose ? game.white.lose : `0`} {`( ${game.white.win + game.white.draw === 0 ? `0` : `${(game.white.win * 100 / (game.white.win + game.white.lose)).toFixed(2)}`}% )`}</PlayerRecord>
                          </PlayerInformRow>
                        </PlayerRight>
                      </PlayerInforms>
                      <PlayerInforms>
                        <PlayerLeft>
                          <PlayerColor
                            color='b'
                          />
                        </PlayerLeft>
                        <PlayerRight>
                          <PlayerInformRow>
                            <PlayerName>{game.black.name}</PlayerName>
                          </PlayerInformRow>
                          <PlayerInformRow>
                            <PlayerTitle>{game.black.title}</PlayerTitle>
                          </PlayerInformRow>
                          <PlayerInformRow>
                            <PlayerRecord>{game.black.win ? game.black.win : `0`} / {game.black.draw ? game.black.draw : `0`} / {game.black.lose ? game.black.lose : `0`} {`( ${game.black.win + game.black.draw === 0 ? `0` : `${(game.black.win * 100 / (game.black.win + game.black.lose)).toFixed(2)}`}% )`}</PlayerRecord>
                          </PlayerInformRow>
                        </PlayerRight>
                      </PlayerInforms>
                    </GameCardPlayers>
                    <BoardWrap>
                      <GameCardBoard>
                        <RenderBoard
                          FEN={game.FEN}
                        />
                      </GameCardBoard>
                    </BoardWrap>
                    <GameCardState>
                      {game.state}
                    </GameCardState>
                  </GameCard>
                )
              })
              :
              ``
            }
          </GameList>
        </LobbyBox>
      </LobbyBoxWrap>
    </LobbyPageWrap>
  )
}

export default Lobby;

/*
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
*/

/*
      <ChatBoxWrap>
        <ChatBox>
          CHATTING
        </ChatBox>
      </ChatBoxWrap>
*/