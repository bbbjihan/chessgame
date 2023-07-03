import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { db, firebaseApp } from "../../firebase";
import { GameInformation, UserInform } from "../../utils/interfaces";
import { gameNumState } from "../../utils/recoil";
import { AlertRow, BoxRow, BoxTitle, BoxWrap, ButtonRow, ColorSelector, ColorSelectorRow, ColorSelectorWrap, InputOpponent, InputTitleRow, NewGameBox, NewGameButton, NewGameButtonContent, NewGameButtonString, NewGamePageWrap } from "./style";

const NewGame = () => {
  const [opponent, setOpponent] = useState("");
  const [colorSelected, setColorSelected] = useState("r");
  const [alert, setAlert] = useState("");
  const [userInforms, setUserInforms] = useState<UserInform[]>([]);
  const movePage = useNavigate();
  const auth = getAuth(firebaseApp);
  const [gameNum, setGameNum] = useRecoilState(gameNumState);
  const [currentUserInform, setCurrentUserInform] = useState<UserInform>({
    userID: "",
    name: "",
    title: "",
    win: 0,
    lose: 0,
    draw: 0
  });

  //userInform set
  useEffect(() => {
    const fetchUserInforms = async () => {
      const data = await getDocs(query(collection(db, "user")));
      const newData:UserInform[] = data.docs.map(doc => ({ ...{
        userID: (doc.id ? doc.id : ""),
        name: (doc.data().name ? doc.data().name : ""),
        title: (doc.data().title ? doc.data().title : ""),
        win: (doc.data().win ? doc.data().win : 0),
        draw: (doc.data().draw ? doc.data().draw : 0),
        lose: (doc.data().lose ? doc.data().lose : 0) 
      } }));
      setUserInforms(newData)
    }
    fetchUserInforms()
    .catch(err => console.log(`featchUserInforms err : ` + err));
  }, []);

  //userInform set
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
        setCurrentUserInform(userInform);
      }
    }
    redirectLobby()
    .catch(err => console.log(`redirectLobby err : ` + err));
  }, [auth.currentUser, movePage]);

  const createNewGame = async(opponentInform:UserInform) => {
    if (!auth.currentUser) {
      movePage("/");
    } else {
      setGameNum(prev => prev + 1);
      const time = new Date();
      const timeString = time.toISOString();
      let color = colorSelected;
      if(colorSelected === "r"){
        const R = Math.ceil((Math.random() * 10)) % 2;
        console.log(R);
        if(R === 0) color = "w"
        else color = "b"
      }
      let game:GameInformation = {
        gameNum: gameNum,
        startTime: timeString,
        black: (color === "w" ? currentUserInform : opponentInform),
        white: (color === "b" ? currentUserInform : opponentInform),
        FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0",
        state: "progress",
        notation: [],
        captured: [],
      }

      await addDoc(collection(db,"game"),game)
      .then(() => {
        movePage('/lobby');
      })
      .catch(err => console.log(`addDoc err : ` + err));
    }
  }

  const onNewGameClick = async () => {
    if(opponent === ""){
      setAlert("Enter the opponent's nickname.")
      return;
    }
    userInforms.forEach((userInform:UserInform) => {
      if(userInform.name === opponent){
        createNewGame(userInform);
        return;
      }
    })
    setAlert("Couldn't find nickname you entered.")
  }

  return (
    <NewGamePageWrap>
      <BoxWrap>
        <NewGameBox>
          <BoxTitle>
            Create new game
          </BoxTitle>
          <InputTitleRow>
            Opponent's nickname.
          </InputTitleRow>
          <BoxRow>
            <InputOpponent
              required
              placeholder="opponent nickname"
              type="text"
              value={opponent}
              onChange={(event) => { setOpponent(event.target.value) }}
            />
          </BoxRow>
          <AlertRow>
            {alert}
          </AlertRow>
          <InputTitleRow>
            Select color you want to play.
          </InputTitleRow>
          <ColorSelectorRow>
            <ColorSelectorWrap
              ColorSelected={colorSelected}
              Color="w"
              onClick={() => {
                setColorSelected("w");
              }}
            >
              <ColorSelector
                Color="w"
              >
                White
              </ColorSelector>
            </ColorSelectorWrap>
            <ColorSelectorWrap
              ColorSelected={colorSelected}
              Color="r"
              onClick={() => {
                setColorSelected("r");
              }}
            >
              <ColorSelector
                Color="r"
              >
                Random
              </ColorSelector>
            </ColorSelectorWrap>
            <ColorSelectorWrap
              ColorSelected={colorSelected}
              Color="b"
              onClick={() => {
                setColorSelected("b");
              }}
            >
              <ColorSelector
                Color="b"
              >
                Black
              </ColorSelector>
            </ColorSelectorWrap>
          </ColorSelectorRow>
          <ButtonRow>
            <NewGameButton
              onClick={onNewGameClick}
            >
              <NewGameButtonContent>
                <NewGameButtonString>Create New Game</NewGameButtonString>
              </NewGameButtonContent>
            </NewGameButton>
          </ButtonRow>
        </NewGameBox>
      </BoxWrap>
    </NewGamePageWrap>
  )
}

export default NewGame;