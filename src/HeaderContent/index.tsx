import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, BackButtonWrap, HeaderButtonContent, HeaderButtonString, HeaderLogo, HeaderWrap, LogOutButton, LogOutButtonWrap } from "./style";

const HeaderContent = () => {
  const auth = getAuth();
  const movePage = useNavigate();
  const location = useLocation();

  const onBackClick = () => {
    movePage("lobby");
  }

  const onLogOutClick = async () => {
    auth.signOut()
      .then(() => {
        movePage("/");
      })
      .catch(err => console.log(`onLogOutClick error : ` + err))
  }
  return (
    <HeaderWrap>
    {(location.pathname === "/game" || location.pathname === "/newgame") && (
        <BackButtonWrap
          onClick={onBackClick}
        >
          <HeaderButtonContent>
            <BackButton />
            <HeaderButtonString>
              Back
            </HeaderButtonString>
          </HeaderButtonContent>
        </BackButtonWrap>
    )}
      <HeaderLogo>
        CHESSGAME
      </HeaderLogo>
      {auth.currentUser &&
        <LogOutButtonWrap
          onClick={onLogOutClick}
        >
          <HeaderButtonContent>
            <LogOutButton />
            <HeaderButtonString>
              LogOut
            </HeaderButtonString>
          </HeaderButtonContent>
        </LogOutButtonWrap>
      }
    </HeaderWrap>
  )
}

export default HeaderContent;