import styled from "styled-components";
import { alignCenter, responsive } from "../styles/macros";

export const PageWrap = styled.div`
  ${alignCenter()}
`

export const PageContent = styled.div`
  display: flex;
  flex-direction:column;
  ${responsive('large')}{
    flex-direction: row;
    margin-top: 1rem;
  }
`


interface PlayerAndBoardProps {
  rotate: boolean
}

export const PlayerAndBoard = styled.div<PlayerAndBoardProps>`
  display: flex;
  flex-direction: ${props => props.rotate ? `column-reverse` : `column`};
  ${responsive('large')}{
    justify-content: space-between;
    height: 47rem;
  }
  border-radius: 0.5rem;
`

export const PlayerCardWrap = styled.div`
  width: 36rem;
  ${responsive('small')}{
    width: 100%;
  }
`

export const ChessBoardWrap = styled.div`
  ${alignCenter()}
  width: 36rem;
  ${responsive('small')}{
    width: 100%;
  }
`

export const GameInformWrap = styled.div`
  min-width: 12rem;
  background-color: var(--color-wdnm);
  ${responsive('large')}{
    margin-left: 1rem;
    border-radius: 0.5rem;
  }
`

export const BottomGameInform = styled.div`
  height: 3rem
`