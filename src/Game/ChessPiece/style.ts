import styled from "styled-components";

export const ChessPieceWrap = styled.div`
  width: 100%;
`

interface ChessPieceIMGProps{
  width: string,
  height: string
}

export const ChessPieceIMG = styled.img<ChessPieceIMGProps>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  width: ${props => props.width};
  height: ${props => props.height};
`