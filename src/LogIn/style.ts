import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { alignCenter, responsive } from "../styles/macros";

export const LogInPageWrap = styled.div`
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

export const LogInBox = styled.div`
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

export const BoxRow = styled.div`
  display: flex;
  width: 100%;
  height: 2.25rem;
  margin-top: 0.5rem;
`

export const RowTitle = styled.div`
`

export const InputEmail = styled.input`
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background-color: var(--color-wdnm);
  border: 1px solid var(--color-wdsh);
  outline: none;
    &:focus {
    border: 1px solid var(--color-sh);
  }
`

export const InputPW = styled.input`
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background-color: var(--color-wdnm);
  border: 1px solid var(--color-wdsh);
  outline: none;
    &:focus {
    border: 1px solid var(--color-sh);
  }
`

export const GoogleLogIn = styled.button`
  ${alignCenter()}
  width: 100%;
  height: 2rem;
  background-color: var(--color-wdnm);
  border-radius: 0.25rem;
  border: none;
  outline: none;
  cursor: pointer;
  color: var(--color-sh);
  &:hover{
    background-color: var(--color-wdsh);
    color: var(--color-wdbl);
    transition: 0.5s;
  }
`

export const GoogleLogInButtonContent = styled.div`
  display: flex;
`

export const GoogleLogo = styled(FcGoogle)`
  width: 1.5rem;
  height: 1.5rem;
`

export const GoogleLogInString = styled.div`
  margin-left: 0.5rem;
  line-height: 1.5rem;
  font-size: var(--font-size-sm);
`

export const LogInButton = styled.button`
  width: 100%;
  height: 2.25rem;
  border-radius: 4px;
  border: none;
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

export const LogInButtonContent = styled.div`
  display: flex;
`

export const LogInButtonString = styled.div`
  margin-right: 0.125rem;
  ${responsive('large')}{
    font-size: 1rem;
  }
`

export const SignUpButton = styled.button`
  width: 100%;
  height: 2.25rem;
  border-radius: 4px;
  border: none;
  outline: none;
  ${alignCenter()}
  cursor: pointer;
  background-color: var(--color-wdsh);
  &:hover{
    background-color: var(--color-wdnm);
    color: var(--color-sh);
    border: 1px solid var(--color-sh);
    transition: 0.3s;
  }
`

export const SignUpButtonContent = styled.div`
  display: flex;
`

export const SignUpButtonString = styled.div`
  margin-right: 0.125rem;
  ${responsive('large')}{
    font-size: 1rem;
  }
`

export const CancelButton = styled.button`
  width: 100%;
  height: 2.25rem;
  border-radius: 4px;
  border: none;
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

export const CancelButtonContent = styled.div`
  display: flex;
`

export const CancelButtonString = styled.div`
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