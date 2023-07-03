import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { authService, db, firebaseApp } from "../../firebase";
import { BoxRow, BoxTitle, BoxWrap, ButtonRow, CancelButton, CancelButtonContent, CancelButtonString, GoogleLogIn, GoogleLogInButtonContent, GoogleLogInString, GoogleLogo, HR, InputEmail, InputPW, LogInBox, LogInButton, LogInButtonContent, LogInButtonString, LogInPageWrap, SignUpButton, SignUpButtonContent, SignUpButtonString } from "./style";

const LogIn = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const movePage = useNavigate();
  const auth = getAuth(firebaseApp);

  const LogIn = async () => {
    const data = await getDocs(query(collection(db, "user"), where("userID", "==", auth.currentUser?.uid)));
    const newData = data.docs.map(doc => ({ ...doc.data()}));
    if(newData.length > 0){
      movePage("/lobby")
    }else{
      movePage("/entername") 
    }
  }

  const onLogInClick = async () => {
    var reg_email = /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(inputEmail)) {
      window.alert("이메일 양식이 유효하지 않습니다.");
      return;
    } else if (inputPW.length < 6) {
      window.alert("비밀번호를 6자리 이상 입력해주세요.");
      return;
    }
    await signInWithEmailAndPassword(authService, inputEmail, inputPW)
      .then(() => {
        LogIn().catch(err => console.log(`LogIn err : ` + err));
      })
      .catch(err => {
        setInputEmail("")
        setInputPW("")
        window.alert("아이디와 비밀번호가 유효하지 않습니다.");
      });
  }

  const onGoogleLoginClick = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authService, provider)
      .then((data) => {
        LogIn().catch(err => console.log(`LogIn err : ` + err));
      })
      .catch(err => console.log(`onGoogleLoginClick err : ` + err));
  }

  const onSignUpClick = async () => {
    var reg_email = /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(inputEmail)) {
      window.alert("이메일 양식이 유효하지 않습니다.");
      return;
    } else if (inputPW.length < 6) {
      window.alert("비밀번호를 6자리 이상 입력해주세요.");
      return;
    }
    await createUserWithEmailAndPassword(authService, inputEmail, inputPW)
      .then(() => {
        setIsSignUp(false);
        setInputEmail("");
        setInputPW("");
      }
      )
      .catch(err => {
        window.alert("이미 존재하는 email입니다.");
      });
  }

  return (
    <LogInPageWrap>
      <BoxWrap>
        <LogInBox>
          <BoxTitle>
            {isSignUp ? `Sign up to your account` : `Log in to your account`}
          </BoxTitle>
          <BoxRow>
            <InputEmail
              required
              placeholder="Email"
              type="text"
              value={inputEmail}
              onChange={(event) => { setInputEmail(event.target.value) }}
              onKeyPress={(e) => {
                if (!isSignUp && e.key === 'Enter') {
                  onLogInClick();
                } else if (isSignUp && e.key === 'Enter') {
                  onSignUpClick();
                }
              }}
            />
          </BoxRow>
          <BoxRow>
            <InputPW
              required
              placeholder="Password"
              type="password"
              value={inputPW}
              onChange={(event) => { setInputPW(event.target.value) }}
              onKeyPress={(e) => {
                if (!isSignUp && e.key === 'Enter') {
                  onLogInClick();
                } else if (isSignUp && e.key === 'Enter') {
                  onSignUpClick();
                }
              }}
            />
          </BoxRow>

          {isSignUp ?
            <>
              <ButtonRow>
                <SignUpButton
                  onClick={() => {
                    onSignUpClick();
                  }}
                >
                  <SignUpButtonContent>
                    <SignUpButtonString>Sign Up</SignUpButtonString>
                  </SignUpButtonContent>
                </SignUpButton>
              </ButtonRow>
              <ButtonRow>
                <CancelButton
                  onClick={() => { setIsSignUp(false) }}
                >
                  <CancelButtonContent>
                    <CancelButtonString>Cancel</CancelButtonString>
                  </CancelButtonContent>
                </CancelButton>
              </ButtonRow>
            </>
            :
            <>
              <ButtonRow>
                <LogInButton
                  onClick={onLogInClick}
                >
                  <LogInButtonContent>
                    <LogInButtonString>Log In</LogInButtonString>
                  </LogInButtonContent>
                </LogInButton>
              </ButtonRow>
              <ButtonRow>
                <SignUpButton
                  onClick={() => { setIsSignUp(true) }}
                >
                  <SignUpButtonContent>
                    <SignUpButtonString>Sign Up</SignUpButtonString>
                  </SignUpButtonContent>
                </SignUpButton>
              </ButtonRow>
              <br />
              <br />
              <HR />
              <ButtonRow>
                <GoogleLogIn
                  onClick={onGoogleLoginClick}
                >
                  <GoogleLogInButtonContent>
                    <GoogleLogo />
                    <GoogleLogInString>Continue with Google</GoogleLogInString>
                  </GoogleLogInButtonContent>
                </GoogleLogIn>
              </ButtonRow>
            </>
          }

        </LogInBox>
      </BoxWrap>
    </LogInPageWrap>
  )
}

export default LogIn;