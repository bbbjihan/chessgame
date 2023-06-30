import { getAuth } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { ReactElement, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import PieceImg from '../Game/ChessPiece/PieceImg';
import { db, firebase } from '../firebase';
import { lobbyGamesState } from "../utils/recoil";
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

interface UserInform {
  name : string,
  title : string,
  win : number,
  lose : number,
  draw : number
}

const Lobby = (): ReactElement => {
  const games = useRecoilValue(lobbyGamesState);
  const movePage = useNavigate();
  const auth = getAuth(firebase);
  const [userInform, setUserInform] = useState<UserInform>({
    name : "",
    title : "",
    win : 0,
    lose : 0,
    draw : 0
  });

  useEffect(() => {
    const redirectLobby = async () => {
      if (!auth.currentUser) {
        movePage("/");
      }else{
        const querySnapshot = await getDocs(query(collection(db, "user")));
        querySnapshot.forEach((doc) => {
          if(auth.currentUser?.uid === doc.id){
            const userInform: UserInform = {
              name : (doc.data().name ? doc.data().name : ``),
              title: (doc.data().title ? doc.data().title : ``),
              win: (doc.data().win ? parseInt(doc.data().win) : 0),
              lose: (doc.data().lose ? parseInt(doc.data().lose) : 0),
              draw: (doc.data().draw ? parseInt(doc.data().draw) : 0)
            }
            setUserInform(userInform);
          }
        })
      }
    }
    redirectLobby().catch(err => console.log(err));
  }, [auth.currentUser, movePage]);

  return (
    <LobbyPageWrap>
      <ProfileWrapWrap>
      <ProfileWrap>
        <UserProfile>
          <UserNameWrap>
            <UserName>{userInform.name? userInform.name : ``}</UserName>
          </UserNameWrap>
          <ProfileLine/>
          <UserTitleWrap>
            <UserTitle>{userInform.title? userInform.title : ``}</UserTitle>
          </UserTitleWrap>
          <ProfileLine/>
          <UserRecordWrap>
            <UserRecord>{userInform.win?userInform.win:`0`} / {userInform.draw?userInform.draw:`0`} / {userInform.lose?userInform.lose:`0`} {`( ${userInform.win + userInform.draw === 0 ? `0` : `${(userInform.win * 100 / (userInform.win+userInform.lose)).toFixed(2)}`}% )`}</UserRecord>
          </UserRecordWrap>
          <ProfileLine/>
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
            {games.slice().reverse().map((game) => {
              return (
                <GameCard>
                  <GameNumber>
                    {game.gameID}
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
                          <PlayerTitle>{game.white.title}</PlayerTitle>
                        </PlayerInformRow>
                        <PlayerInformRow>
                          <PlayerRecord>{game.white.record}</PlayerRecord>
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
                          <PlayerTitle>{game.black.title}</PlayerTitle>
                        </PlayerInformRow>
                        <PlayerInformRow>
                          <PlayerRecord>{game.black.record}</PlayerRecord>
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
            })}
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