import styled from "styled-components";
import { alignCenter, responsive } from "../styles/macros";

export const PageWrap = styled.div`
`

export const PageContent = styled.div`
`


interface PlayerAndBoardProps {
  rotate: boolean
}

export const PlayerAndBoard = styled.div<PlayerAndBoardProps>`
  display: flex;
  flex-direction: ${props => props.rotate ? `column-reverse` : `column`};
`

export const PlayerCardWrap = styled.div`
  width: 24rem;
  ${responsive('small')}{
    width: 100%;
  }
`

export const ChessBoardWrap = styled.div`
  ${alignCenter()}
  width: 24rem;
  ${responsive('small')}{
    width: 100%;
  }
`