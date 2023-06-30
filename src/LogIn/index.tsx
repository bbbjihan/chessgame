import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { authService, firebase } from "../firebase";
import { BoxRow, BoxTitle, BoxWrap, ButtonRow, CancelButton, CancelButtonContent, CancelButtonString, GoogleLogIn, GoogleLogInButtonContent, GoogleLogInString, GoogleLogo, HR, InputEmail, InputPW, LogInBox, LogInButton, LogInButtonContent, LogInButtonString, LogInPageWrap, SignUpButton, SignUpButtonContent, SignUpButtonString } from "./style";

const LogIn = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const movePage = useNavigate();
  const auth = getAuth(firebase);

  useEffect(() => {
    const redirectLobby = async () => {
      if (auth.currentUser) {
        movePage("/lobby");
      }
    }
    redirectLobby().catch(err => console.log(err));
  }, [auth.currentUser, movePage]);

  const onLogInClick = async () => {
    var reg_email = /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(inputEmail)){
      window.alert("이메일 양식이 유효하지 않습니다.");
      return;
    }else if(inputPW.length < 6){
      window.alert("비밀번호를 6자리 이상 입력해주세요.");
      return;
    }
    await signInWithEmailAndPassword(authService, inputEmail, inputPW)
      .then(() => {
        movePage("/lobby");
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
      .then(() => {
        movePage("/lobby");
      })
      .catch(err => console.log(err));
  }

  const onSignUpClick = async () => {
    var reg_email = /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(inputEmail)){
      window.alert("이메일 양식이 유효하지 않습니다.");
      return;
    }else if(inputPW.length < 6){
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
          <BoxTitle>Log in to your account</BoxTitle>
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
                }else if(isSignUp && e.key === 'Enter'){
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
                }else if(isSignUp && e.key === 'Enter'){
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
                    <svg preserveAspectRatio="xMidYMin" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" ><path fillRule="evenodd" clipRule="evenodd" d="M19.5303 11.4697C19.8232 11.7626 19.8232 12.2374 19.5303 12.5303L12.5303 19.5303C12.2374 19.8232 11.7626 19.8232 11.4697 19.5303C11.1768 19.2374 11.1768 18.7626 11.4697 18.4697L17.1893 12.75L5 12.75C4.58579 12.75 4.25 12.4142 4.25 12C4.25 11.5858 4.58579 11.25 5 11.25L17.1893 11.25L11.4697 5.53033C11.1768 5.23744 11.1768 4.76256 11.4697 4.46967C11.7626 4.17678 12.2374 4.17678 12.5303 4.46967L19.5303 11.4697Z"></path></svg>
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