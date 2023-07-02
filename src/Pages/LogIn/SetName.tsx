import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, firebaseApp } from "../../firebase";
import { UserInform } from "../../utils/interfaces";
import { BoxRow, BoxTitle, BoxWrap, ButtonRow, InputPW, LogInBox, LogInButton, LogInButtonContent, LogInButtonString, LogInPageWrap } from "./style";

const SetName = (): ReactElement => {
  const [inputNickname, setInputNickname] = useState("");
  const userDocRef = collection(db, "user");
  const movePage = useNavigate();
  const auth = getAuth(firebaseApp);

  const onSetNameClick = async() => {
    const userInform:UserInform = {
      userID : auth.currentUser?.uid,
      name: inputNickname,
      title: "newbie",
      win: 0,
      draw: 0,
      lose: 0
    }
    await addDoc(userDocRef, userInform)
    .then(req => {
      console.log(req);
      movePage("/lobby");
    })
    .catch(err => console.log(err))
  }

  return (
    <LogInPageWrap>
      <BoxWrap>
        <LogInBox>
          <BoxTitle>
            Enter your Nickname.
          </BoxTitle>
          <BoxRow>
            <InputPW
              required
              placeholder="Nickname"
              type="text"
              value={inputNickname}
              onChange={(event) => { setInputNickname(event.target.value) }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSetNameClick();
                }
              }}
            />
          </BoxRow>
          <ButtonRow>
            <LogInButton
              onClick={onSetNameClick}
            >
              <LogInButtonContent>
                <LogInButtonString>Set Nickname</LogInButtonString>
              </LogInButtonContent>
            </LogInButton>
          </ButtonRow>
        </LogInBox>
      </BoxWrap>
    </LogInPageWrap>
  )
}

export default SetName;