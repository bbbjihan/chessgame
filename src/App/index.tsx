import HeaderContent from "../HeaderContent";
import Routers from "../Routers";
import { AppWrap, Body, Header } from "./style";

function App() {
  return (
    <AppWrap>
      <Header>
        <HeaderContent/>
      </Header>
      <Body>
        <Routers />
      </Body>
    </AppWrap>
  );
}

export default App;