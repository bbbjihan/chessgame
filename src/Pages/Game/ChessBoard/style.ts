import styled from "styled-components";
import { responsive } from "../../../styles/macros";

interface SquareProps {
  isDark : boolean,
}
interface BoardProps {
  rotate: boolean,
}

export const BoardWrap = styled.div`
  user-select: none;
  ${responsive('small')}{
    width: 100%;
  }
  background-color: gray;
`

export const PromotionWrap = styled.div`
  top: 0;
  left: 0;
  width: 10%;
  height: 10%;
  z-index: 5;
  background-color: rgba(0,0,0,0.5);
`

export const PromotionChoiceWhite = styled.div`

`

export const PromotionChoiceBlack = styled.div`

`

export const BoardBlock = styled.div`
  display: block;
`

export const Board = styled.div<BoardProps>`
  display:flex;
  flex-direction:${props => props.rotate ? `column-reverse` : `column`};
  box-sizing: content-box;
  width: 36rem;
  height: 36rem;
  ${responsive('small')}{
    width: 100vw;
    height: 100%;
  }
`

export const Row = styled.div`
  display: block;
  width: 100%;
  height: 12.5%;
`
export const Square = styled.div<SquareProps>`
  float: left;
  position: relative;
  width: 12.5%;
  height: 100%;
  padding-bottom: 12.5%;
  height: 0;
  ${props=>props.isDark ?
    `background-color: var(--color-wdk);`
    :
    `background-color: var(--color-wsh);`
  }
`

export const DotWrap = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`

export const MoveableDot = styled.div`
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.5);
`