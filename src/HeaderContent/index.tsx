import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { HeaderWrap, LogOutButton, LogOutButtonContent, LogOutButtonString, LogOutButtonWrap } from "./style";

const HeaderContent = () => {
  const auth = getAuth();
  const movePage = useNavigate();
  const onLogOutClick = async () => {
    auth.signOut()
      .then(() => {
        movePage("/");
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <HeaderWrap>
        CHESSGAME
      </HeaderWrap>
      {auth.currentUser &&
        <LogOutButtonWrap
          onClick={onLogOutClick}
        >
          <LogOutButtonContent>
            <LogOutButton />
            <LogOutButtonString>
              LogOut
            </LogOutButtonString>
          </LogOutButtonContent>
        </LogOutButtonWrap>
      }
    </>
  )
}

export default HeaderContent;