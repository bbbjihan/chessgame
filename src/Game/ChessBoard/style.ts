import styled from "styled-components";

export const BoardWrap = styled.div`
  user-select: none;
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