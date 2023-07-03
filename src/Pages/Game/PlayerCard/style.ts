import styled from "styled-components"
import { alignCenter, flex, responsive } from "../../../styles/macros"

export const CardWrap = styled.div`
  height: 5rem;
  display: flex;
  background-color: var(--color-wdnm);
  ${responsive('large')}{
    border-radius: 0.5rem;
  }
`
export const Left = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: var(--color-wddk);
  ${alignCenter()}
  ${responsive('large')}{
    border-radius: 0.5rem;
  }
`

export const Right = styled.div`
  ${flex(`column`,`space-evenly`)}
  margin-left: 1rem;
`
export const PlayerInformRow = styled.div`
  height: 2.5rem;
  padding-top: 0.5rem;
  display: flex;
  color: var(--color-sh);
`

export const PlayerID = styled.div`
  font-weight: bold;
  font-size: var(--font-size-lg);
  height: 100%;
  ${flex(`column`,`center`)}
`

export const PlayerRating = styled.div`
  margin-left: 0.5rem;
  height: 100%;
  ${flex(`column`,`center`)}
`

export const PlayerTitle = styled.div`
  margin-left: 0.5rem;
  height: 100%;
  ${flex(`column`,`center`)}
`

interface ColorProps {
  color : string
}

export const PlayerColor = styled.div<ColorProps>`
  background-color: ${props => props.color === "w" ? `rgb(248,248,248)` : `rgb(86,83,82)`};
  color: ${props => props.color === "w" ? `rgb(86,83,82)` : `rgb(248,248,248)`};
  ${alignCenter()}
  font-size: var(--font-size-lg);
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
`

export const PlayerCapturedPieceRow = styled.div`
  height: 2rem;
  ${flex(`row`,``)}
  padding-bottom: 0.5rem;
`

export const CapturedPieces = styled.div`
  display: flex;
  height: 100%;
`

interface IMGWrapProps {
  isPawn : boolean
}

export const IMGWrap = styled.div<IMGWrapProps>`
  margin-right: ${props => props.isPawn ? `-1.3rem` : `-0.5rem` };
`