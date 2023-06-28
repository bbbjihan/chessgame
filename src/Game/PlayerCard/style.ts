import styled from "styled-components"
import { alignCenter, flex } from "../../styles/macros"

export const CardWrap = styled.div`
  height: 5rem;
  display: flex;
  background-color: var(--color-wdnm);
`
export const Left = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: var(--color-wddk);
  ${alignCenter()}
`

export const Right = styled.div`
  ${flex(`column`,`space-evenly`)}
  margin-left: 1rem;
`
export const PlayerInformRow = styled.div`
  height: 2.5rem;
  padding-top: 0.5rem;
  display: flex;
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
  width: 3rem;
  height: 3rem;
`

export const PlayerCapturedPieceRow = styled.div`
  height: 2.0rem;
  ${flex(`column`,`center`)}
  padding-bottom: 0.5rem;
`

export const CapturedPieces = styled.div`
  display: flex;
  height: 100%;
`

export const PieceScore = styled.div`
  margin-left: 2rem;
  font-weight: bold;
  color: white;
  height: 100%;
  ${flex(`column`,`center`)}
`

export const PawnIMGWrap = styled.div`
  margin-right: -1.3rem;
`