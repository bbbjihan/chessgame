import styled from "styled-components";

export const BoardWrap = styled.div`

`

export const BoardBlock = styled.div`
  display: block;
`

export const Board = styled.div`
  box-sizing: content-box;
  width: 24rem;
  board: 24rem;
`

export const Row = styled.div`
  display: block;
  width: 24rem;
  height: 3rem;
`

export const Square = styled.div`
  float: left;
  position: relative;
  width: 3rem;
  height: 3rem;
`

export const DarkSquare = styled(Square)`
  background-color: var(--color-dk);
`

export const LightSquare = styled(Square)`
  background-color: var(--color-sh);
`