import styled from "styled-components";
import { alignCenter, responsive } from "../../styles/macros";

export const NewGamePageWrap = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
    margin-top: 3%;
`

export const BoxWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const NewGameBox = styled.div`
  background-color: var(--color-wddk);
  color: var(--color-sh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 280px;
  border-radius: 0.5rem;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
`

export const BoxTitle = styled.div`
  height: 3rem;
  font-size: var(--font-size-xl);
`

export const InputTitleRow = styled.div`
  display: flex;
  width: 100%;
  height: 1.25rem;
  line-height: 1.25rem;
  margin-top: 0.5rem;
`

export const BoxRow = styled.div`
  display: flex;
  width: 100%;
  height: 2.25rem;
  margin-top: 0.5rem;
`

export const InputOpponent = styled.input`
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background-color: var(--color-wdnm);
  border: 1px solid var(--color-wdsh);
  outline: none;
  color: var(--color-wsh);
  &:focus {
    border: 1px solid var(--color-sh);
  }
`

export const NewGameButton = styled.div`
  width: 100%;
  height: 2.25rem;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0);
  color: black;
  outline: none;
  ${alignCenter()}
  cursor: pointer;
  background-color: var(--color-sh);
  &:hover{
    background-color: var(--color-wdnm);
    color: var(--color-sh);
    border: 1px solid var(--color-sh);
    transition: 0.3s;
  }
`

export const NewGameButtonContent = styled.div`
  display: flex;
`

export const NewGameButtonString = styled.div`
  margin-right: 0.125rem;
  ${responsive('large')}{
    font-size: 1rem;
  }
`

export const ButtonRow = styled.div`
  width: 100%;
  margin-top: 0.5rem;
`

export const HR = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-wdsh);
`

export const AlertRow = styled.div`
  display: flex;
  width: 100%;
  height: 1.25rem;
  line-height: 1.25rem;
  margin-top: 0.5rem;
  color: var(--color-wdsh);
  margin-bottom: 1rem;
  font-size: var(--font-size-sm);
`

export const ColorSelectorRow = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

interface ColorSelectorWrapProps{
  ColorSelected:string,
  Color:string
}
export const ColorSelectorWrap = styled.div<ColorSelectorWrapProps>`
  width: 80px;
  height: 80px;
  border: 2px solid rgba(0,0,0,0);
  border-radius: 0.5rem;
  background-color: var(--color-wdnm);
  ${alignCenter()}
  cursor: pointer;
  ${props =>
    props.Color === props.ColorSelected ?
    `
      border: 2px solid var(--color-wsh);
      background-color: var(--color-wdsh);
    `
    :
    ``
  }
`

interface ColorSelectorProps {
  Color: string
}
export const ColorSelector = styled.div<ColorSelectorProps>`
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  ${alignCenter()}
  font-size:var(--font-size-sm);
  font-weight: bold;
  ${props =>
    props.Color === "w" ?
    `
      background-color: rgb(248,248,248);
      color: rgb(86,83,82)
    `
    :
    props.Color === "b" ?
    `
      background-color: rgb(86,83,82);
      color: rgb(248,248,248);
    `
    :
    `
      background-image: linear-gradient(to right, rgb(248,248,248) 50%, rgb(86,83,82) 50%);
      color: black;
    `
  }
`

export const RandomSelector = styled.div`
`
