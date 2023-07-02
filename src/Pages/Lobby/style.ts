import styled from "styled-components";
import { alignCenter, responsive } from "../../styles/macros";

export const LobbyPageWrap = styled.div`
`

export const ProfileWrapWrap = styled.div`
  width: 100%;
  height: 4rem;
  ${alignCenter()}
  ${responsive('large')}{
    margin-top: 1rem;
  }
`

export const ProfileWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-wddk);
  ${responsive('large')}{
    width: 52.5rem;
    border-radius: 0.5rem;
  }
  ${alignCenter()}
`

export const UserProfile = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  color: var(--color-sh);
`

export const ProfileLine = styled.div`
  height: 3rem;
  border-left: 1px solid black;
`

export const UserNameWrap = styled.div`
  ${alignCenter()}
  width: 35%;
`
export const UserName = styled.div`
  ${responsive('large')}{
    font-size: var(--font-size-lg);
  }
  font-weight:bold;
`

export const UserRecordWrap = styled.div`
  ${alignCenter()}
  width: 35%;
`
export const UserRecord = styled.div`
  ${responsive('large')}{
    font-size: var(--font-size-lg);
  }
`

export const UserTitleWrap = styled.div`
  ${alignCenter()}
  width: 15%;
`
export const UserTitle = styled.div`
  ${responsive('large')}{
    font-size: var(--font-size-lg);
  }
`

export const NewGameButtonWrap = styled.div`
  ${alignCenter()}
  width: 15%;
`
export const NewGameButton = styled.button`
  height: 2.8rem;
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size:var(--font-size-sm);
  ${responsive('large')}{
    font-size:var(--font-size-nm);
  }
  background-color: var(--color-sh);
  &:hover{
    background-color: var(--color-wdbl);
    color: var(--color-sh);
    border: 1px solid var(--color-sh);
    transition: 0.3s;
  }
`

export const LobbyBoxWrap = styled.div`
  width: 100%;
  ${alignCenter()}
`

export const LobbyBox = styled.div`
  width: 100%;
  background-color: var(--color-wddk);
  ${responsive('large')}{
    width: 52.5rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
  }
`

export const LobbyTitle = styled.div`
  color: var(--color-sh);
`

export const LobbyTitleWrap = styled.div`
  width: 100%;
  height: 2rem;
  background-color: var(--color-wdbl);
  ${alignCenter()}
  border-radius: 0.5rem 0.5rem 0 0;
`

export const GameList = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  user-select: none;
  ${responsive('large')}{
    justify-content: flex-start;
  }
  height: 44rem;
  overflow-Y: auto;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 15px; 
    border: 5.25px solid var(--color-wddk);
  }
  &::-webkit-scrollbar-track{
    background-color: rgba(0,0,0,0);
  }
`

export const GameCard = styled.div`
  display:flex;
  flex-direction:column;
  height: 19rem;
  width: 11rem;
  margin: 0.8rem;
  border: 1px solid var(--color-wdk);
  border-radius: 0.5rem;
  background-color:var(--color-wdnm);
  cursor: pointer;
`

export const GameNumber = styled.div`
  height: 1rem;
  width: 100%;
  ${alignCenter()}
  font-size: var(--font-size-xs);
  color: var(--color-sh);
  font-weight: normal;
`

export const GameCardPlayers = styled.div`
  height: 6rem;
  width: 100%;
  font-weight:bold;
`

export const PlayerInforms = styled.div`
  height: 3rem;
  width: 100%;
  display:flex;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

export const PlayerLeft = styled.div`
  margin: 0.2rem;
  margin-left: 0;
  width: 2.6rem;
  height: 2.6rem;
  background-color:var(--color-wddk);
  border-radius: 0.5rem;
  ${alignCenter()}
`

interface PlayerColorProps {
  color: string
}
export const PlayerColor = styled.div<PlayerColorProps>`
  background-color: ${props => props.color === "w" ? `rgb(248, 248, 248)` : `rgb(86, 83, 82)`};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
`

export const PlayerRight = styled.div`
  ${alignCenter()}
`

export const PlayerInformRow = styled.div`
  display: flex;
  justify-content: right;
  width: 7rem;
  margin-right: 1rem;
  font-size: var(--font-size-xs);
`

export const PlayerName = styled.div`
`

export const PlayerRecord = styled.div`
`

export const PlayerTitle = styled.div`
  margin-left: 0.5rem;
`

export const BoardWrap = styled.div`
  width: 100%;
  height: 10rem;
  margin-top: 0.5rem;
  ${alignCenter()}
`

export const GameCardBoard = styled.div`
  width: 10rem;
  height: 10rem;
  background-color:var(--color-sh);
  border: 1px solid black;
`

export const Row = styled.div`
  display: block;
  width: 100%;
  height: 12.5%;
`

interface SquareProps {
  isDark: boolean,
}
export const Square = styled.div<SquareProps>`
  float: left;
  position: relative;
  width: 12.5%;
  height: 100%;
  padding-bottom: 12.5%;
  height: 0;
  ${props => props.isDark ?
    `background-color: var(--color-wdk);`
    :
    `background-color: var(--color-wsh);`
  }
`

export const GameCardState = styled.div`
  height: 2rem;
  width: 100%;
  ${alignCenter()}
  font-size: var(--font-size-sm);
  color: var(--color-sh);
`

export const ChatBoxWrap = styled.div`
  width: 100%;
  ${alignCenter()}
`

export const ChatBox = styled.div`
  width: 100%;
  height: 12rem;
  background-color: var(--color-wddk);
  ${responsive('large')}{
    width: 49rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
  }
`