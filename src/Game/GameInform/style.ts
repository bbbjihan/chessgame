import { FaArrowsRotate } from "react-icons/fa6";
import styled from "styled-components";
import { alignCenter, responsive } from "../../styles/macros";

export const GameInformWrap = styled.div`
  width: 100%;
  font-size:var(--font-size-lg);
  ${responsive('large')}{
    font-size: var(--font-size-nm);
  }
`

export const Top = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--color-wdbl);
  color: white;
  display:flex;
  border-radius: 0.5rem 0.5rem 0 0;
`

export const TopLeft = styled.div`
  height: 100%;
  width: 70%;
  ${alignCenter()}
`

export const GameStateRow = styled.div`
  width: 100%;
  text-align: center;
`

export const TopRight = styled.div`
  height: 100%;
  width: 30%;
  ${alignCenter()}
`

export const RotateButtonWrap = styled.div`
  ${alignCenter()}
  width: 2rem;
  height: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
`

export const RotateButton = styled(FaArrowsRotate)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-wdbl);
`

export const Middle = styled.div`
  width: 100%;
`

interface NotationWrapProps {
  scrollHeight: string;
}
export const NotationWrap = styled.div<NotationWrapProps>`
  height: 37rem;
  overflow: auto;
  color: var(--color-wdsh);
  scrollHeight: ${props => props.scrollHeight};
  ${responsive('large')}{
    font-size: var(--font-size-sm);
  }
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 15px; 
    border: 5.25px solid var(--color-wdnm);
  }
  &::-webkit-scrollbar-track{
    background-color: rgba(0,0,0,0);
  }
`

export const NotationRow = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  ${responsive('large')}{
    height: 2rem;
    line-height: 2rem;
  }
`

export const NotationNum = styled.div`
  width: 20%;
  text-align: center;
`

export const NotationWhite = styled.div`
  width: 40%;
  text-align: center;
`

export const NotationBlack = styled.div`
  width: 40%;
  text-align: center;
`

export const TimeMachineRow = styled.div`
  background-color: var(--color-wddk);
  height: 2rem;
  width: 100%;
`

export const Bottom = styled.div`
  width: 100%;
  height: 3rem;
  border-radius: 0 0 0.5rem 0.5rem;
`

export const ForMaxWidth = styled.div`
  height: 0;
  color: rgba(0,0,0,0)
`