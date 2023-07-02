import styled from "styled-components";
import { alignCenter, responsive } from "../../styles/macros";

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
  width: 100%;
  background-color:var(--color-wdbl);
  color: var(--color-sh);
  text-align: center;
  ${responsive('large')}{
    margin-top: 0.5rem;
    width: 51rem;
  }
`

export const BottomRow = styled.div`
  width: 100%;
  word-wrap: break-word;
  min-height: 2rem;
  line-height: 2rem;
  ${responsive('large')}{
    min-height: 1.5rem;
    line-height: 1.5rem;
    font-size: var(--font-size-sm);
  }
`