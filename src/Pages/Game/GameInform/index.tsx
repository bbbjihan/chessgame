import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkMatedState, checkedState, drawState } from "../../../utils/checkChecked";
import { notationState } from "../../../utils/notation";
import { rotateState, turnState } from "../../../utils/recoil";
import { Bottom, ForMaxWidth, GameInformWrap, GameStateRow, Middle, NotationBlack, NotationNum, NotationRow, NotationWhite, NotationWrap, RotateButton, RotateButtonWrap, TimeMachineRow, Top, TopLeft, TopRight } from "./style";

const RenderNotation = () => {
  const notations = useRecoilValue(notationState);
  let rows = []
  let row = [];
  for (let i = 0; i < notations.length; i++) {
    if (i % 2) {
      row.push(<NotationBlack>{notations[i]}</NotationBlack>)
      rows.push(
        <NotationRow>
          {row.map((x) => x)}
        </NotationRow>
      )
      row = [];
    } else {
      row.push(<NotationNum>{Math.ceil(i / 2) + 1}</NotationNum>)
      row.push(<NotationWhite>{notations[i]}</NotationWhite>)
    }
  }
  rows.push(
    <NotationRow>
      {row.map((x) => x)}
    </NotationRow>
  )
  return (<>
    {rows.map((x) => x)}
  </>);
}

const GameState = () => {
  const checked = useRecoilValue(checkedState);
  const checkMated = useRecoilValue(checkMatedState);
  const isDraw = useRecoilValue(drawState);
  const turn = useRecoilValue(turnState);
  if (checkMated[0]) {
    return (
      <TopLeft>
        <GameStateRow>
          CheckMate.
        </GameStateRow>
        <GameStateRow>
          Black Won.
        </GameStateRow>
        <GameStateRow>
          1 - 0.
        </GameStateRow>
      </TopLeft>
    )
  } else if (checkMated[1]) {
    return (
      <TopLeft>
        <GameStateRow>
          CheckMate.
        </GameStateRow>
        <GameStateRow>
          White Won.
        </GameStateRow>
        <GameStateRow>
          1 - 0.
        </GameStateRow>
      </TopLeft>
    )
  } else if (isDraw) {
    return (
      <TopLeft>
        <GameStateRow>
          StaleMate.
        </GameStateRow>
        <GameStateRow>
          Draw.
        </GameStateRow>
        <GameStateRow>
          1/2 - 1/2.
        </GameStateRow>
      </TopLeft>
    )
  } else if (checked[0]) {
    return (
      <TopLeft>
        <GameStateRow>
          Check.
        </GameStateRow>
        <GameStateRow>
          {turn === `w` && `White`}{turn === `b` && `Black`}'s Turn.
        </GameStateRow>
      </TopLeft>
    )
  } else if (checked[1]) {
    return (
      <TopLeft>
        <GameStateRow>
          Check.
        </GameStateRow>
        <GameStateRow>
          {turn === `w` && `White`}{turn === `b` && `Black`}'s Turn.
        </GameStateRow>
      </TopLeft>
    )
  }
  return (
    <TopLeft>
      <GameStateRow>
        {turn === `w` && `White`}{turn === `b` && `Black`}'s Turn.
      </GameStateRow>
    </TopLeft>)
}

const GameInform = () => {
  const setRotate = useSetRecoilState(rotateState);
  return (
    <GameInformWrap>
      <Top>
        <GameState />
        <TopRight>
          <RotateButtonWrap>
            <RotateButton
              onClick={() => {
                setRotate(prev => !prev);
              }}
            />
          </RotateButtonWrap>
        </TopRight>
      </Top>
      <Middle>
        <NotationWrap
          scrollHeight=""
        >
          <RenderNotation />
        </NotationWrap>
      </Middle>
      <TimeMachineRow>
        　
      </TimeMachineRow>
      <Bottom>
        　
      </Bottom>
      <ForMaxWidth>
      　　　　　　　　　　　　　　
      </ForMaxWidth>
    </GameInformWrap>
  )
}

export default GameInform;